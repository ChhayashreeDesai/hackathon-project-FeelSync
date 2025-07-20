
import React from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Compass, BookOpen, Calendar, Heart } from 'lucide-react';
import FadeIn from './animations/FadeIn';

interface FeatureCardsProps {
  className?: string;
}

const FeatureCards: React.FC<FeatureCardsProps> = ({ className }) => {
  const navigate = useNavigate();

  const features = [
    {
      id: 'career-compass',
      title: 'Career Compass',
      description: 'Discover career paths that align with your unique tastes and interests',
      icon: Compass,
      path: '/career-compass',
      gradient: 'from-blue-500/20 to-purple-500/20',
      iconColor: 'text-blue-400',
      buttonColor: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
    },
    {
      id: 'study-buddy',
      title: 'Study Buddy',
      description: 'Boost your focus with tailored music and productivity tools',
      icon: BookOpen,
      path: '/study-buddy',
      gradient: 'from-green-500/20 to-teal-500/20',
      iconColor: 'text-green-400',
      buttonColor: 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700'
    },
    {
      id: 'daily-planner',
      title: 'Daily Planner',
      description: 'Organize your day around your mood and personal preferences',
      icon: Calendar,
      path: '/daily-planner',
      gradient: 'from-cyan-500/20 to-blue-500/20',
      iconColor: 'text-cyan-400',
      buttonColor: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
    },
    {
      id: 'ideal-type',
      title: 'Ideal Type Finder',
      description: 'Discover romantic insights based on your cultural preferences',
      icon: Heart,
      path: '/ideal-type',
      gradient: 'from-pink-500/20 to-rose-500/20',
      iconColor: 'text-pink-400',
      buttonColor: 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700'
    }
  ];

  return (
    <section id="features" className={cn('py-20 md:py-32 relative', className)}>
      <div className="absolute inset-0 -z-10">
        <img 
          src="/lovable-uploads/21991efd-b30b-4b2e-ac6f-0b8d2bf7c076.png" 
          alt="Starry Night" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <FadeIn delay={100}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-white mb-4">
              Choose Your Vibe
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Explore our AI-powered modules designed to enhance every aspect of your life
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <FadeIn key={feature.id} delay={200 + index * 100}>
              <div 
                className={cn(
                  'relative group cursor-pointer transform transition-all duration-300 hover:scale-105',
                  'bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8',
                  'hover:bg-white/20 hover:border-white/30'
                )}
                onClick={() => {
                  navigate(feature.path);
                  setTimeout(() => {
                    const element = document.getElementById(feature.id + '-main');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}
              >
                <div className={cn('absolute inset-0 rounded-2xl bg-gradient-to-br opacity-50', feature.gradient)}></div>
                
                <div className="relative z-10">
                  <feature.icon className={cn('w-12 h-12 mb-6', feature.iconColor)} />
                  
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/80 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="mt-6 flex items-center text-white/60 group-hover:text-white/80 transition-colors">
                    <span className="text-sm font-medium">Explore now</span>
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
