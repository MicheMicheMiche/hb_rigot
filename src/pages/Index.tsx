
import { useState, useEffect, useRef } from 'react';
import { NotebookEntry as EntryType, FilterOptions } from '@/types/notebook';
import { loadNotebookEntries, filterEntries } from '@/utils/dataLoader';
import NotebookEntry from '@/components/NotebookEntry';
import FilterPanel from '@/components/FilterPanel';
import NavigationBar from '@/components/NavigationBar';
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/sonner";
import { Loader, ChevronUp, ChevronDown, ArrowUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Index = () => {
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<EntryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [allExpanded, setAllExpanded] = useState(false);
  const entriesRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    id: null,
    dateRange: { start: null, end: null },
    regiment: null,
    rank: null,
    author: null,
    type: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await loadNotebookEntries();
        setEntries(data);
        setFilteredEntries(data);
        toast.success(`${data.length} entrées chargées avec succès`);
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    try {
      const filtered = filterEntries(entries, filters);
      setFilteredEntries(filtered);
    } catch (error) {
      console.error('Error filtering entries:', error);
      toast.error("Erreur lors du filtrage des entrées");
    }
  }, [entries, filters]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFilterChange = (newFilters: FilterOptions) => {
    console.log("New filters:", newFilters);
    setFilters(newFilters);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleAllEntries = () => {
    setAllExpanded(!allExpanded);
  };

  return (
    <div className="min-h-screen bg-vintage-light">
      <NavigationBar />
      
      <div className="py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-vintage-blue">
              Livre d'Or - Toutes les lettres
            </h1>
          </header>

          <FilterPanel 
            entries={entries} 
            filteredEntries={filteredEntries}
            onFilterChange={handleFilterChange} 
            filters={filters}
          />

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="h-8 w-8 animate-spin text-vintage-accent" />
              <span className="ml-2 text-lg">Chargement des témoignages...</span>
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-md shadow-sm">
              <p className="text-xl text-gray-500">Aucune entrée ne correspond à vos critères de recherche.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mb-4 px-2 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {filteredEntries.length === entries.length 
                    ? `Affichage de toutes les ${entries.length} entrées` 
                    : `${filteredEntries.length} entrée${filteredEntries.length > 1 ? 's' : ''} trouvée${filteredEntries.length > 1 ? 's' : ''} sur ${entries.length}`}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleAllEntries}
                  className="flex items-center gap-1"
                >
                  {allExpanded ? (
                    <>
                      <ChevronUp size={16} />
                      <span>Replier tout</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} />
                      <span>Déplier tout</span>
                    </>
                  )}
                </Button>
              </div>
              
              <div ref={entriesRef} className="mt-8">
                <ScrollArea className="h-full">
                  {filteredEntries.map((entry) => (
                    <div id={`entry-${entry.numero}`} key={entry.numero}>
                      <NotebookEntry 
                        entry={entry} 
                        forceExpanded={allExpanded}
                      />
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>
          )}
        </div>
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© Alexandre Cochard</p>
        </footer>
      </div>

      {showBackToTop && (
        <Button
          className="fixed bottom-6 right-6 rounded-full bg-vintage-accent text-white shadow-lg hover:bg-vintage-accent/80 h-12 w-12 p-0 z-50"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </Button>
      )}
    </div>
  );
};

export default Index;
