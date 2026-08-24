import React from 'react';
import { Code2, Server, Cpu, Layers } from 'lucide-react';
import { Section } from './Section';

interface SkillsSectionProps {
  skills: Record<string, string[]>;
}

function getCategoryIcon(category: string) {
  if (category.toLowerCase().includes('cloud')) return <Server size={15} />;
  if (category.toLowerCase().includes('ops') || category.toLowerCase().includes('ai')) return <Cpu size={15} />;
  if (category.toLowerCase().includes('app')) return <Code2 size={15} />;
  return <Layers size={15} />;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <Section title="Technical Toolkit" icon={<Code2 size={20} />}>
      <div className="space-y-4">
        {Object.entries(skills).map(([category, items]) => (
          <div
            key={category}
            className="bg-white dark:bg-zinc-900/90 p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm"
          >
            <h5 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2 text-xs uppercase tracking-wider">
              <span className="text-indigo-500 dark:text-indigo-400">{getCategoryIcon(category)}</span>
              <span>{category}</span>
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {items.map((skill) => (
                <span
                  key={`${category}-${skill}`}
                  className="px-2.5 py-1 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-xs font-medium rounded-lg border border-zinc-200/60 dark:border-zinc-700/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
