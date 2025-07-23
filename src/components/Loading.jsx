"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Activity, Stethoscope, Shield, Video, Phone, Clock, Star, User, Home } from "lucide-react";

const loadingMessages = [
  "Connecting you to healthcare excellence...",
  "Preparing your personalized care experience...",
  "Setting up secure video consultation...",
  "Matching you with certified professionals...",
  "Almost ready for your health journey..."
];

const healthcareIcons = [
  { icon: Heart, color: "from-red-400 to-pink-500", delay: 0 },
  { icon: Activity, color: "from-blue-400 to-cyan-500", delay: 0.2 },
  { icon: Stethoscope, color: "from-green-400 to-emerald-500", delay: 0.4 },
  { icon: Shield, color: "from-purple-400 to-violet-500", delay: 0.6 },
  { icon: Video, color: "from-orange-400 to-amber-500", delay: 0.8 },
];

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [actualLoadingComplete, setActualLoadingComplete] = useState(false);

  useEffect(() => {
    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      setCurrentMessage(loadingMessages[messageIndex]);
    }, 1500);

    // Ensure minimum loading time of 3.5 seconds
    const minTimeTimer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 3500);

    // Simulate realistic loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setActualLoadingComplete(true);
          return 100;
        }
        // Slower progress initially, faster towards the end
        const increment = prev < 30 ? Math.random() * 8 : 
                         prev < 70 ? Math.random() * 12 : 
                         Math.random() * 20;
        return Math.min(prev + increment, 100);
      });
    }, 300);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearTimeout(minTimeTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-blue-50 via-cyan-50 to-white overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-32 h-32 rounded-full blur-3xl opacity-20 ${
              i % 2 === 0 ? 'bg-blue-300' : 'bg-cyan-300'
            }`}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 60, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
            }}
          />
        ))}

        {/* Pulse Rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute top-1/2 left-1/2 border-2 border-blue-200 rounded-full"
            animate={{
              scale: [0, 2, 0],
              opacity: [0.8, 0.2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeOut",
            }}
            style={{
              width: '200px',
              height: '200px',
              marginLeft: '-100px',
              marginTop: '-100px',
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center max-w-md mx-auto px-6">
        {/* Brand Logo */}
        <motion.div
          className="flex items-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Activity className="w-10 h-10 text-blue-500 mr-3" />
          <h1 className="font-bold text-4xl bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text font-bebas">
            CLYNICARE
          </h1>
        </motion.div>

        {/* Main Loading Animation - Heartbeat with Healthcare Icons */}
        <div className="relative mb-8">
          {/* Central Heartbeat */}
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl relative z-10"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 10px 30px rgba(59, 130, 246, 0.3)',
                '0 20px 60px rgba(59, 130, 246, 0.6)',
                '0 10px 30px rgba(59, 130, 246, 0.3)'
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart className="w-10 h-10 text-white" />
          </motion.div>

          {/* Orbiting Healthcare Icons */}
          {healthcareIcons.map((item, index) => {
            const IconComponent = item.icon;
            const angle = (index * 72) * (Math.PI / 180); // 360/5 = 72 degrees
            const radius = 80;
            
            return (
              <motion.div
                key={index}
                className={`absolute w-12 h-12 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center shadow-lg`}
                animate={{
                  rotate: 360,
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                  rotate: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    delay: item.delay,
                    ease: "easeInOut",
                  }
                }}
                style={{
                  left: `calc(50% + ${Math.cos(angle) * radius}px - 24px)`,
                  top: `calc(50% + ${Math.sin(angle) * radius}px - 24px)`,
                }}
              >
                <IconComponent className="w-6 h-6 text-white" />
              </motion.div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-xs mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Loading</span>
            <span className="text-sm font-medium text-blue-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Dynamic Loading Messages */}
        <div className="text-center mb-6 h-12 flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-lg font-medium text-gray-700 px-4"
            >
              {loadingMessages[currentMessage]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Service Highlights */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 max-w-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { icon: Video, text: "Video Consultation" },
            { icon: Home, text: "Home Nursing" },
            { icon: Clock, text: "24/7 Support" },
            { icon: Star, text: "Expert Care" },
          ].map((service, index) => {
            const ServiceIcon = service.icon;
            return (
              <motion.div
                key={index}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 shadow-sm"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: "easeInOut",
                }}
              >
                <ServiceIcon className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-medium text-gray-700">{service.text}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Floating Dots */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-40"
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
