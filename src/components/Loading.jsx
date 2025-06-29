"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Home, Stethoscope } from "lucide-react";

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.3, // delay between icon animations
    },
  },
};

const iconVariants = {
  initial: { opacity: 0, y: 20, scale: 0.5 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center z-50 bg-white"
    >
      <div className="relative flex flex-col items-center">
        {/* Loader Circle */}
        <div className="loader border-t-4 border-[#4DA1A9] border-solid rounded-full w-16 h-16 animate-spin mb-4"></div>

        {/* Animated Icons with stagger */}
        <motion.div
          className="flex space-x-6"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {[Home, Heart, Stethoscope].map((Icon, idx) => (
            <motion.div
              key={idx}
              variants={iconVariants}
              className="text-[#4DA1A9] w-8 h-8"
            >
              <Icon />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
