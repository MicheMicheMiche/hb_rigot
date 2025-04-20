import { useState, useEffect, useRef } from 'react';
import { NotebookEntry, FilterOptions } from '@/types/notebook';
import { Slider } from "@/components/ui/slider";
import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TimelineProps {
  entries: NotebookEntry[];
  filteredEntries: NotebookEntry[];
  onEntryClick: (entryId: number) => void;
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const Timeline = ({ entries, filteredEntries, onEntryClick, filters, onFilterChange }: TimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineWidth, setTimelineWidth] = useState(0);
  const [sliderValues, setSliderValues] = useState([0, 100]);
  const [hoveredEntryId, setHoveredEntryId] = useState<number | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<{ x: number, y: number } | null>(null);

  const startDate = new Date(1914, 7, 1);
  const endDate = new Date(1917, 4, 31);
  const totalTimespan = endDate.getTime() - startDate.getTime();

  useEffect(() => {
    const updateWidth = () => {
      if (timelineRef.current) {
        setTimelineWidth(timelineRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    if (filters.dateRange.start || filters.dateRange.end) {
      const start = filters.dateRange.start 
        ? getPositionForDate(parse(filters.dateRange.start, 'yyyy-MM-dd', new Date())) 
        : 0;
      const end = filters.dateRange.end 
        ? getPositionForDate(parse(filters.dateRange.end, 'yyyy-MM-dd', new Date())) 
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

  const isEntryFiltered = (entry: NotebookEntry): boolean => {
    return filteredEntries.some(filteredEntry => filteredEntry.numero === entry.numero);
  };

  const generateYearTicks = () => {
    const years = [];
    for (let year = 1914; year <= 1917; year++) {
      years.push(year);
    }
    
    return years.map(year => {
      const date = new Date(year, 0, 1);
      const position = getPositionForDate(date);
      return (
        <div 
          key={year} 
          className="absolute top-0 h-full border-r border-gray-300"
          style={{ left: `${position}%` }}
        >
          <span className="absolute -top-6 transform -translate-x-1/2 text-xs text-gray-500">{year}</span>
        </div>
      );
    });
  };

  const handleEntryHover = (entryId: number, x: number, y: number) => {
    setHoveredEntryId(entryId);
    setHoveredPosition({ x, y });
  };

  const handleEntryLeave = () => {
    setHoveredEntryId(null);
    setHoveredPosition(null);
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
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Période: </span>
          <div className="text-sm text-gray-500">
            {format(getDateForPosition(sliderValues[0]), 'MMM yyyy', { locale: fr })} - {format(getDateForPosition(sliderValues[1]), 'MMM yyyy', { locale: fr })}
          </div>
        </div>
        
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
            {generateYearTicks()}
            
            <div className="absolute top-1/2 left-0 right-0 h-0 z-10">
              {entries.map(entry => {
                const position = getEntryPosition(entry);
                if (position < 0) return null;
                
                const isFiltered = isEntryFiltered(entry);
                return (
                  <div 
                    key={entry.numero}
                    className={`absolute w-3 h-3 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-colors
                      ${isFiltered ? 'bg-vintage-blue' : 'bg-gray-300'}`}
                    style={{ left: `${position}%`, top: '50%' }}
                    onClick={() => onEntryClick(entry.numero)}
                    onMouseEnter={(e) => handleEntryHover(entry.numero, e.clientX, e.clientY)}
                    onMouseLeave={handleEntryLeave}
                  />
                );
              })}
            </div>
            
            <div className="relative z-5">
              <Slider
                value={sliderValues}
                min={0}
                max={100}
                step={0.1}
                onValueChange={handleSliderChange}
              />
            </div>
            
            {hoveredEntryId && hoveredPosition && (
              <div 
                className="absolute z-50 bg-black text-white px-2 py-1 text-xs rounded pointer-events-none"
                style={{ 
                  left: hoveredPosition.x + window.scrollX, 
                  top: hoveredPosition.y + window.scrollY - 40
                }}
              >
                Entrée N°{hoveredEntryId}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
