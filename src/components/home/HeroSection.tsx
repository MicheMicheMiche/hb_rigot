
import React from 'react';

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
