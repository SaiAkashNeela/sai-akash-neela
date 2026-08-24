import React from 'react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <section id="projects" className="flex flex-col gap-y-8">
      {/* Centered Section Header */}
      <div className="flex flex-col items-center justify-center text-center gap-3">
        <div className="border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-xl px-4 py-1 text-xs font-semibold">
          My Projects
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-zinc-900 dark:text-zinc-100">
          Check out my latest work
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed">
          I've worked on a variety of products, from native desktop tools with Tauri & Rust to cloud-scale APIs. Here are a few of my favorites.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};
