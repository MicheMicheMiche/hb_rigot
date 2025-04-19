
import { useState, useEffect } from 'react';
import { NotebookEntry as EntryType } from '@/types/notebook';
import NotebookEntry from '@/components/NotebookEntry';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface EntriesCarouselProps {
  entries: EntryType[];
  selectedEntryId: number | null;
  onEntryChange?: (entry: EntryType) => void;
}

const EntriesCarousel = ({ entries, selectedEntryId, onEntryChange }: EntriesCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentEntry, setCurrentEntry] = useState<EntryType | null>(null);

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
    <div className="flex h-full">
      <div className="flex flex-col justify-center px-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={goToPrevious} 
          className="text-vintage-accent hover:bg-vintage-accent/10 hover:text-vintage-accent"
          aria-label="Entrée précédente"
        >
          <ArrowLeft />
        </Button>
      </div>
      
      <div className="flex-grow overflow-auto">
        <NotebookEntry entry={currentEntry} forceExpanded={false} />
      </div>
      
      <div className="flex flex-col justify-center px-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={goToNext} 
          className="text-vintage-accent hover:bg-vintage-accent/10 hover:text-vintage-accent"
          aria-label="Entrée suivante"
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default EntriesCarousel;
