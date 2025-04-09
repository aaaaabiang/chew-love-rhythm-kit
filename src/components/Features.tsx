
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Leaf, Smile, Heart, Zap, Recycle } from 'lucide-react';

const featureItems = [
  {
    icon: Leaf,
    title: "Sustainable Materials",
    description: "Made from biodegradable textiles and responsibly sourced components that minimize environmental impact."
  },
  {
    icon: Smile,
    title: "Dignified Design",
    description: "Stylish and discreet, avoiding the stigma of medical devices while being comfortable to wear."
  },
  {
    icon: Heart,
    title: "Intergenerational Connection",
    description: "Creates a beautiful rhythm of solidarity between family members during mealtimes."
  },
  {
    icon: Zap,
    title: "Energy Efficient",
    description: "Low-power design using renewable energy sources and efficient power management."
  },
  {
    icon: Check,
    title: "Simple Mechanics",
    description: "Relies on textile-based circuits and mechanical contact detection, avoiding complex electronics."
  },
  {
    icon: Recycle,
    title: "Circular Lifecycle",
    description: "Designed for repair, upgrade, and eventual complete biodegradation when no longer needed."
  }
];

const FeatureCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" 
           style={{ backgroundColor: index % 2 === 0 ? '#A7CAB1' : '#D8836F' }}>
        <Icon className="text-white" size={24} />
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-solarpunk-sand/20">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Sustainable Innovation</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Chewing Love embodies the solarpunk ethos of sustainable technology that enhances human connection
            and dignity rather than replacing it.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
