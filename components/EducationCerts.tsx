import React from 'react';
import { GraduationCap, Award, ExternalLink, BookOpen } from 'lucide-react';
import { EducationItem, Certification } from '../types';
import { Section } from './Section';

interface EducationCertsProps {
  education: EducationItem[];
  certifications: Certification[];
  publications: { title: string; source: string; id: string }[];
}

export const EducationCerts: React.FC<EducationCertsProps> = ({
  education,
  certifications,
  publications,
}) => {
  return (
    <div className="space-y-8">
      {/* Education */}
      <Section title="Education" icon={<GraduationCap size={20} />}>
        <div className="space-y-3">
          {education.map((edu) => (
            <div
              key={edu.institution}
              className="bg-white dark:bg-zinc-900/90 p-5 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 shadow-xs"
            >
              <h5 className="font-extrabold text-zinc-900 dark:text-zinc-50 text-sm sm:text-base font-sans">
                {edu.institution}
              </h5>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm mt-1 font-mono">
                {edu.degree}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Certifications & Research */}
      <Section title="Credentials & Research" icon={<Award size={20} />}>
        <div className="bg-white dark:bg-zinc-900/90 p-5 sm:p-6 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-6">
          {/* Certifications */}
          <div>
            <h5 className="text-[11px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
              Certifications
            </h5>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.name} className="flex flex-col">
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm font-sans">
                    {cert.name}
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400 text-[11px] font-mono">
                    {cert.issuer}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Publications */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h5 className="text-[11px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
              IEEE Publications
            </h5>
            {publications.map((pub) => (
              <div key={pub.title} className="flex flex-col gap-1.5">
                <p className="font-bold text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm font-sans">
                  {pub.title}
                </p>
                <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                  <span>{pub.source}</span>
                  <a
                    href="https://ieeexplore.ieee.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                    aria-label={`Read ${pub.title} on IEEE Xplore`}
                  >
                    <span>IEEE Paper</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};
