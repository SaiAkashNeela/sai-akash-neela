import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../lib/utils';

interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, onToggle, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'p-2 rounded-full bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus-visible:text-indigo-600 dark:focus-visible:text-indigo-400 border border-zinc-200 dark:border-zinc-700 shadow-sm transition-colors cursor-pointer',
        className
      )}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <Sun size={18} className="transition-transform rotate-0 scale-100" /> : <Moon size={18} className="transition-transform rotate-0 scale-100" />}
    </button>
  );
};
