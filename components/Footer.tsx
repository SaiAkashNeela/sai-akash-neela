import React from 'react';
import { Heart, Terminal, Sparkles } from 'lucide-react';
import { scrollToTop } from '../lib/utils';

export const Footer: React.FC = () => {
  return (
    <footer className="max-w-5xl mx-auto mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center pb-12 transition-colors">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-1.5">
          <Terminal size={14} className="text-indigo-500" />
          <span>Crafted by Sai Akash Neela</span>
        </div>

        <div className="flex items-center gap-4">
          <span>Deployed on Cloudflare</span>
          <span>•</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium cursor-pointer"
            aria-label="Scroll to top of page"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
