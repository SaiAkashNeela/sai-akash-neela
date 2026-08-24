import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { BlogPost } from '../types';

interface WritingSectionProps {
  posts: BlogPost[];
}

export const WritingSection: React.FC<WritingSectionProps> = ({ posts }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="writing" className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Writing & Notes
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Articles on cloud infrastructure, native desktop tools, and AI agent automation.
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={post.title}
              className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 bg-card hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                  <span>{post.date}</span>
                  {post.readTime && (
                    <>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => toggleExpand(idx)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer self-start sm:self-auto"
                  aria-expanded={isExpanded}
                >
                  <span>{isExpanded ? 'Collapse' : 'Read Article'}</span>
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              <h3 className="font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                {post.title}
              </h3>

              {!isExpanded ? (
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {post.content}
                </p>
              ) : (
                <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 space-y-3 leading-relaxed whitespace-pre-line">
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-48 sm:h-64 object-cover rounded-lg border border-zinc-200 dark:border-zinc-800"
                    />
                  )}
                  <div>{post.content}</div>

                  {post.externalLink && (
                    <div className="pt-2">
                      <a
                        href={post.externalLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline font-semibold text-xs"
                      >
                        <span>{post.externalLink.text}</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
