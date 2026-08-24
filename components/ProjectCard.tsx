import React, { useState } from 'react';
import { Globe, Github, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-col h-full border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-card hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
      {/* Top Banner / Image Area */}
      <div className="relative shrink-0 w-full h-44 bg-zinc-100 dark:bg-zinc-800/80 overflow-hidden flex items-center justify-center">
        {project.icon && !imageError ? (
          <div className="flex flex-col items-center justify-center p-6 text-center gap-2">
            <img
              src={project.icon}
              alt=""
              className="w-12 h-12 rounded-xl object-contain shadow-sm bg-white dark:bg-zinc-900 p-1 border border-zinc-200/60 dark:border-zinc-700/60"
              onError={() => setImageError(true)}
            />
            <span className="text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400">
              {project.title}
            </span>
          </div>
        ) : (
          <div className="text-sm font-mono font-bold text-zinc-400 dark:text-zinc-500">
            {project.title}
          </div>
        )}

        {/* Status Badge in Corner */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/80 text-white dark:bg-white/90 dark:text-black backdrop-blur-md">
            {project.status}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
              <span>{project.title}</span>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title}`}
                  className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  <ArrowUpRight size={14} />
                </a>
              )}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            {project.description}
          </p>
        </div>

        {/* Bottom tags and actions */}
        <div className="space-y-3 pt-2">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1">
            {project.tech.map((tag) => (
              <span
                key={`${project.title}-${tag}`}
                className="text-[10px] font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300 rounded px-1.5 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-2 pt-1">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 transition-opacity"
              >
                <Globe size={11} />
                <span>Website</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                <Github size={11} />
                <span>Source</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
