
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section className={cn('relative min-h-screen flex items-center overflow-hidden', className)}>
      <div className="absolute inset-0 -z-10">
        <img 
          src="/lovable-uploads/21991efd-b30b-4b2e-ac6f-0b8d2bf7c076.png" 
          alt="Starry Night" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10 max-w-4xl">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn delay={200}>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight text-white leading-tight mb-4">
              FeelSync
            </h1>
          </FadeIn>
          
          <FadeIn delay={300}>
            <p className="text-2xl md:text-3xl text-white/90 mb-6 font-medium">
              AI that gets your vibe
            </p>
          </FadeIn>
          
          <FadeIn delay={400}>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Transform what you love—music, movies, books, travel, food, games, brands, and fashion—into actionable, human-centric insights for your career, studies, daily planning, and love life.
            </p>
          </FadeIn>

          <FadeIn delay={500}>
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Begin Your Journey
            </button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
