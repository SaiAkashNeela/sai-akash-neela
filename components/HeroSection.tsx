import React from 'react';
import { ResumeData } from '../types';

interface HeroSectionProps {
  data: ResumeData;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  return (
    <section id="hero" className="w-full">
      <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-8">
        <div className="flex-1 flex flex-col gap-3 text-center sm:text-left">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 whitespace-nowrap">
            Hi, I'm {data.fullName} 👋
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-[600px] leading-relaxed">
            AI & Cloud Operations Engineer who builds scalable cloud systems, native apps with Tauri & Rust, and automates real-world workflows.
          </p>
        </div>

        {/* Avatar */}
        <div className="shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-zinc-200 dark:border-zinc-800 shadow-lg ring-4 ring-zinc-100 dark:ring-zinc-900 overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-2xl text-zinc-600 dark:text-zinc-300">
            <img
              src="https://github.com/saiakashneela.png"
              alt={data.fullName}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to initials if image fails
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            <span className="select-none">SAN</span>
          </div>
        </div>
      </div>
    </section>
  );
};
