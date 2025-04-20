
import { useState, useEffect } from 'react';
import { NotebookEntry as EntryType } from '@/types/notebook';
import { loadNotebookEntries } from '@/utils/dataLoader';
import { analysisData } from '@/utils/analysisData';
import NavigationBar from '@/components/NavigationBar';
import BackToTop from '@/components/BackToTop';
import AnalysisPanel from '@/components/AnalysisPanel';
import { Loader } from 'lucide-react';

const Analyses = () => {
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const loadedEntries = await loadNotebookEntries();
        setEntries(loadedEntries);
      } catch (error) {
        console.error('Error loading entries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen bg-vintage-light">
      <NavigationBar />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-vintage-blue">
              Analyses thématiques
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Quelques thèmes intéressants à découvrir dans le carnet de témoignages
            </p>
          </header>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="h-8 w-8 animate-spin text-vintage-accent" />
              <span className="ml-2 text-lg">Chargement des analyses...</span>
            </div>
          ) : (
            <div className="space-y-12">
              {analysisData.map(analysis => (
                <AnalysisPanel
                  key={analysis.id}
                  title={analysis.title}
                  entriesIds={analysis.entriesIds}
                  analysisContent={analysis.content}
                  allEntries={entries}
                />
              ))}
            </div>
          )}
        </div>
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© Alexandre Cochard - 2025</p>
        </footer>
      </div>
      <BackToTop />
    </div>
  );
};

export default Analyses;
