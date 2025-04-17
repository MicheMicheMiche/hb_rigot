import NavigationBar from '@/components/NavigationBar';

const Hospital = () => {
  return (
    <div className="min-h-screen bg-vintage-light">
      <NavigationBar />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-vintage-blue">
              L'Hôpital Bénévole n°194 <sup>bis</sup>, dit Rigot
            </h1>
            
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-12">
            <h2 className="font-serif text-2xl font-bold mb-4 text-vintage-blue">Les hôpitaux bénévoles durant la Guerre de 14-18 </h2>
            <p className="text-gray-700 mb-3">
              Ils sont l'héritage du système "d'ambulances" de la guerre de 1870 (le terme est d'ailleurs employé dans de nombreux témoignages du carnet).
              Ces hôpitaux bénévoles sont mis sur pied dans des couvents, des écoles, des hôtels, des usines, des théâtres mais aussi chez des particuliers. Ils varient largement en taille : de quelques dizaines de lits à plusieurs centaines.
              Les numéros d'identification (n°194 bis pour celui de Fontaines-sur-Saône) sont attribués par l'administration militaire de la région.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-12">
            <h2 className="font-serif text-2xl font-bold mb-4 text-vintage-blue">L'établissement Rigot</h2>
            <p className="text-gray-700 mb-3">
              La maison dite "de la Roselierre", à Fontaines-sur-Saône (Rhône), est le lieu d'habitation d'Ernest Rigot, avocat issu d'une famille de notaires. Lorsque la guerre éclate en 1914, Ernest Rigot, âgé de 37 ans, est célibataire (il se marie en 1915). Ses parents étant décédés, il a hérité de la grande maison familiale.
              Fontaines est une commune tranquille de bord de Saône, à quelques kilomètres au Nord de Lyon.
            </p>
            <p className="text-gray-700 mb-3">
              En raison de sa taille, elle est idéale pour y faire installer un hôpital bénévole, dépendant de l'hôpital Desgenettes de Lyon. Ernest Rigot met ainsi sa demeure à disposition de la Croix-Rouge et de l'armée française, et s'affaire à l'administrer pendant trois ans.
            </p>
            <p className="text-gray-700 mb-3">
              30 lits y sont aménagés afin d'accueillir soldats blessés et malades.
            </p>
            <p className="text-gray-700 mb-3">
              Aujourd'hui, cette maison n'est plus dans la famille. Le terrain a été aménagé et des immeubles d'habitation ont été construits dans l'ancien jardin.
            </p>
          </div>
          
          <div className="bg-vintage-paper p-4 border border-gray-300 rounded-lg shadow-md mb-12 flex justify-center items-center">
            <div className="flex justify-center items-center">
              <img src="/assets/photos/hopital.jpg"></img>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-12">
            <h2 className="font-serif text-2xl font-bold mb-4 text-vintage-blue">Le personnel</h2>
            <p className="text-gray-700 mb-3">
              Ernest Rigot dirige et administre l'hôpital bénévole.
            </p>
            <p className="text-gray-700 mb-3">
              Parmi le personnel soignant régulièrement cité, l'on retrouve des Soeurs Franciscaines (Soeurs Saint-Jean, Sacré-Coeur et Xavier), des infirmières de la Croix-Rouge (Mme. Jouve), un abbé infirmier (M. Chachuat), ainsi que des médecins militaires (Major Jouvet).
            </p>
            <p className="text-gray-700 mb-3">
              Les poilus évoquent également le personnel de maison, en particulier les cuisinières.
            </p>
          </div>

          <div className="bg-vintage-paper p-4 border border-gray-300 rounded-lg shadow-md mb-12 flex justify-center items-center">
            <div className="flex justify-center items-center">
              <img src="/assets/photos/groupe.jpg"></img>
            </div>
          </div>
          
        </div>
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© Alexandre Cochard</p>
        </footer>
      </div>
    </div>
  );
};

export default Hospital;