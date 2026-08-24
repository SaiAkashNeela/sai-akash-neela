import React, { useState, useMemo } from 'react';
import { Layers } from 'lucide-react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { Section } from './Section';
import { cn } from '../lib/utils';

interface ProjectsListProps {
  projects: Project[];
}

const CATEGORIES = ['All', 'Open Source', 'Live Apps', 'DSO & Agency'] as const;
type Category = typeof CATEGORIES[number];

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const featuredProjects = useMemo(() => projects.filter((p) => p.featured), [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    if (selectedCategory === 'Open Source') {
      return projects.filter((p) => p.status === 'Open Source');
    }
    if (selectedCategory === 'Live Apps') {
      return projects.filter((p) => p.status === 'Live');
    }
    if (selectedCategory === 'DSO & Agency') {
      return projects.filter((p) => p.status === 'DSO' || p.status === 'Agency');
    }
    return projects;
  }, [projects, selectedCategory]);

  return (
    <Section title="Featured Systems & Products" icon={<Layers size={20} />}>
      {/* Spotlight Bento for Flagship Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} featured={true} />
        ))}
      </div>

      {/* Directory Section Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pt-2">
        <h4 className="font-extrabold text-zinc-900 dark:text-zinc-100 text-sm font-mono uppercase tracking-wider">
          Complete Inventory ({filteredProjects.length})
        </h4>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer',
                selectedCategory === cat
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              )}
              aria-pressed={selectedCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} featured={false} />
        ))}
      </div>
    </Section>
  );
};
