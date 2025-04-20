
import { useState } from 'react';
import { NotebookEntry } from '@/types/notebook';

interface TimelineDotsProps {
  entries: NotebookEntry[];
  filteredEntries: NotebookEntry[];
  isEntryInSelectedDateRange: (entry: NotebookEntry) => boolean;
  getEntryPosition: (entry: NotebookEntry) => number;
  onEntryClick: (entryId: number) => void;
}

const TimelineDots = ({ 
  entries, 
  filteredEntries, 
  isEntryInSelectedDateRange, 
  getEntryPosition,
  onEntryClick 
}: TimelineDotsProps) => {
  const [hoveredEntryId, setHoveredEntryId] = useState<number | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<{ x: number, y: number } | null>(null);

  const handleEntryHover = (entryId: number, event: React.MouseEvent) => {
    setHoveredEntryId(entryId);
    setHoveredPosition({ x: event.clientX, y: event.clientY });
  };

  const handleEntryLeave = () => {
    setHoveredEntryId(null);
    setHoveredPosition(null);
  };

  return (
    <>
      {entries.map(entry => {
        const position = getEntryPosition(entry);
        if (position < 0) return null;
        
        const isInSelectedRange = isEntryInSelectedDateRange(entry);
        const isInFilteredEntries = filteredEntries.some(
          filteredEntry => filteredEntry.numero === entry.numero
        );
        
        return (
          <div 
            key={`dot-${entry.numero}`}
            className={`absolute w-3 h-3 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 
              hover:bg-orange-400 hover:w-[16px] hover:h-[16px] z-20
              ${isInSelectedRange && isInFilteredEntries ? 'bg-vintage-blue' : 'bg-gray-300'}`}
            style={{ left: `${position}%`, top: '50%' }}
            onMouseEnter={(e) => handleEntryHover(entry.numero, e)}
            onMouseLeave={handleEntryLeave}
            onClick={() => onEntryClick(entry.numero)}
          />
        );
      })}
      
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
    </>
  );
};

export default TimelineDots;
