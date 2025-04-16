
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
    if (filters.dateRange.start !== null && entry.date < filters.dateRange.start) {
      return false;
    }
    if (filters.dateRange.end !== null && entry.date > filters.dateRange.end) {
      return false;
    }

    // Filter by regiment
    if (filters.regiment !== null && 
        !entry.affectation.regiment.toLowerCase().includes(filters.regiment.toLowerCase())) {
      return false;
    }

    // Filter by rank
    if (filters.rank !== null && 
        !entry.affectation.grade.toLowerCase().includes(filters.rank.toLowerCase())) {
      return false;
    }

    // Filter by author
    if (filters.author !== null) {
      const authorMatches = entry.auteurs.some(
        author => author.toLowerCase().includes(filters.author!.toLowerCase())
      );
      if (!authorMatches) {
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
    if (entry.affectation.regiment) {
      regiments.add(entry.affectation.regiment);
    }
  });
  return Array.from(regiments).sort();
}

export function getUniqueRanks(entries: NotebookEntry[]): string[] {
  const ranks = new Set<string>();
  entries.forEach(entry => {
    if (entry.affectation.grade) {
      ranks.add(entry.affectation.grade);
    }
  });
  return Array.from(ranks).sort();
}
