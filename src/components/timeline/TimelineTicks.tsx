
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TimelineTicksProps {
  getPositionForDate: (date: Date) => number;
}

const TimelineTicks = ({ getPositionForDate }: TimelineTicksProps) => {
  const generateTimelineTicks = () => {
    const ticks = [];
    
    for (let year = 1915; year <= 1917; year++) {
      const date = new Date(year, 0, 1);
      const position = getPositionForDate(date);
      
      if (position >= 0 && position <= 100) {
        ticks.push({
          date,
          position,
          isYear: true,
          label: year.toString(),
        });
      }
      
      const highlightMonths = [3, 6, 9];
      
      for (const month of highlightMonths) {
        const monthDate = new Date(year, month, 1);
        const monthPosition = getPositionForDate(monthDate);
        
        if (monthPosition >= 0 && monthPosition < 100) {
          ticks.push({
            date: monthDate,
            position: monthPosition,
            isYear: false,
            label: format(monthDate, 'MMM', { locale: fr }),
          });
        }
      }
    }
    
    return ticks.sort((a, b) => a.position - b.position);
  };

  return (
    <>
      {generateTimelineTicks().map((tick, index) => (
        <div 
          key={index} 
          className={`absolute z-0 ${tick.isYear ? 'h-full top-4 border-r border-gray-300' : 'h-[30%] top-[40%] border-r border-gray-200'}`}
          style={{ left: `${tick.position}%` }}
        >
          <span className={`absolute -top-5 transform -translate-x-1/2 text-xs ${tick.isYear ? 'text-gray-500' : 'text-gray-400'}`}>
            {tick.label}
          </span>
        </div>
      ))}
    </>
  );
};

export default TimelineTicks;
