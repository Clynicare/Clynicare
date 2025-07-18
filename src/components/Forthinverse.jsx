"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// List of images
const images = [
  "/images/fourthOne.jpg",
  "/images/fourthTwo.jpg",
  "/images/forthThree.jpg",
  "/images/WoundDressing.jpg",
  "/images/urineService.jpg",
  "/images/forthThree.jpg",
  "/images/forthThree.jpg",
  "/images/fourthOne.jpg",
  "/images/fourthTwo.jpg",
  "/images/forthThree.jpg",
  "/images/WoundDressing.jpg",
  "/images/urineService.jpg",
  "/images/forthThree.jpg",
  "/images/EmergencyCare.jpg",
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
    <div className="relative flex overflow-hidden mt-10">
      <motion.div
        className={`flex ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'} gap-4`}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        whileTap={{ cursor: "grabbing" }}
      >
        {[...shuffledImages, ...shuffledImages].map((src, index) => (
          <div key={index} className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
            {/* Image with lazy loading */}
            <Image
              src={src}
              width={256}
              height={256}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
              loading="lazy" // Optimized for performance
              unoptimized
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
});

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        
        {/* First Infinite Scroll */}
        <Fourthinverse direction="left" />

        {/* Text and Button */}
        <div className="flex flex-col items-center justify-center gap-5 py-[100px] w-full">
          <div className="text-center font-medium text-lg tracking-wide  w-11/12 sm:w-3/4 lg:w-3/5 overflow-hidden text-ellipsis">
            Experience personalized healthcare with Clynicare, connecting you to skilled paramedical professionals for home-based medical services. Our comprehensive approach ensures your unique health needs are met with convenience and expertise.
          </div>
          <button className="bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] text-white py-2 px-4 rounded-full w-10/12 sm:w-64">
            Discover our Services
          </button>
        </div>

        {/* Second Infinite Scroll */}
        <Fourthinverse direction="right" />
      </div>
    </div>
  );
};

export default App;
