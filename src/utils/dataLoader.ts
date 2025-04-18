
import { NotebookEntry, FilterOptions } from '@/types/notebook';

export async function loadNotebookEntries(): Promise<NotebookEntry[]> {
  try {
    const response = await fetch('/assets/carnet.json');
    if (!response.ok) {
      throw new Error('Failed to fetch notebook entries');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading notebook entries:', error);
    return [];
  }
}

export function filterEntries(entries: NotebookEntry[], filters: FilterOptions): NotebookEntry[] {
  return entries.filter(entry => {
    // Filter by ID
    if (filters.id !== null && entry.numero !== filters.id) {
      return false;
    }

    // Filter by date range
    if (filters.dateRange.start !== null && entry.date && entry.date < filters.dateRange.start) {
      return false;
    }
    if (filters.dateRange.end !== null && entry.date && entry.date > filters.dateRange.end) {
      return false;
    }

    // Filter by regiment
    if (filters.regiment !== null && filters.regiment !== 'all') {
      if (!entry.affectation?.regiment) return false;
      const regimentValue = entry.affectation.regiment;
      if (typeof regimentValue !== 'string' || !regimentValue.toLowerCase().includes(filters.regiment.toLowerCase())) {
        return false;
      }
    }

    // Filter by rank
    if (filters.rank !== null && filters.rank !== 'all') {
      if (!entry.affectation?.grade) return false;
      const rankValue = entry.affectation.grade;
      if (typeof rankValue !== 'string' || !rankValue.toLowerCase().includes(filters.rank.toLowerCase())) {
        return false;
      }
    }

    // Filter by author
    if (filters.author !== null) {
      if (!Array.isArray(entry.auteurs)) {
        return false;
      }
      const authorMatches = entry.auteurs.some(
        author => typeof author === 'string' && author.toLowerCase().includes(filters.author!.toLowerCase())
      );
      if (!authorMatches) {
        return false;
      }
    }
    
    // Filter by type
    if (filters.type !== null && filters.type !== 'all') {
      const typeValue = entry.type || '';
      if (typeof typeValue !== 'string' || typeValue.toLowerCase() !== filters.type.toLowerCase()) {
        return false;
      }
    }

    return true;
  });
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  try {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  } catch (error) {
    return dateString;
  }
}

export function getUniqueRegiments(entries: NotebookEntry[]): string[] {
  const regiments = new Set<string>();
  entries.forEach(entry => {
    if (entry.affectation?.regiment && typeof entry.affectation.regiment === 'string') {
      regiments.add(entry.affectation.regiment);
    }
  });
  return Array.from(regiments).sort();
}

export function getUniqueRanks(entries: NotebookEntry[]): string[] {
  const ranks = new Set<string>();
  entries.forEach(entry => {
    if (entry.affectation?.grade && typeof entry.affectation.grade === 'string') {
      ranks.add(entry.affectation.grade);
    }
  });
  return Array.from(ranks).sort();
}

export function getUniqueTypes(entries: NotebookEntry[]): string[] {
  const types = new Set<string>();
  entries.forEach(entry => {
    if (entry.type && typeof entry.type === 'string') {
      types.add(entry.type);
    }
  });
  return Array.from(types).sort();
}

export function getEntriesByDate(entries: NotebookEntry[]): Map<string, NotebookEntry[]> {
  const entriesByDate = new Map<string, NotebookEntry[]>();
  
  entries.forEach(entry => {
    const date = entry.date;
    if (!entriesByDate.has(date)) {
      entriesByDate.set(date, []);
    }
    entriesByDate.get(date)!.push(entry);
  });
  
  return entriesByDate;
}

export function getUniqueDates(entries: NotebookEntry[]): string[] {
  const dates = new Set<string>();
  entries.forEach(entry => {
    if (entry.date) {
      dates.add(entry.date);
    }
  });
  return Array.from(dates).sort();
}
