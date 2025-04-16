
import NavigationBar from '@/components/NavigationBar';

const Hospital = () => {
  return (
    <div className="min-h-screen bg-vintage-light">
      <NavigationBar />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-vintage-blue">
              L'Hôpital Bénévole
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              L'histoire de l'hôpital temporaire de Fontaines-sur-Saône
              et son rôle pendant la Première Guerre Mondiale.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-12">
            <h2 className="font-serif text-2xl font-bold mb-4 text-vintage-blue">L'établissement</h2>
            <p className="text-gray-700 mb-3">
              L'hôpital temporaire de Fontaines-sur-Saône a été établi en 1914 dans la propriété
              de Monsieur Rigot, qui a généreusement mis son établissement à disposition pour les
              soins des soldats blessés sur le front.
            </p>
            <p className="text-gray-700 mb-3">
              Rapidement aménagé pour accueillir des dizaines de lits, cet hôpital bénévole
              a joué un rôle crucial dans le réseau des soins apportés aux combattants français,
              permettant de désengorger les hôpitaux militaires proches des zones de combat.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-12">
            <h2 className="font-serif text-2xl font-bold mb-4 text-vintage-blue">Le personnel soignant</h2>
            <p className="text-gray-700 mb-3">
              Le personnel de l'hôpital était principalement composé de volontaires civils,
              notamment des sœurs Franciscaines et des dames de la Croix-Rouge comme Madame Jauve,
              souvent mentionnées dans les témoignages des soldats.
            </p>
            <p className="text-gray-700 mb-3">
              Ces femmes dévouées ont travaillé sans relâche pour soigner les blessés, leur apportant
              non seulement des soins médicaux mais aussi un soutien moral essentiel dans ces moments difficiles.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-12">
            <h2 className="font-serif text-2xl font-bold mb-4 text-vintage-blue">Le Livre d'Or</h2>
            <p className="text-gray-700 mb-3">
              Le Livre d'Or conservé jusqu'à aujourd'hui contient les témoignages des soldats
              qui ont séjourné dans cet hôpital entre 1914 et 1917. Ces messages constituent
              un témoignage précieux de la gratitude des combattants envers ceux qui les ont soignés.
            </p>
            <p className="text-gray-700 mb-3">
              Ce recueil unique nous donne aujourd'hui un aperçu intime de l'expérience des soldats
              blessés, de leurs préoccupations, de leurs espoirs et de leur patriotisme durant
              cette période sombre de l'histoire.
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

export default Hospital;
