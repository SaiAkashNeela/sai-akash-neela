import React from 'react';
import { Github, Linkedin, Download, Mail } from 'lucide-react';
import { ContactInfo } from '../types';
import { XIcon, MediumIcon } from './CustomIcons';
import { EmailMenu } from './EmailMenu';
import { ContactLink } from './ContactLink';

interface SocialLinksProps {
  contact: ContactInfo;
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ contact, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 flex-wrap ${className}`}>
      {/* Email Dropdown Menu */}
      <EmailMenu className="p-2 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
        <Mail size={18} />
      </EmailMenu>

      <span className="text-zinc-300 dark:text-zinc-700 select-none">|</span>

      {/* GitHub */}
      <ContactLink
        href={`https://${contact.github}`}
        icon={<Github size={18} />}
        label="GitHub profile"
        showText={false}
        className="p-2 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
      />

      {/* LinkedIn */}
      <ContactLink
        href={`https://${contact.linkedin}`}
        icon={<Linkedin size={18} />}
        label="LinkedIn profile"
        showText={false}
        className="p-2 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
      />

      {/* X / Twitter */}
      <ContactLink
        href={`https://${contact.x}`}
        icon={<XIcon size={16} />}
        label="X (formerly Twitter) profile"
        showText={false}
        className="p-2 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
      />

      {/* Medium */}
      <ContactLink
        href={`https://${contact.medium}`}
        icon={<MediumIcon size={18} />}
        label="Medium articles"
        showText={false}
        className="p-2 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
      />

      <span className="text-zinc-300 dark:text-zinc-700 select-none">|</span>

      {/* Resume Download */}
      <a
        href={`https://${contact.resume}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download CV / Resume"
        title="Download CV / Resume"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-zinc-950 focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors"
      >
        <Download size={14} />
        <span>Resume</span>
      </a>
    </div>
  );
};
