"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Video, 
  Shield, 
  Clock, 
  Star, 
  Users,
  ArrowRight,
  Play,
  Stethoscope,
  Phone
} from 'lucide-react';
import Link from 'next/link';

const EnhancedHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Professional Nursing Care",
      subtitle: "At Your Doorstep",
      description: "Certified nurses providing quality home healthcare services",
      image: "/images/nurse-care.jpg",
      cta: "Find Nurses",
      link: "/Nurses",
      color: "from-blue-600 to-cyan-600"
    },
    {
      title: "Expert Doctor Consultation",
      subtitle: "Via Video Call",
      description: "Connect with specialist doctors from the comfort of your home",
      image: "/images/doctor-consultation.jpg",
      cta: "Book Consultation",
      link: "/Doctors",
      color: "from-blue-600 to-cyan-600"
    },
    {
      title: "Hybrid Healthcare",
      subtitle: "Best of Both Worlds",
      description: "Combine nursing care with doctor teleconsultation for comprehensive treatment",
      image: "/images/hybrid-care.jpg",
      cta: "Learn More",
      link: "/Services",
      color: "from-blue-600 to-cyan-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // Slower transition
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Simplified Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20"></div>
        <div className="absolute -bottom-8 left-20 w-32 h-32 bg-cyan-200 rounded-full opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6"
            >
              <Shield className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Trusted by 10,000+ Patients</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
                Healthcare
              </span>
              <br />
              <span className="text-gray-900">Reimagined</span>
            </motion.h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 leading-relaxed px-4 md:px-0">
              Your bridge between professional nursing care and expert medical consultation. 
              Experience the future of healthcare at home.
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-4 md:gap-6 mb-8 max-w-md mx-auto lg:mx-0"
            >
              <div className="text-center p-3 bg-white/50 rounded-xl">
                <div className="text-xl md:text-2xl font-bold text-blue-600">500+</div>
                <div className="text-xs md:text-sm text-gray-600">Nurses</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-xl">
                <div className="text-xl md:text-2xl font-bold text-blue-600">100+</div>
                <div className="text-xs md:text-sm text-gray-600">Doctors</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-xl">
                <div className="text-xl md:text-2xl font-bold text-cyan-600">4.9★</div>
                <div className="text-xs md:text-sm text-gray-600">Rating</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start max-w-lg mx-auto lg:mx-0"
            >
              <Link href="/Nurses" className="flex-1">
                <motion.button
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Heart className="w-4 h-4" />
                  Find Nurses
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              
              <Link href="/Services" className="flex-1">
                <motion.button
                  className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Video className="w-4 h-4" />
                  Teleconsultation
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Slider */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              {slides.map((slide, index) => (
                <motion.div
                  key={index}
                  className={`absolute inset-0 bg-gradient-to-br ${slide.color}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentSlide === index ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl md:text-3xl font-bold mb-2"
                    >
                      {slide.title}
                    </motion.h3>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg mb-4 opacity-90"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-sm mb-6 opacity-80"
                    >
                      {slide.description}
                    </motion.p>
                    <Link href={slide.link}>
                      <motion.button
                        className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center gap-2 w-fit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {slide.cta}
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === index ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-16 max-w-5xl mx-auto px-4">
          <div className="bg-white/90 rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Home Nursing</h3>
            <p className="text-gray-600 text-sm mb-4">Professional nurses providing personalized care at your home</p>
            <Link href="/Nurses" className="text-blue-600 font-medium flex items-center justify-center gap-1 hover:gap-2 transition-all">
              Explore <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white/90 rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Teleconsultation</h3>
            <p className="text-gray-600 text-sm mb-4">Connect with specialist doctors via secure video calls</p>
            <Link href="/Services" className="text-blue-600 font-medium flex items-center justify-center gap-1 hover:gap-2 transition-all">
              Book Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white/90 rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center">
            <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Stethoscope className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Hybrid Care</h3>
            <p className="text-gray-600 text-sm mb-4">Comprehensive care combining nursing and doctor consultation</p>
            <Link href="/Services" className="text-cyan-600 font-medium flex items-center justify-center gap-1 hover:gap-2 transition-all">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-20">
        <a href="tel:+918088058792">
          <button className="bg-blue-500 text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-all">
            <Phone className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </a>
      </div>
    </section>
  );
};

export default EnhancedHero;
