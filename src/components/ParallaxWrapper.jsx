"use client";
import React from "react";
import { motion } from "framer-motion";

const SmoothWrapper = ({ children, className = "", animationType = "fadeIn" }) => {
  // Different animation variants
  const animations = {
    fadeIn: {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: "easeOut" }
    },
    slideUp: {
      initial: { opacity: 0, y: 50 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.8, ease: "easeOut" }
    },
    slideLeft: {
      initial: { opacity: 0, x: -50 },
      whileInView: { opacity: 1, x: 0 },
      transition: { duration: 0.7, ease: "easeOut" }
    },
    slideRight: {
      initial: { opacity: 0, x: 50 },
      whileInView: { opacity: 1, x: 0 },
      transition: { duration: 0.7, ease: "easeOut" }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      whileInView: { opacity: 1, scale: 1 },
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const selectedAnimation = animations[animationType] || animations.fadeIn;

  return (
    <motion.div
      initial={selectedAnimation.initial}
      whileInView={selectedAnimation.whileInView}
      transition={selectedAnimation.transition}
      viewport={{ once: true, margin: "-50px" }}
      className={`relative ${className}`}
    >
      {/* Background decorative elements with simple animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-blue-200/15 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.1, 1], 
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 bg-cyan-200/15 rounded-full blur-lg"
          animate={{ 
            y: [-5, 5, -5], 
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: 2 
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-16 h-16 bg-teal-200/25 rounded-full blur-md"
          animate={{ 
            rotate: [0, 360], 
            scale: [1, 1.05, 1] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: 1 
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default SmoothWrapper;
