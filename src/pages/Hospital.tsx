import NavigationBar from '@/components/NavigationBar';
import BackToTop from '@/components/BackToTop';

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
            <p className="text-gray-700 mb-3">
              Les hôpitaux bénévoles recevaient un financement sous la forme de prix de journée forfaitaire.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-12">
            <h2 className="font-serif text-2xl font-bold mb-4 text-vintage-blue">L'établissement Rigot</h2>
            <p className="text-gray-700 mb-3">
              La maison dite "de la Roselière", à Fontaines-sur-Saône (Rhône), est le lieu d'habitation d'Ernest Rigot, avocat issu d'une famille de notaires. Lorsque la guerre éclate en 1914, Ernest Rigot, âgé de 37 ans, est célibataire (il se marie en 1915). Ses parents étant décédés, il a hérité de la grande maison familiale.
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

          {/* Interactive map component */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-12">
            <h2 className="font-serif text-2xl font-bold mb-4 text-vintage-blue">Localisation de l'hôpital</h2>
            <div className="aspect-video overflow-hidden rounded-lg shadow-lg border border-gray-300">
              <iframe 
                src="https://www.oldmapsonline.org/fr/maps/6ec60904-d201-4b91-b78d-0ccc715c7241/compare?gid=a91ef686-4b40-436f-97b1-530249877412#position=15.7841/45.83706/4.84552&year=1841" 
                width="100%" 
                height="100%" 
                allow="fullscreen" 
                className="w-full h-full" 
                title="Carte historique de Fontaines-sur-Saône"
              ></iframe>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Carte de la région de Fontaines-sur-Saône (Rhône) où se situait l'hôpital bénévole.
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
              <span className="font-bold">Administration</span> : Ernest Rigot.
            </p>
            <p className="text-gray-700 mb-3">
              <span className="font-bold">Direction</span> : Mme. Callies de Salies.
            </p>
            <p className="text-gray-700 mb-3">
              <span className="font-bold">Infirmières de la Croix-rouge</span> : Mme. Jouve, Mlle. Germain(e?), Mlle. Meyer, Mlle. Magnin (Magnien ? Maguin ?), Mme. Talon.
            </p>
            <p className="text-gray-700 mb-3">
              <span className="font-bold">Soeurs infirmières</span> : Soeur St-Jean, soeur Julie, soeur Sacré-Coeur, soeur Xavier, soeur Philomène.
            </p>
            <p className="text-gray-700 mb-3">
              <span className="font-bold">Docteurs</span> : Major Fléchet, Dr. Moindrot.
            </p>
            <p className="text-gray-700 mb-3">
              <span className="font-bold">Infirmier</span> : Abbé Chachuat.
            </p>
            <p className="text-gray-700 mb-3">
              <span className="font-bold">Personnel de service</span> : Mlle Caron/Sarron/Sarrou, Mme. Dupuis/Dupuy, Mlle. Mélanie.
            </p>
            <p className="text-gray-700 mb-3">
              <span className="font-bold">Cuisine</span> : Marie, Maria.
            </p>
            <p className="text-gray-700 mb-3">
              <span className="font-bold">Comptable</span> : M. Simon.
            </p>
            <p className="text-gray-700 mb-3">
              <span className="font-bold">Reste à classer</span> : Mme. Couson, Mme. Chalou.
            </p>
          </div>

          <div className="bg-vintage-paper p-4 border border-gray-300 rounded-lg shadow-md mb-12 justify-center items-center">
            <div className="flex justify-center items-center">
              <img src="/assets/photos/groupe.jpg"></img>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              La religieuse assise devant au centre est probablement une soeur de Saint-Joseph de Lyon.<br></br> Les deux infirmières en arrière sont probablement des infirmières de la Croix-rouge.
            </p>
          </div>
          
        </div>
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© Alexandre Cochard - 2025</p>
        </footer>
      </div>
      <BackToTop />
    </div>
  );
};

export default Hospital;