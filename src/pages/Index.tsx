
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Hero from '../components/Hero';
import DeviceDemo from '../components/DeviceDemo';
import Features from '../components/Features';
import Vision from '../components/Vision';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="text-2xl font-display font-bold text-solarpunk-leaf">
            Chewing Love
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/dashboard" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <div className="pt-16">
        <Hero />
        <DeviceDemo />
        <Features />
        <Vision />
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Access Your Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="bg-solarpunk-leaf p-6">
                  <BarChart3 className="h-12 w-12 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Data Dashboard</h3>
                  <p className="text-gray-600 mb-4">
                    View historical usage data, daily chewing counts, and visualize trends over time.
                  </p>
                  <Button asChild className="w-full bg-solarpunk-leaf hover:bg-solarpunk-moss">
                    <Link to="/dashboard">Go to Dashboard</Link>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="bg-solarpunk-moss p-6">
                  <Settings className="h-12 w-12 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Admin Panel</h3>
                  <p className="text-gray-600 mb-4">
                    Manage devices, family members, and their connections. Customize your Chewing Love experience.
                  </p>
                  <Button asChild className="w-full bg-solarpunk-moss hover:bg-solarpunk-moss/90">
                    <Link to="/admin">Go to Admin Panel</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
