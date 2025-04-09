
import React from 'react';

const InfoSection: React.FC = () => {
  return (
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
  );
};

export default InfoSection;
