import React, { useState } from 'react';
import { Contribution } from '../types';

interface ContributionGraphProps {
  data: Contribution[];
}

export const ContributionGraph: React.FC<ContributionGraphProps> = ({ data }) => {
  const [hoveredNode, setHoveredNode] = useState<{
    count: number;
    date: string;
    x: number;
    y: number;
  } | null>(null);

  // Helper: Format date to "19th July"
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    
    const getSuffix = (d: number) => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    };
    
    return `${day}${getSuffix(day)} ${month}`;
  };

  // Helper: Get color intensity
  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-100 dark:bg-neutral-800 border-gray-200 dark:border-neutral-700/50';
    if (count <= 2) return 'bg-indigo-200 dark:bg-indigo-900/40 border-indigo-200 dark:border-indigo-800/30';
    if (count <= 4) return 'bg-indigo-300 dark:bg-indigo-700/60 border-indigo-300 dark:border-indigo-700/50';
    if (count <= 6) return 'bg-indigo-400 dark:bg-indigo-600/80 border-indigo-400 dark:border-indigo-600/70';
    return 'bg-indigo-600 dark:bg-indigo-500 border-indigo-500 dark:border-indigo-400';
  };

  // Align data to start on Sunday
  const processData = () => {
    if (!data || data.length === 0) return [];
    
    // Create a copy to avoid mutating props
    const rawData = [...data];
    
    // Determine the day of the week for the first data point (0 = Sun, 6 = Sat)
    const firstDate = new Date(rawData[0].date);
    const startDay = firstDate.getDay(); // 0 is Sunday
    
    // Add null placeholders to align the first column
    const padding = Array(startDay).fill(null);
    const alignedData = [...padding, ...rawData];
    
    // Chunk into weeks of 7
    const weeks = [];
    let currentWeek = [];
    
    for (const item of alignedData) {
      currentWeek.push(item);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    // Push remaining days if any
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
    
    return weeks;
  };

  const weeks = processData();

  // Determine Month Labels
  const getMonthLabels = () => {
    const labels = [];
    let lastMonth = -1;

    weeks.forEach((week, index) => {
        const firstDay = week.find(d => d !== null);
        if (firstDay) {
            const d = new Date(firstDay.date);
            const month = d.getMonth();
            if (month !== lastMonth) {
                labels.push({ index, label: d.toLocaleString('default', { month: 'short' }) });
                lastMonth = month;
            }
        }
    });
    return labels;
  };

  const monthLabels = getMonthLabels();

  return (
    <div className="mb-12 relative group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-2">
          Git Activity
          <span className="text-xs font-normal normal-case text-gray-300 dark:text-neutral-600 px-2 py-0.5 rounded-full border border-gray-100 dark:border-neutral-800">
            {data.length < 200 ? "Last 6 Months" : "Last Year"}
          </span>
        </h3>
        
        {/* Hover info display */}
        <div className="h-5 text-xs font-medium text-gray-500 dark:text-gray-400 transition-opacity duration-200 opacity-0 group-hover:opacity-100 hidden sm:block">
          {hoveredNode ? (
            <span>
              {hoveredNode.count} Contributions on {formatDate(hoveredNode.date)}
            </span>
          ) : null}
        </div>
      </div>
      
      {/* Scrollable container */}
      <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-neutral-800 scrollbar-track-transparent">
        
        {/* Month Labels Row */}
        <div className="flex relative mb-2 h-4 text-xs text-gray-400 dark:text-gray-500 font-medium">
             {/* We use the same gap as the grid to align logic visually, though flex makes it tricky. 
                 Instead, we can use absolute positioning or a simple flex with empty spacers if needed.
                 Here, a simple map with conditional rendering works best if we mimic the grid structure. */}
             <div className="flex gap-[3px]">
                {weeks.map((_, i) => {
                    const labelObj = monthLabels.find(m => m.index === i);
                    return (
                        <div key={i} className="w-3 relative overflow-visible">
                            {labelObj && <span className="absolute left-0 top-0 whitespace-nowrap">{labelObj.label}</span>}
                        </div>
                    )
                })}
             </div>
        </div>

        {/* The Grid */}
        <div className="flex gap-[3px]">
          {weeks.map((week, wIndex) => (
            <div key={wIndex} className="flex flex-col gap-[3px]">
              {week.map((day, dIndex) => {
                if (!day) {
                  return <div key={`empty-${dIndex}`} className="w-3 h-3 bg-transparent" />;
                }
                
                return (
                  <div 
                    key={day.date}
                    className={`w-3 h-3 rounded-[2px] ${getColor(day.count)} border transition-all duration-150 hover:scale-125 hover:z-10 cursor-pointer`}
                    onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredNode({
                            count: day.count,
                            date: day.date,
                            x: rect.left + rect.width / 2,
                            y: rect.top
                        });
                    }}
                    onMouseLeave={() => setHoveredNode(null)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Custom Floating Tooltip */}
      {hoveredNode && (
        <div 
          className="fixed z-50 px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full mt-[-8px] transition-opacity"
          style={{ 
            left: hoveredNode.x, 
            top: hoveredNode.y 
          }}
        >
          <div className="whitespace-nowrap">
            {hoveredNode.count} Contributions on {formatDate(hoveredNode.date)}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-white"></div>
        </div>
      )}

      <div className="flex items-center gap-2 mt-2 text-xs text-gray-400 dark:text-gray-500">
        <span>Less</span>
        <div className="flex gap-[2px]">
            <div className="w-3 h-3 rounded-[2px] bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50"></div>
            <div className="w-3 h-3 rounded-[2px] bg-indigo-200 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800/30"></div>
            <div className="w-3 h-3 rounded-[2px] bg-indigo-400 dark:bg-indigo-600/80 border border-indigo-400 dark:border-indigo-600/70"></div>
            <div className="w-3 h-3 rounded-[2px] bg-indigo-600 dark:bg-indigo-500 border border-indigo-500 dark:border-indigo-400"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};
