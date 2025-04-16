export interface NotebookEntry {
  numero: number;
  date: string;
  texte: string;
  auteurs: string[];
  affectation: {
    regiment: string;
    affect2: string;
    affect3: string;
    affect4: string;
    grade: string;
  };
  type: string;
}

export interface FilterOptions {
  id: number | null;
  dateRange: { start: string | null; end: string | null };
  regiment: string | null;
  rank: string | null;
  author: string | null;
  type: string | null;
}
