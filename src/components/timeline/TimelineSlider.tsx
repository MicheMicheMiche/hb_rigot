
import { Slider } from "@/components/ui/slider";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TimelineSliderProps {
  sliderValues: number[];
  getDateForPosition: (position: number) => Date;
  onSliderChange: (values: number[]) => void;
}

const TimelineSlider = ({ 
  sliderValues, 
  getDateForPosition, 
  onSliderChange 
}: TimelineSliderProps) => {
  return (
    <div className="relative z-10">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Période: </span>
        <div className="text-sm text-gray-500">
          {format(getDateForPosition(sliderValues[0]), 'dd MMM yyyy', { locale: fr })} - {format(getDateForPosition(sliderValues[1]), 'dd MMM yyyy', { locale: fr })}
        </div>
      </div>
      
      <Slider
        value={sliderValues}
        min={0}
        max={100}
        step={0.1}
        onValueChange={onSliderChange}
      />
    </div>
  );
};

export default TimelineSlider;
