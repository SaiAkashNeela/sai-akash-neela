import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Building2, CheckCircle2 } from 'lucide-react';
import { Job } from '../types';
import { cn } from '../lib/utils';

interface WorkSectionProps {
  experience: Job[];
}

export const WorkSection: React.FC<WorkSectionProps> = ({ experience }) => {
  const [openCompanies, setOpenCompanies] = useState<Record<string, boolean>>({
    Roxonn: true, // Default first item open
  });

  const toggleOpen = (company: string) => {
    setOpenCompanies((prev) => ({
      ...prev,
      [company]: !prev[company],
    }));
  };

  return (
    <section id="work" className="flex flex-col gap-y-5">
      <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        Work Experience
      </h2>

      <div className="flex flex-col gap-4">
        {experience.map((work) => {
          const isOpen = Boolean(openCompanies[work.company]);

          return (
            <div
              key={work.company}
              className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 bg-card hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleOpen(work.company)}
                className="w-full flex items-center justify-between text-left cursor-pointer group"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 pr-2">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 shadow-xs">
                    <Building2 size={18} className="text-zinc-600 dark:text-zinc-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 truncate">
                      <span>{work.company}</span>
                      {isOpen ? (
                        <ChevronDown size={14} className="text-zinc-400 shrink-0" />
                      ) : (
                        <ChevronRight size={14} className="text-zinc-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 truncate">
                      {work.role}
                    </div>
                  </div>
                </div>

                <div className="text-xs tabular-nums text-zinc-500 dark:text-zinc-400 text-right shrink-0">
                  {work.company === 'Roxonn' ? '2025 - Present' : '2022 - 2024'}
                </div>
              </button>

              {isOpen && (
                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 space-y-2.5 leading-relaxed">
                  <p>{work.description}</p>
                  <ul className="space-y-1.5 pt-1">
                    {work.highlights.map((h) => (
                      <li key={h.slice(0, 32)} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
