import React, { useState } from 'react';
import { Download, RefreshCw, CheckCircle2, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { cn } from '../lib/utils';

interface InstallButtonProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const InstallButton: React.FC<InstallButtonProps> = ({ className = '', variant = 'compact' }) => {
  const { status, hasUpdate, isInstalled, isInstalling, installApp, updateApp } = usePWAInstall();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      setFeedback('App installed!');
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const handleUpdate = () => {
    setFeedback('Updating application...');
    setTimeout(() => {
      updateApp();
    }, 500);
  };

  if (hasUpdate) {
    return (
      <button
        type="button"
        onClick={handleUpdate}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 transition-colors cursor-pointer animate-pulse-subtle',
          className
        )}
        aria-label="New update available. Click to refresh the app."
        title="Update available - click to reload"
      >
        <RefreshCw size={14} className="animate-spin text-amber-500" />
        <span>Update Available</span>
      </button>
    );
  }

  if (status === 'installable') {
    return (
      <button
        type="button"
        onClick={handleInstall}
        disabled={isInstalling}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors cursor-pointer',
          className
        )}
        aria-label="Install portfolio as a native app on your device"
        title="Install as Progressive Web App"
      >
        <Download size={14} className={isInstalling ? 'animate-bounce' : ''} />
        <span>{isInstalling ? 'Installing...' : 'Install App'}</span>
      </button>
    );
  }

  if (isInstalled) {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700',
          className
        )}
        title="Running as installed web app"
      >
        <CheckCircle2 size={14} className="text-emerald-500 dark:text-emerald-400" />
        <span>{variant === 'full' ? 'Installed App' : 'Installed'}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-zinc-100/80 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-800',
        className
      )}
      title="PWA Ready · Fast & Offline Capable"
    >
      <Smartphone size={12} className="text-zinc-400 dark:text-zinc-500" />
      <span>{feedback || 'PWA Ready'}</span>
    </div>
  );
};
