
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DeviceDemo = () => {
  const [familyChewing, setFamilyChewing] = useState(false);
  const [elderChewing, setElderChewing] = useState(false);
  const [connected, setConnected] = useState(false);
  
  // Simulate family member chewing
  useEffect(() => {
    const chewingInterval = setInterval(() => {
      setFamilyChewing(true);
      setTimeout(() => {
        setFamilyChewing(false);
        // After family member chews, elder follows after a short delay if connected
        if (connected) {
          setTimeout(() => {
            setElderChewing(true);
            setTimeout(() => setElderChewing(false), 1000);
          }, 300);
        }
      }, 1000);
    }, 3000);
    
    return () => clearInterval(chewingInterval);
  }, [connected]);

  // Toggle connection
  const toggleConnection = () => {
    setConnected(!connected);
  };

  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">Interactive Demonstration</h2>
        <p className="text-xl text-center max-w-3xl mx-auto mb-16">
          Experience how the Chewing Love system creates a gentle rhythm connection between family members during mealtime.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Family Member Side */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-medium mb-6">Family Member</h3>
            
            <div className="relative w-full max-w-xs">
              <motion.div 
                className="bg-solarpunk-sand p-8 rounded-3xl shadow-lg relative"
                animate={familyChewing ? { y: [0, -5, 0] } : {}}
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
                      stroke="#D8836F"
                      strokeWidth="2"
                      animate={familyChewing ? { 
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
                    
                    {/* Wearable device */}
                    <motion.path
                      d="M75,40 C80,40 85,45 85,50 C85,55 83,60 80,62"
                      stroke="#7FB069"
                      strokeWidth="3"
                      fill="none"
                      animate={familyChewing ? { opacity: [1, 0.6, 1] } : {}}
                      transition={{ duration: 1 }}
                    />
                    <circle cx="80" cy="62" r="4" fill="#7FB069" />
                  </svg>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="mb-3 text-lg">Natural chewing rhythm</p>
              <motion.div 
                className="inline-block h-4 bg-solarpunk-moss rounded-full"
                animate={{ width: familyChewing ? '80px' : '30px' }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          
          {/* Connection Visualization */}
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
              {connected && familyChewing && (
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
          
          {/* Elder Side */}
          <div className="flex flex-col items-center md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2">
            <h3 className="text-2xl font-medium mb-6">Older Adult</h3>
            
            <div className="relative w-full max-w-xs">
              <motion.div 
                className="bg-solarpunk-sand p-8 rounded-3xl shadow-lg relative"
                animate={elderChewing ? { y: [0, -5, 0] } : {}}
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
                      animate={elderChewing ? { 
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
                      animate={elderChewing || (connected && familyChewing) ? { 
                        opacity: [1, 0.6, 1],
                        strokeWidth: [3, 4, 3] 
                      } : {}}
                      transition={{ duration: 0.5, repeat: connected && familyChewing ? Infinity : 0, repeatType: "loop" }}
                    />
                    <motion.circle 
                      cx="80" 
                      cy="62" 
                      r="4" 
                      fill="#81ADC8" 
                      animate={elderChewing || (connected && familyChewing) ? { 
                        r: [4, 5, 4],
                        opacity: [1, 0.8, 1]
                      } : {}}
                      transition={{ duration: 0.5, repeat: connected && familyChewing ? Infinity : 0, repeatType: "loop" }}
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="mb-3 text-lg">Assisted chewing rhythm</p>
              <motion.div 
                className="inline-block h-4 bg-solarpunk-sky rounded-full"
                animate={{ width: elderChewing ? '80px' : '30px' }}
                transition={{ duration: 0.3 }}
              />
              {connected && familyChewing && !elderChewing && (
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
        </div>
        
        {/* Description Text */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-medium mb-4 text-center">How It Works</h3>
          <p className="text-lg text-center mb-6">
            The Chewing Love system uses soft, textile-based circuits that detect jaw movement through mechanical contact.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="bg-solarpunk-sand/30 p-6 rounded-2xl">
              <h4 className="font-medium text-xl text-solarpunk-moss mb-3">For Family Members</h4>
              <p>
                The family member wears a comfortable device that tracks their natural chewing rhythm, 
                which is transmitted to the older adult's device using low-energy wireless technology.
              </p>
            </div>
            <div className="bg-solarpunk-sand/30 p-6 rounded-2xl">
              <h4 className="font-medium text-xl text-solarpunk-sky mb-3">For Older Adults</h4>
              <p>
                The device provides gentle vibration cues that match the family member's rhythm, 
                encouraging synchronized chewing and swallowing in a natural, dignified way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeviceDemo;
