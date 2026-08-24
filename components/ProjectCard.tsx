import React from 'react';
import { ExternalLink, Github, Terminal, LayoutDashboard, Brain, Cpu, Smartphone, Bot, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import { cn } from '../lib/utils';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

function getProjectIcon(iconName: string) {
  if (iconName.startsWith('http')) {
    return (
      <img 
        src={iconName} 
        alt="" 
        loading="lazy"
        className="w-7 h-7 rounded-lg object-contain bg-white dark:bg-zinc-800 p-0.5" 
      />
    );
  }

  switch (iconName) {
    case 'dashboard':
      return <LayoutDashboard size={22} />;
    case 'brain':
      return <Brain size={22} />;
    case 'cpu':
      return <Cpu size={22} />;
    case 'mobile':
      return <Smartphone size={22} />;
    case 'bot':
      return <Bot size={22} />;
    default:
      return <Terminal size={22} />;
  }
}

function getStatusBadgeStyle(status: string): string {
  switch (status) {
    case 'Live':
    case 'Released':
      return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20';
    case 'Open Source':
      return 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20';
    case 'DSO':
      return 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20';
    case 'Agency':
      return 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20';
    default:
      return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
  }
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false }) => {
  if (featured) {
    return (
      <div className="bg-white dark:bg-zinc-900/90 rounded-3xl p-6 sm:p-7 border border-zinc-200/90 dark:border-zinc-800 shadow-sm hover:border-indigo-400/80 dark:hover:border-indigo-600/80 transition-colors group flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 group-hover:scale-105 transition-transform">
                {getProjectIcon(project.icon)}
              </div>
              <div>
                <h4 className="font-extrabold text-zinc-900 dark:text-zinc-50 text-lg sm:text-xl font-sans tracking-tight flex items-center gap-2">
                  <span>{project.title}</span>
                </h4>
                <span className={cn('text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border inline-block mt-0.5', getStatusBadgeStyle(project.status))}>
                  {project.status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                  className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Github size={16} />
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit live ${project.title}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs"
                >
                  <span>Launch</span>
                  <ArrowUpRight size={13} />
                </a>
              )}
            </div>
          </div>

          <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed mb-3">
            {project.description}
          </p>

          {project.highlightText && (
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800/80 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-4">
              💡 {project.highlightText}
            </div>
          )}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
          {project.tech.map((tech) => (
            <span
              key={`${project.title}-${tech}`}
              className="text-[11px] font-mono font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100/90 dark:bg-zinc-800/70 px-2.5 py-1 rounded-lg border border-zinc-200/60 dark:border-zinc-700/60"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Standard Card
  return (
    <a
      href={project.link || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:border-indigo-400/80 dark:hover:border-indigo-600/80 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500"
      aria-label={`${project.title} - ${project.description}`}
    >
      <div className="flex items-start gap-4">
        <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-xl shrink-0 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/60 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {getProjectIcon(project.icon)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1.5 truncate">
              <span>{project.title}</span>
              <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </h4>
            <span className={cn('text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shrink-0', getStatusBadgeStyle(project.status))}>
              {project.status}
            </span>
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 mt-1.5 text-xs sm:text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tech.map((tech) => (
              <span
                key={`${project.title}-${tech}`}
                className="text-[10px] font-mono font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/80 px-2 py-0.5 rounded-md border border-zinc-200/60 dark:border-zinc-700/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};
