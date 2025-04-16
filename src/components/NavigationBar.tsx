
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="bg-vintage-paper border-b border-vintage-dark/20 py-4 shadow-sm mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="flex space-x-8">
            <Link 
              to="/" 
              className="text-lg font-medium text-vintage-blue hover:text-vintage-accent transition-colors"
            >
              Accueil
            </Link>
            <span className="text-vintage-dark/30">|</span>
            <Link 
              to="/lettres" 
              className="text-lg font-medium text-vintage-blue hover:text-vintage-accent transition-colors"
            >
              Liste des Témoignages
            </Link>
            <span className="text-vintage-dark/30">|</span>
            <Link 
              to="/hopital" 
              className="text-lg font-medium text-vintage-blue hover:text-vintage-accent transition-colors"
            >
              L'hôpital Bénévole Rigot
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
