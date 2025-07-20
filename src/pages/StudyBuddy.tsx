
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TasteInputEnhanced from '@/components/TasteInputEnhanced';
import StudyResults from '@/components/StudyResults';
import { ChevronDown } from 'lucide-react';
import { useTasteAnalysis } from '@/hooks/useTasteAnalysis';

const StudyBuddy = () => {
  const [results, setResults] = useState(null);
  const { analyzeTaste, loading, error } = useTasteAnalysis();

  const handleSubmit = async (tastes: any) => {
    const result = await analyzeTaste({
      ...tastes,
      module: 'study'
    });
    
    if (result) {
      // Transform the result to match existing StudyResults component structure
      const transformedResult = {
        musicGenre: result.moduleData.musicGenre,
        artists: result.moduleData.artists,
        tools: result.moduleData.tools,
        tips: result.moduleData.tips,
        song: result.recommendations.songs[0] || null
      };
      setResults(transformedResult);
    }
  };

  const scrollToInput = () => {
    document.getElementById('study-input')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 -z-10">
        <img 
          src="/lovable-uploads/962f2b08-eb9f-488e-82a0-13193f650e13.png" 
          alt="Library" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <Header />
      
      {/* Hero Section */}
      <div id="study-buddy-main" className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
            Study Buddy
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 font-baloo">
            Boost your focus with tailored music and productivity tools. 
            Create the perfect study environment based on your preferences.
          </p>
          
          <button
            onClick={scrollToInput}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-lg text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>Find My Vibe</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div id="study-input" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {error && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-white">
                Error: {error}
              </div>
            )}
            
            {!results ? (
              <TasteInputEnhanced 
                onSubmit={handleSubmit} 
                loading={loading}
                buttonText="Find My Vibe"
                loadingText="Curating your study environment..."
                showSubject={true}
                showMood={true}
                buttonColor="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                themeColor="warm"
                module="study"
              />
            ) : (
              <StudyResults results={results} onReset={() => setResults(null)} />
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default StudyBuddy;
