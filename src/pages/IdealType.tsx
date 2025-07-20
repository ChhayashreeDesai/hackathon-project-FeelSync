import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TasteInputEnhanced from '@/components/TasteInputEnhanced';
import IdealTypeResults from '@/components/IdealTypeResults';
import { ChevronDown } from 'lucide-react';
import { useTasteAnalysis } from '@/hooks/useTasteAnalysis';

const IdealType = () => {
  const [results, setResults] = useState(null);
  const { analyzeTaste, loading, error } = useTasteAnalysis();

  const handleSubmit = async (tastes: any) => {
    const result = await analyzeTaste({
      ...tastes,
      module: 'ideal_type'
    });
    
    if (result) {
      // Transform the result to match existing IdealTypeResults component structure
      const transformedResult = {
        personalityType: result.persona.name,
        description: result.moduleData.relationshipStyle,
        traits: result.moduleData.idealPartner.split(', ').slice(0, 5), // Convert to array
        idealMatch: result.moduleData.communicationStyle,
        resources: result.recommendations.books.slice(0, 3),
        song: result.recommendations.songs[0] || null
      };
      setResults(transformedResult);
    }
  };

  const scrollToInput = () => {
    document.getElementById('ideal-input')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 -z-10">
        <img 
          src="/lovable-uploads/db180128-bae0-45cc-997c-fe38a2c1d40d.png" 
          alt="Pink Sky" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <Header />
      
      {/* Hero Section */}
      <div id="ideal-type-main" className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-black mb-6 drop-shadow-lg">
            Ideal Type Finder
          </h1>
          <p className="text-xl md:text-2xl text-black/90 max-w-3xl mx-auto mb-12 font-baloo drop-shadow-md">
            Discover romantic insights based on your cultural preferences. 
            Understand your relationship personality through your tastes.
          </p>
          
          <button
            onClick={scrollToInput}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-700 hover:to-rose-800 rounded-lg text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>Reveal My Type</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div id="ideal-input" className="py-20">
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
                buttonText="Reveal My Type"
                loadingText="Analyzing your romantic personality..."
                buttonColor="bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-700 hover:to-rose-800"
                themeColor="romantic"
                module="ideal_type"
              />
            ) : (
              <IdealTypeResults results={results} onReset={() => setResults(null)} />
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default IdealType;
