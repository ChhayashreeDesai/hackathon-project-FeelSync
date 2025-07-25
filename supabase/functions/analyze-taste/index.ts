
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const QLOO_API_KEY = Deno.env.get('QLOO_KEY');
+ const GEMINI_API_KEY = Deno.env.get('GEMINI_KEY'); 

interface TasteInput {
  books: string;
  movies: string;
  music: string;
  fashion?: string;
  mood?: string;
  subject?: string;
  module: 'career' | 'study' | 'planner' | 'ideal_type';
}

interface QlooProfile {
  personality: any;
  interests: any;
  demographics: any;
  preferences: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const input: TasteInput = await req.json();
    console.log('Received input:', input);

    // Step 1: Call Qloo API for cultural analysis
    const qlooProfile = await analyzeWithQloo(input);
    console.log('Qloo analysis complete');

    // Step 2: Call Gemini API with combined context
    const geminiResult = await analyzeWithGemini(input, qlooProfile);
    console.log('Gemini analysis complete');

    return new Response(JSON.stringify(geminiResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-taste function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        fallback: generatePersonalizedFallback(input)
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function analyzeWithQloo(input: TasteInput): Promise<QlooProfile> {
  try {
    console.log('Using personalized mock profile based on user input');
    
    const personalityTraits = generatePersonalityFromTastes(input);
    
    return {
      personality: { traits: personalityTraits },
      interests: { domains: extractDomains(input) },
      demographics: { lifestyle: inferLifestyle(input) },
      preferences: { aesthetic: inferAesthetic(input) }
    };
  } catch (error) {
    console.error('Qloo API error:', error);
    return {
      personality: { traits: ['creative', 'analytical', 'curious'] },
      interests: { domains: ['technology', 'arts', 'literature'] },
      demographics: { lifestyle: 'urban_professional' },
      preferences: { aesthetic: 'modern_minimalist' }
    };
  }
}

function generatePersonalityFromTastes(input: TasteInput): string[] {
  const traits = [];
  
  // Analyze books with more nuance
  const books = input.books.toLowerCase();
  if (books.includes('harry potter') || books.includes('fantasy') || books.includes('tolkien')) {
    traits.push('imaginative', 'storytelling-oriented', 'adventure-seeking');
  }
  if (books.includes('atomic habits') || books.includes('self-help') || books.includes('productivity')) {
    traits.push('growth-minded', 'disciplined', 'optimization-focused');
  }
  if (books.includes('sapiens') || books.includes('science') || books.includes('thinking') || books.includes('psychology')) {
    traits.push('intellectually-curious', 'analytical', 'evidence-based');
  }
  if (books.includes('philosophy') || books.includes('existential') || books.includes('meaning')) {
    traits.push('reflective', 'depth-seeking', 'contemplative');
  }
  
  // Analyze movies/TV with personality insights
  const movies = input.movies.toLowerCase();
  if (movies.includes('inception') || movies.includes('black mirror') || movies.includes('westworld')) {
    traits.push('tech-savvy', 'future-thinking', 'complexity-appreciating');
  }
  if (movies.includes('friends') || movies.includes('office') || movies.includes('sitcom')) {
    traits.push('socially-oriented', 'humor-appreciating', 'relationship-focused');
  }
  if (movies.includes('social network') || movies.includes('silicon valley') || movies.includes('startup')) {
    traits.push('entrepreneurial', 'innovation-driven', 'disruptive-thinking');
  }
  if (movies.includes('parasite') || movies.includes('foreign') || movies.includes('art')) {
    traits.push('culturally-aware', 'socially-conscious', 'aesthetic-minded');
  }
  
  // Analyze music for emotional and lifestyle traits
  const music = input.music.toLowerCase();
  if (music.includes('classical') || music.includes('jazz') || music.includes('instrumental')) {
    traits.push('sophisticated', 'detail-oriented', 'patience-valuing');
  }
  if (music.includes('pop') || music.includes('taylor swift') || music.includes('mainstream')) {
    traits.push('trend-aware', 'emotionally-expressive', 'community-connected');
  }
  if (music.includes('indie') || music.includes('alternative') || music.includes('underground')) {
    traits.push('authenticity-seeking', 'originality-valuing', 'counter-cultural');
  }
  if (music.includes('electronic') || music.includes('techno') || music.includes('ambient')) {
    traits.push('innovation-embracing', 'mood-focused', 'experience-oriented');
  }
  
  return traits.length > 0 ? [...new Set(traits)] : ['creative', 'open-minded', 'curious'];
}

function extractDomains(input: TasteInput): string[] {
  const domains = [];
  
  const allContent = `${input.books} ${input.movies} ${input.music}`.toLowerCase();
  
  if (allContent.includes('tech') || allContent.includes('sci-fi') || allContent.includes('digital')) {
    domains.push('technology');
  }
  if (allContent.includes('art') || allContent.includes('design') || allContent.includes('creative')) {
    domains.push('arts & design');
  }
  if (allContent.includes('business') || allContent.includes('entrepreneur') || allContent.includes('startup')) {
    domains.push('business & innovation');
  }
  if (allContent.includes('psychology') || allContent.includes('human') || allContent.includes('social')) {
    domains.push('human behavior');
  }
  if (allContent.includes('nature') || allContent.includes('travel') || allContent.includes('adventure')) {
    domains.push('exploration & nature');
  }
  
  return domains.length > 0 ? domains : ['lifestyle', 'entertainment', 'personal growth'];
}

function inferLifestyle(input: TasteInput): string {
  const allContent = `${input.books} ${input.movies} ${input.music} ${input.mood || ''}`.toLowerCase();
  
  if (allContent.includes('productivity') || allContent.includes('habits') || input.mood === 'focused') {
    return 'achievement-oriented professional';
  }
  if (allContent.includes('indie') || allContent.includes('art') || allContent.includes('poetry')) {
    return 'creative free spirit';
  }
  if (allContent.includes('travel') || allContent.includes('adventure') || input.mood === 'energetic') {
    return 'adventurous explorer';
  }
  if (allContent.includes('classical') || allContent.includes('philosophy') || allContent.includes('sophisticated')) {
    return 'thoughtful intellectual';
  }
  
  return 'balanced lifestyle curator';
}

function inferAesthetic(input: TasteInput): string {
  const allContent = `${input.books} ${input.movies} ${input.music}`.toLowerCase();
  
  if (allContent.includes('minimalist') || allContent.includes('zen') || allContent.includes('clean')) {
    return 'minimalist & clean';
  }
  if (allContent.includes('vintage') || allContent.includes('classic') || allContent.includes('retro')) {
    return 'vintage & timeless';
  }
  if (allContent.includes('colorful') || allContent.includes('vibrant') || allContent.includes('pop')) {
    return 'vibrant & expressive';
  }
  if (allContent.includes('dark') || allContent.includes('noir') || allContent.includes('gothic')) {
    return 'sophisticated & moody';
  }
  
  return 'modern & eclectic';
}

async function analyzeWithGemini(input: TasteInput, qlooProfile: QlooProfile) {
  const prompt = buildModulePrompt(input, qlooProfile);
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('No valid JSON found in Gemini response');
  } catch (error) {
    console.error('Gemini API error:', error);
    return generatePersonalizedFallback(input);
  }
}

function buildModulePrompt(input: TasteInput, qlooProfile: QlooProfile): string {
  const baseContext = `
You are a warm, insightful cultural analyst who understands people through their tastes. Write in a friendly, conversational tone - like you're chatting with a close friend who just shared their favorite things with you.

User's Cultural World:
- Books that captivate them: ${input.books}
- Movies/Shows they love: ${input.movies}
- Music that moves them: ${input.music}
${input.fashion ? `- Style that speaks to them: ${input.fashion}` : ''}
${input.mood ? `- Current energy: ${input.mood}` : ''}
${input.subject ? `- Learning focus: ${input.subject}` : ''}

Cultural Personality Profile:
- Core traits: ${JSON.stringify(qlooProfile.personality.traits)}
- Interest worlds: ${JSON.stringify(qlooProfile.interests.domains)}
- Life approach: ${qlooProfile.demographics.lifestyle}
- Aesthetic soul: ${qlooProfile.preferences.aesthetic}
`;

  const moduleInstructions = getModuleInstructions(input.module);
  
  return `${baseContext}

${moduleInstructions}

Write like you truly understand this person - be warm, specific, and insightful. Use "you" throughout and make it feel personal. Be descriptive and paint vivid pictures with your words.

Respond with valid JSON in this structure:
{
  "persona": {
    "name": "A unique, personalized name that captures their specific cultural blend (not generic)",
    "description": "A warm, personal description of their approach based on their actual tastes"
  },
  "moduleData": ${getModuleDataStructure(input.module)},
  "recommendations": {
    "songs": [{"title": "Song Title", "artist": "Artist Name", "youtubeUrl": "https://www.youtube.com/watch?v=VIDEO_ID", "videoId": "VIDEO_ID"}],
    "books": ["Specific book recommendations"],
    "tools": ["Tools that match their style"],
    "blogs": ["Resources they'd genuinely enjoy"]
  },
  "insights": {
    "crossDomain": "Personal analysis of how their specific tastes reveal their multifaceted personality - be descriptive and specific to their choices",
    "traits": "Warm description of their behavioral patterns and work style based on their cultural preferences - make it feel like you know them",
    "uxPrefs": "Specific UX and product preferences that match their aesthetic and functional style from their taste profile",
    "careerFit": "Career insights that truly fit their personality as revealed through their cultural choices - be specific to their tastes",
    "brandStrategy": "Brand strategy insights for reaching people with their exact cultural profile - reference their specific interests"
  }
}`;
}

function getModuleInstructions(module: string): string {
  switch (module) {
    case 'career':
      return `
CAREER COMPASS MODULE:
Based on their unique cultural fingerprint, recommend exactly 3 specific careers that genuinely align with who they are.

For each career path, write warmly about:
- A specific job title (be precise, not generic like "marketing manager" - think "Brand Storytelling Strategist" or "User Experience Researcher")
- Why this career is perfect for someone with their exact taste profile - reference their specific books, movies, music
- A starter kit tailored to how they learn and what motivates them (course, book, tool)

Include a success anthem - a song that would pump them up on their career journey, matching their music taste.`;

    case 'study':
      return `
STUDY BUDDY MODULE:
Create their perfect study ecosystem based on who they are culturally.

Recommend:
- The ideal music genre for their focus style (consider their actual music preferences)
- 3-4 artists for deep work that align with their taste but optimize for concentration
- 3-4 productivity tools that match their lifestyle and personality
- 5 study tips crafted for their specific learning style and personality
- A perfect focus track with YouTube details - something they'd actually love`;

    case 'planner':
      return `
DAILY PLANNER MODULE:
Design their ideal day structure that honors who they are.

Create:
- Morning routine that energizes someone with their interests and energy style
- Midday approach that matches their work personality and cultural preferences  
- Evening wind-down that incorporates their entertainment and relaxation style
- A daily inspiration quote that resonates with their specific cultural interests
- A daily theme song from their preferred music universe`;

    case 'ideal_type':
      return `
IDEAL TYPE FINDER MODULE:
Analyze their romantic style through their cultural lens - be thoughtful and warm.

Explore:
- Their relationship approach based on the stories and music that move them
- Ideal partner traits that would complement their cultural personality
- Date ideas that would genuinely excite someone with their interests
- Communication style insights from their media preferences
- A love song recommendation that matches their musical soul`;

    default:
      return 'Provide general taste analysis with warmth and specificity.';
  }
}

function getModuleDataStructure(module: string): string {
  switch (module) {
    case 'career':
      return `{
    "careers": [
      {
        "title": "Specific, creative job title",
        "description": "Warm, detailed explanation connecting this career to their specific cultural tastes - reference their books, movies, music by name",
        "starterKit": {
          "course": "Specific course that matches their learning style",
          "book": "Book recommendation that connects to their reading taste",
          "tool": "Professional tool they'd actually enjoy using"
        }
      }
    ]
  }`;

    case 'study':
      return `{
    "musicGenre": "Specific genre that matches their taste but aids focus",
    "artists": ["4 artists perfect for their study style"],
    "tools": ["4 productivity tools that match their personality"],
    "tips": ["5 personalized study tips based on their cultural profile"]
  }`;

    case 'planner':
      return `{
    "schedule": {
      "morning": "Detailed morning routine description that fits their energy and interests",
      "midday": "Midday approach that honors their work style and personality",
      "evening": "Evening routine incorporating their entertainment preferences"
    },
    "quote": "Inspiring quote that speaks to their specific cultural interests"
  }`;

    case 'ideal_type':
      return `{
    "relationshipStyle": "Their approach to love based on their cultural personality",
    "idealPartner": "Detailed partner characteristics as a flowing description",
    "dateIdeas": ["3 date ideas perfect for their interests"],
    "communicationStyle": "How they connect based on their cultural preferences"
  }`;

    default:
      return '{}';
  }
}

function generatePersonalizedFallback(input: TasteInput) {
  const personalityTraits = generatePersonalityFromTastes(input);
  const personaName = generatePersonaName(input, personalityTraits);
  
  const baseResponse = {
    persona: {
      name: personaName,
      description: generatePersonaDescription(input, personalityTraits)
    },
    recommendations: {
      songs: [{
        title: "Weightless",
        artist: "Marconi Union",
        youtubeUrl: "https://www.youtube.com/watch?v=UfcAVejslrU",
        videoId: "UfcAVejslrU"
      }],
      books: getPersonalizedBookRec(input),
      tools: getPersonalizedTools(input),
      blogs: getPersonalizedBlogs(input)
    },
    insights: generatePersonalizedInsights(input, personalityTraits)
  };

  // Add personalized module-specific data
  switch (input.module) {
    case 'career':
      return {
        ...baseResponse,
        moduleData: {
          careers: generatePersonalizedCareers(input, personalityTraits)
        }
      };

    case 'study':
      return {
        ...baseResponse,
        moduleData: generatePersonalizedStudyData(input)
      };

    case 'planner':
      return {
        ...baseResponse,
        moduleData: generatePersonalizedPlannerData(input)
      };

    case 'ideal_type':
      return {
        ...baseResponse,
        moduleData: generatePersonalizedIdealType(input)
      };

    default:
      return baseResponse;
  }
}

function generatePersonaName(input: TasteInput, traits: string[]): string {
  const books = input.books.toLowerCase();
  const movies = input.movies.toLowerCase();
  const music = input.music.toLowerCase();
  
  // Create highly personalized personas based on specific combinations
  if (books.includes('sapiens') && music.includes('classical')) {
    return "The Renaissance Thinker";
  }
  if (movies.includes('black mirror') && traits.includes('tech-savvy')) {
    return "The Digital Philosopher";
  }
  if (books.includes('atomic habits') && traits.includes('growth-minded')) {
    return "The Intentional Optimizer";
  }
  if (music.includes('indie') && traits.includes('authenticity-seeking')) {
    return "The Authentic Explorer";
  }
  if (movies.includes('parasite') && traits.includes('socially-conscious')) {
    return "The Conscious Curator";
  }
  if (books.includes('fantasy') || books.includes('harry potter')) {
    return "The Imaginative Strategist";
  }
  
  // Dynamic combinations based on multiple factors
  if (traits.includes('analytical') && traits.includes('creative')) {
    return "The Creative Analyst";
  }
  if (traits.includes('entrepreneurial')) {
    return "The Visionary Builder";
  }
  if (traits.includes('socially-oriented')) {
    return "The Connected Catalyst";
  }
  
  return "The Cultural Curator";
}

function generatePersonaDescription(input: TasteInput, traits: string[]): string {
  const primaryTrait = traits[0] || 'creative';
  const books = input.books.split(',')[0]?.trim() || 'literature';
  const music = input.music.split(',')[0]?.trim() || 'music';
  
  return `Someone who finds wisdom in ${books} and soul in ${music} - you approach life with ${primaryTrait.replace('-', ' ')} energy and thoughtful intention.`;
}

function generatePersonalizedCareers(input: TasteInput, traits: string[]) {
  const careers = [];
  
  // Career 1: Based on books preference
  if (input.books.toLowerCase().includes('sapiens') || input.books.toLowerCase().includes('psychology')) {
    careers.push({
      title: "Human Behavior Research Specialist",
      description: `Your fascination with ${input.books.split(',')[0]} shows you're drawn to understanding what makes people tick. This role would let you dive deep into human behavior patterns, combining research with real-world applications.`,
      starterKit: {
        course: "Behavioral Economics on Coursera",
        book: "Predictably Irrational by Dan Ariely",
        tool: "Qualtrics for research"
      }
    });
  } else if (input.books.toLowerCase().includes('business') || input.books.toLowerCase().includes('startup')) {
    careers.push({
      title: "Innovation Strategy Consultant",
      description: `Your interest in ${input.books.split(',')[0]} reveals an entrepreneurial mindset that would thrive in helping companies navigate change and growth.`,
      starterKit: {
        course: "Strategic Innovation at Stanford Online",
        book: "The Innovator's Dilemma by Clayton Christensen",
        tool: "Miro for strategy mapping"
      }
    });
  } else {
    careers.push({
      title: "Content Experience Designer",
      description: `Your appreciation for ${input.books.split(',')[0]} suggests you understand how stories shape experiences - perfect for creating meaningful digital journeys.`,
      starterKit: {
        course: "UX Design Fundamentals",
        book: "Don't Make Me Think by Steve Krug",
        tool: "Figma for design"
      }
    });
  }
  
  // Career 2: Based on movies/shows
  if (input.movies.toLowerCase().includes('social network') || input.movies.toLowerCase().includes('tech')) {
    careers.push({
      title: "Product Growth Strategist",
      description: `Your love for ${input.movies.split(',')[0]} shows you're fascinated by how products scale and impact lives - you'd excel at driving user growth.`,
      starterKit: {
        course: "Growth Product Management",
        book: "Hooked by Nir Eyal",
        tool: "Amplitude for analytics"
      }
    });
  } else if (input.movies.toLowerCase().includes('parasite') || input.movies.toLowerCase().includes('social')) {
    careers.push({
      title: "Social Impact Storyteller",
      description: `Your appreciation for ${input.movies.split(',')[0]} reveals someone who sees deeper meanings and wants to create change through powerful narratives.`,
      starterKit: {
        course: "Digital Storytelling Workshop",
        book: "Made to Stick by Chip Heath",
        tool: "Adobe Creative Suite"
      }
    });
  } else {
    careers.push({
      title: "Brand Experience Curator",
      description: `Your taste in ${input.movies.split(',')[0]} shows you appreciate compelling narratives - perfect for crafting memorable brand experiences.`,
      starterKit: {
        course: "Brand Strategy Fundamentals",
        book: "Building a StoryBrand by Donald Miller",
        tool: "Notion for planning"
      }
    });
  }
  
  // Career 3: Based on music preference
  if (input.music.toLowerCase().includes('classical') || input.music.toLowerCase().includes('instrumental')) {
    careers.push({
      title: "Mindful Technology Designer",
      description: `Your connection to ${input.music.split(',')[0]} suggests you value depth and intentionality - ideal for creating technology that enhances rather than distracts.`,
      starterKit: {
        course: "Calm Technology Design",
        book: "Digital Minimalism by Cal Newport",
        tool: "Principle for prototyping"
      }
    });
  } else if (input.music.toLowerCase().includes('electronic') || input.music.toLowerCase().includes('modern')) {
    careers.push({
      title: "Future-Forward UX Researcher",
      description: `Your appreciation for ${input.music.split(',')[0]} shows you're tuned into emerging trends - perfect for researching how people interact with tomorrow's technology.`,
      starterKit: {
        course: "Advanced UX Research Methods",
        book: "Observing the User Experience by Kuniavsky",
        tool: "UserTesting platform"
      }
    });
  } else {
    careers.push({
      title: "Creative Community Builder",
      description: `Your musical taste in ${input.music.split(',')[0]} shows you understand how creativity brings people together - ideal for building engaged communities.`,
      starterKit: {
        course: "Community Management Mastery",
        book: "The Business of Belonging by David Spinks",
        tool: "Circle for community building"
      }
    });
  }
  
  return careers;
}

function generatePersonalizedStudyData(input: TasteInput) {
  const musicStyle = input.music.toLowerCase();
  let genre = "Lo-fi Hip Hop";
  let artists = ["Nujabes", "ChilledCow", "Idealism", "Ólafur Arnalds"];
  
  if (musicStyle.includes('classical')) {
    genre = "Neo-Classical Focus";
    artists = ["Max Richter", "Ólafur Arnalds", "Nils Frahm", "Kiasmos"];
  } else if (musicStyle.includes('electronic')) {
    genre = "Ambient Electronic";
    artists = ["Brian Eno", "Tim Hecker", "Stars of the Lid", "Fennesz"];
  } else if (musicStyle.includes('indie')) {
    genre = "Instrumental Indie";
    artists = ["Godspeed You! Black Emperor", "Explosions in the Sky", "Sigur Rós", "Mono"];
  }
  
  return {
    musicGenre: genre,
    artists: artists,
    tools: ["Forest App", "Notion", "Anki", "RescueTime"],
    tips: [
      `Create study playlists inspired by your love for ${input.music.split(',')[0]} - familiar yet non-distracting`,
      "Use the Pomodoro Technique with 25-minute focus sessions",
      `Take inspiration breaks by discussing concepts like in ${input.movies.split(',')[0]}`,
      "Create visual mind maps to connect complex ideas",
      `Read supplementary materials in the spirit of ${input.books.split(',')[0]}`
    ]
  };
}

function generatePersonalizedPlannerData(input: TasteInput) {
  return {
    schedule: {
      morning: `Start your day with intention - perhaps some journaling inspired by the depth you find in ${input.books.split(',')[0]}, followed by gentle movement and a mindful breakfast.`,
      midday: `Take purposeful breaks every 90 minutes. Step outside, stretch, or have a quick chat about ideas - just like the engaging conversations in ${input.movies.split(',')[0]}.`,
      evening: `Wind down with your kind of music - let ${input.music.split(',')[0]} guide you into relaxation mode. Review your day and prepare tomorrow with gratitude.`
    },
    quote: `"Progress, not perfection" - a gentle reminder that growth happens in small, consistent steps, just like the journeys in your favorite stories.`
  };
}

function generatePersonalizedIdealType(input: TasteInput) {
  return {
    relationshipStyle: `Based on your appreciation for ${input.books.split(',')[0]} and ${input.movies.split(',')[0]}, you likely value deep, meaningful connections with partners who can match your intellectual curiosity and emotional depth.`,
    idealPartner: `Someone who shares your love for thoughtful conversation, appreciates the artistry in ${input.music.split(',')[0]}, and can discuss the themes that draw you to ${input.books.split(',')[0]}. They should be intellectually curious, emotionally mature, and appreciate both depth and playfulness in relationships.`,
    dateIdeas: [
      `Browse a bookstore together, then discuss your finds over coffee - perfect for someone who loves ${input.books.split(',')[0]}`,
      `Attend a concert or music event featuring artists similar to ${input.music.split(',')[0]}`,
      `Have a movie night exploring films in the spirit of ${input.movies.split(',')[0]} followed by deep conversation`
    ],
    communicationStyle: "You likely prefer meaningful conversations over small talk, appreciate partners who can engage with your interests, and value emotional intelligence alongside intellectual compatibility."
  };
}

function generatePersonalizedInsights(input: TasteInput, traits: string[]) {
  return {
    crossDomain: `Your unique combination of ${input.books.split(',')[0]}, ${input.movies.split(',')[0]}, and ${input.music.split(',')[0]} reveals someone who seeks both intellectual stimulation and emotional resonance. You're drawn to content that challenges perspectives while touching the heart.`,
    traits: `You tend to be ${traits.slice(0, 2).join(' and ')}, someone who values both depth and authenticity. Your work style likely balances analytical thinking with creative intuition, and you prefer environments that honor both productivity and personal meaning.`,
    uxPrefs: `You'd gravitate toward clean, intuitive interfaces that don't overwhelm - think apps that feel as thoughtfully crafted as your favorite ${input.books.split(',')[0]}. You appreciate customization options and tools that adapt to your workflow rather than forcing rigid structures.`,
    careerFit: `Roles that combine your analytical nature with creative problem-solving would suit you perfectly. You'd thrive in environments that value both strategic thinking and human connection - places where your appreciation for ${input.movies.split(',')[0]} and ${input.music.split(',')[0]} translates into understanding what moves people.`,
    brandStrategy: `Brands targeting people like you should emphasize authenticity and substance over flashy marketing. Focus on craftsmanship, meaningful experiences, and intellectual honesty - the same qualities that draw you to ${input.books.split(',')[0]} and ${input.music.split(',')[0]}.`
  };
}

function getPersonalizedBookRec(input: TasteInput): string[] {
  if (input.books.toLowerCase().includes('sapiens')) {
    return ["The Righteous Mind by Jonathan Haidt"];
  }
  if (input.books.toLowerCase().includes('atomic habits')) {
    return ["Deep Work by Cal Newport"];
  }
  return ["Atomic Habits by James Clear"];
}

function getPersonalizedTools(input: TasteInput): string[] {
  if (input.books.toLowerCase().includes('productivity')) {
    return ["Notion", "Todoist", "Forest App"];
  }
  return ["Notion", "Figma", "Spotify"];
}

function getPersonalizedBlogs(input: TasteInput): string[] {
  if (input.books.toLowerCase().includes('tech')) {
    return ["Benedict Evans Newsletter", "Stratechery", "TED Talks"];
  }
  return ["TED Talks", "Brain Pickings", "Harvard Business Review"];
}

