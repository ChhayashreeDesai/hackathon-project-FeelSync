
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { NavLink, useLocation } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string, sectionId: string) => {
    // If we're already on the page, scroll to the hero section
    if (location.pathname === path) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // NavLink will handle navigation to different pages
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'py-3 bg-black/80 backdrop-blur-md border-b border-white/10 shadow-sm'
          : 'py-5 bg-transparent',
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <NavLink 
          to="/" 
          className="text-xl font-funnel font-semibold text-white hover:text-pink-400 transition-colors"
        >
          TasteBot
        </NavLink>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks onNavClick={handleNavClick} />
        </div>
        
        <button 
          className="md:hidden flex items-center text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={cn(
            "block w-6 transition-all duration-300",
            isMobileMenuOpen ? "opacity-0" : "opacity-100"
          )}>
            <span className="block w-6 h-0.5 bg-white mb-1.5" />
            <span className="block w-6 h-0.5 bg-white mb-1.5" />
            <span className="block w-4 h-0.5 bg-white" />
          </span>
        </button>
      </div>
      
      <div 
        className={cn(
          "fixed inset-0 bg-black/95 z-40 flex flex-col pt-24 px-6 transition-transform duration-500 ease-in-out transform md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button 
          className="absolute top-5 right-5 p-2 text-white"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <span className="block w-6 h-0.5 bg-white transform rotate-45 translate-y-0.5" />
          <span className="block w-6 h-0.5 bg-white transform -rotate-45" />
        </button>
        
        <nav className="flex flex-col space-y-6 text-lg">
          <NavLink 
            to="/" 
            className="text-white hover:text-pink-400 transition-colors"
            onClick={() => handleNavClick('/', 'home-main')}
          >
            Home
          </NavLink>
          <NavLink 
            to="/career-compass" 
            className="text-white hover:text-pink-400 transition-colors"
            onClick={() => handleNavClick('/career-compass', 'career-compass-main')}
          >
            Career Compass
          </NavLink>
          <NavLink 
            to="/study-buddy" 
            className="text-white hover:text-pink-400 transition-colors"
            onClick={() => handleNavClick('/study-buddy', 'study-buddy-main')}
          >
            Study Buddy
          </NavLink>
          <NavLink 
            to="/daily-planner" 
            className="text-white hover:text-pink-400 transition-colors"
            onClick={() => handleNavClick('/daily-planner', 'daily-planner-main')}
          >
            Daily Planner
          </NavLink>
          <NavLink 
            to="/ideal-type" 
            className="text-white hover:text-pink-400 transition-colors"
            onClick={() => handleNavClick('/ideal-type', 'ideal-type-main')}
          >
            Ideal Type
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

interface NavLinksProps {
  onNavClick: (path: string, sectionId: string) => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ onNavClick }) => (
  <>
    <NavLink 
      to="/" 
      className="text-sm font-medium text-white hover:text-pink-400 transition-colors"
      onClick={() => onNavClick('/', 'home-main')}
    >
      Home
    </NavLink>
    <NavLink 
      to="/career-compass" 
      className="text-sm font-medium text-white hover:text-pink-400 transition-colors"
      onClick={() => onNavClick('/career-compass', 'career-compass-main')}
    >
      Career Compass
    </NavLink>
    <NavLink 
      to="/study-buddy" 
      className="text-sm font-medium text-white hover:text-pink-400 transition-colors"
      onClick={() => onNavClick('/study-buddy', 'study-buddy-main')}
    >
      Study Buddy
    </NavLink>
    <NavLink 
      to="/daily-planner" 
      className="text-sm font-medium text-white hover:text-pink-400 transition-colors"
      onClick={() => onNavClick('/daily-planner', 'daily-planner-main')}
    >
      Daily Planner
    </NavLink>
    <NavLink 
      to="/ideal-type" 
      className="text-sm font-medium text-white hover:text-pink-400 transition-colors"
      onClick={() => onNavClick('/ideal-type', 'ideal-type-main')}
    >
      Ideal Type
    </NavLink>
  </>
);

export default Header;
