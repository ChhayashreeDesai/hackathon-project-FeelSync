
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeatureCards from '@/components/FeatureCards';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <FeatureCards />
      <Footer />
    </main>
  );
};

export default Index;
