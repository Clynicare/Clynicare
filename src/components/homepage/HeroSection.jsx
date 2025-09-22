'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock,
  Heart,
  Stethoscope,
  ArrowRight,
  Star,
  Shield,
  Activity,
  Ambulance,
  Users
} from 'lucide-react';

const HeroSection = () => {
  const [searchData, setSearchData] = useState({
    service: '',
    location: '',
    date: '',
    time: ''
  });

  const serviceOptions = [
    { value: 'nursing', label: 'Nursing Care', icon: Heart },
    { value: 'teleconsultation', label: 'Teleconsultation', icon: Stethoscope }
  ];

  const handleSearch = () => {
    console.log('Search initiated:', searchData);
    // Navigate to booking page with search data
    window.location.href = '/Bookings';
  };

  const FloatingIcon = ({ Icon, className, delay = 0 }) => (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 0.3, 
        y: [0, -10, 0],
        rotate: [0, 5, 0]
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        delay 
      }}
    >
      <Icon className="h-8 w-8 text-blue-400" />
    </motion.div>
  );

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      {/* Floating Healthcare Icons */}
      <FloatingIcon Icon={Heart} className="top-20 left-10" delay={0} />
      <FloatingIcon Icon={Stethoscope} className="top-32 right-20" delay={1} />
      <FloatingIcon Icon={Shield} className="bottom-40 left-20" delay={2} />
      <FloatingIcon Icon={Users} className="bottom-20 right-10" delay={3} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center min-h-[70vh] lg:min-h-[80vh]">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8 lg:space-y-10 text-center lg:text-left"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-label font-medium"
            >
              <Star className="h-4 w-4 fill-current" />
              <span>Trusted by 10,000+ patients across India</span>
            </motion.div>

            {/* Main Headlines */}
            <div className="space-y-4 md:space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-hero lg:text-hero-lg font-bold tracking-tight text-gray-900"
              >
                Healthcare at your{' '}
                <span className="text-blue-600">doorstep</span>.
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg md:text-subtitle lg:text-subtitle-lg text-gray-600 leading-relaxed max-w-3xl mx-auto lg:mx-0"
              >
                Book trusted nurses, connect with doctors, and access teleconsultations anytime, anywhere.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={handleSearch}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-body-lg font-medium rounded-full shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 text-base sm:text-body-lg font-medium rounded-full transition-all duration-200"
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Search/Booking Bar */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                
                {/* Service Type */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-sm font-medium text-gray-700">Service Type</label>
                  <select
                    value={searchData.service}
                    onChange={(e) => setSearchData({...searchData, service: e.target.value})}
                    className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-body"
                  >
                    <option value="">Select service</option>
                    {serviceOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 sm:left-4 top-3 sm:top-4 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter your location"
                      value={searchData.location}
                      onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-body"
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-sm font-medium text-gray-700">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 sm:left-4 top-3 sm:top-4 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <input
                      type="date"
                      value={searchData.date}
                      onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-body"
                    />
                  </div>
                </div>

                {/* Time */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-sm font-medium text-gray-700">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 sm:left-4 top-3 sm:top-4 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <input
                      type="time"
                      value={searchData.time}
                      onChange={(e) => setSearchData({...searchData, time: e.target.value})}
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-body"
                    />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <motion.button
                onClick={handleSearch}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-4 sm:py-5 px-6 rounded-xl lg:rounded-2xl transition-all duration-200 flex items-center justify-center space-x-2 sm:space-x-3 shadow-lg text-base sm:text-body-lg"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Book Now</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-4 sm:pt-6"
            >
              <div className="text-center">
                <div className="text-xl sm:text-display font-bold text-blue-600">500+</div>
                <div className="text-sm sm:text-label text-gray-600">Healthcare Professionals</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-display font-bold text-blue-700">50+</div>
                <div className="text-sm sm:text-label text-gray-600">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-display font-bold text-gray-900">24/7</div>
                <div className="text-sm sm:text-label text-gray-600">Emergency Support</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-12 lg:mt-0"
          >
            <div className="relative">
              {/* Main Healthcare Illustration */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl lg:rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-6 sm:top-10 left-6 sm:left-10">
                    <Heart className="h-8 w-8 sm:h-12 sm:w-12" />
                  </div>
                  <div className="absolute top-12 sm:top-20 right-6 sm:right-10">
                    <Stethoscope className="h-10 w-10 sm:h-16 sm:w-16" />
                  </div>
                  <div className="absolute bottom-12 sm:bottom-20 left-12 sm:left-20">
                    <Activity className="h-6 w-6 sm:h-10 sm:w-10" />
                  </div>
                  <div className="absolute bottom-6 sm:bottom-10 right-12 sm:right-20">
                    <Ambulance className="h-8 w-8 sm:h-14 sm:w-14" />
                  </div>
                </div>

                {/* Central Content */}
                <div className="relative z-10 text-center space-y-4 sm:space-y-6">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity
                    }}
                    className="w-32 h-32 bg-white rounded-full mx-auto flex items-center justify-center"
                  >
                    <Heart className="h-16 w-16 text-white" />
                  </motion.div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Professional Care</h3>
                    <p className="text-blue-100">Delivered with compassion and expertise</p>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                      <Stethoscope className="h-6 w-6" />
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                      <Activity className="h-6 w-6" />
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                      <Ambulance className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-lg p-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">24/7 Available</div>
                    <div className="text-sm text-gray-600">Emergency Care</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg p-4"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Star className="h-5 w-5 text-blue-500 fill-current" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">4.9 Rating</div>
                    <div className="text-sm text-gray-600">1000+ Reviews</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
