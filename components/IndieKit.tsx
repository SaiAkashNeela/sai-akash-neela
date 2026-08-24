import React from 'react';
import { Package, Terminal } from 'lucide-react';
import { Section } from './Section';

interface IndieKitProps {
  items: string[];
}

export const IndieKit: React.FC<IndieKitProps> = ({ items }) => {
  return (
    <Section title="Indie Stack" icon={<Package size={20} />}>
      <div className="bg-white dark:bg-zinc-900/90 rounded-3xl p-5 sm:p-6 border border-zinc-200/90 dark:border-zinc-800 shadow-xs">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mb-4">
          Core technologies used to build & ship standalone products:
        </p>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-mono font-semibold rounded-xl border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
};
