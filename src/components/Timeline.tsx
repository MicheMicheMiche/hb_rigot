
import { useState, useEffect, useRef } from 'react';
import { NotebookEntry, FilterOptions } from '@/types/notebook';
import TimelineDots from './timeline/TimelineDots';
import TimelineTicks from './timeline/TimelineTicks';
import TimelineSlider from './timeline/TimelineSlider';
import { format } from 'date-fns';

interface TimelineProps {
  entries: NotebookEntry[];
  filteredEntries: NotebookEntry[];
  onEntryClick: (entryId: number) => void;
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const Timeline = ({ entries, filteredEntries, onEntryClick, filters, onFilterChange }: TimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [sliderValues, setSliderValues] = useState([0, 100]);
  const startDate = new Date(1914, 7, 1);
  const endDate = new Date(1917, 4, 31);
  const totalTimespan = endDate.getTime() - startDate.getTime();

  useEffect(() => {
    if (filters.dateRange.start || filters.dateRange.end) {
      const start = filters.dateRange.start 
        ? getPositionForDate(new Date(filters.dateRange.start)) 
        : 0;
      const end = filters.dateRange.end 
        ? getPositionForDate(new Date(filters.dateRange.end)) 
        : 100;
      setSliderValues([start, end]);
    } else {
      setSliderValues([0, 100]);
    }
  }, [filters.dateRange]);

  const getDateForPosition = (position: number): Date => {
    const timeAtPosition = startDate.getTime() + (position / 100) * totalTimespan;
    return new Date(timeAtPosition);
  };

  const getPositionForDate = (date: Date): number => {
    const timeAtDate = date.getTime();
    return ((timeAtDate - startDate.getTime()) / totalTimespan) * 100;
  };

  const getEntryPosition = (entry: NotebookEntry): number => {
    if (!entry.date) return -1;
    
    try {
      const [year, month, day] = entry.date.split('-').map(Number);
      let entryDate;
      
      if (year && month && day) {
        entryDate = new Date(year, month - 1, day);
      } else if (year && month) {
        entryDate = new Date(year, month - 1, 1);
      } else if (year) {
        entryDate = new Date(year, 0, 1);
      } else {
        return -1;
      }
      
      return getPositionForDate(entryDate);
    } catch (error) {
      return -1;
    }
  };

  const handleSliderChange = (values: number[]) => {
    setSliderValues(values);
    const startDate = getDateForPosition(values[0]);
    const endDate = getDateForPosition(values[1]);
    
    onFilterChange({
      ...filters,
      dateRange: {
        start: format(startDate, 'yyyy-MM-dd'),
        end: format(endDate, 'yyyy-MM-dd')
      }
    });
  };

  const isEntryInSelectedDateRange = (entry: NotebookEntry): boolean => {
    if (!entry.date) return false;
    
    try {
      const [year, month, day] = entry.date.split('-').map(Number);
      let entryDate;
      
      if (year && month && day) {
        entryDate = new Date(year, month - 1, day);
      } else if (year && month) {
        entryDate = new Date(year, month - 1, 1);
      } else if (year) {
        entryDate = new Date(year, 0, 1);
      } else {
        return false;
      }
      
      const startDate = getDateForPosition(sliderValues[0]);
      const endDate = getDateForPosition(sliderValues[1]);
      
      return entryDate >= startDate && entryDate <= endDate;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    let isScrolling = false;
    let startX: number;
    let scrollLeft: number;

    const startDragging = (e: TouchEvent | MouseEvent) => {
      isScrolling = true;
      timeline.style.cursor = 'grabbing';
      startX = 'touches' in e ? e.touches[0].pageX : e.pageX;
      scrollLeft = timeline.scrollLeft;
    };

    const stopDragging = () => {
      isScrolling = false;
      timeline.style.cursor = 'grab';
    };

    const scroll = (e: TouchEvent | MouseEvent) => {
      if (!isScrolling) return;
      e.preventDefault();
      const x = 'touches' in e ? e.touches[0].pageX : e.pageX;
      const dist = (startX - x) * 2;
      timeline.scrollLeft = scrollLeft + dist;
    };

    timeline.addEventListener('touchstart', startDragging);
    timeline.addEventListener('touchend', stopDragging);
    timeline.addEventListener('touchmove', scroll);
    timeline.addEventListener('mousedown', startDragging);
    timeline.addEventListener('mouseup', stopDragging);
    timeline.addEventListener('mousemove', scroll);
    timeline.addEventListener('mouseleave', stopDragging);

    return () => {
      timeline.removeEventListener('touchstart', startDragging);
      timeline.removeEventListener('touchend', stopDragging);
      timeline.removeEventListener('touchmove', scroll);
      timeline.removeEventListener('mousedown', startDragging);
      timeline.removeEventListener('mouseup', stopDragging);
      timeline.removeEventListener('mousemove', scroll);
      timeline.removeEventListener('mouseleave', stopDragging);
    };
  }, []);

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="mb-4">
        <TimelineSlider
          sliderValues={sliderValues}
          getDateForPosition={getDateForPosition}
          onSliderChange={handleSliderChange}
        />
        
        <div 
          className="pt-8 pb-6 relative overflow-x-auto cursor-grab" 
          ref={timelineRef}
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div className="min-w-[200%] md:min-w-full relative">
            <TimelineTicks getPositionForDate={getPositionForDate} />
            
            <div className="absolute top-1/2 left-0 right-0 h-0 z-10">
              <TimelineDots
                entries={entries}
                filteredEntries={filteredEntries}
                isEntryInSelectedDateRange={isEntryInSelectedDateRange}
                getEntryPosition={getEntryPosition}
                onEntryClick={onEntryClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
