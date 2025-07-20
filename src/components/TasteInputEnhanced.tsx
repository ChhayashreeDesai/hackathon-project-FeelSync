import React, { useState } from 'react';
import { Loader2, ChevronDown, Sparkles } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface TasteInputEnhancedProps {
  onSubmit: (tastes: any) => void;
  loading: boolean;
  buttonText?: string;
  loadingText?: string;
  showMood?: boolean;
  showSubject?: boolean;
  buttonColor?: string;
  themeColor?: 'cool' | 'warm' | 'romantic';
  module: 'career' | 'study' | 'planner' | 'ideal_type';
}

const STARTER_BUNDLES = {
  creative: {
    books: "The Alchemist, Big Magic, Steal Like an Artist",
    movies: "Her, Inception, La La Land",
    music: "Bon Iver, Radiohead, Norah Jones"
  },
  intellectual: {
    books: "Sapiens, Thinking Fast and Slow, 1984",
    movies: "The Social Network, Ex Machina, Black Mirror",
    music: "Max Richter, Ólafur Arnalds, Kiasmos"
  },
  adventurous: {
    books: "Wild, Into the Wild, The Adventure Zone",
    movies: "Lord of the Rings, Mad Max, Indiana Jones",
    music: "Of Monsters and Men, Fleet Foxes, Arcade Fire"
  }
};

const POPULAR_SUGGESTIONS = {
  books: [
    "Harry Potter", "The Alchemist", "Atomic Habits", "Sapiens", "1984",
    "To Kill a Mockingbird", "The Great Gatsby", "Dune", "The Handmaid's Tale"
  ],
  movies: [
    "The Office", "Friends", "Stranger Things", "Breaking Bad", "Game of Thrones",
    "Marvel Movies", "Star Wars", "The Dark Knight", "Inception", "Parasite"
  ],
  music: [
    "Taylor Swift", "The Beatles", "Billie Eilish", "Ed Sheeran", "Drake",
    "Adele", "Queen", "Pink Floyd", "Kendrick Lamar", "Ariana Grande"
  ]
};

const TasteInputEnhanced: React.FC<TasteInputEnhancedProps> = ({
  onSubmit,
  loading,
  buttonText = "Get My Recommendations",
  loadingText = "Analyzing your taste...",
  showMood = false,
  showSubject = false,
  buttonColor = "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
  themeColor = 'cool',
  module
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
      subject: showSubject ? subject : undefined,
      module
    });
  };

  const applyBundle = (bundleKey: keyof typeof STARTER_BUNDLES) => {
    const bundle = STARTER_BUNDLES[bundleKey];
    setBooks(bundle.books);
    setMovies(bundle.movies);
    setMusic(bundle.music);
  };

  const addSuggestion = (field: 'books' | 'movies' | 'music', suggestion: string) => {
    const currentValue = field === 'books' ? books : field === 'movies' ? movies : music;
    const newValue = currentValue ? `${currentValue}, ${suggestion}` : suggestion;
    
    if (field === 'books') setBooks(newValue);
    else if (field === 'movies') setMovies(newValue);
    else setMusic(newValue);
  };

  const getTextColor = () => {
    if (themeColor === 'romantic') return 'text-black';
    return 'text-white';
  };

  const isCareerCompass = buttonText.includes('Reveal Careers');
  const textColor = isCareerCompass ? 'text-black' : getTextColor();

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
      <div className="text-center mb-8">
        <h2 className={`text-2xl font-semibold mb-4 font-display ${textColor}`}>
          Tell us about your taste
        </h2>
        <p className={`${textColor}/80 font-baloo mb-4`}>
          Share your favorite books, movies, and music to get personalized recommendations
        </p>
        
        {/* Starter Bundles */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <button
            type="button"
            onClick={() => applyBundle('creative')}
            className="px-4 py-2 bg-white/20 rounded-lg text-sm text-white/80 hover:bg-white/30 transition-colors"
          >
            <Sparkles className="w-4 h-4 inline mr-1" />
            Creative Bundle
          </button>
          <button
            type="button"
            onClick={() => applyBundle('intellectual')}
            className="px-4 py-2 bg-white/20 rounded-lg text-sm text-white/80 hover:bg-white/30 transition-colors"
          >
            <Sparkles className="w-4 h-4 inline mr-1" />
            Intellectual Bundle
          </button>
          <button
            type="button"
            onClick={() => applyBundle('adventurous')}
            className="px-4 py-2 bg-white/20 rounded-lg text-sm text-white/80 hover:bg-white/30 transition-colors"
          >
            <Sparkles className="w-4 h-4 inline mr-1" />
            Adventurous Bundle
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Books Field with Suggestions */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={`block text-sm font-medium ${textColor}`}>
              Favorite Books
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="text-xs text-white/60 hover:text-white/80 flex items-center"
                >
                  Suggestions <ChevronDown className="w-3 h-3 ml-1" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-black/80 border-white/20">
                <div className="grid grid-cols-2 gap-2">
                  {POPULAR_SUGGESTIONS.books.map((book) => (
                    <button
                      key={book}
                      type="button"
                      onClick={() => addSuggestion('books', book)}
                      className="text-left text-sm p-2 rounded hover:bg-white/10 text-white/80"
                    >
                      {book}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <textarea
            value={books}
            onChange={(e) => setBooks(e.target.value)}
            placeholder="e.g., Harry Potter, The Alchemist, 1984..."
            className={`w-full px-4 py-3 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
            rows={3}
            required
          />
        </div>

        {/* Movies Field with Suggestions */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={`block text-sm font-medium ${textColor}`}>
              Favorite Movies/TV Shows
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="text-xs text-white/60 hover:text-white/80 flex items-center"
                >
                  Suggestions <ChevronDown className="w-3 h-3 ml-1" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-black/80 border-white/20">
                <div className="grid grid-cols-2 gap-2">
                  {POPULAR_SUGGESTIONS.movies.map((movie) => (
                    <button
                      key={movie}
                      type="button"
                      onClick={() => addSuggestion('movies', movie)}
                      className="text-left text-sm p-2 rounded hover:bg-white/10 text-white/80"
                    >
                      {movie}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <textarea
            value={movies}
            onChange={(e) => setMovies(e.target.value)}
            placeholder="e.g., The Office, Inception, Friends..."
            className={`w-full px-4 py-3 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
            rows={3}
            required
          />
        </div>

        {/* Music Field with Suggestions */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={`block text-sm font-medium ${textColor}`}>
              Favorite Music/Artists
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="text-xs text-white/60 hover:text-white/80 flex items-center"
                >
                  Suggestions <ChevronDown className="w-3 h-3 ml-1" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-black/80 border-white/20">
                <div className="grid grid-cols-2 gap-2">
                  {POPULAR_SUGGESTIONS.music.map((artist) => (
                    <button
                      key={artist}
                      type="button"
                      onClick={() => addSuggestion('music', artist)}
                      className="text-left text-sm p-2 rounded hover:bg-white/10 text-white/80"
                    >
                      {artist}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
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

export default TasteInputEnhanced;
