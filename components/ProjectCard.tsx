import React from 'react';
import { ExternalLink, Terminal, LayoutDashboard, Brain, Cpu, Smartphone, Bot } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

function getProjectIcon(iconName: string) {
  if (iconName.startsWith('http')) {
    return (
      <img 
        src={iconName} 
        alt="" 
        loading="lazy"
        className="w-6 h-6 rounded-md object-contain" 
      />
    );
  }

  switch (iconName) {
    case 'dashboard':
      return <LayoutDashboard size={20} />;
    case 'brain':
      return <Brain size={20} />;
    case 'cpu':
      return <Cpu size={20} />;
    case 'mobile':
      return <Smartphone size={20} />;
    case 'bot':
      return <Bot size={20} />;
    default:
      return <Terminal size={20} />;
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

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <a
      href={project.link || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:shadow-md transition-colors transition-shadow focus-visible:ring-2 focus-visible:ring-indigo-500"
      aria-label={`${project.title} - ${project.description}`}
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Icon */}
        <div className="p-3 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-xl shrink-0 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors">
          {getProjectIcon(project.icon)}
        </div>

        {/* Content */}
        <div className="flex-1 w-full min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base sm:text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1.5 truncate">
              <span>{project.title}</span>
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </h4>
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${getStatusBadgeStyle(
                project.status
              )}`}
            >
              {project.status}
            </span>
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {project.tech.map((tech) => (
              <span
                key={`${project.title}-${tech}`}
                className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100/90 dark:bg-zinc-800/80 px-2 py-0.5 rounded-md border border-zinc-200/70 dark:border-zinc-700/60"
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
