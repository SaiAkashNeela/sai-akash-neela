import React, { useState, useMemo } from 'react';
import { Github, Activity, Calendar, ExternalLink } from 'lucide-react';
import { Contribution } from '../types';
import { formatContributionDate } from '../lib/utils';

interface ContributionGraphProps {
  data: Contribution[];
  isLoading?: boolean;
}

// Module scope pure helper functions (fixes react-doctor/prefer-module-scope-pure-function)
function getContributionColor(count: number): string {
  if (count === 0) {
    return 'bg-zinc-100 dark:bg-zinc-800/70 border-zinc-200/60 dark:border-zinc-700/40';
  }
  if (count <= 2) {
    return 'bg-indigo-200 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-800/60';
  }
  if (count <= 4) {
    return 'bg-indigo-400 dark:bg-indigo-700 border-indigo-500 dark:border-indigo-600';
  }
  if (count <= 6) {
    return 'bg-indigo-500 dark:bg-indigo-600 border-indigo-600 dark:border-indigo-500';
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
  const startDay = firstDate.getDay(); // 0 is Sunday
  
  // Pad the first week if necessary
  const padding: (Contribution | null)[] = Array(startDay).fill(null);
  const alignedData: (Contribution | null)[] = [...padding, ...rawData];
  
  const weeks: WeekGroup[] = [];
  let currentWeek: (Contribution | null)[] = [];
  let weekIndex = 0;
  
  for (const item of alignedData) {
    currentWeek.push(item);
    if (currentWeek.length === 7) {
      const firstValidDay = currentWeek.find((d): d is Contribution => d !== null);
      const weekId = firstValidDay ? `week-${firstValidDay.date}` : `week-pad-${weekIndex}`;
      weeks.push({ id: weekId, days: currentWeek });
      currentWeek = [];
      weekIndex++;
    }
  }
  if (currentWeek.length > 0) {
    const firstValidDay = currentWeek.find((d): d is Contribution => d !== null);
    const weekId = firstValidDay ? `week-${firstValidDay.date}` : `week-pad-${weekIndex}`;
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
    <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm relative transition-colors duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Github size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-base sm:text-lg tracking-tight">
                GitHub Velocity
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Live Activity
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {data.length < 200 ? 'Recent 6 Months' : 'Past Year'} of public commits & PRs
            </p>
          </div>
        </div>

        <a
          href="https://github.com/saiakashneela"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors self-start sm:self-auto"
          aria-label="View Sai Akash Neela on GitHub"
        >
          <span>@saiakashneela</span>
          <ExternalLink size={13} />
        </a>
      </div>

      {/* Quick Metrics Bar for Mobile and Desktop */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-5 p-3 sm:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800/80">
        <div className="flex flex-col">
          <span className="text-[10px] sm:text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            Total Commits
          </span>
          <span className="text-base sm:text-xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-0.5">
            {isLoading ? '...' : stats.total}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] sm:text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            Active Days
          </span>
          <span className="text-base sm:text-xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5">
            {isLoading ? '...' : `${stats.activeDays} days`}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] sm:text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            Peak Velocity
          </span>
          <span className="text-base sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
            {isLoading ? '...' : `${stats.max} / day`}
          </span>
        </div>
      </div>

      {/* Activity Graph Container with horizontal scroll */}
      <div className="relative">
        <div 
          className="w-full overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 scrollbar-track-transparent"
          tabIndex={0}
          role="region"
          aria-label="GitHub contribution activity grid"
        >
          {/* Month Labels */}
          <div className="flex relative mb-1.5 h-4 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 select-none">
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

          {/* Contribution Cells */}
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
                    <div
                      key={day.date}
                      tabIndex={0}
                      role="img"
                      aria-label={`${day.count} contributions on ${day.date}`}
                      className={`w-3 h-3 rounded-[2px] ${getContributionColor(day.count)} border transition-transform duration-100 hover:scale-125 focus-visible:scale-125 cursor-pointer shrink-0`}
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
                      onFocus={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredNode({
                          count: day.count,
                          date: day.date,
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                        });
                      }}
                      onBlur={() => setHoveredNode(null)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Swipe hint on small screens */}
        <div className="sm:hidden flex items-center justify-between mt-1 text-[11px] text-zinc-400 dark:text-zinc-500">
          <span>← Swipe to explore history</span>
        </div>
      </div>

      {/* Floating Tooltip */}
      {hoveredNode && (
        <div
          className="fixed z-50 px-3 py-1.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold rounded-xl shadow-2xl pointer-events-none transform -translate-x-1/2 -translate-y-full mt-[-8px] border border-zinc-700/50 dark:border-zinc-200"
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

      {/* Legend */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400">
        <span className="flex items-center gap-1">
          <Activity size={13} className="text-indigo-500" />
          <span>Real-time commit telemetry</span>
        </span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className="flex gap-[2px]">
            <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-100 dark:bg-zinc-800/70 border border-zinc-200/60 dark:border-zinc-700/40" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-indigo-200 dark:bg-indigo-900/50 border border-indigo-300 dark:border-indigo-800/60" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-indigo-400 dark:bg-indigo-700 border border-indigo-500 dark:border-indigo-600" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-indigo-600 dark:bg-indigo-400 border border-indigo-700 dark:border-indigo-300" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
