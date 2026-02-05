import React, { useState, useRef, useEffect } from 'react';
import { Mail, Copy, Check } from 'lucide-react';

interface EmailMenuProps {
  children: React.ReactNode;
  className?: string;
  isBottomNav?: boolean;
}

export const EmailMenu: React.FC<EmailMenuProps> = ({ children, className = "", isBottomNav = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const emails = [
    { address: "hello@saiakash.dev", label: "Dev & Work" },
    { address: "hello@saiakashneela.com", label: "Personal" }
  ];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleCopy = (e: React.MouseEvent, email: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <div className={`relative inline-block ${className}`} ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-full"
        aria-label="Open Email Options"
        aria-expanded={isOpen}
      >
        {children}
      </button>

      {isOpen && (
        <div 
            className={`
                absolute z-50 w-64 
                bg-white dark:bg-neutral-900 
                border border-gray-200 dark:border-neutral-700 
                shadow-2xl rounded-2xl p-2 
                transition-all duration-200 ease-out
                ${isBottomNav 
                    ? 'bottom-[140%] left-1/2 -translate-x-1/2 origin-bottom animate-fade-in-up' 
                    : 'top-1/2 -translate-y-1/2 left-[130%] sm:top-auto sm:bottom-full sm:left-1/2 sm:-translate-y-0 sm:-translate-x-1/2 sm:mb-3 sm:origin-bottom origin-left animate-fade-in-right sm:animate-fade-in-up'
                }
            `}
        >
          <div className="flex flex-col gap-1">
            <div className="px-3 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center border-b border-gray-100 dark:border-neutral-800 mb-1">
              Contact Me
            </div>
            {emails.map((item) => (
              <a 
                key={item.address}
                href={`mailto:${item.address}`}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
              >
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.address}</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{item.label}</span>
                </div>
                <button 
                    onClick={(e) => handleCopy(e, item.address)}
                    className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-md hover:bg-white dark:hover:bg-neutral-800 border border-transparent hover:border-gray-200 dark:hover:border-neutral-700"
                    title="Copy to clipboard"
                >
                    {copiedEmail === item.address ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </a>
            ))}
          </div>
          
          {/* Arrow */}
          {isBottomNav ? (
             /* Bottom Nav: Arrow at bottom pointing down */
             <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-white dark:bg-neutral-900 border-b border-r border-gray-200 dark:border-neutral-700 rotate-45"></div>
          ) : (
             /* Bio: Responsive Arrow */
             <>
                {/* Mobile: Arrow at left pointing left */ }
                <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 bg-white dark:bg-neutral-900 border-l border-b border-gray-200 dark:border-neutral-700 rotate-45 sm:hidden"></div>
                {/* Desktop: Arrow at bottom pointing down */}
                <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-white dark:bg-neutral-900 border-b border-r border-gray-200 dark:border-neutral-700 rotate-45"></div>
             </>
          )}
        </div>
      )}
    </div>
  );
};