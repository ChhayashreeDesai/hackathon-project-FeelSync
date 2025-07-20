import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface TasteInputProps {
  onSubmit: (tastes: any) => void;
  loading: boolean;
  buttonText?: string;
  loadingText?: string;
  showMood?: boolean;
  showSubject?: boolean;
  buttonColor?: string;
  themeColor?: 'cool' | 'warm' | 'romantic';
}

const TasteInput: React.FC<TasteInputProps> = ({
  onSubmit,
  loading,
  buttonText = "Get My Recommendations",
  loadingText = "Analyzing your taste...",
  showMood = false,
  showSubject = false,
  buttonColor = "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
  themeColor = 'cool'
}) => {
  const [books, setBooks] = useState('');
  const [movies, setMovies] = useState('');
  const [music, setMusic] = useState('');
  const [mood, setMood] = useState('energetic');
  const [subject, setSubject] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      books,
      movies,
      music,
      mood: showMood ? mood : undefined,
      subject: showSubject ? subject : undefined
    });
  };

  // Determine text color based on theme
  const getTextColor = () => {
    if (themeColor === 'romantic') return 'text-black';
    return 'text-white';
  };

  // For Career Compass, we want black text regardless of theme
  const isCareerCompass = buttonText.includes('Reveal Careers');
  const textColor = isCareerCompass ? 'text-black' : getTextColor();

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
      <div className="text-center mb-8">
        <h2 className={`text-2xl font-semibold mb-4 font-display ${textColor}`}>
          Tell us about your taste
        </h2>
        <p className={`${textColor}/80 font-baloo`}>
          Share your favorite books, movies, and music to get personalized recommendations
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${textColor}`}>
            Favorite Books
          </label>
          <textarea
            value={books}
            onChange={(e) => setBooks(e.target.value)}
            placeholder="e.g., Harry Potter, The Alchemist, 1984..."
            className={`w-full px-4 py-3 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
            rows={3}
            required
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${textColor}`}>
            Favorite Movies/TV Shows
          </label>
          <textarea
            value={movies}
            onChange={(e) => setMovies(e.target.value)}
            placeholder="e.g., The Office, Inception, Friends..."
            className={`w-full px-4 py-3 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
            rows={3}
            required
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${textColor}`}>
            Favorite Music/Artists
          </label>
          <textarea
            value={music}
            onChange={(e) => setMusic(e.target.value)}
            placeholder="e.g., Taylor Swift, Jazz, The Beatles..."
            className={`w-full px-4 py-3 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
            rows={3}
            required
          />
        </div>

        {showMood && (
          <div>
            <label className={`block text-sm font-medium mb-2 ${textColor}`}>
              Current Mood
            </label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm ${textColor} focus:outline-none focus:ring-2 focus:ring-white/50`}
            >
              <option value="energetic" className="text-black">Energetic</option>
              <option value="focused" className="text-black">Focused</option>
              <option value="relaxed" className="text-black">Relaxed</option>
              <option value="creative" className="text-black">Creative</option>
              <option value="motivated" className="text-black">Motivated</option>
            </select>
          </div>
        )}

        {showSubject && (
          <div>
            <label className={`block text-sm font-medium mb-2 ${textColor}`}>
              Subject/Field of Study
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Computer Science, Literature, Mathematics..."
              className={`w-full px-4 py-3 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 ${buttonColor} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{loadingText}</span>
            </div>
          ) : (
            buttonText
          )}
        </button>
      </form>
    </div>
  );
};

export default TasteInput;
