import React from 'react';
import { ArrowLeft, ExternalLink, BookOpen, Calendar, Clock } from 'lucide-react';
import { BlogPost } from '../types';
import { scrollToTop } from '../lib/utils';

interface BlogViewProps {
  posts: BlogPost[];
  onBack: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ posts, onBack }) => {
  const handleBack = () => {
    onBack();
    scrollToTop();
  };

  return (
    <div className="max-w-3xl mx-auto py-2">
      {/* Sticky Header with Back Navigation */}
      <div className="sticky top-0 z-40 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md py-4 mb-8 border-b border-zinc-200/60 dark:border-zinc-800/60 -mx-4 px-4 sm:mx-0 sm:px-0 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold text-sm transition-colors cursor-pointer"
          aria-label="Back to main portfolio profile"
        >
          <ArrowLeft size={18} />
          <span>Back to Profile</span>
        </button>

        <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
          {posts.length} Essays & Notes
        </span>
      </div>

      <header className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">
          Technical Writing & Notes
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
          Lessons learned building indie products, automating cloud infra, and integrating AI agents.
        </p>
      </header>

      {/* Posts list */}
      <div className="space-y-16">
        {posts.map((post, index) => {
          const isLast = index === posts.length - 1;

          return (
            <article 
              key={post.title} 
              className="group bg-white dark:bg-zinc-900/80 rounded-2xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-xs"
            >
              <div className="flex items-center gap-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  <span>{post.date}</span>
                </span>
              </div>

              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                {post.title}
              </h3>

              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-56 sm:h-72 object-cover rounded-xl mb-6 border border-zinc-200 dark:border-zinc-800 shadow-sm"
                />
              )}

              <div className="text-zinc-700 dark:text-zinc-300 text-base sm:text-lg leading-relaxed whitespace-pre-line font-normal">
                {post.content}
              </div>

              {post.externalLink && (
                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <a
                    href={post.externalLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold text-sm transition-colors"
                  >
                    <span>{post.externalLink.text}</span>
                    <ExternalLink size={15} />
                  </a>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <footer className="mt-16 text-center text-sm text-zinc-400 dark:text-zinc-500">
        <p>You've caught up with all current writing.</p>
      </footer>
    </div>
  );
};
