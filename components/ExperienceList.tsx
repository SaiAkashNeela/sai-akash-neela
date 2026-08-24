import React from 'react';
import { Briefcase, Building2, CheckCircle2 } from 'lucide-react';
import { Job } from '../types';
import { Section } from './Section';

interface ExperienceListProps {
  experience: Job[];
}

export const ExperienceList: React.FC<ExperienceListProps> = ({ experience }) => {
  return (
    <Section title="Career & Ops Track Record" icon={<Briefcase size={20} />}>
      <div className="space-y-6">
        {experience.map((job, index) => {
          const isLast = index === experience.length - 1;
          const jobKey = `${job.company}-${job.role}`;

          return (
            <div 
              key={jobKey} 
              className="bg-white dark:bg-zinc-900/90 rounded-3xl p-6 sm:p-7 border border-zinc-200/90 dark:border-zinc-800 shadow-sm relative group"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h4 className="font-extrabold text-lg sm:text-xl text-zinc-900 dark:text-zinc-50 font-sans tracking-tight">
                    {job.role}
                  </h4>
                  <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold text-sm mt-0.5">
                    <Building2 size={14} />
                    <span>{job.company}</span>
                  </div>
                </div>

                {index === 0 && (
                  <span className="self-start sm:self-auto text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                    Current Role
                  </span>
                )}
              </div>

              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-4">
                {job.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                {job.highlights.map((highlight) => (
                  <div
                    key={`${job.company}-${highlight.slice(0, 32)}`}
                    className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm flex items-start leading-relaxed"
                  >
                    <CheckCircle2
                      size={14}
                      className="mr-2.5 mt-0.5 text-indigo-500 dark:text-indigo-400 shrink-0"
                    />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
