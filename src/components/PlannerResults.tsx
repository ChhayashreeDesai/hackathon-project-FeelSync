
import React from 'react';
import { cn } from '@/lib/utils';
import { Sun, Clock, Moon, Music, RefreshCw, User, Brain, Settings, Briefcase, Lightbulb } from 'lucide-react';
import TastePersona from './TastePersona';

interface PlannerResultsProps {
  results: any;
  onReset: () => void;
}

const PlannerResults: React.FC<PlannerResultsProps> = ({ results, onReset }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4 font-display drop-shadow-2xl">Your Perfect Day</h2>
        <p className="text-xl text-white/90 font-baloo drop-shadow-lg">Tailored to your {results.mood?.toLowerCase()} mood</p>
      </div>

      <TastePersona 
        personaName={results.persona?.name || "The Mindful Organizer"}
        subtitle={results.persona?.description || "Balances productivity with personal well-being"}
        themeColor="orange"
      />

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
        <div className="grid gap-6">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-3">
              <Sun className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-semibold text-black font-display">Morning</h3>
            </div>
            <p className="text-black/80 font-baloo">{results.schedule?.morning}</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-black font-display">Midday</h3>
            </div>
            <p className="text-black/80 font-baloo">{results.schedule?.midday}</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-3">
              <Moon className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold text-black font-display">Evening</h3>
            </div>
            <p className="text-black/80 font-baloo">{results.schedule?.evening}</p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/20 text-center">
          <h4 className="font-medium text-black mb-4 font-display">Your Daily Inspiration</h4>
          <blockquote className="text-lg text-black/90 italic mb-6 font-baloo">
            "{results.quote}"
          </blockquote>
        </div>
      </div>

      {results.song && (
        <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <Music className="w-6 h-6 text-orange-400" />
                <div>
                  <h4 className="font-semibold text-black font-display">Song of the Day</h4>
                  <p className="text-orange-600">{results.song.title} - {results.song.artist}</p>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-full md:w-80 aspect-video rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${results.song.videoId}`}
                  title={results.song.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Personalized Taste Insight Summary */}
      <div className="mt-16 pt-8 border-t border-white/20">
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-4xl font-display font-semibold text-white mb-3 drop-shadow-2xl">
            Your Taste Insights  
          </h3>
          <p className="text-xl text-white/90 font-baloo drop-shadow-lg">
            How your preferences shape your ideal day
          </p>
        </div>
        
        <div className="space-y-4">
          {[
            {
              icon: User,
              title: "Your Planning Style",
              content: results.insights?.crossDomain || "Your cultural preferences reveal someone who values both structure and flexibility."
            },
            {
              icon: Brain,
              title: "Your Energy Patterns",
              content: results.insights?.traits || "You balance focused productivity with meaningful breaks and personal time."
            },
            {
              icon: Settings,
              title: "Your Ideal Environment",
              content: results.insights?.uxPrefs || "You thrive in spaces that feel both organized and personally meaningful."
            },
            {
              icon: Briefcase,
              title: "Work-Life Integration",
              content: results.insights?.careerFit || "Your daily preferences align with careers that value both achievement and well-being."
            },
            {
              icon: Lightbulb,
              title: "Your Lifestyle Brand", 
              content: results.insights?.brandStrategy || "You're drawn to brands that emphasize authenticity and meaningful experiences."
            }
          ].map((insight, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <insight.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-white mb-2">
                    {insight.title}
                  </h4>
                  <p className="text-white/80 font-baloo text-sm leading-relaxed">
                    {insight.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onReset}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors font-baloo"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Plan Another Day</span>
        </button>
      </div>
    </div>
  );
};

export default PlannerResults;
