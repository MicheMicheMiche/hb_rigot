
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';

const NavigationBar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks = [
    { to: "/", label: "Accueil" },
    { to: "/lettres", label: "Les témoignages" },
    { to: "/analyses", label: "Analyses" },
    { to: "/hopital", label: "L'hôpital bénévole Rigot" },
  ];

  const renderLinks = (onClick?: () => void) => (
    <>
      {navigationLinks.map((link, index) => (
        <div key={link.to} className="flex items-center">
          <Link 
            to={link.to} 
            className="text-lg font-medium text-vintage-blue hover:text-vintage-accent transition-colors"
            onClick={onClick}
          >
            {link.label}
          </Link>
          {index < navigationLinks.length - 1 && (
            <span className="text-vintage-dark/30 mx-4">|</span>
          )}
        </div>
      ))}
    </>
  );

  return (
    <nav className="bg-vintage-paper border-b border-vintage-dark/20 py-4 shadow-sm mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isMobile ? (
          <div className="flex justify-between items-center">
            <Link 
              to="/" 
              className="text-lg font-medium text-vintage-blue"
            >
              Accueil
            </Link>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] bg-vintage-paper">
                <div className="flex flex-col space-y-4 mt-8">
                  {renderLinks(() => setIsOpen(false))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="flex space-x-8">
              {renderLinks()}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
