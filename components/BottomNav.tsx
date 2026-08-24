import React from 'react';
import { Github, Linkedin, BookOpen, User } from 'lucide-react';
import { ResumeData } from '../types';
import { XIcon } from './CustomIcons';
import { EmailMenu } from './EmailMenu';
import { scrollToTop } from '../lib/utils';

interface BottomNavProps {
  data: ResumeData;
  currentView: 'home' | 'blog';
  onNavigate: (view: 'home' | 'blog') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ data, currentView, onNavigate }) => {
  const handleNav = (view: 'home' | 'blog') => {
    onNavigate(view);
    scrollToTop();
  };

  return (
    <nav 
      className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800 shadow-2xl rounded-full px-5 py-2.5 flex justify-between items-center z-50 transition-colors"
      aria-label="Mobile quick navigation"
    >
      {/* Home / Profile button */}
      <button
        type="button"
        onClick={() => handleNav('home')}
        className={`p-2 rounded-full transition-colors cursor-pointer ${
          currentView === 'home'
            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400'
        }`}
        aria-label="Go to profile home"
        title="Profile Home"
      >
        <User size={19} />
      </button>

      {/* Blog button */}
      <button
        type="button"
        onClick={() => handleNav('blog')}
        className={`p-2 rounded-full transition-colors cursor-pointer ${
          currentView === 'blog'
            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400'
        }`}
        aria-label="Read blog articles"
        title="Writing & Notes"
      >
        <BookOpen size={19} />
      </button>

      {/* Email Menu (Center Action) */}
      <EmailMenu
        isBottomNav={true}
        className="p-2.5 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 rounded-full border border-indigo-200 dark:border-indigo-800 shadow-xs"
      />

      {/* GitHub link */}
      <a
        href={`https://${data.contact.github}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-full"
        aria-label="Open GitHub profile"
        title="GitHub"
      >
        <Github size={19} />
      </a>

      {/* LinkedIn link */}
      <a
        href={`https://${data.contact.linkedin}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-full"
        aria-label="Open LinkedIn profile"
        title="LinkedIn"
      >
        <Linkedin size={19} />
      </a>

      {/* X / Twitter link */}
      <a
        href={`https://${data.contact.x}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-full"
        aria-label="Open X profile"
        title="X (Twitter)"
      >
        <XIcon size={17} />
      </a>
    </nav>
  );
};
