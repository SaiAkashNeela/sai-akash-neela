import React from 'react';

interface AboutSectionProps {
  summary: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ summary }) => {
  return (
    <section id="about" className="flex flex-col gap-3">
      <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        About
      </h2>
      <div className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-3 font-normal">
        <p>
          I'm an AI & DevOps Engineer passionate about designing and deploying intelligent systems that solve real‑world problems. I heavily leverage AI to build high-performance mobile, desktop, and web applications faster and better.
        </p>
        <p>
          Experienced in developing and deploying scalable AI and cloud systems, building REST APIs, data models, and React frontends, I specialize in integrating RAG pipelines, MCP servers, and automation tools to support real operational workflows.
        </p>
      </div>
    </section>
  );
};
