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

  // Define timeline range
  const startDate = new Date(1914, 9, 1); // October 1914
  const endDate = new Date(1917, 11, 31); // December 1917
  const totalTimespan = endDate.getTime() - startDate.getTime();

  // Update the timeline width on resize
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

  // When filter date range changes, update the slider
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

  // Get date from a position percentage
  const getDateForPosition = (position: number): Date => {
    const timeAtPosition = startDate.getTime() + (position / 100) * totalTimespan;
    return new Date(timeAtPosition);
  };

  // Get position percentage for a date
  const getPositionForDate = (date: Date): number => {
    const timeAtDate = date.getTime();
    return ((timeAtDate - startDate.getTime()) / totalTimespan) * 100;
  };

  // Get position percentage for an entry
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

  // When slider changes, update the date filter
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

  // Generate years ticks for the timeline
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

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Période: </span>
          <div className="text-sm text-gray-500">
            {format(getDateForPosition(sliderValues[0]), 'MMM yyyy', { locale: fr })} - {format(getDateForPosition(sliderValues[1]), 'MMM yyyy', { locale: fr })}
          </div>
        </div>
        
        <div className="pt-8 pb-6 relative" ref={timelineRef}>
          {/* Year ticks */}
          {generateYearTicks()}
          
          {/* Slider */}
          <Slider
            value={sliderValues}
            min={0}
            max={100}
            step={0.1}
            onValueChange={handleSliderChange}
          />
          
          {/* Entry dots */}
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
          
          {/* Hover tooltip */}
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
  );
};

export default Timeline;
