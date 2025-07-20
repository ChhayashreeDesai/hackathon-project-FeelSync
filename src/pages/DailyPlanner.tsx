
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TasteInputEnhanced from '@/components/TasteInputEnhanced';
import PlannerResults from '@/components/PlannerResults';
import { ChevronDown } from 'lucide-react';
import { useTasteAnalysis } from '@/hooks/useTasteAnalysis';

const DailyPlanner = () => {
  const [results, setResults] = useState(null);
  const { analyzeTaste, loading, error } = useTasteAnalysis();

  const handleSubmit = async (tastes: any) => {
    const result = await analyzeTaste({
      ...tastes,
      module: 'planner'
    });
    
    if (result) {
      // Transform the result to match existing PlannerResults component structure
      const transformedResult = {
        mood: tastes.mood || "focused",
        schedule: result.moduleData.schedule,
        quote: result.moduleData.quote,
        song: result.recommendations.songs[0] || null
      };
      setResults(transformedResult);
    }
  };

  const scrollToInput = () => {
    document.getElementById('planner-input')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 -z-10">
        <img 
          src="/lovable-uploads/9fed3ba1-326e-46b8-878f-cb04e89607ac.png" 
          alt="Flower Garden" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <Header />
      
      {/* Hero Section */}
      <div id="daily-planner-main" className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
            Daily Planner
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 font-baloo">
            Organize your day around your mood and personal preferences. 
            Get personalized schedules that sync with your vibe.
          </p>
          
          <button
            onClick={scrollToInput}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 rounded-lg text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>Plan Your Day</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div id="planner-input" className="py-20">
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
                buttonText="Plan My Day"
                loadingText="Creating your perfect day..."
                showMood={true}
                buttonColor="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                themeColor="warm"
                module="planner"
              />
            ) : (
              <PlannerResults results={results} onReset={() => setResults(null)} />
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default DailyPlanner;
