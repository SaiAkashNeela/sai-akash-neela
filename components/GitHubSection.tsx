import React, { useState, useMemo } from 'react';
import { Github, Activity, Flame, ExternalLink, GitCommit } from 'lucide-react';
import { Contribution } from '../types';
import { formatContributionDate, cn } from '../lib/utils';

interface GitHubSectionProps {
  data: Contribution[];
  isLoading?: boolean;
}

function getContributionColor(count: number): string {
  if (count === 0) {
    return 'bg-zinc-100 dark:bg-zinc-800/80 border-zinc-200/50 dark:border-zinc-700/40';
  }
  if (count <= 2) {
    return 'bg-emerald-200 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-800';
  }
  if (count <= 4) {
    return 'bg-emerald-400 dark:bg-emerald-700 border-emerald-500 dark:border-emerald-600';
  }
  if (count <= 6) {
    return 'bg-emerald-500 dark:bg-emerald-500 border-emerald-600 dark:border-emerald-400';
  }
  return 'bg-emerald-600 dark:bg-emerald-400 border-emerald-700 dark:border-emerald-300';
}

interface WeekGroup {
  id: string;
  days: (Contribution | null)[];
}

function processContributionData(data: Contribution[]): WeekGroup[] {
  if (!data || data.length === 0) return [];
  
  const rawData = [...data];
  const firstDate = new Date(rawData[0].date);
  const startDay = firstDate.getDay();
  
  const padding: (Contribution | null)[] = Array(startDay).fill(null);
  const alignedData: (Contribution | null)[] = [...padding, ...rawData];
  
  const weeks: WeekGroup[] = [];
  let currentWeek: (Contribution | null)[] = [];
  let weekIndex = 0;
  
  for (const item of alignedData) {
    currentWeek.push(item);
    if (currentWeek.length === 7) {
      const firstValidDay = currentWeek.find((d): d is Contribution => d !== null);
      const weekId = firstValidDay ? `wk-${firstValidDay.date}` : `wk-pad-${weekIndex}`;
      weeks.push({ id: weekId, days: currentWeek });
      currentWeek = [];
      weekIndex++;
    }
  }
  if (currentWeek.length > 0) {
    const firstValidDay = currentWeek.find((d): d is Contribution => d !== null);
    const weekId = firstValidDay ? `wk-${firstValidDay.date}` : `wk-pad-${weekIndex}`;
    weeks.push({ id: weekId, days: currentWeek });
  }
  
  return weeks;
}

export const GitHubSection: React.FC<GitHubSectionProps> = ({ data, isLoading = false }) => {
  const [hoveredNode, setHoveredNode] = useState<{
    count: number;
    date: string;
    x: number;
    y: number;
  } | null>(null);

  const weeks = useMemo(() => processContributionData(data), [data]);

  const stats = useMemo(() => {
    let total = 0;
    let max = 0;
    let activeDays = 0;

    data.forEach((d) => {
      total += d.count;
      if (d.count > max) max = d.count;
      if (d.count > 0) activeDays++;
    });

    return { total, max, activeDays };
  }, [data]);

  const monthLabels = useMemo(() => {
    const labels: { key: string; label: string; weekId: string }[] = [];
    let lastMonth = -1;

    weeks.forEach((week) => {
      const firstDay = week.days.find((d): d is Contribution => d !== null);
      if (firstDay) {
        const d = new Date(firstDay.date);
        const month = d.getMonth();
        if (month !== lastMonth) {
          labels.push({
            key: `month-${firstDay.date}`,
            label: d.toLocaleString('default', { month: 'short' }),
            weekId: week.id,
          });
          lastMonth = month;
        }
      }
    });
    return labels;
  }, [weeks]);

  return (
    <section id="github" className="flex flex-col gap-4">
      {/* Header and Telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span>GitHub Activity</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            {isLoading ? 'Fetching commits...' : `${stats.total} contributions in the last 6 months`}
          </p>
        </div>

        <a
          href="https://github.com/saiakashneela"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors self-start sm:self-auto"
          aria-label="View Sai Akash on GitHub"
        >
          <Github size={13} />
          <span>github.com/saiakashneela</span>
          <ExternalLink size={11} className="text-zinc-400" />
        </a>
      </div>

      {/* Main Container */}
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 bg-card relative shadow-xs">
        {/* Heatmap Grid */}
        <div 
          className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800"
          tabIndex={0}
          role="region"
          aria-label="GitHub contribution activity grid"
        >
          {/* Month Labels */}
          <div className="flex relative mb-2 h-4 text-[10px] font-medium text-zinc-400 dark:text-zinc-500 select-none">
            <div className="flex gap-[3px]">
              {weeks.map((week) => {
                const labelObj = monthLabels.find((m) => m.weekId === week.id);
                return (
                  <div key={week.id} className="w-3 relative overflow-visible">
                    {labelObj && (
                      <span className="absolute left-0 top-0 whitespace-nowrap">
                        {labelObj.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity cells */}
          <div className="flex gap-[3px]">
            {weeks.map((week) => (
              <div key={week.id} className="flex flex-col gap-[3px]">
                {week.days.map((day, dIndex) => {
                  if (!day) {
                    return (
                      <div 
                        key={`empty-${week.id}-${dIndex}`} 
                        className="w-3 h-3 bg-transparent shrink-0" 
                      />
                    );
                  }

                  return (
                    <button
                      key={day.date}
                      type="button"
                      aria-label={`${day.count} contributions on ${day.date}`}
                      className={cn(
                        'w-3 h-3 rounded-[2px] border transition-transform duration-75 cursor-pointer shrink-0 p-0',
                        getContributionColor(day.count),
                        'hover:scale-125 focus-visible:scale-125'
                      )}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredNode({
                          count: day.count,
                          date: day.date,
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                        });
                      }}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredNode({
                          count: day.count,
                          date: day.date,
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                        });
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Floating Tooltip */}
        {hoveredNode && (
          <div
            className="fixed z-50 px-3 py-1.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full mt-[-8px] border border-zinc-700/50 dark:border-zinc-200"
            style={{
              left: hoveredNode.x,
              top: hoveredNode.y,
            }}
          >
            <div className="whitespace-nowrap">
              {hoveredNode.count} contributions on {formatContributionDate(hoveredNode.date)}
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-white" />
          </div>
        )}

        {/* Footer info & legend */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 text-[11px] text-zinc-500 dark:text-zinc-400">
          <span className="sm:inline hidden font-medium">Real-time commit telemetry</span>
          <span className="sm:hidden inline font-medium">← Swipe to view history</span>
          <div className="flex items-center gap-1.5">
            <span>Less</span>
            <div className="flex gap-[2px]">
              <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-200 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400 dark:bg-emerald-700 border border-emerald-500 dark:border-emerald-600" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600 dark:bg-emerald-400 border border-emerald-700 dark:border-emerald-300" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
};
