import React, { useState, useRef, useEffect } from 'react';
import { Mail, Copy, Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface EmailMenuProps {
  children?: React.ReactNode;
  className?: string;
  isBottomNav?: boolean;
}

const EMAILS = [
  { address: 'hello@saiakash.dev', label: 'Dev & Consulting' },
  { address: 'hello@saiakashneela.com', label: 'Personal & Projects' },
  { address: 'saiakashneela@outlook.com', label: 'Direct Outlook' }
] as const;

export const EmailMenu: React.FC<EmailMenuProps> = ({ 
  children, 
  className = '', 
  isBottomNav = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape or click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleCopy = (e: React.MouseEvent, email: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(email);
    }
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <div className={cn('relative inline-block', className)} ref={menuRef}>
      <button 
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center rounded-full text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 focus-visible:text-indigo-600 dark:focus-visible:text-indigo-400 transition-colors cursor-pointer"
        aria-label="Open email options and contact addresses"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {children || <Mail size={20} />}
      </button>

      {isOpen && (
        <div 
          role="menu"
          aria-label="Contact email options"
          className={cn(
            'absolute z-50 w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-2xl rounded-2xl p-2.5 transition-colors duration-150',
            isBottomNav 
              ? 'bottom-[140%] left-1/2 -translate-x-1/2 origin-bottom animate-fade-in-up' 
              : 'top-1/2 -translate-y-1/2 left-[130%] sm:top-auto sm:bottom-full sm:left-1/2 sm:-translate-y-0 sm:-translate-x-1/2 sm:mb-3 sm:origin-bottom origin-left animate-fade-in-right sm:animate-fade-in-up'
          )}
        >
          <div className="flex flex-col gap-1.5">
            <div className="px-3 py-1.5 text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-center border-b border-zinc-100 dark:border-zinc-800">
              Get in Touch
            </div>
            {EMAILS.map((item) => (
              <div 
                key={item.address}
                role="menuitem"
                className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/60 border border-transparent hover:border-zinc-200/60 dark:hover:border-zinc-700/60 transition-colors"
              >
                <a 
                  href={`mailto:${item.address}`}
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col flex-1 min-w-0 pr-2 text-left"
                  aria-label={`Send email to ${item.address}`}
                >
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">{item.address}</span>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{item.label}</span>
                </a>
                <button 
                  type="button"
                  onClick={(e) => handleCopy(e, item.address)}
                  className="p-1.5 text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-zinc-700 rounded-lg border border-transparent hover:border-zinc-200 dark:hover:border-zinc-600 transition-colors shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label={`Copy ${item.address} to clipboard`}
                >
                  {copiedEmail === item.address ? (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">
                      <Check size={13} />
                    </span>
                  ) : (
                    <Copy size={13} />
                  )}
                </button>
              </div>
            ))}
          </div>
          
          {/* Arrow */}
          {isBottomNav ? (
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-white dark:bg-zinc-900 border-b border-r border-zinc-200 dark:border-zinc-700 rotate-45" />
          ) : (
            <>
              <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 bg-white dark:bg-zinc-900 border-l border-b border-zinc-200 dark:border-zinc-700 rotate-45 sm:hidden" />
              <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-white dark:bg-zinc-900 border-b border-r border-zinc-200 dark:border-zinc-700 rotate-45" />
            </>
          )}
        </div>
      )}
    </div>
  );
};
