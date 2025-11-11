import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import OffersSection from '../components/sections/OffersSection';
import ServicesSection from '../components/sections/ServicesSection';
import AboutSection from '../components/sections/AboutSection';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <OffersSection />
      <ServicesSection />
      <AboutSection />
    </div>
  );
};

export default Home;

