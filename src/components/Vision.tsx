
import React from 'react';
import { motion } from 'framer-motion';

const Vision = () => {
  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
            <circle id="pattern-circle" cx="10" cy="10" r="1.5" fill="#5C8D54"></circle>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Vision</h2>
          <p className="text-xl max-w-3xl mx-auto">
            A solarpunk future where technology creates bonds of empathy and care across generations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-medium mb-6 text-solarpunk-moss">From Problem to Possibility</h3>
            <div className="space-y-6">
              <p className="text-lg">
                Dysphagia affects up to 22% of adults over 50, and more than 60% of nursing home residents. 
                Beyond physical difficulty, it creates emotional distance during one of life's most important 
                social rituals — breaking bread together.
              </p>
              <p className="text-lg">
                Instead of isolating elders or making them feel like medical patients at the dinner table, 
                Chewing Love transforms mealtime into a moment of shared rhythm and solidarity.
              </p>
              <p className="text-lg">
                By creating a bridge of gentle assistance rather than dependence, we restore dignity while 
                strengthening intergenerational bonds.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="relative overflow-hidden rounded-3xl h-96 order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-solarpunk-moss to-solarpunk-sky opacity-80"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-10 text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <blockquote className="text-2xl italic font-light">
                  "In a solarpunk future, eldercare isn't about control or isolation, but about rhythmic connection 
                  and solidarity across generations."
                </blockquote>
                <div className="mt-8 w-16 h-1 bg-white mx-auto"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-20 bg-solarpunk-sand/30 p-10 rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-medium mb-6 text-center">The Future of Care Technology</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4">
              <h4 className="font-medium text-lg mb-2 text-solarpunk-terracotta">Ambient & Beautiful</h4>
              <p>Technology that blends into daily life as a gentle presence rather than an intrusive force.</p>
            </div>
            <div className="p-4">
              <h4 className="font-medium text-lg mb-2 text-solarpunk-terracotta">Community-Centered</h4>
              <p>Solutions that strengthen social bonds rather than replacing human connection with automation.</p>
            </div>
            <div className="p-4">
              <h4 className="font-medium text-lg mb-2 text-solarpunk-terracotta">Degrowth Compatible</h4>
              <p>Simple, repairable designs that minimize resource use while maximizing quality of life.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
