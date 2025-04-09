import React from 'react';
import { motion } from 'framer-motion';

interface ConnectionVisualizerProps {
  connected: boolean;
  familyIsChewing: boolean;
  elderIsChewing: boolean;
  resonanceStrength: number;
  toggleConnection: () => void;
}

const ConnectionVisualizer: React.FC<ConnectionVisualizerProps> = ({ 
  connected, 
  familyIsChewing,
  elderIsChewing,
  resonanceStrength,
  toggleConnection 
}) => {
  return (
    <>
      {/* Desktop Connection Visualization */}
      <div className="hidden md:flex flex-col items-center justify-center w-full py-8 mx-auto max-w-md">
        {/* Connection Line */}
        <div className="relative h-40 w-full flex items-center justify-center my-4">
          <motion.div 
            className="h-1 bg-gradient-to-r from-solarpunk-moss to-solarpunk-sky w-0"
            animate={{ 
              width: connected ? '100%' : '0%',
              opacity: connected ? [0.5 + resonanceStrength * 0.5, 1, 0.5 + resonanceStrength * 0.5] : 0.5,
              height: connected ? `${Math.max(1 + resonanceStrength * 4, 1)}px` : '1px'
            }}
            transition={{ 
              width: { duration: 1.5 },
              opacity: { duration: 2, repeat: Infinity },
              height: { duration: 0.5 }
            }}
          />
          
          {/* Connection Dots */}
          {connected && (
            <>
              <motion.div 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full bg-solarpunk-moss"
                animate={{ 
                  scale: [1, 1.5, 1], 
                  opacity: [1, 0.7, 1],
                  height: 3 + resonanceStrength * 6,
                  width: 3 + resonanceStrength * 6,
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full bg-solarpunk-sky"
                animate={{ 
                  scale: [1, 1.5, 1], 
                  opacity: [1, 0.7, 1],
                  height: 3 + resonanceStrength * 6,
                  width: 3 + resonanceStrength * 6,
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}
          
          {/* Resonance Wave Effect */}
          {connected && resonanceStrength > 0.1 && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: resonanceStrength }}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-solarpunk-moss border-opacity-50"
                  style={{
                    backgroundColor: 'rgba(127, 176, 105, 0.1)',
                  }}
                  animate={{
                    scale: [0, 1, 1.5],
                    opacity: [0.8, 0.4, 0],
                    borderColor: ['#7FB069', '#81ADC8']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          )}
          
          {/* Data Visualization Particles */}
          {connected && familyIsChewing && (
            <motion.div 
              className="absolute left-1/4 top-1/2 transform -translate-y-1/2 h-2 w-2 rounded-full bg-solarpunk-moss"
              initial={{ left: '0%', opacity: 0.8 }}
              animate={{ 
                left: '100%',
                opacity: [0.8, 1, 0.8],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                left: { duration: 2, ease: "easeInOut" },
                opacity: { duration: 1, repeat: 1, yoyo: true }
              }}
            />
          )}

          {/* Response Particles */}
          {connected && elderIsChewing && (
            <motion.div 
              className="absolute right-1/4 top-1/2 transform -translate-y-1/2 h-2 w-2 rounded-full bg-solarpunk-sky"
              initial={{ right: '0%', opacity: 0.8 }}
              animate={{ 
                right: '100%',
                opacity: [0.8, 1, 0.8],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                right: { duration: 2, ease: "easeInOut" },
                opacity: { duration: 1, repeat: 1, yoyo: true }
              }}
            />
          )}
        </div>

        {/* Resonance Indicator */}
        {connected && (
          <div className="mt-2 mb-4 text-center w-full">
            <p className="text-sm text-gray-600 mb-1">Rhythm Resonance</p>
            <div className="h-2 w-40 bg-gray-200 rounded-full overflow-hidden mx-auto">
              <motion.div 
                className="h-full bg-gradient-to-r from-solarpunk-moss to-solarpunk-sky"
                animate={{ width: `${resonanceStrength * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}
        
        {/* Connection Toggle Button */}
        <motion.button
          className={`mt-4 px-6 py-3 rounded-full text-white font-medium ${connected ? 'bg-solarpunk-terracotta' : 'bg-solarpunk-moss'}`}
          onClick={toggleConnection}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {connected ? 'Disconnect Devices' : 'Connect Devices'}
        </motion.button>
      </div>
      
      {/* Mobile Connection Controls */}
      <div className="md:hidden flex flex-col items-center justify-center mt-10">
        {connected && resonanceStrength > 0.1 && (
          <div className="mb-3 text-center">
            <p className="text-sm text-gray-600 mb-1">Rhythm Resonance</p>
            <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-solarpunk-moss to-solarpunk-sky"
                animate={{ width: `${resonanceStrength * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

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
            animate={{ 
              opacity: [0.5, 1, 0.5],
              height: resonanceStrength > 0.1 ? `${Math.max(1 + resonanceStrength * 4, 1)}px` : '1px'
            }}
            transition={{ 
              opacity: { duration: 2, repeat: Infinity },
              height: { duration: 0.5 }
            }}
          />
        )}
      </div>
    </>
  );
};

export default ConnectionVisualizer;
