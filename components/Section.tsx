import React from 'react';
import { cn } from '../lib/utils';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children, className = '', icon }) => {
  return (
    <section className={cn('mb-10', className)}>
      <div className="flex items-center gap-2.5 mb-4">
        {icon && <span className="text-indigo-600 dark:text-indigo-400">{icon}</span>}
        <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          {title}
        </h3>
      </div>
      <div className="text-zinc-700 dark:text-zinc-300">
        {children}
      </div>
    </section>
  );
};
