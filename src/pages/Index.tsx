
import React from 'react';
import Hero from '../components/Hero';
import DeviceDemo from '../components/DeviceDemo';
import Features from '../components/Features';
import Vision from '../components/Vision';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <DeviceDemo />
      <Features />
      <Vision />
      <Footer />
    </div>
  );
};

export default Index;
