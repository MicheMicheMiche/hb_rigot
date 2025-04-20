
import { Button } from "@/components/ui/button";
import { Shuffle } from 'lucide-react';
import NotebookEntry from '@/components/NotebookEntry';
import { NotebookEntry as EntryType } from '@/types/notebook';

interface RandomEntrySectionProps {
  randomEntry: EntryType | null;
  loading: boolean;
  onRefresh: () => void;
}

const RandomEntrySection = ({ randomEntry, loading, onRefresh }: RandomEntrySectionProps) => {
  return (
    <div className="bg-vintage-paper p-6 rounded-lg shadow-md border border-gray-200 mb-12">
      <div className="flex items-center justify-center mb-6">
        <h2 className="font-serif text-2xl font-bold text-vintage-blue mr-2">
          Un témoignage au hasard
        </h2>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center border-vintage-accent text-vintage-accent hover:bg-vintage-accent/10"
          onClick={onRefresh}
          title="Afficher un autre témoignage"
        >
          <Shuffle size={18} />
        </Button>
      </div>
      {loading ? (
        <div className="text-center py-8">
          <p>Chargement d'un témoignage...</p>
        </div>
      ) : randomEntry ? (
        <NotebookEntry entry={randomEntry} />
      ) : (
        <div className="text-center py-8">
          <p>Aucun témoignage disponible.</p>
        </div>
      )}
    </div>
  );
};

export default RandomEntrySection;
