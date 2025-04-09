
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-20 px-4 md:px-8">
      {/* Background Blobs */}
      <motion.div 
        className="absolute -z-10 w-96 h-96 bg-solarpunk-seafoam/20 blob-shape"
        animate={{
          x: [0, 10, -10, 0],
          y: [0, -10, 10, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: '10%', right: '5%' }}
      />
      <motion.div 
        className="absolute -z-10 w-80 h-80 bg-solarpunk-ochre/20 blob-shape-alt"
        animate={{
          x: [0, -15, 15, 0],
          y: [0, 15, -15, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: '15%', left: '10%' }}
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Chewing Love
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Restoring dignity and connection at mealtime through rhythmic solidarity.
        </motion.p>
        
        <motion.div
          className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div 
            className="bg-solarpunk-moss text-white px-8 py-3 rounded-full font-medium text-lg flex items-center gap-2 hover:bg-solarpunk-moss/90 transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Discover How It Works
          </motion.div>
          <motion.div 
            className="bg-transparent border-2 border-solarpunk-terracotta text-solarpunk-terracotta px-8 py-3 rounded-full font-medium text-lg flex items-center gap-2 hover:bg-solarpunk-terracotta/10 transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Our Vision
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="22" height="38" rx="11" stroke="currentColor" strokeWidth="2" />
          <motion.circle 
            cx="12" 
            cy="14" 
            r="6" 
            fill="currentColor"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
