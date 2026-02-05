import React from 'react';

interface ContactLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
}

export const ContactLink: React.FC<ContactLinkProps> = ({ href, icon, text }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 text-sm"
    >
      <span className="w-4 h-4 flex items-center justify-center">{icon}</span>
      <span>{text}</span>
    </a>
  );
};