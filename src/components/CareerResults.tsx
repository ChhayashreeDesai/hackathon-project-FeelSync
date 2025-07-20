
import React from 'react';
import { cn } from '@/lib/utils';
import { Briefcase, GraduationCap, BookOpen, Wrench, Music, RefreshCw } from 'lucide-react';
import TastePersona from './TastePersona';

interface CareerResultsProps {
  results: any;
  onReset: () => void;
}

const CareerResults: React.FC<CareerResultsProps> = ({ results, onReset }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4 font-display drop-shadow-2xl">Your Career Path</h2>
        <p className="text-xl text-white/90 font-baloo drop-shadow-lg">Curated based on your unique tastes</p>
      </div>

      <TastePersona 
        personaName={results.persona?.name || "The Creative Strategist"}
        subtitle={results.persona?.description || "Blends analytical thinking with innovative solutions"}
        themeColor="blue"
      />

      <div className="grid gap-8">
        {results.careers?.map((career: any, index: number) => (
          <div key={index} className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Briefcase className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-semibold text-black font-display">{career.title}</h3>
            </div>
            
            <p className="text-black/90 leading-relaxed mb-6 font-baloo">{career.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <GraduationCap className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-black">Course</h4>
                </div>
                <p className="text-black/80 text-sm">{career.starterKit?.course}</p>
              </div>
              
              <div className="bg-white/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-semibold text-black">Book</h4>
                </div>
                <p className="text-black/80 text-sm">{career.starterKit?.book}</p>
              </div>
              
              <div className="bg-white/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Wrench className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-black">Tool</h4>
                </div>
                <p className="text-black/80 text-sm">{career.starterKit?.tool}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {results.song && (
        <div className="bg-gradient-to-r from-purple-500/30 to-blue-500/30 backdrop-blur-md border border-white/30 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <Music className="w-6 h-6 text-purple-700" />
                <div>
                  <h4 className="font-semibold text-black font-display">Your Success Anthem</h4>
                  <p className="text-purple-800">{results.song.title} - {results.song.artist}</p>
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
            What your cultural preferences reveal about you
          </p>
        </div>
        
        <div className="space-y-4">
          {[
            {
              icon: Briefcase,
              title: "Your Cultural Profile",
              content: results.insights?.crossDomain || "Your diverse interests reveal a multifaceted personality."
            },
            {
              icon: Briefcase,
              title: "How You Work & Think",
              content: results.insights?.traits || "You balance analytical thinking with creative intuition."
            },
            {
              icon: Briefcase,
              title: "Your Digital Preferences",
              content: results.insights?.uxPrefs || "You appreciate clean, intuitive interfaces with customization options."
            },
            {
              icon: Briefcase,
              title: "Perfect Career Fit",
              content: results.insights?.careerFit || "You'd thrive in roles combining analytical skills with creative problem-solving."
            },
            {
              icon: Briefcase,
              title: "What Brands Should Know About You",
              content: results.insights?.brandStrategy || "You value authenticity and meaningful experiences over flashy marketing."
            }
          ].map((insight, index) => (
            <div key={index} className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6">
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
          className="inline-flex items-center space-x-2 px-6 py-3 bg-white/20 border border-white/30 rounded-lg text-white hover:bg-white/30 transition-colors font-baloo"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Explore Again</span>
        </button>
      </div>
    </div>
  );
};

export default CareerResults;
