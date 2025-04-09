
import React from 'react';
import { motion } from 'framer-motion';

interface FamilyMemberProps {
  isChewing: boolean;
}

const FamilyMember: React.FC<FamilyMemberProps> = ({ isChewing }) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-medium mb-6">Family Member</h3>
      
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
                stroke="#D8836F"
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
              
              {/* Wearable device */}
              <motion.path
                d="M75,40 C80,40 85,45 85,50 C85,55 83,60 80,62"
                stroke="#7FB069"
                strokeWidth="3"
                fill="none"
                animate={isChewing ? { opacity: [1, 0.6, 1] } : {}}
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
          animate={{ width: isChewing ? '80px' : '30px' }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default FamilyMember;
