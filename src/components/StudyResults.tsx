
import React from 'react';
import { Music, BookOpen, Headphones, RefreshCw, User, Brain, Settings, Briefcase, Lightbulb } from 'lucide-react';
import TastePersona from './TastePersona';

interface StudyResultsProps {
  results: any;
  onReset: () => void;
}

const StudyResults: React.FC<StudyResultsProps> = ({ results, onReset }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4 font-display drop-shadow-2xl">Your Study Vibe</h2>
        <p className="text-xl text-white/90 font-baloo drop-shadow-lg">Curated for your perfect focus session</p>
      </div>

      <TastePersona 
        personaName={results.persona?.name || "The Focused Scholar"}
        subtitle={results.persona?.description || "Masters deep concentration with mindful breaks"}
        themeColor="purple"
      />

      <div className="grid gap-8">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Music className="w-8 h-8 text-orange-400" />
            <h3 className="text-2xl font-semibold text-white font-display">Your Study Soundtrack</h3>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-3 font-display">Genre: {results.musicGenre}</h4>
            <p className="text-white/80 font-baloo mb-4">Perfect for maintaining focus and motivation</p>
            
            <h5 className="font-semibold text-white mb-2 font-display">Recommended Artists:</h5>
            <div className="flex flex-wrap gap-2">
              {results.artists?.map((artist: string, index: number) => (
                <span key={index} className="bg-orange-500/20 text-orange-200 px-3 py-1 rounded-full text-sm font-baloo">
                  {artist}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <h3 className="text-2xl font-semibold text-white font-display">Study Tools & Tips</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 font-display">Recommended Tools</h4>
              <ul className="space-y-2">
                {results.tools?.map((tool: string, index: number) => (
                  <li key={index} className="text-white/80 font-baloo flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 font-display">Study Tips</h4>
              <ul className="space-y-2">
                {results.tips?.map((tip: string, index: number) => (
                  <li key={index} className="text-white/80 font-baloo flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {results.song && (
        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <Headphones className="w-6 h-6 text-orange-400" />
                <div>
                  <h4 className="font-semibold text-white font-display">Your Focus Track</h4>
                  <p className="text-orange-300">{results.song.title} - {results.song.artist}</p>
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
            How your preferences enhance your learning style
          </p>
        </div>
        
        <div className="space-y-4">
          {[
            {
              icon: User,
              title: "Your Learning Profile",
              content: results.insights?.crossDomain || "Your diverse interests create a rich learning environment that enhances focus."
            },
            {
              icon: Brain,
              title: "Your Focus Patterns",
              content: results.insights?.traits || "You learn best with background elements that match your cultural preferences."
            },
            {
              icon: Settings,
              title: "Your Study Environment",
              content: results.insights?.uxPrefs || "You thrive in organized spaces with personalized touches that reflect your taste."
            },
            {
              icon: Briefcase,
              title: "Academic Strengths",
              content: results.insights?.careerFit || "Your learning style aligns with fields that value both depth and creative thinking."
            },
            {
              icon: Lightbulb,
              title: "Motivation Style",
              content: results.insights?.brandStrategy || "You're motivated by authentic content that connects to your personal interests."
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
          <span>Find New Vibe</span>
        </button>
      </div>
    </div>
  );
};

export default StudyResults;
