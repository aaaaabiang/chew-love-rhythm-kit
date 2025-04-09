
import React, { useState, useEffect } from 'react';
import FamilyMember from './FamilyMember';
import ElderlyPerson from './ElderlyPerson';
import ConnectionVisualizer from './ConnectionVisualizer';
import InfoSection from './InfoSection';

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
          <FamilyMember isChewing={familyChewing} />
          
          {/* Connection Visualization */}
          <ConnectionVisualizer 
            connected={connected} 
            familyIsChewing={familyChewing} 
            toggleConnection={toggleConnection} 
          />
          
          {/* Elder Side */}
          <div className="md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2">
            <ElderlyPerson 
              isChewing={elderChewing} 
              connected={connected} 
              familyIsChewing={familyChewing} 
            />
          </div>
        </div>
        
        {/* Description Text */}
        <InfoSection />
      </div>
    </section>
  );
};

export default DeviceDemo;
