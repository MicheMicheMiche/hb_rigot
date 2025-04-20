
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CarouselNavButtonProps {
  direction: 'previous' | 'next';
  onClick: () => void;
}

const CarouselNavButton = ({ direction, onClick }: CarouselNavButtonProps) => {
  return (
    <div className="flex flex-col justify-center px-2">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onClick} 
        className="text-vintage-accent hover:bg-vintage-accent/10 hover:text-vintage-accent"
        aria-label={direction === 'previous' ? 'Entrée précédente' : 'Entrée suivante'}
      >
        {direction === 'previous' ? <ArrowLeft /> : <ArrowRight />}
      </Button>
    </div>
  );
};

export default CarouselNavButton;
