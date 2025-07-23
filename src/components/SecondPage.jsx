"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { UserPlus, ClipboardList, CalendarCheck, ArrowRight, Sparkles, Heart, Shield, Star, Clock } from "lucide-react";
import { useRef } from "react";

// Memoize the component to avoid unnecessary re-renders
const SecondPage = React.memo(() => {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      step: 1,
      icon: UserPlus,
      title: "Create Account",
      description: "Sign up in seconds with your email and create your personalized healthcare profile with secure verification.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      features: ["Instant verification", "Secure profile", "Easy setup"]
    },
    {
      step: 2,
      icon: ClipboardList,
      title: "Choose Service",
      description: "Browse our comprehensive nursing services and select the specialized care that perfectly fits your needs.",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      features: ["Expert nurses", "Various specialties", "Flexible options"]
    },
    {
      step: 3,
      icon: CalendarCheck,
      title: "Book Appointment",
      description: "Schedule your preferred time slot and get instant confirmation from our qualified, verified nurses.",
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50",
      features: ["Instant booking", "Real-time availability", "Confirmed appointments"]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div ref={ref} className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-30"
          animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-6 h-6 bg-purple-400 rounded-full opacity-20"
          animate={{ y: [10, -10, 10], x: [-5, 5, -5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">How it Works</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-cyan-700 text-transparent bg-clip-text mb-6 leading-tight">
              Easy Steps to
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
                Secure Your Nursing Appointment
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience seamless healthcare booking with our intuitive platform designed for your convenience
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Side - Interactive Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <motion.div 
                  className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src="/images/doc.jpg"
                    width={600}
                    height={500}
                    alt="Professional Healthcare Provider"
                    className="w-full h-auto object-cover"
                    priority
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
                
                {/* Floating Stats Cards */}
                <motion.div 
                  className="absolute -bottom-8 -right-8 bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-12 h-12 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">24/7</p>
                      <p className="text-sm text-gray-600">Care Available</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -top-8 -left-8 bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">4.9★</p>
                      <p className="text-sm text-gray-600">Patient Rating</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Steps */}
            <motion.div 
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  variants={itemVariants}
                  className="group cursor-pointer"
                  onHoverStart={() => setActiveStep(index)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`relative p-8 rounded-3xl transition-all duration-500 ${
                    activeStep === index 
                      ? `bg-gradient-to-br ${step.bgColor} border-2 border-white shadow-2xl` 
                      : 'bg-white/50 backdrop-blur-sm border border-gray-200 hover:shadow-xl'
                  }`}>
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {step.step}
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-6">
                      {/* Icon */}
                      <motion.div 
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <step.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-4">
                          {step.description}
                        </p>
                        
                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {step.features.map((feature, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white/70 rounded-full text-sm text-gray-700 font-medium">
                              {feature}
                            </span>
                          ))}
                        </div>
                        
                        {/* Arrow */}
                        <motion.div 
                          className="flex items-center gap-2 text-blue-600 font-semibold"
                          initial={{ x: 0 }}
                          whileHover={{ x: 10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <span>Get Started</span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 opacity-10">
                      <step.icon className="w-24 h-24 text-gray-400" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Bottom CTA */}
          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.button 
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">Start Your Journey Today</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

SecondPage.displayName = "SecondPage";

export default SecondPage;
