
import { Link } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';

const Home = () => {
  return (
    <div className="min-h-screen bg-vintage-light">
      <NavigationBar />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-vintage-blue">
              Livre d'Or des Poilus
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une collection de témoignages et messages des soldats français
              blessés durant la Première Guerre Mondiale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="font-serif text-2xl font-bold mb-4 text-vintage-blue">Les Lettres</h2>
              <p className="text-gray-700 mb-4">
                Découvrez les témoignages émouvants des soldats soignés à l'hôpital temporaire
                de Fontaines-sur-Saône entre 1914 et 1918. Chaque entrée représente
                un moment d'histoire préservé dans le temps.
              </p>
              <Link 
                to="/lettres" 
                className="inline-block px-4 py-2 bg-vintage-accent text-white font-medium rounded-md hover:bg-vintage-accent/80 transition-colors"
              >
                Parcourir les lettres
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="font-serif text-2xl font-bold mb-4 text-vintage-blue">L'Hôpital Bénévole</h2>
              <p className="text-gray-700 mb-4">
                En savoir plus sur l'hôpital bénévole de Fontaines-sur-Saône, sa création, 
                son personnel dévoué et son rôle crucial dans les soins apportés aux soldats
                blessés du front.
              </p>
              <Link 
                to="/hopital" 
                className="inline-block px-4 py-2 bg-vintage-accent text-white font-medium rounded-md hover:bg-vintage-accent/80 transition-colors"
              >
                Découvrir l'histoire
              </Link>
            </div>
          </div>
          
          <div className="bg-vintage-paper p-6 rounded-lg shadow-md border border-gray-200 mb-12">
            <h2 className="font-serif text-2xl font-bold mb-4 text-center text-vintage-blue">À propos du projet</h2>
            <p className="text-gray-700 mb-3">
              Ce site présente la numérisation et la transcription d'un "Livre d'Or" conservé par une famille française.
              Ce document historique contient des messages et des dessins réalisés par des soldats français soignés
              dans un hôpital temporaire pendant la Première Guerre mondiale.
            </p>
            <p className="text-gray-700 mb-3">
              Chaque entrée a été soigneusement transcrite pour préserver ces témoignages pour les générations futures,
              offrant un aperçu intime de l'expérience des soldats blessés et de leur gratitude envers le personnel
              médical qui les a soignés.
            </p>
          </div>
        </div>
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© 2025 Livre d'Or des Poilus - Archive numérique des témoignages de la Grande Guerre</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
