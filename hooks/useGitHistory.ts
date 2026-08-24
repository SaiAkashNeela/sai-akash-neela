import { useState, useEffect } from 'react';
import { Contribution } from '../types';
import { resumeData } from '../data';

const GITHUB_WORKER_URL = 'https://git-history.mrsan.workers.dev';
const CACHE_KEY_V1 = 'sai_akash_git_history_v1';
const CACHE_EXPIRY_MS = 1000 * 60 * 60 * 2; // 2 hours

interface CachePayload {
  timestamp: number;
  data: Contribution[];
}

export function useGitHistory(): {
  gitHistory: Contribution[];
  isLoading: boolean;
  totalContributions: number;
} {
  const [gitHistory, setGitHistory] = useState<Contribution[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(CACHE_KEY_V1);
        if (cached) {
          const parsed: CachePayload = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_EXPIRY_MS && Array.isArray(parsed.data)) {
            return parsed.data;
          }
        }
      } catch {
        // Ignore cache parse errors
      }
    }
    return resumeData.gitHistory;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function loadHistory() {
      if (!GITHUB_WORKER_URL) return;

      try {
        setIsLoading(true);
        const res = await fetch(GITHUB_WORKER_URL, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const data = await res.json();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          const recentData: Contribution[] = data.slice(-182);
          setGitHistory(recentData);

          try {
            const cachePayload: CachePayload = {
              timestamp: Date.now(),
              data: recentData,
            };
            localStorage.setItem(CACHE_KEY_V1, JSON.stringify(cachePayload));
          } catch {
            // Storage full or unavailable
          }
        }
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadHistory();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const totalContributions = gitHistory.reduce((acc, curr) => acc + (curr.count || 0), 0);

  return { gitHistory, isLoading, totalContributions };
}
