"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Stethoscope, Users, Phone, Star, CheckCircle, ArrowRight } from 'lucide-react';

// Enhanced nursing and consultancy images from Unsplash
const images = [
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&q=80&w=500", // Nurse video consultation
  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=500", // Telemedicine consultation
  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=500", // Nurse with patient
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500", // Nurse caring for elderly
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=500", // Healthcare professional
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=500", // Nurse with equipment
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=500", // Medical consultation
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=500", // Healthcare team
];

// Fisher-Yates Shuffle Algorithm to shuffle images randomly
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Infinite Scroll Component: Displays shuffled images in an infinite loop
const Fourthinverse = React.memo(({ direction = 'left' }) => {
  // Shuffle images each time the component is rendered
  const shuffledImages = useMemo(() => shuffleArray(images), []);

  return (
    <div className="relative flex overflow-hidden">
      <div className={`flex ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'} gap-4`}>
        {[...shuffledImages, ...shuffledImages, ...shuffledImages].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Healthcare ${index + 1}`}
            loading="lazy"
            className="h-64 w-80 rounded-xl object-cover aspect-video shadow-lg flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
});

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements - inverse colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-teal-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        
        {/* First Infinite Scroll - Inverse direction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Fourthinverse direction="right" />
        </motion.div>

        {/* Enhanced Text and Button Section - Inverse content */}
        <motion.div 
          className="flex flex-col items-center justify-center gap-8 py-20 w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Header with icons - inverse order */}
          <motion.div 
            className="flex items-center gap-4 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-full">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-full">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-3 rounded-full">
              <Phone className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          {/* Main heading - inverse content */}
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-cyan-700 via-teal-800 to-blue-900 text-transparent bg-clip-text mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Expert Consultations,
            <br />
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 text-transparent bg-clip-text">
              Anytime, Anywhere
            </span>
          </motion.h2>

          {/* Enhanced description - inverse focus */}
          <motion.div 
            className="text-center text-xl md:text-2xl text-gray-600 leading-relaxed w-11/12 sm:w-4/5 lg:w-3/5 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="mb-4">
              Connect with <span className="font-semibold text-teal-600">certified specialists</span> and 
              <span className="font-semibold text-blue-600"> experienced nurses</span> through our advanced platform.
            </p>
            <p>
              Get instant medical advice, prescription consultations, and follow-up care 
              with just a few clicks.
            </p>
          </motion.div>

          {/* Feature highlights - inverse features */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mt-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Star className="w-5 h-5 text-teal-600" />
              <span className="text-gray-700 font-medium">Expert Doctors</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 font-medium">Instant Prescriptions</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Phone className="w-5 h-5 text-cyan-600" />
              <span className="text-gray-700 font-medium">24/7 Support</span>
            </div>
          </motion.div>

          {/* Enhanced animated button - inverse style */}
          <motion.button 
            className="relative bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 px-12 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {/* Button background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Button content */}
            <div className="relative flex items-center gap-3">
              <Stethoscope className="w-6 h-6" />
              <span>Book Consultation Now</span>
              <motion.div
                className="flex items-center"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </div>
            
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
          </motion.button>
        </motion.div>

        {/* Second Infinite Scroll - Inverse direction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Fourthinverse direction="left" />
        </motion.div>
      </div>
    </div>
  );
};

export default App;
