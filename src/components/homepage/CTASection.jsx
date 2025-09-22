'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-display md:text-display-lg font-bold text-white">
            Ready to experience better healthcare?
          </h2>
          
          <p className="text-subtitle md:text-subtitle-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Join thousands of families who trust Clynicare for their healthcare needs. Book your first service today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/Bookings'}
              className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-700 text-body-lg font-medium rounded-full shadow-lg transition-all duration-200 flex items-center space-x-3"
            >
              <span>Book Now</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/DoctorRegister'}
              className="px-8 py-4 border-2 border-white hover:bg-white hover:text-blue-700 text-white text-body-lg font-medium rounded-full transition-all duration-200 flex items-center space-x-3"
            >
              <Users className="h-5 w-5" />
              <span>Join as Provider</span>
            </motion.button>
          </div>
          
          <div className="pt-8 border-t border-blue-500/30">
            <p className="text-blue-200 text-body">
              Questions? Call us at <span className="font-semibold text-white">+91 8088058792</span> or email <span className="font-semibold text-white">care@clynicare.com</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
