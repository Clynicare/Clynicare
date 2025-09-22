"use client";

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { Activity, Phone, Mail, MapPin, Heart, Video, Shield, Clock, Star } from 'lucide-react';
import { faApple, faGooglePlay, faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className='w-full bg-gradient-to-br from-blue-50 via-cyan-50 to-white relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-200/20 rounded-full blur-2xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className='px-6 md:px-12 lg:px-20 py-16 relative z-10'>
        {/* Header Section */}
        <motion.div 
          className='flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <div className='mb-8 lg:mb-0'>
            <div className='flex items-center mb-4'>
              <Image
                src="/images/Logo.png"
                alt="Clynicare Logo"
                width={230}
                height={230}
                className="w-40 h-40 object-contain rounded"
                priority
              />
            </div>
            <p className='text-gray-600 max-w-md text-lg leading-relaxed'>
              Revolutionizing healthcare with our hybrid tele-consultancy model. 
              Professional nursing care at home meets expert medical consultations via video.
            </p>
            
            {/* Trust Indicators */}
            <div className='flex items-center gap-6 mt-4'>
              <div className='flex items-center gap-2'>
                <Shield className='w-5 h-5 text-green-500' />
                <span className='text-sm text-gray-600 font-medium'>Certified Professionals</span>
              </div>
              <div className='flex items-center gap-2'>
                <Star className='w-5 h-5 text-yellow-500 fill-current' />
                <span className='text-sm text-gray-600 font-medium'>4.8+ Rating</span>
              </div>
            </div>
          </div>

          {/* Quick Contact */}
          <div className='flex flex-col gap-3'>
            <motion.button
              className='bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('tel:+918088058792', '_self')}
            >
              <Phone className='w-5 h-5' />
              Book Tele-Consultancy Now
            </motion.button>
            <p className='text-sm text-gray-500 text-center'>Available 24/7 for emergencies</p>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Professional Login */}
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className='text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text'>Professional Login</h3>
            <div className='flex flex-col gap-3'>
              <Link href="/AgencyLogin" className='text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2'>
                <Activity className='w-4 h-4' />
                <span>Agency Portal</span>
              </Link>
              <Link href="/NurseLogin" className='text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2'>
                <Heart className='w-4 h-4' />
                <span>Nurse Portal</span>
              </Link>
              <Link href="/DoctorLogin" className='text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2'>
                <Video className='w-4 h-4' />
                <span>Doctor Portal</span>
              </Link>
            </div>
          </motion.div>

          {/* Our Services */}
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className='text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text'>Our Services</h3>
            <div className='flex flex-col gap-3'>
              <Link href="/tele-consultancy" className='text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2'>
                <Video className='w-4 h-4' />
                <span>Tele-Consultancy</span>
              </Link>
              <Link href="/home-nursing" className='text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2'>
                <Heart className='w-4 h-4' />
                <span>Home Nursing Care</span>
              </Link>
              <Link href="/vital-monitoring" className='text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2'>
                <Activity className='w-4 h-4' />
                <span>Vital Signs Monitoring</span>
              </Link>
              <Link href="/emergency" className='text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2'>
                <Clock className='w-4 h-4' />
                <span>24/7 Emergency Support</span>
              </Link>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className='text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text'>Quick Links</h3>
            <div className='flex flex-col gap-3'>
              <Link href="/how-it-works" className='text-gray-600 hover:text-blue-600 transition-colors'>How It Works</Link>
              <Link href="/pricing" className='text-gray-600 hover:text-blue-600 transition-colors'>Pricing Plans</Link>
              <Link href="/doctors" className='text-gray-600 hover:text-blue-600 transition-colors'>Our Doctors</Link>
              <Link href="/about" className='text-gray-600 hover:text-blue-600 transition-colors'>About Us</Link>
              <Link href="/contact" className='text-gray-600 hover:text-blue-600 transition-colors'>Contact Us</Link>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className='text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text'>Contact Info</h3>
            <div className='flex flex-col gap-3'>
              <div className='flex items-center gap-3 text-gray-600'>
                <Phone className='w-4 h-4 text-blue-500' />
                <span>+91 8088058792</span>
              </div>
              <div className='flex items-center gap-3 text-gray-600'>
                <Mail className='w-4 h-4 text-blue-500' />
                <span>care@clynicare.com</span>
              </div>
              <div className='flex items-start gap-3 text-gray-600'>
                <MapPin className='w-4 h-4 text-blue-500 mt-1' />
                <span>Bellary, Karnataka<br />India - 583101</span>
              </div>
            </div>
            
            {/* Social Media */}
            <div className='mt-4'>
              <p className='text-sm font-semibold text-gray-700 mb-3'>Follow Us</p>
              <div className='flex gap-3'>
                <Link href="#" className='w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors'>
                  <FontAwesomeIcon icon={faFacebook} className='text-blue-600' />
                </Link>
                <Link href="#" className='w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors'>
                  <FontAwesomeIcon icon={faTwitter} className='text-blue-600' />
                </Link>
                <Link href="#" className='w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors'>
                  <FontAwesomeIcon icon={faInstagram} className='text-blue-600' />
                </Link>
                <Link href="#" className='w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors'>
                  <FontAwesomeIcon icon={faLinkedin} className='text-blue-600' />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Download App */}
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className='text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text'>Download App</h3>
            <p className='text-gray-600 text-sm mb-4'>
              Get instant access to our tele-consultancy services on your mobile device.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-col gap-3">
              <Link href="/app-store">
                <motion.div 
                  className="flex items-center gap-3 bg-white border-2 border-gray-200 hover:border-blue-300 rounded-xl px-4 py-3 transition-all duration-300 shadow-sm hover:shadow-md"
                  whileHover={{ scale: 1.02 }}
                >
                  <FontAwesomeIcon icon={faApple} className='text-2xl text-gray-800' />
                  <div className="flex flex-col">
                    <small className='text-xs text-gray-500'>Download on the</small>
                    <p className='text-sm font-bold text-gray-800'>App Store</p>
                  </div>
                </motion.div>
              </Link>

              <Link href="/google-play">
                <motion.div 
                  className="flex items-center gap-3 bg-white border-2 border-gray-200 hover:border-blue-300 rounded-xl px-4 py-3 transition-all duration-300 shadow-sm hover:shadow-md"
                  whileHover={{ scale: 1.02 }}
                >
                  <FontAwesomeIcon icon={faGooglePlay} className='text-2xl text-gray-800' />
                  <div className="flex flex-col">
                    <small className='text-xs text-gray-500'>GET IT ON</small>
                    <p className='text-sm font-bold text-gray-800'>Google Play</p>
                  </div>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-8" />

        {/* Bottom Section */}
        <motion.div 
          className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left space-y-4 lg:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Copyright */}
          <div className='flex flex-col lg:flex-row items-center gap-2 lg:gap-4'>
            <p className='text-gray-600'>
              © 2024 Clynicare. All Rights Reserved.
            </p>
            <p className='text-gray-500 text-sm'>
              Designed & Developed by
              <Link href="/about" className='bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text font-semibold ml-1'>
                ONEDUMB TEAM
              </Link>
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-6">
            <Link href="/terms" className='text-gray-600 hover:text-blue-600 transition-colors text-sm'>
              Terms & Conditions
            </Link>
            <Link href="/privacy" className='text-gray-600 hover:text-blue-600 transition-colors text-sm'>
              Privacy Policy
            </Link>
            <Link href="/disclaimer" className='text-gray-600 hover:text-blue-600 transition-colors text-sm'>
              Medical Disclaimer
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
