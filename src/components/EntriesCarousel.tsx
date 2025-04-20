import { useState, useEffect } from 'react';
import { NotebookEntry as EntryType } from '@/types/notebook';
import { useIsMobile } from '@/hooks/use-mobile';
import NotebookEntry from '@/components/NotebookEntry';
import CarouselNavButton from '@/components/carousel/CarouselNavButton';

interface EntriesCarouselProps {
  entries: EntryType[];
  selectedEntryId: number | null;
  onEntryChange?: (entry: EntryType) => void;
}

const EntriesCarousel = ({ entries, selectedEntryId, onEntryChange }: EntriesCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentEntry, setCurrentEntry] = useState<EntryType | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (entries.length > 0) {
      if (selectedEntryId) {
        const selectedIndex = entries.findIndex(entry => entry.numero === selectedEntryId);
        if (selectedIndex !== -1) {
          setCurrentIndex(selectedIndex);
        }
      }
    }
  }, [selectedEntryId, entries]);

  useEffect(() => {
    if (entries.length > 0 && currentIndex >= 0 && currentIndex < entries.length) {
      setCurrentEntry(entries[currentIndex]);
      if (onEntryChange) {
        onEntryChange(entries[currentIndex]);
      }
    }
  }, [currentIndex, entries, onEntryChange]);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex === 0 ? entries.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex === entries.length - 1 ? 0 : prevIndex + 1;
      return newIndex;
    });
  };

  if (!currentEntry || entries.length === 0) {
    return (
      <div className="flex justify-center items-center h-full bg-vintage-paper/50 rounded-lg p-4">
        <p className="text-vintage-dark italic">Aucune entrée disponible</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {isMobile && (
        <div className="flex justify-between items-center mb-4 px-2">
          <CarouselNavButton direction="previous" onClick={goToPrevious} />
          <span className="text-sm text-gray-500">
            {currentIndex + 1} / {entries.length}
          </span>
          <CarouselNavButton direction="next" onClick={goToNext} />
        </div>
      )}
      
      <div className="flex flex-grow">
        {!isMobile && <CarouselNavButton direction="previous" onClick={goToPrevious} />}
        
        <div className={`flex-grow overflow-auto ${isMobile ? 'px-0' : 'px-4'}`}>
          <NotebookEntry entry={currentEntry} forceExpanded={false} />
        </div>
        
        {!isMobile && <CarouselNavButton direction="next" onClick={goToNext} />}
      </div>
    </div>
  );
};

export default EntriesCarousel;
