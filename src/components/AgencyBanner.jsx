"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Building, ArrowRight, Users, Shield } from 'lucide-react';
import Link from 'next/link';

const AgencyBanner = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-600 to-cyan-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center text-white"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Building className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Are you a Nursing Agency?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our platform and manage your nurses, track bookings, and grow your healthcare business
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
            <div className="text-center">
              <Users className="w-8 h-8 text-blue-200 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Manage Nurses</h3>
              <p className="text-sm text-blue-100">Add and manage your nursing staff</p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 text-cyan-200 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Track Bookings</h3>
              <p className="text-sm text-cyan-100">Monitor patient appointments</p>
            </div>
            <div className="text-center">
              <Building className="w-8 h-8 text-blue-200 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Grow Business</h3>
              <p className="text-sm text-blue-100">Expand your healthcare network</p>
            </div>
          </div>

          <Link href="/AgencyLogin">
            <motion.button
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Access Agency Dashboard
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AgencyBanner;
