
import React from 'react';
import { motion } from 'framer-motion';

interface ConnectionVisualizerProps {
  connected: boolean;
  familyIsChewing: boolean;
  toggleConnection: () => void;
}

const ConnectionVisualizer: React.FC<ConnectionVisualizerProps> = ({ 
  connected, 
  familyIsChewing, 
  toggleConnection 
}) => {
  return (
    <>
      {/* Desktop Connection Visualization */}
      <div className="hidden md:flex flex-col items-center justify-center">
        {/* Connection Line */}
        <div className="relative h-40 w-full flex items-center justify-center">
          <motion.div 
            className="h-1 bg-gradient-to-r from-solarpunk-moss to-solarpunk-sky w-0"
            animate={{ width: connected ? '100%' : '0%' }}
            transition={{ duration: 1.5 }}
          />
          
          {/* Connection Dots */}
          {connected && (
            <>
              <motion.div 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 h-3 w-3 rounded-full bg-solarpunk-moss"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 h-3 w-3 rounded-full bg-solarpunk-sky"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}
          
          {/* Data Visualization Particles */}
          {connected && familyIsChewing && (
            <>
              <motion.div 
                className="absolute left-1/4 top-1/2 transform -translate-y-1/2 h-2 w-2 rounded-full bg-solarpunk-moss"
                initial={{ left: '0%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </>
          )}
        </div>
        
        {/* Connection Toggle Button */}
        <motion.button
          className={`mt-8 px-6 py-3 rounded-full text-white font-medium ${connected ? 'bg-solarpunk-terracotta' : 'bg-solarpunk-moss'}`}
          onClick={toggleConnection}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {connected ? 'Disconnect Devices' : 'Connect Devices'}
        </motion.button>
      </div>
      
      {/* Mobile Connection Controls */}
      <div className="md:hidden flex flex-col items-center justify-center mt-10">
        <motion.button
          className={`px-6 py-3 rounded-full text-white font-medium ${connected ? 'bg-solarpunk-terracotta' : 'bg-solarpunk-moss'}`}
          onClick={toggleConnection}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {connected ? 'Disconnect Devices' : 'Connect Devices'}
        </motion.button>
        
        {connected && (
          <motion.div 
            className="mt-4 h-1 bg-gradient-to-r from-solarpunk-moss to-solarpunk-sky w-40"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    </>
  );
};

export default ConnectionVisualizer;
