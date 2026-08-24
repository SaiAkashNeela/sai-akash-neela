import React from 'react';
import { PenTool, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { ResumeData } from '../types';
import { SocialLinks } from './SocialLinks';
import { InstallButton } from './InstallButton';
import { scrollToTop } from '../lib/utils';

interface HeaderProps {
  data: ResumeData;
  onOpenBlog: () => void;
}

export const Header: React.FC<HeaderProps> = ({ data, onOpenBlog }) => {
  const handleBlogClick = () => {
    onOpenBlog();
    scrollToTop();
  };

  return (
    <header className="mb-12 mt-2 sm:mt-4">
      {/* Top Status & Install Badge Bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Building AI & Cloud Infrastructure</span>
        </div>

        <InstallButton variant="full" />
      </div>

      {/* Main Title */}
      <div className="space-y-2 mb-6">
        <h1 className="text-4xl sm:text-6xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
          Hi, I'm {data.name}.
        </h1>
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
          <span>{data.fullName}</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-300">
            <MapPin size={14} className="text-indigo-500" />
            <span>United Kingdom</span>
          </span>
        </div>
      </div>

      {/* Subtitle / Role */}
      <p className="text-xl sm:text-2xl text-indigo-600 dark:text-indigo-400 font-semibold mb-4 tracking-tight">
        {data.title}
      </p>

      {/* Summary */}
      <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-3xl font-normal mb-8">
        {data.summary}
      </p>

      {/* Links & CTA Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <SocialLinks contact={data.contact} />

        <button
          type="button"
          onClick={handleBlogClick}
          className="inline-flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-sm transition-colors group cursor-pointer self-start sm:self-auto"
          aria-label="Read technical articles and notes"
        >
          <PenTool size={16} className="text-indigo-500" />
          <span>I write some stuff, read here</span>
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </header>
  );
};
