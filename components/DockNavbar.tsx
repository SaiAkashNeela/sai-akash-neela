import React from 'react';
import { Home, Layers, BookOpen, Github, Linkedin, Mail, Sun, Moon, Sparkles, Download } from 'lucide-react';
import { ResumeData } from '../types';
import { XIcon } from './CustomIcons';
import { EmailMenu } from './EmailMenu';
import { InstallButton } from './InstallButton';

interface DockNavbarProps {
  data: ResumeData;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const DockNavbar: React.FC<DockNavbarProps> = ({ data, darkMode, onToggleTheme }) => {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50">
      <nav 
        className="pointer-events-auto relative h-14 p-1.5 sm:p-2 w-fit mx-auto flex items-center gap-1 sm:gap-2 border border-zinc-200/90 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-3xl shadow-xl rounded-full transition-colors"
        aria-label="Bottom quick actions dock"
      >
        {/* Navigation Anchors */}
        <a
          href="#hero"
          className="p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Scroll to Top"
          title="Home"
        >
          <Home size={18} />
        </a>

        <a
          href="#projects"
          className="p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Scroll to Projects"
          title="Projects"
        >
          <Layers size={18} />
        </a>

        <a
          href="#writing"
          className="p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Scroll to Writing"
          title="Writing"
        >
          <BookOpen size={18} />
        </a>

        {/* Separator */}
        <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-0.5" />

        {/* GitHub */}
        <a
          href={`https://${data.contact.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="GitHub Profile"
          title="GitHub"
        >
          <Github size={18} />
        </a>

        {/* LinkedIn */}
        <a
          href={`https://${data.contact.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="LinkedIn Profile"
          title="LinkedIn"
        >
          <Linkedin size={18} />
        </a>

        {/* X / Twitter */}
        <a
          href={`https://${data.contact.x}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="X Profile"
          title="X (Twitter)"
        >
          <XIcon size={16} />
        </a>

        {/* Email Menu */}
        <EmailMenu 
          isBottomNav={true}
          className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <Mail size={18} />
        </EmailMenu>

        {/* Separator */}
        <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-0.5" />

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title="Toggle Theme"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>
    </div>
  );
};
