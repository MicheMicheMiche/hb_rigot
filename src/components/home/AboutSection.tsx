
const AboutSection = () => {
  return (
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
  );
};

export default AboutSection;
