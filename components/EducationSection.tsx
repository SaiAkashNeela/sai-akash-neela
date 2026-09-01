import React from 'react';
import { GraduationCap } from 'lucide-react';
import { EducationItem } from '../types';

interface EducationSectionProps {
  education: EducationItem[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  return (
    <section id="education" className="flex flex-col gap-y-5">
      <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        Education
      </h2>

      <div className="flex flex-col gap-3">
        {education.map((edu) => (
          <div
            key={edu.institution}
            className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 bg-card flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 shadow-xs">
                <GraduationCap size={18} className="text-zinc-600 dark:text-zinc-400" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 truncate">
                  {edu.institution}
                </div>
                <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 truncate">
                  {edu.degree}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
