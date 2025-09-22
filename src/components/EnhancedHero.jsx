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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-gray-50 pb-16 md:pb-24 lg:pb-32">
      {/* Professional Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/40 rounded-full opacity-60"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-slate-200/40 rounded-full opacity-50"></div>
        <div className="absolute -bottom-8 left-20 w-32 h-32 bg-gray-200/40 rounded-full opacity-60"></div>
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
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-200/50 rounded-full shadow-sm mb-6 mt-6"
            >
              <span className="text-sm font-semibold text-slate-700">🚀 New Launch - Founding Member Benefits</span>
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
              <span className="text-slate-800">Revolution</span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text font-medium">Starts Here</span>
            </motion.h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-slate-600 mb-4 leading-relaxed px-4 md:px-0">
              We're launching with handpicked healthcare professionals. 
              Experience premium care at home with <span className="font-semibold text-cyan-600">early bird pricing.</span>
            </p>

            {/* Urgency Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="relative bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white px-8 py-5 rounded-2xl mb-6 mx-auto lg:mx-0 max-w-md overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 15%, #ff4757 35%, #e84393 55%, #fd79a8 75%, #a29bfe 100%)',
                boxShadow: '0 20px 40px rgba(255, 107, 53, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              {/* Animated Background Sparkles */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-8 h-8 text-yellow-200 opacity-60"
                >
                  ✨
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-2 -left-2 w-6 h-6 text-white opacity-40"
                >
                  💫
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 right-2 w-4 h-4 text-yellow-300 transform -translate-y-1/2"
                >
                  ⚡
                </motion.div>
              </div>

              {/* Glowing Edge Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
              
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <p className="font-bold text-center lg:text-left text-sm md:text-base tracking-wide leading-relaxed">
                  <span className="text-2xl mr-2">🔥</span>
                  <span className="text-yellow-200 font-extrabold drop-shadow-sm">Launch Special:</span> 
                  <span className="mx-2 text-white font-black text-lg md:text-xl drop-shadow-lg bg-white/20 px-3 py-1 rounded-lg inline-block transform hover:scale-105 transition-transform">
                    40% OFF
                  </span>
                  <br className="md:hidden" />
                  <span className="text-white/90 font-medium text-xs md:text-sm">
                    First 100 patients only!
                  </span>
                </p>
              </motion.div>

              {/* Animated Border Glow */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-2xl border-2 border-white/30 pointer-events-none"
              ></motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-4 md:gap-6 mb-8 max-w-md mx-auto lg:mx-0"
            >
              <div className="text-center p-3 bg-white/80 rounded-xl shadow-sm border border-slate-200/30">
                <div className="text-xl md:text-2xl font-bold text-slate-700">4</div>
                <div className="text-xs md:text-sm text-slate-600">Expert Doctors</div>
              </div>
              <div className="text-center p-3 bg-white/80 rounded-xl shadow-sm border border-slate-200/30">
                <div className="text-xl md:text-2xl font-bold text-slate-700">4</div>
                <div className="text-xs md:text-sm text-slate-600">Partner Agencies</div>
              </div>
              <div className="text-center p-3 bg-white/80 rounded-xl shadow-sm border border-slate-200/30">
                <div className="text-xl md:text-2xl font-bold text-blue-700">NEW</div>
                <div className="text-xs md:text-sm text-slate-600">Launch 2025</div>
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
              
              <Link href="/services" className="flex-1">
                <motion.button
                  className="w-full border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-blue-600 hover:text-cyan-600 transition-all flex items-center justify-center gap-2"
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
          <div className="bg-white/95 rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center border border-slate-100">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Heart className="w-6 h-6 text-slate-700" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-slate-800">🚀 Launch Nursing</h3>
            <p className="text-slate-600 text-sm mb-4">Join our early members! Premium nursing care at startup prices</p>
            <Link href="/Nurses" className="text-cyan-600 font-medium flex items-center justify-center gap-1 hover:gap-2 transition-all">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white/95 rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center border border-slate-100">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Video className="w-6 h-6 text-slate-700" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-slate-800">🩺 Meet Our 4 Doctors</h3>
            <p className="text-slate-600 text-sm mb-4">Exclusive access to our handpicked specialists. Limited slots available!</p>
            <Link href="/Services" className="text-cyan-600 font-medium flex items-center justify-center gap-1 hover:gap-2 transition-all">
              Book Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white/95 rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center border border-slate-100">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Stethoscope className="w-6 h-6 text-slate-700" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-slate-800">🏥 Growing Network</h3>
            <p className="text-slate-600 text-sm mb-4">4 partner agencies ready to serve. Be part of our healthcare revolution!</p>
            <Link href="/Services" className="text-cyan-600 font-medium flex items-center justify-center gap-1 hover:gap-2 transition-all">
              Join Us <ArrowRight className="w-4 h-4" />
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
