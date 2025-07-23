"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Phone, Sparkles, Heart } from "lucide-react";
import Nav from "./Nav";
import Searchbox from "./Searchbox";

const Hero = React.memo(() => {

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 min-h-screen overflow-hidden relative flex flex-col">
      {/* Simple animated background elements without parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-400/10 to-blue-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Simple floating elements */}
        <motion.div
          className="absolute top-20 left-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-30"
          animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-1/3 w-6 h-6 bg-cyan-300 rounded-full opacity-25"
          animate={{ y: [10, -10, 10], rotate: [360, 180, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>
      
      {/* Navbar */}
      
      {/* Main Hero Section with smooth animations */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row items-center justify-between pt-[100px] md:pt-0 px-6 md:px-16 lg:px-24 w-full max-w-[1400px] mx-auto mt-10 md:mt-20 relative z-10"
      >
        
        {/* Left Side (Text & Search) with enhanced animations */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-1/2 text-center md:text-left flex flex-col gap-6"
        >
          
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-3xl font-sans md:text-5xl font-bold text-black tracking-tighter "
          >
            Your Health, Our Priority: <br className="hidden md:block" />
            Seamless Home Care at Your Fingertips.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-gray-700 font-sans text-lg md:text-xl leading-relaxed"
          >
            Get skilled home healthcare at your doorstep—easy booking, 
            professional care, and complete well-being.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="flex bg-white w-full max-w-[450px] gap-2 rounded-full p-3 shadow-lg mx-auto md:mx-0"
          >
            <div className="flex-1">
              <Searchbox />
            </div>
            <motion.button 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:shadow-lg transition-all duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('tel:+91 8088058792', '_self')}
            >
              <Phone className="w-5 h-5"/>
              <span>Call Us</span>
            </motion.button>
          </motion.div>

        </motion.div>

        {/* Right Side (Image) with smooth animations */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="w-full md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0 relative"
        >
          {/* Floating decorative elements around image */}
          <motion.div
            className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-60"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-6 -right-6 w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full opacity-50"
            animate={{ rotate: -360, y: [-5, 5, -5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Use lazy loading for images for better performance */}
          <Image
            src="/images/Land.png"
            alt="Healthcare Illustration"
            width={900}
            height={600}
            className="w-full max-w-[500px] md:max-w-[600px] h-auto object-contain relative z-10"
          />
        </motion.div>

      </motion.div>
    </section>
  );
});

export default Hero;
