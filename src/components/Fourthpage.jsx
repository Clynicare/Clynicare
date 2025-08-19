"use client";

import React from 'react';
import { Heart, Stethoscope, UserPlus, Video, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

// InfiniteScroll Component: Displays horizontally scrolling images
const InfiniteScroll = React.memo(({ direction = 'left' }) => {
  const images = [
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=500", // Nurse caring for patient
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500", // Nurse with elderly patient
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=500", // Healthcare professional
    "https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80&w=500", // Home healthcare nurse
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=500", // Medical consultation
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=500", // Nurse with equipment
  ];

  return (
    <div className="relative flex overflow-hidden">
      <div className={`flex ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'} gap-4`}>
        {[...images, ...images, ...images].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Healthcare ${index + 1}`}
            loading="lazy"  // Ensures images are loaded only when they're in the viewport
            className="h-64 w-80 rounded-xl object-cover aspect-video shadow-lg flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
});

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        
        {/* First Infinite Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <InfiniteScroll direction="left" />
        </motion.div>

        {/* Enhanced Text and Button Section */}
        <motion.div 
          className="flex flex-col items-center justify-center gap-8 py-20 w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Header with icons */}
          <motion.div 
            className="flex items-center gap-4 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-gray-900 via-blue-800 to-cyan-700 text-transparent bg-clip-text mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Professional Care,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
              Right at Your Doorstep
            </span>
          </motion.h2>

          {/* Enhanced description */}
          <motion.div 
            className="text-center text-xl md:text-2xl text-gray-600 leading-relaxed w-11/12 sm:w-4/5 lg:w-3/5 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="mb-4">
              Experience <span className="font-semibold text-blue-600">world-class nursing care</span> and 
              <span className="font-semibold text-cyan-600"> expert consultations</span> from the comfort of your home.
            </p>
            <p>
              Our certified healthcare professionals provide personalized, compassionate care 
              tailored to your unique needs.
            </p>
          </motion.div>

          {/* Feature highlights */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mt-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 font-medium">24/7 Available</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Video className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 font-medium">Video Consultations</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Shield className="w-5 h-5 text-cyan-600" />
              <span className="text-gray-700 font-medium">Certified Nurses</span>
            </div>
          </motion.div>

          {/* Enhanced animated button */}
          <motion.button 
            className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-12 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {/* Button background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Button content */}
            <div className="relative flex items-center gap-3">
              <Heart className="w-6 h-6" />
              <span>Start Your Care Journey</span>
              <motion.div
                className="w-2 h-2 bg-white rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
          </motion.button>
        </motion.div>

        {/* Second Infinite Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <InfiniteScroll direction="right" />
        </motion.div>
      </div>
    </div>
  );
};

export default App;
