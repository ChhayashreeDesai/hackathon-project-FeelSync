
import React from 'react';
import { Heart, BookHeart, Music, RefreshCw, User, Brain, Settings, Briefcase, Lightbulb } from 'lucide-react';
import TastePersona from './TastePersona';

interface IdealTypeResultsProps {
  results: any;
  onReset: () => void;
}

const IdealTypeResults: React.FC<IdealTypeResultsProps> = ({ results, onReset }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-black mb-4 font-display drop-shadow-2xl">Your Romantic Profile</h2>
        <p className="text-xl text-black/90 font-baloo drop-shadow-lg">Based on your unique cultural preferences</p>
      </div>

      <TastePersona 
        personaName={results.persona?.name || "The Authentic Romantic"}
        subtitle={results.persona?.description || "Values deep connections and meaningful experiences"}
        themeColor="pink"
      />

      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Heart className="w-8 h-8 text-pink-600" />
          <h3 className="text-2xl font-semibold text-black font-display">{results.personalityType}</h3>
        </div>
        
        <p className="text-black/90 leading-relaxed mb-6 font-baloo text-lg">{results.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/20 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-black mb-4 font-display">Key Traits You Value</h4>
            <div className="space-y-2">
              {results.traits?.map((trait: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-pink-600 flex-shrink-0" />
                  <span className="text-black/80 font-baloo">{trait}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/20 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-black mb-4 font-display">Your Ideal Match Style</h4>
            <p className="text-black/80 font-baloo leading-relaxed">{results.idealMatch}</p>
          </div>
        </div>
        
        {results.resources && results.resources.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-black mb-4 font-display">Recommended Reading</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {results.resources.map((book: string, index: number) => (
                <div key={index} className="bg-white/20 rounded-lg p-4 flex items-center space-x-3">
                  <BookHeart className="w-5 h-5 text-pink-600 flex-shrink-0" />
                  <span className="text-black/80 font-baloo text-sm">{book}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {results.song && (
        <div className="bg-gradient-to-r from-pink-500/30 to-rose-500/30 backdrop-blur-md border border-white/30 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <Music className="w-6 h-6 text-pink-700" />
                <div>
                  <h4 className="font-semibold text-black font-display">Your Love Song</h4>
                  <p className="text-pink-800">{results.song.title} - {results.song.artist}</p>
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
      <div className="mt-16 pt-8 border-t border-black/20">
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-4xl font-display font-semibold text-black mb-3 drop-shadow-2xl">
            Your Taste Insights
          </h3>
          <p className="text-xl text-black/90 font-baloo drop-shadow-lg">
            How your preferences shape your romantic style
          </p>
        </div>
        
        <div className="space-y-4">
          {[
            {
              icon: User,
              title: "Your Romantic Profile",
              content: results.insights?.crossDomain || "Your cultural preferences reveal a romantic who values depth and authenticity."
            },
            {
              icon: Brain,
              title: "Your Love Language",
              content: results.insights?.traits || "You express and receive love through shared experiences and meaningful conversations."
            },
            {
              icon: Settings,
              title: "Your Date Preferences",
              content: results.insights?.uxPrefs || "You prefer intimate settings that allow for genuine connection and personal expression."
            },
            {
              icon: Briefcase,
              title: "Relationship Style",
              content: results.insights?.careerFit || "You seek partnerships that support both personal growth and shared adventures."
            },
            {
              icon: Lightbulb,
              title: "What You're Drawn To",
              content: results.insights?.brandStrategy || "You're attracted to authenticity and partners who share your values and interests."
            }
          ].map((insight, index) => (
            <div key={index} className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-black/20 rounded-lg flex items-center justify-center">
                    <insight.icon className="w-5 h-5 text-black" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-black mb-2">
                    {insight.title}
                  </h4>
                  <p className="text-black/80 font-baloo text-sm leading-relaxed">
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
          className="inline-flex items-center space-x-2 px-6 py-3 bg-white/20 border border-white/30 rounded-lg text-black hover:bg-white/30 transition-colors font-baloo"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Discover Again</span>
        </button>
      </div>
    </div>
  );
};

export default IdealTypeResults;
