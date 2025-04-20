
import { ScrollArea } from "@/components/ui/scroll-area";

const PhotoGallery = () => {
  return (
    <div className="bg-vintage-paper p-4 border border-gray-300 rounded-lg shadow-md mb-12">
      <ScrollArea className="w-full h-auto">
        <div className="flex justify-center space-x-4 pb-2">
          <img src="/assets/photos/front1.jpg" alt="Photo historique 1" className="w-96 object-contain" />
          <img src="/assets/photos/front2.jpg" alt="Photo historique 2" className="w-96 object-contain" />
        </div>
      </ScrollArea>
    </div>
  );
};

export default PhotoGallery;
