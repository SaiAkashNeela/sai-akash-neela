import React from 'react';
import { Terminal, Github, Heart } from 'lucide-react';
import { scrollToTop } from '../lib/utils';

export const Footer: React.FC = () => {
  return (
    <footer className="max-w-5xl mx-auto mt-20 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 pb-16 transition-colors">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-indigo-500" />
          <span>Designed & built by Sai Akash Neela</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Vite · React 19 · Cloudflare</span>
          <span className="hidden sm:inline">•</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer"
            aria-label="Scroll to top of page"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
