import React from 'react';
import { Sparkles, MapPin, Download, ArrowUpRight, Check, Copy } from 'lucide-react';
import { ResumeData } from '../types';
import { SocialLinks } from './SocialLinks';
import { InstallButton } from './InstallButton';
import { cn } from '../lib/utils';

interface HeaderProps {
  data: ResumeData;
  activeTab: 'all' | 'projects' | 'experience' | 'blog';
  onSelectTab: (tab: 'all' | 'projects' | 'experience' | 'blog') => void;
}

export const Header: React.FC<HeaderProps> = ({ data, activeTab, onSelectTab }) => {
  return (
    <header className="mb-10 pt-2 sm:pt-4">
      {/* Top Telemetry & Status Strip */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-8 pb-4 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-beacon" />
          <span className="font-mono text-[11px] tracking-tight">Available for AI & Cloud Ops roles</span>
        </div>

        <InstallButton variant="full" />
      </div>

      {/* Main Identity Grid */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
              {data.fullName}
            </h1>
            <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700">
              @TheSaiAkash
            </span>
          </div>

          <p className="text-lg sm:text-xl font-semibold text-indigo-600 dark:text-indigo-400 tracking-tight">
            {data.title}
          </p>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
            {data.summary}
          </p>
        </div>

        {/* Location & Quick Spec Card */}
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 shadow-xs md:w-64 shrink-0 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-mono">Location</span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
              <MapPin size={12} className="text-indigo-500" />
              United Kingdom
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-mono">Focus</span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">AI Ops · Cloud · Rust</span>
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-mono">Flagship</span>
            <a 
              href="https://bucketstack.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
            >
              BucketStack <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      </div>

      {/* Social & Contact Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 mb-8">
        <SocialLinks contact={data.contact} />
      </div>

      {/* Navigation View Switcher Tabs */}
      <nav 
        className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 overflow-x-auto scrollbar-none"
        aria-label="Portfolio sections"
      >
        <button
          type="button"
          onClick={() => onSelectTab('all')}
          className={cn(
            'px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer',
            activeTab === 'all'
              ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs border border-zinc-200/60 dark:border-zinc-700'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
          )}
          aria-pressed={activeTab === 'all'}
        >
          Overview
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('projects')}
          className={cn(
            'px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer',
            activeTab === 'projects'
              ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs border border-zinc-200/60 dark:border-zinc-700'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
          )}
          aria-pressed={activeTab === 'projects'}
        >
          Projects ({data.projects.length})
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('experience')}
          className={cn(
            'px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer',
            activeTab === 'experience'
              ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs border border-zinc-200/60 dark:border-zinc-700'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
          )}
          aria-pressed={activeTab === 'experience'}
        >
          Experience ({data.experience.length})
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('blog')}
          className={cn(
            'px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer',
            activeTab === 'blog'
              ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs border border-zinc-200/60 dark:border-zinc-700'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
          )}
          aria-pressed={activeTab === 'blog'}
        >
          Writing ({data.blogPosts.length})
        </button>
      </nav>
    </header>
  );
};
