
import React, { useState, useEffect } from 'react';
import FamilyMember from './FamilyMember';
import ElderlyPerson from './ElderlyPerson';
import ConnectionVisualizer from './ConnectionVisualizer';
import InfoSection from './InfoSection';

const DeviceDemo = () => {
  const [familyChewing, setFamilyChewing] = useState(false);
  const [elderChewing, setElderChewing] = useState(false);
  const [connected, setConnected] = useState(false);
  const [resonanceStrength, setResonanceStrength] = useState(0);
  
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
            setResonanceStrength(prev => Math.min(prev + 0.2, 1)); // Build resonance with each synchronized chew
            setTimeout(() => {
              setElderChewing(false);
              // Let resonance fade slowly if still connected
              if (connected) {
                setTimeout(() => {
                  setResonanceStrength(prev => Math.max(prev - 0.1, 0));
                }, 1000);
              }
            }, 1000);
          }, 300);
        }
      }, 1000);
    }, 3000);
    
    return () => clearInterval(chewingInterval);
  }, [connected]);

  // Reset resonance when disconnected
  useEffect(() => {
    if (!connected) {
      setResonanceStrength(0);
    }
  }, [connected]);

  // Toggle connection
  const toggleConnection = () => {
    setConnected(!connected);
    if (!connected) {
      setResonanceStrength(0.1); // Start with a small resonance when connecting
    }
  };

  return (
    <section id="device-demo" className="py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">Interactive Demonstration</h2>
        <p className="text-xl text-center max-w-3xl mx-auto mb-16">
          Experience how the Chewing Love system creates a gentle rhythm connection between family members during mealtime.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {/* Family Member Side */}
          <FamilyMember isChewing={familyChewing} />
          
          {/* Connection Visualization */}
            <ConnectionVisualizer 
            connected={connected} 
            familyIsChewing={familyChewing}
            elderIsChewing={elderChewing} 
            resonanceStrength={resonanceStrength}
            toggleConnection={toggleConnection} 
          />
          
          
          {/* Elder Side */}
            <ElderlyPerson 
              isChewing={elderChewing} 
              connected={connected} 
              familyIsChewing={familyChewing}
              resonanceStrength={resonanceStrength}
            />
            </div>
        
        {/* Description Text */}
        <InfoSection />
      </div>
    </section>
  );
};

export default DeviceDemo;
