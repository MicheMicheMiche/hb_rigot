
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

const BackToTop = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return showBackToTop ? (
    <Button
      className="fixed bottom-6 right-6 rounded-full bg-vintage-accent text-white shadow-lg hover:bg-vintage-accent/80 h-12 w-12 p-0 z-50"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowUp size={24} />
    </Button>
  ) : null;
};

export default BackToTop;
