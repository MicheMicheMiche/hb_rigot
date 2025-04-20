
import { useEffect, useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import { NotebookEntry as EntryType } from '@/types/notebook';
import { loadNotebookEntries } from '@/utils/dataLoader';
import BackToTop from '@/components/BackToTop';
import HeroSection from '@/components/home/HeroSection';
import FeatureCard from '@/components/home/FeatureCard';
import RandomEntrySection from '@/components/home/RandomEntrySection';
import PhotoGallery from '@/components/home/PhotoGallery';
import AboutSection from '@/components/home/AboutSection';

const Home = () => {
  const [randomEntry, setRandomEntry] = useState<EntryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<EntryType[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const loadedEntries = await loadNotebookEntries();
        setEntries(loadedEntries);
        
        if (loadedEntries.length > 0) {
          const randomIndex = Math.floor(Math.random() * loadedEntries.length);
          setRandomEntry(loadedEntries[randomIndex]);
        }
      } catch (error) {
        console.error('Error loading entries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const getRandomEntry = () => {
    if (entries.length > 0) {
      setLoading(true);
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * entries.length);
      } while (entries.length > 1 && randomEntry && entries[newIndex].numero === randomEntry.numero);
      
      setRandomEntry(entries[newIndex]);
      setLoading(false);
    }
  };

  const features = [
    {
      title: "Les témoignages",
      description: [
        "199 témoignages de poilus passés par l'hôpital bénévole de Fontaînes-sur-Saône - dit Rigot - entre fin 1914 et début 1917. Chacun d'entre eux a été soigneusement retranscrit et numérisé.",
        "Simples soldats, sergents, caporaux, fantassins, aérostiers, dragons... tous s'expriment de façon personnelle. Messages de remerciements, poèmes, lettres d'éloges à leurs camarades ; d'un trait hâtif ou d'une plume appliquée..."
      ],
      linkText: "Parcourir les témoignages",
      linkTo: "/lettres"
    },
    {
      title: "Quelques analyses thématiques",
      description: [
        "Ces témoignages inédits mettent à nu les pensées de soldats issus de toutes origines et catégories sociales, acteurs de la transformation de la société française au sortir de la Belle Epoque.",
        "Quelques commentaires sur les thèmes abordés dans ces témoignages et leur façon de s'exprimer."
      ],
      linkText: "Lire les analyses",
      linkTo: "/analyses"
    },
    {
      title: "L'Hôpital Bénévole",
      description: [
        "Au cours de la Première guerre mondiale, de nombreux hôpitaux temporaires sont constitués à l'arrière du front. L'hôpital bénévole n°194 bis est établi à Fontaines-sur-Saône, par Ernest Rigot qui met sa demeure à disposition de la Croix-Rouge et de l'armée.",
        "En savoir plus sur l'hôpital Rigot : l'établissement, le personnel, son rôle dans le système hospitalier dans la Grande Guerre."
      ],
      linkText: "En savoir plus",
      linkTo: "/hopital"
    }
  ];

  return (
    <div className="min-h-screen bg-vintage-light">
      <NavigationBar />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <HeroSection />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>

          <RandomEntrySection 
            randomEntry={randomEntry} 
            loading={loading} 
            onRefresh={getRandomEntry} 
          />
          
          <PhotoGallery />
          <AboutSection />
        </div>
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© Alexandre Cochard - 2025</p>
        </footer>
      </div>
      <BackToTop />
    </div>
  );
};

export default Home;
