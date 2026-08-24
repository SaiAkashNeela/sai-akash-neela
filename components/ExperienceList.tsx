import React from 'react';
import { Briefcase, Cloud, CheckCircle2 } from 'lucide-react';
import { Job } from '../types';
import { Section } from './Section';

interface ExperienceListProps {
  experience: Job[];
}

export const ExperienceList: React.FC<ExperienceListProps> = ({ experience }) => {
  return (
    <Section title="Where I've Worked" icon={<Briefcase size={20} />}>
      <div className="space-y-8">
        {experience.map((job, index) => {
          const isLast = index === experience.length - 1;
          const jobKey = `${job.company}-${job.role}`;

          return (
            <div key={jobKey} className="flex gap-4 sm:gap-6 group">
              {/* Timeline pillar for desktop/tablet */}
              <div className="hidden sm:flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center text-zinc-400 group-hover:border-indigo-300 dark:group-hover:border-indigo-700 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  <Cloud size={18} />
                </div>
                {!isLast && (
                  <div className="w-px flex-1 bg-zinc-200 dark:bg-zinc-800 my-2" />
                )}
              </div>

              {/* Job Details Card */}
              <div className="flex-1 bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h4 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
                    {job.role}
                  </h4>
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    {job.company}
                  </span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                  {job.description}
                </p>

                <ul className="space-y-2">
                  {job.highlights.map((highlight) => (
                    <li
                      key={`${job.company}-${highlight.slice(0, 24)}`}
                      className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm flex items-start leading-relaxed"
                    >
                      <CheckCircle2
                        size={14}
                        className="mr-2.5 mt-0.5 text-indigo-500 dark:text-indigo-400 shrink-0"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
