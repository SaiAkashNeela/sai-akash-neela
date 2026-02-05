import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children, className = "", icon }) => {
  return (
    <div className={`mb-10 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        {icon && <span className="text-indigo-500 dark:text-indigo-400">{icon}</span>}
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          {title}
        </h3>
      </div>
      <div className="text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
};