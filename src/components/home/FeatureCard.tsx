
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string[];
  linkText: string;
  linkTo: string;
}

const FeatureCard = ({ title, description, linkText, linkTo }: FeatureCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-colors duration-300 hover:bg-vintage-paper flex flex-col">
      <div className="flex-grow">
        <h2 className="font-serif text-2xl font-bold mb-4 text-vintage-blue">{title}</h2>
        {description.map((paragraph, index) => (
          <p key={index} className="text-gray-700 mb-4">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-auto pt-4">
        <Link 
          to={linkTo} 
          className="inline-block px-4 py-2 bg-vintage-accent text-white font-medium rounded-md hover:bg-vintage-accent/80 transition-colors">
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default FeatureCard;
