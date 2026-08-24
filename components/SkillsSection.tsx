import React from 'react';

interface SkillsSectionProps {
  skills: Record<string, string[]>;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  // Flatten unique skills
  const allSkills = Array.from(new Set(Object.values(skills).flat()));

  return (
    <section id="skills" className="flex flex-col gap-y-4">
      <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        Skills
      </h2>

      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {allSkills.map((skill) => (
          <div
            key={skill}
            className="border bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-800 dark:border-zinc-200 rounded-lg px-3 py-1 text-xs sm:text-sm font-medium tracking-tight shadow-xs hover:opacity-90 transition-opacity cursor-default"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
};
