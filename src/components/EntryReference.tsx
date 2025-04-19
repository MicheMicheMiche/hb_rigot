
import { NotebookEntry } from '@/types/notebook';

interface EntryReferenceProps {
  entryNumber: number;
  onClick: (entryId: number) => void;
}

const EntryReference = ({ entryNumber, onClick }: EntryReferenceProps) => {
  return (
    <button
      className="inline-flex items-center justify-center px-1.5 py-0.5 mx-0.5 bg-vintage-accent/10 hover:bg-vintage-accent/20 text-vintage-accent rounded-md transition-colors"
      onClick={() => onClick(entryNumber)}
    >
      [{entryNumber}]
    </button>
  );
};

export default EntryReference;
