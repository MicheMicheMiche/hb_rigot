
import { useState } from 'react';
import { NotebookEntry as EntryType } from '@/types/notebook';
import { formatDate } from '@/utils/dataLoader';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

interface NotebookEntryProps {
  entry: EntryType;
}

const NotebookEntry = ({ entry }: NotebookEntryProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="notebook-entry w-full mb-4 shadow-md transition-all duration-300 hover:shadow-lg overflow-hidden">
      <CardHeader className="border-b border-vintage-dark/20 bg-vintage-paper">
        <div className="flex justify-between items-center">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="font-serif text-xl md:text-2xl font-semibold text-vintage-blue">
              N°{entry.numero}
            </span>
            <span className="text-sm md:text-base text-vintage-dark">
              {formatDate(entry.date)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="font-serif text-vintage-dark">{entry.affectation.grade}</div>
              <div className="text-sm text-vintage-dark/80">{entry.affectation.regiment}</div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 pb-2 px-6">
        <div className="mb-2">
          <span className="font-serif text-lg">Auteur{entry.auteurs.length > 1 ? 's' : ''}: </span>
          <span className="font-medium">{entry.auteurs.join(', ')}</span>
        </div>
        <div className="notebook-text text-sm md:text-base leading-relaxed">{entry.texte}</div>
      </CardContent>
      
      <CardFooter className="border-t border-vintage-dark/20 p-2 bg-vintage-paper flex justify-between">
        <div className="text-sm text-vintage-dark">Type: {entry.type}</div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-vintage-accent hover:text-vintage-accent hover:bg-vintage-accent/10"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <div className="flex items-center">
              <span className="mr-1">Réduire</span>
              <ChevronUp size={16} />
            </div>
          ) : (
            <div className="flex items-center">
              <span className="mr-1">Voir l'original</span>
              <ChevronDown size={16} />
            </div>
          )}
        </Button>
      </CardFooter>
      
      {expanded && (
        <div className="p-4 bg-gray-100 animate-fade-in">
          <div className="max-w-full mx-auto rounded overflow-hidden shadow-md">
            <img 
              src={`/assets/photos/${entry.numero}.jpeg`} 
              alt={`Page originale ${entry.numero}`} 
              className="w-full h-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
                target.alt = 'Image non disponible';
              }}
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export default NotebookEntry;
