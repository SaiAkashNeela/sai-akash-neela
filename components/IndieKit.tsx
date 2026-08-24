import React from 'react';
import { Package } from 'lucide-react';
import { Section } from './Section';

interface IndieKitProps {
  items: string[];
}

export const IndieKit: React.FC<IndieKitProps> = ({ items }) => {
  return (
    <Section title="My Indie Stack" icon={<Package size={20} />}>
      <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3.5">
          Battle-tested toolchain I reach for when shipping products fast:
        </p>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold rounded-xl border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
};
