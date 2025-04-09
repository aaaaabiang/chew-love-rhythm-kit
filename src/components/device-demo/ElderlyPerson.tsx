
import React from 'react';
import { motion } from 'framer-motion';

interface ElderlyPersonProps {
  isChewing: boolean;
  connected: boolean;
  familyIsChewing: boolean;
}

const ElderlyPerson: React.FC<ElderlyPersonProps> = ({ isChewing, connected, familyIsChewing }) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-medium mb-6">Older Adult</h3>
      
      <div className="relative w-full max-w-xs">
        <motion.div 
          className="bg-solarpunk-sand p-8 rounded-3xl shadow-lg relative"
          animate={isChewing ? { y: [0, -5, 0] } : {}}
          transition={{ duration: 1 }}
        >
          <div className="relative w-48 h-48 mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <motion.path
                d="M50,10 
                   C65,10 80,25 80,45 
                   C80,65 70,75 70,80 
                   C70,85 60,90 50,90 
                   C40,90 30,85 30,80 
                   C30,75 20,65 20,45 
                   C20,25 35,10 50,10 Z"
                fill="#F5E4CF"
                stroke="#81ADC8"
                strokeWidth="2"
                animate={isChewing ? { 
                  d: [
                    "M50,10 C65,10 80,25 80,45 C80,65 70,75 70,80 C70,85 60,90 50,90 C40,90 30,85 30,80 C30,75 20,65 20,45 C20,25 35,10 50,10 Z",
                    "M50,10 C65,10 80,25 80,45 C80,65 70,75 70,80 C70,85 60,85 50,85 C40,85 30,85 30,80 C30,75 20,65 20,45 C20,25 35,10 50,10 Z",
                    "M50,10 C65,10 80,25 80,45 C80,65 70,75 70,80 C70,85 60,90 50,90 C40,90 30,85 30,80 C30,75 20,65 20,45 C20,25 35,10 50,10 Z"
                  ]
                } : {}}
                transition={{ duration: 1 }}
              />
              
              {/* Eyes */}
              <circle cx="40" cy="35" r="3" fill="#2A4151" />
              <circle cx="60" cy="35" r="3" fill="#2A4151" />
              
              {/* Facial lines for older appearance */}
              <path d="M30,30 C35,28 40,30 45,30" stroke="#2A4151" strokeWidth="1" fill="none" />
              <path d="M55,30 C60,30 65,28 70,30" stroke="#2A4151" strokeWidth="1" fill="none" />
              <path d="M35,50 C40,55 60,55 65,50" stroke="#2A4151" strokeWidth="1" fill="none" />
              
              {/* Wearable device */}
              <motion.path
                d="M75,40 C80,40 85,45 85,50 C85,55 83,60 80,62"
                stroke="#81ADC8"
                strokeWidth="3"
                fill="none"
                animate={isChewing || (connected && familyIsChewing) ? { 
                  opacity: [1, 0.6, 1],
                  strokeWidth: [3, 4, 3] 
                } : {}}
                transition={{ duration: 0.5, repeat: connected && familyIsChewing ? Infinity : 0, repeatType: "loop" }}
              />
              <motion.circle 
                cx="80" 
                cy="62" 
                r="4" 
                fill="#81ADC8" 
                animate={isChewing || (connected && familyIsChewing) ? { 
                  r: [4, 5, 4],
                  opacity: [1, 0.8, 1]
                } : {}}
                transition={{ duration: 0.5, repeat: connected && familyIsChewing ? Infinity : 0, repeatType: "loop" }}
              />
            </svg>
          </div>
        </motion.div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="mb-3 text-lg">Assisted chewing rhythm</p>
        <motion.div 
          className="inline-block h-4 bg-solarpunk-sky rounded-full"
          animate={{ width: isChewing ? '80px' : '30px' }}
          transition={{ duration: 0.3 }}
        />
        {connected && familyIsChewing && !isChewing && (
          <motion.div 
            className="block mt-2 text-sm text-solarpunk-sky"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Vibration guidance active
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ElderlyPerson;
