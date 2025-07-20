
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TasteInputEnhanced from '@/components/TasteInputEnhanced';
import CareerResults from '@/components/CareerResults';
import { ChevronDown } from 'lucide-react';
import { useTasteAnalysis } from '@/hooks/useTasteAnalysis';

const CareerCompass = () => {
  const [results, setResults] = useState(null);
  const { analyzeTaste, loading, error } = useTasteAnalysis();

  const handleSubmit = async (tastes: any) => {
    const result = await analyzeTaste({
      ...tastes,
      module: 'career'
    });
    
    if (result) {
      // Transform the result to match existing CareerResults component structure
      const transformedResult = {
        careers: result.moduleData.careers,
        song: result.recommendations.songs[0] || null
      };
      setResults(transformedResult);
    }
  };

  const scrollToInput = () => {
    document.getElementById('career-input')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 -z-10">
        <img 
          src="/lovable-uploads/a77027ab-6d1d-449a-ba66-27d7b33cb0f8.png" 
          alt="Blue Sky" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <Header />
      
      {/* Hero Section */}
      <div id="career-compass-main" className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
            Career Compass
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 font-baloo">
            Discover career paths that align with your unique tastes and interests. 
            Let your cultural preferences guide you to your dream profession.
          </p>
          
          <button
            onClick={scrollToInput}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>Start Discovery</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div id="career-input" className="py-20">
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
                buttonText="Reveal Careers"
                loadingText="Analyzing your career potential..."
                buttonColor="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                module="career"
              />
            ) : (
              <CareerResults results={results} onReset={() => setResults(null)} />
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default CareerCompass;
