import React from 'react';
import { ArrowLeft, ExternalLink, Calendar, Clock, BookOpen } from 'lucide-react';
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
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-40 bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur-md py-4 mb-8 border-b border-zinc-200/60 dark:border-zinc-800/60 -mx-4 px-4 sm:mx-0 sm:px-0 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-bold text-sm transition-colors cursor-pointer"
          aria-label="Back to overview"
        >
          <ArrowLeft size={18} />
          <span>Back to Overview</span>
        </button>

        <span className="text-xs font-mono font-semibold text-zinc-400 dark:text-zinc-500">
          {posts.length} Technical Essays
        </span>
      </div>

      <header className="mb-12">
        <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight mb-3 font-sans">
          Engineering Journal & Notes
        </h2>
        <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed">
          Deep dives on building native apps with Tauri & Rust, orchestrating autonomous AI agents, and simplifying cloud infrastructure.
        </p>
      </header>

      {/* Posts */}
      <div className="space-y-12">
        {posts.map((post) => (
          <article 
            key={post.title} 
            className="bg-white dark:bg-zinc-900/90 rounded-3xl p-6 sm:p-8 border border-zinc-200/90 dark:border-zinc-800 shadow-sm"
          >
            <div className="flex items-center gap-3 text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400 mb-3">
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-indigo-500" />
                <span>{post.date}</span>
              </span>
              {post.readTime && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-indigo-500" />
                    <span>{post.readTime}</span>
                  </span>
                </>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 mb-4 leading-snug tracking-tight font-sans">
              {post.title}
            </h3>

            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="w-full h-56 sm:h-80 object-cover rounded-2xl mb-6 border border-zinc-200/80 dark:border-zinc-800 shadow-xs"
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
                  className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline font-bold text-sm"
                >
                  <span>{post.externalLink.text}</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            )}
          </article>
        ))}
      </div>

      <footer className="mt-16 text-center text-sm font-mono text-zinc-400 dark:text-zinc-500">
        <p>— End of journal entries —</p>
      </footer>
    </div>
  );
};
