import React from 'react';
import { cn } from '../lib/utils';

interface ContactLinkProps {
  href: string;
  icon: React.ReactNode;
  text?: string;
  label: string;
  className?: string;
  showText?: boolean;
}

export const ContactLink: React.FC<ContactLinkProps> = ({ 
  href, 
  icon, 
  text, 
  label,
  className = '',
  showText = true,
}) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 focus-visible:text-indigo-600 dark:focus-visible:text-indigo-400 transition-colors text-sm font-medium',
        className
      )}
    >
      <span className="shrink-0 flex items-center justify-center">{icon}</span>
      {showText && text && <span>{text}</span>}
    </a>
  );
};
