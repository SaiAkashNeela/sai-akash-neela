import React from 'react';
import { Github, Linkedin, Download, Mail, ArrowUpRight, FileText, ExternalLink } from 'lucide-react';
import { ResumeData } from '../types';
import { XIcon } from './CustomIcons';

interface LinksBarProps {
  data: ResumeData;
}

export const LinksBar: React.FC<LinksBarProps> = ({ data }) => {
  return (
    <div className="w-full space-y-3 pt-2">
      {/* Profile Social & Contact Links */}
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={`https://${data.contact.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors border border-zinc-200 dark:border-zinc-700 shadow-xs"
          aria-label="GitHub Profile"
        >
          <Github size={14} />
          <span>GitHub</span>
        </a>

        <a
          href={`https://${data.contact.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors border border-zinc-200 dark:border-zinc-700 shadow-xs"
          aria-label="LinkedIn Profile"
        >
          <Linkedin size={14} />
          <span>LinkedIn</span>
        </a>

        <a
          href={`https://${data.contact.x}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors border border-zinc-200 dark:border-zinc-700 shadow-xs"
          aria-label="X (Twitter) Profile"
        >
          <XIcon size={12} />
          <span>X / Twitter</span>
        </a>

        <a
          href={`https://${data.contact.medium}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors border border-zinc-200 dark:border-zinc-700 shadow-xs"
          aria-label="Medium Articles"
        >
          <FileText size={14} />
          <span>Medium</span>
        </a>

        <a
          href={`mailto:${data.contact.email}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors border border-zinc-200 dark:border-zinc-700 shadow-xs"
          aria-label="Send Email"
        >
          <Mail size={14} />
          <span>Email</span>
        </a>

        <a
          href={`https://${data.contact.resume}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 transition-colors shadow-xs"
          aria-label="Download CV / Resume"
        >
          <Download size={14} />
          <span>Resume CV</span>
        </a>
      </div>

      {/* Flagship Product Links */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
        <span className="text-zinc-400 dark:text-zinc-500 font-medium text-[11px] uppercase tracking-wider">
          Flagship:
        </span>

        <a
          href="https://bucketstack.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
        >
          <span className="font-semibold">BucketStack.app</span>
          <span className="text-[10px] text-zinc-400">(Tauri + Rust S3 Manager)</span>
          <ArrowUpRight size={11} className="text-zinc-400" />
        </a>

        <a
          href="https://checkemail.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
        >
          <span className="font-semibold">CheckEmail.dev</span>
          <span className="text-[10px] text-zinc-400">(API Inboxes)</span>
          <ArrowUpRight size={11} className="text-zinc-400" />
        </a>
      </div>
    </div>
  );
};
