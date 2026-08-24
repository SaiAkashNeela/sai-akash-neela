import React, { useState, useMemo } from 'react';
import { Github, Activity, Flame, TrendingUp, ExternalLink } from 'lucide-react';
import { Contribution } from '../types';
import { formatContributionDate, cn } from '../lib/utils';

interface ContributionGraphProps {
  data: Contribution[];
  isLoading?: boolean;
}

function getContributionColor(count: number): string {
  if (count === 0) {
    return 'bg-zinc-100 dark:bg-zinc-800/60 border-zinc-200/50 dark:border-zinc-700/30';
  }
  if (count <= 2) {
    return 'bg-indigo-300 dark:bg-indigo-900/60 border-indigo-400 dark:border-indigo-800/70';
  }
  if (count <= 4) {
    return 'bg-indigo-400 dark:bg-indigo-700 border-indigo-500 dark:border-indigo-600';
  }
  if (count <= 6) {
    return 'bg-indigo-500 dark:bg-indigo-500 border-indigo-600 dark:border-indigo-400';
  }
  return 'bg-indigo-600 dark:bg-indigo-400 border-indigo-700 dark:border-indigo-300';
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

export const ContributionGraph: React.FC<ContributionGraphProps> = ({ data, isLoading = false }) => {
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
    let currentStreak = 0;
    let tempStreak = 0;

    data.forEach((d) => {
      total += d.count;
      if (d.count > max) max = d.count;
      if (d.count > 0) {
        activeDays++;
        tempStreak++;
        if (tempStreak > currentStreak) currentStreak = tempStreak;
      } else {
        tempStreak = 0;
      }
    });

    return { total, max, activeDays, currentStreak };
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
    <div className="bg-white dark:bg-zinc-900/90 rounded-3xl p-5 sm:p-7 border border-zinc-200/90 dark:border-zinc-800 shadow-sm relative transition-colors duration-150 mb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200/80 dark:border-zinc-700">
            <Github size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-zinc-900 dark:text-zinc-50 text-base sm:text-lg tracking-tight font-sans">
                Open Source & Git Telemetry
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                Live
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
              Public commits & code reviews on GitHub
            </p>
          </div>
        </div>

        <a
          href="https://github.com/saiakashneela"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors self-start sm:self-auto"
          aria-label="View Sai Akash on GitHub"
        >
          <span>github.com/saiakashneela</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* 4-Stat Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3.5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-1">
            <Activity size={13} className="text-indigo-500" />
            <span>Total Commits</span>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-zinc-900 dark:text-zinc-50 tabular-nums">
            {isLoading ? '—' : stats.total}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-1">
            <Flame size={13} className="text-amber-500" />
            <span>Active Days</span>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400 tabular-nums">
            {isLoading ? '—' : `${stats.activeDays}d`}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-1">
            <TrendingUp size={13} className="text-emerald-500" />
            <span>Peak Rate</span>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            {isLoading ? '—' : `${stats.max}/day`}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-1">
            <Activity size={13} className="text-sky-500" />
            <span>Timeline</span>
          </div>
          <div className="text-sm font-bold font-mono text-zinc-800 dark:text-zinc-200 pt-1">
            Last 6 Months
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="relative">
        <div 
          className="w-full overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 scrollbar-track-transparent"
          tabIndex={0}
          role="region"
          aria-label="GitHub contribution activity grid"
        >
          {/* Month Labels */}
          <div className="flex relative mb-2 h-4 text-[10px] font-mono font-semibold text-zinc-400 dark:text-zinc-500 select-none">
            <div className="flex gap-[3.5px]">
              {weeks.map((week) => {
                const labelObj = monthLabels.find((m) => m.weekId === week.id);
                return (
                  <div key={week.id} className="w-3.5 relative overflow-visible">
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
          <div className="flex gap-[3.5px]">
            {weeks.map((week) => (
              <div key={week.id} className="flex flex-col gap-[3.5px]">
                {week.days.map((day, dIndex) => {
                  if (!day) {
                    return (
                      <div 
                        key={`empty-${week.id}-${dIndex}`} 
                        className="w-3.5 h-3.5 bg-transparent shrink-0" 
                      />
                    );
                  }

                  return (
                    <button
                      key={day.date}
                      type="button"
                      aria-label={`${day.count} contributions on ${day.date}`}
                      className={cn(
                        'w-3.5 h-3.5 rounded-[3px] border transition-transform duration-75 cursor-pointer shrink-0 p-0',
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

        {/* Swipe hint on mobile */}
        <div className="sm:hidden flex items-center justify-between mt-2 text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
          <span>← Swipe horizontally to explore full 180-day timeline</span>
        </div>
      </div>

      {/* Floating Tooltip */}
      {hoveredNode && (
        <div
          className="fixed z-50 px-3 py-1.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-mono font-semibold rounded-xl shadow-2xl pointer-events-none transform -translate-x-1/2 -translate-y-full mt-[-8px] border border-zinc-700/50 dark:border-zinc-200"
          style={{
            left: hoveredNode.x,
            top: hoveredNode.y,
          }}
        >
          <div className="whitespace-nowrap">
            {hoveredNode.count} commits on {formatContributionDate(hoveredNode.date)}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-white" />
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
        <span>GitHub API Sync</span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className="flex gap-[2px]">
            <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/50 dark:border-zinc-700/30" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-indigo-300 dark:bg-indigo-900/60 border border-indigo-400 dark:border-indigo-800/70" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-indigo-400 dark:bg-indigo-700 border border-indigo-500 dark:border-indigo-600" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-indigo-600 dark:bg-indigo-400 border border-indigo-700 dark:border-indigo-300" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
