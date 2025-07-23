"use client";
import React from "react";
import { motion } from "framer-motion";

const AnimatedBackground = () => {

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large floating elements with simple animations */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-100/15 to-cyan-100/15 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1], 
          rotate: [0, 360], 
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-pink-100/10 to-rose-100/10 rounded-full blur-2xl"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut", 
          delay: 2 
        }}
      />
      
      <motion.div
        className="absolute top-96 left-1/3 w-64 h-64 bg-gradient-to-br from-teal-100/20 to-blue-100/20 rounded-full blur-2xl"
        animate={{ 
          scale: [1, 1.15, 1], 
          rotate: [0, -180, 0], 
          opacity: [0.25, 0.45, 0.25] 
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity, 
          ease: "easeInOut", 
          delay: 4 
        }}
      />
      
      {/* Medium floating elements */}
      <motion.div
        className="absolute top-[600px] right-10 w-48 h-48 bg-gradient-to-br from-cyan-200/15 to-blue-200/15 rounded-full blur-xl"
        animate={{ 
          y: [-10, 10, -10], 
          scale: [1, 1.1, 1] 
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut", 
          delay: 1 
        }}
      />
      
      <motion.div
        className="absolute top-[800px] left-20 w-56 h-56 bg-gradient-to-br from-indigo-100/25 to-purple-100/25 rounded-full blur-2xl"
        animate={{ 
          y: [10, -10, 10], 
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 14, 
          repeat: Infinity, 
          ease: "easeInOut", 
          delay: 3 
        }}
      />
      
      {/* Small floating elements */}
      <motion.div
        className="absolute top-[1000px] right-1/4 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-lg"
        animate={{ 
          x: [-5, 5, -5], 
          y: [-5, 5, -5] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div
        className="absolute top-[1200px] left-1/2 w-40 h-40 bg-gradient-to-br from-violet-100/15 to-purple-100/15 rounded-full blur-xl"
        animate={{ 
          scale: [1, 1.05, 1], 
          rotate: [0, 90, 0] 
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut", 
          delay: 2 
        }}
      />
      
      <motion.div
        className="absolute top-[1400px] right-1/3 w-36 h-36 bg-gradient-to-br from-orange-100/10 to-red-100/10 rounded-full blur-lg"
        animate={{ 
          y: [-8, 8, -8], 
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ 
          duration: 9, 
          repeat: Infinity, 
          ease: "easeInOut", 
          delay: 1.5 
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
