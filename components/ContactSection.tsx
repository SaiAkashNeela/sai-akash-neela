import React from 'react';
import { Mail, MessageCircle, Send } from 'lucide-react';
import { ResumeData } from '../types';
import { XIcon } from './CustomIcons';

interface ContactSectionProps {
  data: ResumeData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  return (
    <section id="contact" className="w-full">
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 sm:p-12 relative bg-card text-center flex flex-col items-center gap-4">
        {/* Centered Top Badge */}
        <div className="absolute -top-3.5 border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-xl px-4 py-0.5 text-xs font-semibold left-1/2 -translate-x-1/2 shadow-xs">
          Contact
        </div>

        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-zinc-900 dark:text-zinc-100">
          Get in Touch
        </h2>

        <p className="mx-auto max-w-md text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
          Want to chat about AI ops, cloud infrastructure, or collaborate on a project? Just send an email or shoot me a DM on X.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <a
            href={`mailto:${data.contact.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 transition-opacity"
            aria-label="Send email"
          >
            <Mail size={16} />
            <span>Send Email</span>
          </a>

          <a
            href={`https://${data.contact.x}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700"
            aria-label="Send direct message on X"
          >
            <XIcon size={14} />
            <span>DM on X</span>
          </a>
        </div>
      </div>
    </section>
  );
};
