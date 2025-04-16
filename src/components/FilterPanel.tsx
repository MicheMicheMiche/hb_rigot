
import { useState } from 'react';
import { NotebookEntry, FilterOptions } from '@/types/notebook';
import { getUniqueRegiments, getUniqueRanks, getUniqueTypes } from '@/utils/dataLoader';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, X } from 'lucide-react';

interface FilterPanelProps {
  entries: NotebookEntry[];
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterPanel = ({ entries, onFilterChange }: FilterPanelProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    id: null,
    dateRange: { start: null, end: null },
    regiment: null,
    rank: null,
    author: null,
    type: null
  });
  
  const regiments = getUniqueRegiments(entries);
  const ranks = getUniqueRanks(entries);
  const types = getUniqueTypes(entries);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    setFilters({
      id: null,
      dateRange: { start: null, end: null },
      regiment: null,
      rank: null,
      author: null,
      type: null
    });
    onFilterChange({
      id: null,
      dateRange: { start: null, end: null },
      regiment: null,
      rank: null,
      author: null,
      type: null
    });
  };

  const isAnyFilterActive = () => {
    return (
      filters.id !== null || 
      filters.dateRange.start !== null || 
      filters.dateRange.end !== null || 
      filters.regiment !== null || 
      filters.rank !== null || 
      filters.author !== null ||
      filters.type !== null
    );
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl font-semibold flex items-center">
          <Filter size={18} className="mr-2" />
          Filtrer les entrées
        </h2>
        {isAnyFilterActive() && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-sm text-red-500 hover:text-red-700">
            <X size={16} className="mr-1" /> Réinitialiser
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* ID Filter */}
        <div>
          <Label htmlFor="id-filter" className="text-sm font-medium mb-1 block">
            Numéro
          </Label>
          <Input 
            id="id-filter" 
            type="number" 
            min="1"
            placeholder="Filtrer par ID"
            value={filters.id || ''}
            onChange={(e) => handleFilterChange('id', e.target.value ? parseInt(e.target.value) : null)}
            className="w-full"
          />
        </div>
        
        {/* Regiment Filter */}
        <div>
          <Label htmlFor="regiment-filter" className="text-sm font-medium mb-1 block">
            Régiment
          </Label>
          <Select 
            value={filters.regiment || ''} 
            onValueChange={(value) => handleFilterChange('regiment', value !== 'all' ? value : null)}
          >
            <SelectTrigger id="regiment-filter" className="w-full">
              <SelectValue placeholder="Tous les régiments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les régiments</SelectItem>
              {regiments.map((regiment) => (
                <SelectItem key={regiment} value={regiment}>
                  {regiment}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Rank Filter */}
        <div>
          <Label htmlFor="rank-filter" className="text-sm font-medium mb-1 block">
            Grade
          </Label>
          <Select 
            value={filters.rank || ''} 
            onValueChange={(value) => handleFilterChange('rank', value !== 'all' ? value : null)}
          >
            <SelectTrigger id="rank-filter" className="w-full">
              <SelectValue placeholder="Tous les grades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les grades</SelectItem>
              {ranks.map((rank) => (
                <SelectItem key={rank} value={rank}>
                  {rank}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Author Filter */}
        <div>
          <Label htmlFor="author-filter" className="text-sm font-medium mb-1 block">
            Auteur
          </Label>
          <Input 
            id="author-filter" 
            type="text" 
            placeholder="Filtrer par nom"
            value={filters.author || ''}
            onChange={(e) => handleFilterChange('author', e.target.value || null)}
            className="w-full"
          />
        </div>
        
        {/* Type Filter */}
        <div>
          <Label htmlFor="type-filter" className="text-sm font-medium mb-1 block">
            Type
          </Label>
          <Select 
            value={filters.type || ''} 
            onValueChange={(value) => handleFilterChange('type', value !== 'all' ? value : null)}
          >
            <SelectTrigger id="type-filter" className="w-full">
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;