
import React from 'react';
import { Sparkles } from 'lucide-react';

interface TastePersonaProps {
  personaName: string;
  subtitle: string;
  themeColor?: 'blue' | 'orange' | 'pink' | 'purple';
}

const TastePersona: React.FC<TastePersonaProps> = ({ 
  personaName, 
  subtitle, 
  themeColor = 'blue' 
}) => {
  const getThemeClasses = () => {
    switch (themeColor) {
      case 'orange':
        return {
          gradient: 'from-orange-500/30 to-pink-500/30',
          icon: 'text-orange-400',
          text: 'text-black'
        };
      case 'pink':
        return {
          gradient: 'from-pink-500/30 to-rose-500/30',
          icon: 'text-pink-600',
          text: 'text-black'
        };
      case 'purple':
        return {
          gradient: 'from-purple-500/30 to-blue-500/30',
          icon: 'text-purple-400',
          text: 'text-white'
        };
      default:
        return {
          gradient: 'from-blue-500/30 to-purple-500/30',
          icon: 'text-blue-400',
          text: 'text-white'
        };
    }
  };

  const theme = getThemeClasses();

  return (
    <div className={`bg-gradient-to-r ${theme.gradient} backdrop-blur-md border border-white/30 rounded-2xl p-8 text-center`}>
      <div className="flex items-center justify-center mb-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full">
          <Sparkles className={`w-8 h-8 ${theme.icon}`} />
        </div>
      </div>
      
      <h3 className={`text-2xl font-bold ${theme.text} mb-2 font-display`}>
        {personaName}
      </h3>
      
      <p className={`${theme.text}/80 text-lg font-baloo`}>
        {subtitle}
      </p>
    </div>
  );
};

export default TastePersona;
