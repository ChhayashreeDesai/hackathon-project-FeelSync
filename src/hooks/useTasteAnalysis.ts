
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TasteAnalysisInput {
  books: string;
  movies: string;
  music: string;
  mood?: string;
  subject?: string;
  module: 'career' | 'study' | 'planner' | 'ideal_type';
}

interface TasteAnalysisResult {
  persona: {
    name: string;
    description: string;
  };
  moduleData: any;
  recommendations: {
    songs: Array<{
      title: string;
      artist: string;
      youtubeUrl: string;
      videoId: string;
    }>;
    books: string[];
    tools: string[];
    blogs: string[];
  };
  insights: {
    crossDomain: string;
    traits: string;
    uxPrefs: string;
    careerFit: string;
    brandStrategy: string;
  };
}

export const useTasteAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeTaste = async (input: TasteAnalysisInput): Promise<TasteAnalysisResult | null> => {
    setLoading(true);
    setError(null);

    try {
      console.log('Calling analyze-taste function with:', input);

      const { data, error: functionError } = await supabase.functions.invoke('analyze-taste', {
        body: input
      });

      if (functionError) {
        console.error('Function error:', functionError);
        throw new Error(functionError.message || 'Failed to analyze taste');
      }

      if (data?.fallback) {
        console.log('Using fallback response due to API issues');
        return data.fallback;
      }

      console.log('Analysis successful:', data);
      return data;

    } catch (err) {
      console.error('Error analyzing taste:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    analyzeTaste,
    loading,
    error
  };
};
