"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { motion } from "framer-motion";

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

const Fourthinverse = () => {
  return (
    <div className="bg-transparent h-[30vh] overflow-hidden mt-10 relative">
      <motion.div
        className="flex space-x-8 cursor-grab"
        drag="x"
        dragConstraints={{ left: -((200 + 32) * images.length), right: 0 }}
        whileTap={{ cursor: "grabbing" }}
      >
        {images.map((src, index) => (
          <div key={index} className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
            <Image
              src={src}
              width={256}
              height={256}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
              unoptimized
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Fourthinverse;

