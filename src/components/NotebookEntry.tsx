
import { useState, useEffect } from 'react';
import { NotebookEntry as EntryType } from '@/types/notebook';
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NotebookEntryProps {
  entry: EntryType;
  forceExpanded?: boolean;
}

const NotebookEntry = ({ entry, forceExpanded = false }: NotebookEntryProps) => {
  const [expanded, setExpanded] = useState(false);
  const hasUndecipheredContent = entry.texte.includes('?');
  const isPoem = entry.type === "Poème";
  
  // Update expanded state when forceExpanded changes
  useEffect(() => {
    setExpanded(forceExpanded);
  }, [forceExpanded]);

  // Format date function to handle missing day or month
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return 'Pas de date renseignée';
    
    try {
      const [year, month, day] = dateString.split('-');
      
      if (year && month && day) {
        return `${day}/${month}/${year}`;
      } else if (year && month) {
        return `${month}/${year}`;
      } else if (year) {
        return year;
      } else {
        return 'Pas de date renseignée';
      }
    } catch (error) {
      return 'Pas de date renseignée';
    }
  };

  // Get all non-empty affectation fields
  const getAffectationInfo = () => {
    const affInfo = [];
    
    if (entry.affectation.regiment) {
      affInfo.push(entry.affectation.regiment);
    }
    
    if (entry.affectation.affect2) {
      affInfo.push(entry.affectation.affect2);
    }
    
    if (entry.affectation.affect3) {
      affInfo.push(entry.affectation.affect3);
    }
    
    if (entry.affectation.affect4) {
      affInfo.push(entry.affectation.affect4);
    }
    
    return affInfo;
  };

  const affectationInfo = getAffectationInfo();

  return (
    <Card className="notebook-entry w-full mb-4 shadow-md transition-all duration-300 hover:shadow-lg overflow-hidden">
      <CardHeader className="border-b border-vintage-dark/20 bg-vintage-paper">
        <div className="flex justify-between items-center">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="font-serif text-xl md:text-2xl font-semibold text-vintage-blue">
              N°{entry.numero}
            </span>
            <span className="text-sm md:text-base text-vintage-dark">
              {formatDisplayDate(entry.date)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {hasUndecipheredContent && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="mr-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Certains segments de cette lettre restent à déchiffrer</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <div className="text-right">
              <div className="font-serif text-vintage-dark">{entry.affectation.grade}</div>
              <div className="flex flex-col items-end">
                {affectationInfo.map((info, index) => (
                  <div key={index} className="text-sm text-vintage-dark/80">
                    {info}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 pb-2 px-6">
        <div className="mb-2">
          <span className="font-serif text-lg">Auteur{entry.auteurs.length > 1 ? 's' : ''}: </span>
          <span className="font-medium">{entry.auteurs.join(', ')}</span>
        </div>
        <div className={`notebook-text text-sm md:text-base leading-relaxed ${isPoem ? 'poem-text' : ''}`}>
          {entry.texte.split('\n').map((paragraph, idx) => (
            <p key={idx} className={isPoem ? 'mb-0' : 'mb-4'}>{paragraph}</p>
          ))}
        </div>
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
              src={`/assets/photos/${entry.numero}.jpg`} 
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
