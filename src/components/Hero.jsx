"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Nav from "./Nav";
import Searchbox from "./Searchbox";

export default function Hero() {
  return (
    <section className="bg-[radial-gradient(ellipse_300%_100%_at_bottom_center,#007BA7,white_90%)] min-h-screen overflow-hidden relative flex flex-col">
      
      {/* Navbar */}
      <Nav />

      {/* Main Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between pt-[100px] md:pt-0 px-6 md:px-16 lg:px-24 w-full max-w-[1400px] mx-auto mt-10 md:mt-20">
        
        {/* Left Side (Text & Search) */}
        <div className="w-full md:w-1/2 text-center md:text-left flex flex-col gap-6">
          
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold text-black leading-tight"
          >
            Your Health, Our Priority: <br className="hidden md:block" />
            Seamless Home Care at Your Fingertips.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-gray-700 text-lg md:text-xl leading-relaxed"
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
            <button className="bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] text-white px-5 py-3 rounded-full flex items-center gap-2 hover:shadow-md transition-all">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </motion.div>

        </div>

        {/* Right Side (Image) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0"
        >
          <Image
            src="/images/Land.png"
            alt="Healthcare Illustration"
            width={900}
            height={600}
            className="w-full max-w-[500px] md:max-w-[600px] h-auto object-contain"
          />
        </motion.div>

      </div>
    </section>
  );
}
