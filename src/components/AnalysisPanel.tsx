
import { useState, useEffect } from 'react';
import { NotebookEntry as EntryType } from '@/types/notebook';
import { Separator } from '@/components/ui/separator';
import EntriesCarousel from '@/components/EntriesCarousel';
import EntryReference from '@/components/EntryReference';

interface AnalysisPanelProps {
  title: string;
  entriesIds: number[];
  analysisContent: React.ReactNode;
  allEntries: EntryType[];
}

const AnalysisPanel = ({ title, entriesIds, analysisContent, allEntries }: AnalysisPanelProps) => {
  const [selectedEntryId, setSelectedEntryId] = useState<number | null>(null);
  const [panelEntries, setPanelEntries] = useState<EntryType[]>([]);

  useEffect(() => {
    const filteredEntries = allEntries.filter(entry => 
      entriesIds.includes(entry.numero)
    ).sort((a, b) => a.numero - b.numero);
    
    setPanelEntries(filteredEntries);
    
    if (filteredEntries.length > 0 && !selectedEntryId) {
      setSelectedEntryId(filteredEntries[0].numero);
    }
  }, [entriesIds, allEntries, selectedEntryId]);

  const handleEntryReferenceClick = (entryId: number) => {
    setSelectedEntryId(entryId);
  };

  const renderAnalysisContent = () => {
    if (typeof analysisContent === 'string') {
      // Split the content by line breaks first
      const paragraphs = analysisContent.split('\n').filter(p => p.trim() !== '');
      
      return paragraphs.map((paragraph, paragraphIndex) => {
        // Then process each paragraph for entry references
        const parts = paragraph.split(/(\[\d+\])/g);
        const processedParagraph = parts.map((part, partIndex) => {
          const match = part.match(/\[(\d+)\]/);
          if (match) {
            const entryId = parseInt(match[1], 10);
            return (
              <EntryReference 
                key={`${paragraphIndex}-${partIndex}`} 
                entryNumber={entryId} 
                onClick={handleEntryReferenceClick} 
              />
            );
          }
          return <span key={`${paragraphIndex}-${partIndex}`}>{part}</span>;
        });
        
        // Return each paragraph as a separate block with margin
        return (
          <p key={paragraphIndex} className="mb-4">
            {processedParagraph}
          </p>
        );
      });
    }
    return analysisContent;
  };

  return (
    <div className="mb-12 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-center text-vintage-blue">
        {title}
      </h2>
      
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-4">
          <div className="prose max-w-none text-gray-800">
            {renderAnalysisContent()}
          </div>
        </div>
        
        <div className="hidden lg:block mx-4">
          <Separator orientation="vertical" className="h-full bg-vintage-dark/20" />
        </div>
        
        <div className="my-4 lg:hidden">
          <Separator orientation="horizontal" className="w-full bg-vintage-dark/20" />
        </div>
        
        <div className="w-full lg:w-1/2 p-4">
          <EntriesCarousel 
            entries={panelEntries} 
            selectedEntryId={selectedEntryId}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalysisPanel;
