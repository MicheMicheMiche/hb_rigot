
import { useState, useEffect } from 'react';
import { NotebookEntry as EntryType, FilterOptions } from '@/types/notebook';
import { loadNotebookEntries, filterEntries } from '@/utils/dataLoader';
import NotebookEntry from '@/components/NotebookEntry';
import FilterPanel from '@/components/FilterPanel';
import NavigationBar from '@/components/NavigationBar';
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/sonner";
import { Loader } from 'lucide-react';

const Index = () => {
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<EntryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    id: null,
    dateRange: { start: null, end: null },
    regiment: null,
    rank: null,
    author: null
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
    setFilteredEntries(filterEntries(entries, filters));
  }, [entries, filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-vintage-light">
      <NavigationBar />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-vintage-blue">
              Livre d'Or des Poilus
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Messages et témoignages des soldats blessés soignés dans un hôpital temporaire français
              durant la Première Guerre Mondiale.
            </p>
          </header>

          <FilterPanel entries={entries} onFilterChange={handleFilterChange} />

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
              <div className="mb-4 px-2">
                <span className="text-sm text-gray-500">
                  {filteredEntries.length === entries.length 
                    ? `Affichage de toutes les ${entries.length} entrées` 
                    : `${filteredEntries.length} entrée${filteredEntries.length > 1 ? 's' : ''} trouvée${filteredEntries.length > 1 ? 's' : ''} sur ${entries.length}`}
                </span>
              </div>
              <ScrollArea className="h-full">
                {filteredEntries.map((entry) => (
                  <NotebookEntry key={entry.numero} entry={entry} />
                ))}
              </ScrollArea>
            </div>
          )}
        </div>
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© 2025 Livre d'Or des Poilus - Archive numérique des témoignages de la Grande Guerre</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
