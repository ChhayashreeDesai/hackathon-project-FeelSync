
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn('py-12 bg-black/90 border-t border-white/10', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/fc67c7cd-5882-4e6a-8761-462d36632d0f.png" 
              alt="FeelSync" 
              className="h-8"
            />
          </div>
          
          <div className="flex flex-wrap justify-center space-x-6 text-sm">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/career-compass" className="text-white/70 hover:text-white transition-colors">
              Career Compass
            </Link>
            <Link to="/study-buddy" className="text-white/70 hover:text-white transition-colors">
              Study Buddy
            </Link>
            <Link to="/daily-planner" className="text-white/70 hover:text-white transition-colors">
              Daily Planner
            </Link>
            <Link to="/ideal-type" className="text-white/70 hover:text-white transition-colors">
              Ideal Type
            </Link>
          </div>
          
          <div className="text-center text-sm text-white/50">
            <p>Built with Qloo API & GPT | Hackathon Project</p>
            <p className="mt-1">No personal data stored • Privacy first</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
