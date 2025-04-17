import { Link } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';

const Home = () => {
  return (
    <div className="min-h-screen bg-vintage-light">
      <NavigationBar />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-vintage-blue">
              Livre d'Or - Hôpital bénévole Rigot
            </h1>
            <h2 className="font-serif text-3xl mb-2 font-bold text-vintage-blue">
              HB n°194 <sup>bis</sup>, Fontaines-sur-Saône
            </h2>
            <h2 className="font-serif text-2xl font-bold mb-6 text-vintage-blue">
              17 octobre 1914 - 24 janvier 1917
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Une collection historique de témoignages de poilus soignés à l'hôpital bénévole Rigot, maison de particulier transformée en centre de soins durant la Grande Guerre.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-colors duration-300 hover:bg-vintage-paper flex flex-col">
              <div className="flex-grow">
                <h2 className="font-serif text-2xl font-bold mb-4 text-vintage-blue">Les témoignages</h2>
                <p className="text-gray-700 mb-4">
                  <span className="font-bold">200 témoignages</span> de poilus passés par l'hôpital bénévole de Fontaînes-sur-Saône - dit Rigot - entre fin 1914 et début 1917.
                  Chacun d'entre eux a été soigneusement retranscrit et numérisé.
                </p>
                <p className="text-gray-700 mb-4">
                  Simples soldats, sergents, caporaux, fantassins, aérostiers, dragons... tous s'expriment de façon personnelle. Messages de remerciements, poèmes, lettres d'éloges à leurs camarades ; d'un trait hâtif ou d'une plume appliquée...
                </p>
              </div>
              <div className="mt-auto pt-4">
                <Link 
                  to="/lettres" 
                  className="inline-block px-4 py-2 bg-vintage-accent text-white font-medium rounded-md hover:bg-vintage-accent/80 transition-colors">
                  Parcourir les témoignages
              </Link>
              </div>
            </div>
    
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-colors duration-300 hover:bg-vintage-paper flex flex-col">
              <div className="flex-grow">
                <h2 className="font-serif text-2xl font-bold mb-4 text-vintage-blue">L'Hôpital Bénévole</h2>
                <p className="text-gray-700 mb-4">
                  Au cours de la Première guerre mondiale, de nombreux hôpitaux temporaires sont constitués à l'arrière du front.
                  L'hôpital bénévole n°194 <sup>bis</sup> est établi à Fontaines-sur-Saône, par Ernest Rigot qui met sa demeure à disposition de la Croix-Rouge et de l'armée.
                </p>
                <p className="text-gray-700 mb-4">
                  En savoir plus sur l'hôpital Rigot : l'ébalissement, le personnel, son rôle dans le système hospitalier durant la Grande guerre. 
                </p>
              </div>
              <div className="mt-auto pt-4">
                <Link 
                  to="/hopital" 
                  className="inline-block px-4 py-2 bg-vintage-accent text-white font-medium rounded-md hover:bg-vintage-accent/80 transition-colors">
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-vintage-paper p-4 border border-gray-300 rounded-lg shadow-md mb-12 flex justify-center items-center">
            <div className="flex justify-center items-center max-w-lg">
              <img src="/assets/photos/front1.jpg"></img>
              <img src="/assets/photos/front2.jpg"></img>
            </div>
          </div>
          
          <div className="bg-vintage-paper p-6 rounded-lg shadow-md border border-gray-200 mb-12 transition-colors duration-300 hover:bg-vintage-paper/80">
            <h2 className="font-serif text-2xl font-bold mb-8 text-center text-vintage-blue">À propos du projet</h2>
            <p className="text-gray-700 mb-3">
              <span className="font-bold">Ernest Rigot</span>, né Marie Joseph Laurent Ernest Rigot le 13 juin 1877 à Lyon et décédé le 20 novembre 1961 à Lyon, était mon arrière-arrière-grand-père.
            </p>
            <p className="text-gray-700 mb-3">
              Avocat issu d'une famille de notaires, il disposait d'une grande maison à <span className="font-bold">Fontaines-sur-Saône (Rhône)</span>, transformée à l'entrée en guerre en hôpital bénévole.
              Les quelques centaines de poilus qui y fûrent soignés ont rempli et signé un  <span className="font-bold">carnet</span> à la fin de leur séjour. Ils y témoignent leur reconnaissance auprès du personnel et chérissent la parenthèse d'accalmie qu'a constitué leur séjour avant de reprendre les combats. Certains citent même "l'esprit de famille" qu'ils y ont trouvé. Ce carnet a été soigneusement conservé par ma famille. 
            </p>
            <p className="text-gray-700 mb-6">
              Ce site rassemble chacun de ces témoignages, numérisé et transcrit, dans un souci de préservation pour les générations futures.
              Ils sont ceux de poilus, jeunes et moins jeunes, issus de toutes catégories sociales et des quatre coins de la France, reconnaissants d'avoir pu se reposer loin des tranchées, ne serait-ce que pour quelques jours, avant de se replonger dans l'enfer de la guerre.
            </p>
            <p className="text-gray-700 mb-6 text-center font-bold">
              ⁂ ⁂ ⁂
            </p>
            <p className="text-gray-800 mb-3 font-medium">
              A noter que ce carnet n'est PAS un document administatif recensant de façon exhaustive tous les blessés traités dans cet hôpital. Il s'agit bien d'un livre d'or, rempli et signé par ceux qui le souhaitaient, avant leur départ.
            </p>
            <p className="text-gray-800 mb-3 font-medium">
              Dans les retranscriptions, les fautes d'orthographe ou de grammaire ont été corrigées pour des questions de lisibilité, mais j'ai tâché de conserver la structure des phrases, d'époque, ainsi que leur syntaxe. Certains passages, en particulier les signatures, sont encore en cours de déchiffrage.<br></br>Ils sont marqués d'un « (?) ».
            </p>
            <p className="text-gray-800 mb-3 font-medium">
              Chaque témoignage retranscrit est systématiquement accompagné d'une photo de l'original.
            </p>
          </div>
        </div>
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© Alexandre Cochard</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;