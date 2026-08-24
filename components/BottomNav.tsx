import React from 'react';
import { Home, Layers, Briefcase, BookOpen, Sun, Moon } from 'lucide-react';
import { ResumeData } from '../types';
import { EmailMenu } from './EmailMenu';
import { scrollToTop, cn } from '../lib/utils';

interface BottomNavProps {
  data: ResumeData;
  activeTab: 'all' | 'projects' | 'experience' | 'blog';
  onSelectTab: (tab: 'all' | 'projects' | 'experience' | 'blog') => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  darkMode,
  onToggleTheme,
}) => {
  const handleNav = (tab: 'all' | 'projects' | 'experience' | 'blog') => {
    onSelectTab(tab);
    scrollToTop();
  };

  return (
    <nav 
      className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[94%] max-w-md bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800 shadow-2xl rounded-full px-4 py-2 flex justify-between items-center z-50 transition-colors"
      aria-label="Mobile quick navigation dock"
    >
      {/* Overview */}
      <button
        type="button"
        onClick={() => handleNav('all')}
        className={cn(
          'p-2.5 rounded-full transition-colors cursor-pointer',
          activeTab === 'all'
            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
        )}
        aria-label="Overview home"
        title="Overview"
      >
        <Home size={19} />
      </button>

      {/* Projects */}
      <button
        type="button"
        onClick={() => handleNav('projects')}
        className={cn(
          'p-2.5 rounded-full transition-colors cursor-pointer',
          activeTab === 'projects'
            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
        )}
        aria-label="View all projects"
        title="Projects"
      >
        <Layers size={19} />
      </button>

      {/* Experience */}
      <button
        type="button"
        onClick={() => handleNav('experience')}
        className={cn(
          'p-2.5 rounded-full transition-colors cursor-pointer',
          activeTab === 'experience'
            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
        )}
        aria-label="View work experience"
        title="Experience"
      >
        <Briefcase size={19} />
      </button>

      {/* Writing */}
      <button
        type="button"
        onClick={() => handleNav('blog')}
        className={cn(
          'p-2.5 rounded-full transition-colors cursor-pointer',
          activeTab === 'blog'
            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
        )}
        aria-label="Read technical writing"
        title="Writing"
      >
        <BookOpen size={19} />
      </button>

      {/* Center Email Menu */}
      <EmailMenu
        isBottomNav={true}
        className="p-2.5 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 rounded-full border border-indigo-200 dark:border-indigo-800"
      />

      {/* Theme toggle */}
      <button
        type="button"
        onClick={onToggleTheme}
        className="p-2.5 text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-full cursor-pointer"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        title="Toggle dark mode"
      >
        {darkMode ? <Sun size={19} /> : <Moon size={19} />}
      </button>
    </nav>
  );
};
