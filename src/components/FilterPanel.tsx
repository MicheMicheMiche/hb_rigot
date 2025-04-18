
import { useState, useEffect, useRef } from 'react';
import { NotebookEntry, FilterOptions } from '@/types/notebook';
import { getUniqueRegiments, getUniqueRanks, getUniqueTypes } from '@/utils/dataLoader';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from "@/components/ui/slider";
import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Filter, X } from 'lucide-react';

interface FilterPanelProps {
  entries: NotebookEntry[];
  filteredEntries: NotebookEntry[];
  onFilterChange: (filters: FilterOptions) => void;
  filters: FilterOptions;
}

const FilterPanel = ({ entries, filteredEntries, onFilterChange, filters }: FilterPanelProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineWidth, setTimelineWidth] = useState(0);
  const [sliderValues, setSliderValues] = useState([0, 100]);
  const [hoveredEntryId, setHoveredEntryId] = useState<number | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<{ x: number, y: number } | null>(null);
  
  const regiments = getUniqueRegiments(entries);
  const ranks = getUniqueRanks(entries);
  const types = getUniqueTypes(entries);

  // Define timeline range
  const startDate = new Date(1914, 8, 1);
  const endDate = new Date(1917, 4, 12);
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
    return Math.max(0, Math.min(100, ((timeAtDate - startDate.getTime()) / totalTimespan) * 100));
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

  // Determine if entry is within the selected date range based on position
  const isEntryInSelectedDateRange = (entry: NotebookEntry): boolean => {
    const position = getEntryPosition(entry);
    if (position < 0) return false;
    
    // Simply check if position is between slider values
    return position >= sliderValues[0] && position <= sliderValues[1];
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

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    onFilterChange({
      id: null,
      dateRange: { start: null, end: null },
      regiment: null,
      rank: null,
      author: null,
      type: null
    });
  };

  const isAnyFilterActive = () => {
    return (
      filters.id !== null || 
      filters.dateRange.start !== null || 
      filters.dateRange.end !== null || 
      filters.regiment !== null || 
      filters.rank !== null || 
      filters.author !== null ||
      filters.type !== null
    );
  };

  const scrollToEntry = (entryId: number) => {
    const entryElement = document.getElementById(`entry-${entryId}`);
    if (entryElement) {
      entryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Generate years and specific months ticks for the timeline
  const generateTimelineTicks = () => {
    const ticks = [];
    
    // Years: 1915, 1916, 1917
    for (let year = 1915; year <= 1917; year++) {
      const date = new Date(year, 0, 1);
      const position = getPositionForDate(date);
      
      // Only add years that are within our timeline range
      if (position >= 0 && position <= 100) {
        ticks.push({
          date,
          position,
          isYear: true,
          label: year.toString(),
        });
      }
      
      // Add specific months: April (3), July (6), October (9)
      const highlightMonths = [3, 6, 9]; // 0-indexed: April, July, October
      
      for (const month of highlightMonths) {
        const monthDate = new Date(year, month, 1);
        const monthPosition = getPositionForDate(monthDate);
        
        // Only add months that are within our timeline range
        if (monthPosition >= 0 && monthPosition < 100) {
          ticks.push({
            date: monthDate,
            position: monthPosition,
            isYear: false,
            label: format(monthDate, 'MMM', { locale: fr }),
          });
        }
      }
    }
    
    return ticks.sort((a, b) => a.position - b.position);
  };
  
  const handleEntryHover = (entryId: number, event: React.MouseEvent) => {
    setHoveredEntryId(entryId);
    setHoveredPosition({ x: event.clientX, y: event.clientY });
  };
  
  const handleEntryLeave = () => {
    setHoveredEntryId(null);
    setHoveredPosition(null);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl font-semibold flex items-center">
          <Filter size={18} className="mr-2" />
          Filtrer les entrées
        </h2>
        {isAnyFilterActive() && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-sm text-red-500 hover:text-red-700">
            <X size={16} className="mr-1" /> Réinitialiser
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        {/* ID Filter */}
        <div>
          <Label htmlFor="id-filter" className="text-sm font-medium mb-1 block">
            Numéro
          </Label>
          <Input 
            id="id-filter" 
            type="number" 
            min="1"
            placeholder="Filtrer par ID"
            value={filters.id || ''}
            onChange={(e) => handleFilterChange('id', e.target.value ? parseInt(e.target.value) : null)}
            className="w-full"
          />
        </div>
        
        {/* Regiment Filter */}
        <div>
          <Label htmlFor="regiment-filter" className="text-sm font-medium mb-1 block">
            Régiment
          </Label>
          <Select 
            value={filters.regiment || ''} 
            onValueChange={(value) => handleFilterChange('regiment', value !== 'all' ? value : null)}
          >
            <SelectTrigger id="regiment-filter" className="w-full">
              <SelectValue placeholder="Tous les régiments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les régiments</SelectItem>
              {regiments.map((regiment) => (
                <SelectItem key={regiment} value={regiment}>
                  {regiment}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Rank Filter */}
        <div>
          <Label htmlFor="rank-filter" className="text-sm font-medium mb-1 block">
            Grade ou fonction
          </Label>
          <Select 
            value={filters.rank || ''} 
            onValueChange={(value) => handleFilterChange('rank', value !== 'all' ? value : null)}
          >
            <SelectTrigger id="rank-filter" className="w-full">
              <SelectValue placeholder="Tous les grades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les grades</SelectItem>
              {ranks.map((rank) => (
                <SelectItem key={rank} value={rank}>
                  {rank}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Author Filter */}
        <div>
          <Label htmlFor="author-filter" className="text-sm font-medium mb-1 block">
            Auteur
          </Label>
          <Input 
            id="author-filter" 
            type="text" 
            placeholder="Filtrer par nom"
            value={filters.author || ''}
            onChange={(e) => handleFilterChange('author', e.target.value || null)}
            className="w-full"
          />
        </div>
        
        {/* Type Filter */}
        <div>
          <Label htmlFor="type-filter" className="text-sm font-medium mb-1 block">
            Type
          </Label>
          <Select 
            value={filters.type || ''} 
            onValueChange={(value) => handleFilterChange('type', value !== 'all' ? value : null)}
          >
            <SelectTrigger id="type-filter" className="w-full">
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Timeline */}
      <div className="mt-2 border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Période: </span>
          <div className="text-sm text-gray-500">
            {format(getDateForPosition(sliderValues[0]), 'MMM yyyy', { locale: fr })} - {format(getDateForPosition(sliderValues[1]), 'MMM yyyy', { locale: fr })}
          </div>
        </div>
        
        <div className="pt-8 pb-6 px-2 relative" ref={timelineRef}>
          {/* Month and Year ticks */}
          {generateTimelineTicks().map((tick, index) => (
            <div 
              key={index} 
              className={`absolute ${tick.isYear ? 'h-full top-0 border-r border-gray-300' : 'h-[30%] top-[40%] border-r border-gray-200'}`}
              style={{ left: `${tick.position}%` }}
            >
              <span className={`absolute -top-5 transform -translate-x-1/2 text-xs ${tick.isYear ? 'text-gray-500' : 'text-gray-400'}`}>
                {tick.label}
              </span>
            </div>
          ))}
          
          {/* Custom slider styling */}
          <div className="relative z-20">
            <Slider
              value={sliderValues}
              min={0}
              max={100}
              step={0.1}
              onValueChange={handleSliderChange}
              className="z-30"
            />
          </div>
          
          {/* Entry dots */}
          <div className="absolute top-1/2 left-0 right-0 h-0 z-10">
            {entries.map(entry => {
              const position = getEntryPosition(entry);
              if (position < 0) return null;
              
              const isInSelectedRange = isEntryInSelectedDateRange(entry);
              const isInFilteredEntries = filteredEntries.some(filteredEntry => filteredEntry.numero === entry.numero);
              
              return (
                <div 
                  key={`dot-${entry.numero}`}
                  className={`absolute w-3 h-3 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 
                    hover:bg-orange-400 hover:w-[16px] hover:h-[16px] z-20
                    ${isInSelectedRange && isInFilteredEntries ? 'bg-vintage-blue' : 'bg-gray-300'}`}
                  style={{ left: `${position}%`, top: '50%' }}
                  onMouseEnter={(e) => handleEntryHover(entry.numero, e)}
                  onMouseLeave={handleEntryLeave}
                  onClick={() => scrollToEntry(entry.numero)}
                />
              );
            })}
          </div>
          
          {/* Hover tooltip */}
          {hoveredEntryId && hoveredPosition && (
            <div 
              className="fixed z-50 bg-black text-white px-2 py-1 text-xs rounded pointer-events-none"
              style={{ 
                left: hoveredPosition.x + 10, 
                top: hoveredPosition.y - 10
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

export default FilterPanel;
