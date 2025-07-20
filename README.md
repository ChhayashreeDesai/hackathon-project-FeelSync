# 🎧 FeelSync – Harmonizing Your World Through Taste

**FeelSync** is a dynamic, AI-powered taste assistant that bridges your cultural preferences with everyday decision-making — from career guidance to focused study sessions and even understanding your romantic personality. Built using the powerful Qloo and Gemini APIs, FeelSync transforms simple inputs like your favorite books, artists, shows, or your current mood into deeply personalized recommendations, practical tools, and insightful reflections.

> ⚡️ Built for the **Qloo LLM Hackathon**  
> 🌐 Live Demo: [https://feelsync.lovable.app/](https://feelsync.lovable.app/)

---

## 🌟 What Is FeelSync?

FeelSync acts like your personal taste mirror — interpreting your cultural consumption (books, films, music) and emotional state to provide curated suggestions across various aspects of life. It's more than a recommendation engine; it’s a cross-domain taste intelligence layer for self-awareness, productivity, and inspiration.

---

## 🧠 How It Works

FeelSync is powered by two key APIs:

- **🔗 Qloo API**  
  Understands user taste across books, movies, TV shows, and music to draw cultural insights and recommend adjacent content or patterns.

- **🧠 Gemini API (Google AI)**  
  Interprets context, generates descriptive and rich text responses, builds personas, and supports all reflective and productivity-based outputs like study plans or career narratives.

The system uses **intelligent prompt merging** and **response caching** to minimize token usage and API calls, while maintaining quality and speed. If Gemini fails to respond, a fallback mechanism ensures partial results are shown using cached or pre-fetched data.

---

## 🚀 Features

### 🧭 Career Compass
Discover your ideal career path — powered by your personal taste:

- Input: Books, Music, Movies
- Output:
  - 🧠 Persona Analysis (e.g., "Imaginative Realist")
  - 🔧 2 Profession Suggestions tailored to personality
  - 📚 Course + Book Suggestion
  - 🎵 Theme Song
  - 📝 Taste Insight Summary

---

### 📚 Study Buddy
Improve study time with taste-aligned music and tools:

- Input: Books, Music/Artists, TV shows, Current Mood, Field of Study
- Output:
  - 🎼 Ideal Genre + Study Track
  - 🛠️ Tools & Focus Tips
  - 📘 Taste Insight Summary for your subject-mood combo

---

### 📅 Daily Planner
Plan your day based on mood and taste — not just tasks:

- Input: Books, Music, Films, Mood
- Output:
  - 🌅 Morning / 🕛 Midday / 🌙 Evening To-Dos
  - 💬 Daily Inspiration
  - 🎵 Song of the Day (Qloo-powered)
  - 🧠 Taste Insight Summary

> 🔍 Unlike traditional planners, this isn’t based on calendars or obligations. It’s emotion-first — best used to find intention or boost motivation in unstructured time.

---

### 💘 Ideal Type Finder
Explore your love personality — what makes you tick romantically:

- Input: Books, Music, Films, Mood
- Output:
  - 💖 Your Love Persona (e.g., "Creative Explorer")
  - 💞 Ideal Traits & Matching Type
  - 📚 Suggested Read
  - 🎵 Romantic Track (with YouTube Thumbnail)
  - 🧠 Taste Insight Summary

---

## 🔧 Technical Stack

- **Frontend**: Built with [Lovable](https://lovable.so), using its drag-and-drop interface and integrated AI orchestration.
- **Backend/API**:
  - Qloo API for cultural graph queries
  - Gemini API for text generation
  - Optimized API chaining and smart caching to conserve usage credits

> 🎯 Prompts are merged smartly to limit API calls. Popular Qloo queries are cached locally. If Gemini fails, fallback templates ensure graceful degradation without user disruption.

---

## 💡 Why FeelSync?

People are more than their resumes or schedules. Their taste in music, books, and art often reveals their aspirations, emotions, and thought processes. FeelSync taps into this — allowing culture to guide life decisions.

---

## 🤝 Contributing

This project is primarily built for the Qloo Hackathon, but we're open to contributions that improve taste detection, reduce API latency, or integrate richer cultural domains (e.g., games, fashion, food).

---

## 📜 License

MIT License. Feel free to fork and remix with attribution.

---

## 🙏 Acknowledgements

- [Qloo](https://qloo.com) – For the rich cultural taste intelligence
- [Google Gemini](https://deepmind.google/technologies/gemini) – For human-like contextual reasoning
- [Lovable](https://lovable.so) – For fast, beautiful prototyping

---



