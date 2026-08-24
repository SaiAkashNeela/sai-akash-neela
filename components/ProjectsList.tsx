import React, { useState, useMemo } from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { Section } from './Section';

interface ProjectsListProps {
  projects: Project[];
}

const CATEGORIES = ['All', 'Open Source', 'Live', 'DSO / Agency'] as const;
type Category = typeof CATEGORIES[number];

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    if (selectedCategory === 'Open Source') {
      return projects.filter((p) => p.status === 'Open Source');
    }
    if (selectedCategory === 'Live') {
      return projects.filter((p) => p.status === 'Live' || p.status === 'Released');
    }
    if (selectedCategory === 'DSO / Agency') {
      return projects.filter((p) => p.status === 'DSO' || p.status === 'Agency');
    }
    return projects;
  }, [projects, selectedCategory]);

  return (
    <Section title="What I'm Building (and built!)" icon={<Zap size={20} />}>
      {/* Category filter pills for fast scanning on mobile & desktop */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
            aria-pressed={selectedCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
};
