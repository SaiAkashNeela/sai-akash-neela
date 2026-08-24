import { useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export type PWAStatus = 'installable' | 'installed' | 'update-available' | 'idle';

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [hasUpdate, setHasUpdate] = useState<boolean>(false);
  const [isInstalling, setIsInstalling] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    // Check if running in standalone mode (installed PWA)
    const isStandalone = 
      (typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches) ||
      (typeof navigator !== 'undefined' && (navigator as unknown as { standalone?: boolean }).standalone === true) ||
      (typeof document !== 'undefined' && document.referrer.includes('android-app://'));

    if (!isCancelled) {
      setIsInstalled(Boolean(isStandalone));
    }

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      if (!isCancelled) {
        setDeferredPrompt(e as BeforeInstallPromptEvent);
      }
    };

    // Listen for appinstalled
    const handleAppInstalled = () => {
      if (!isCancelled) {
        setDeferredPrompt(null);
        setIsInstalled(true);
        setIsInstalling(false);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      isCancelled = true;
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = useCallback(async () => {
    if (!deferredPrompt) {
      return false;
    }

    setIsInstalling(true);
    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
      }
      return choiceResult.outcome === 'accepted';
    } catch {
      return false;
    } finally {
      setIsInstalling(false);
    }
  }, [deferredPrompt]);

  const updateApp = useCallback(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const reg of registrations) {
          reg.update();
        }
      });
    }
    window.location.reload();
  }, []);

  let status: PWAStatus = 'idle';
  if (hasUpdate) {
    status = 'update-available';
  } else if (deferredPrompt) {
    status = 'installable';
  } else if (isInstalled) {
    status = 'installed';
  }

  return {
    status,
    isInstallable: Boolean(deferredPrompt),
    isInstalled,
    hasUpdate,
    isInstalling,
    installApp,
    updateApp,
  };
}
