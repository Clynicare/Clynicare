'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Instagram,
  ArrowRight,
  Stethoscope,
  Building2,
  Users,
  FileText,
  Shield,
  HelpCircle
} from 'lucide-react';

const FooterSection = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/About' },
    { name: 'Services', href: '/services' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' }
  ];

  const services = [
    { name: 'Nursing Care', href: '/Bookings?service=nursing' },
    { name: 'Teleconsultation', href: '/Bookings?service=teleconsultation' },
    { name: 'Emergency Care', href: '/emergency' },
    { name: 'Chronic Care', href: '/chronic-care' },
    { name: 'Home Healthcare', href: '/home-healthcare' },
    { name: 'Specialist Consultation', href: '/specialist-consultation' }
  ];

  const professionals = [
    { name: 'For Doctors', href: '/DoctorRegister', icon: Stethoscope },
    { name: 'For Nurses', href: '/nurse-register', icon: Heart },
    { name: 'For Agencies', href: '/AgencyRegister', icon: Building2 }
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
            
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Logo */}
                <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-2 sm:p-3 rounded-xl lg:rounded-2xl">
                    <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold">Clynicare</span>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Clynicare is a trusted healthcare platform bringing professional medical services to your doorstep. 
                  We connect patients with verified healthcare professionals for quality care at home.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                    <span className="text-gray-300 text-sm sm:text-base">+91 8088058792</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                    <span className="text-gray-300 text-sm sm:text-base">care@clynicare.com</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mt-1" />
                    <span className="text-gray-300 text-sm sm:text-base">
                      Koramangala, Bengaluru, Karnataka, India
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 flex items-center space-x-2">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Quick Links</span>
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 group text-sm sm:text-base"
                      >
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span>{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Services */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 flex items-center space-x-2">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Our Services</span>
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {services.map((service, index) => (
                    <li key={index}>
                      <a
                        href={service.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 group text-sm sm:text-base"
                      >
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span>{service.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Join Us */}
            <div className="sm:col-span-2 lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 flex items-center space-x-2">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Join Our Network</span>
                </h3>
                
                <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                  Are you a healthcare professional? Join Clynicare today and be part of India's largest healthcare network.
                </p>

                <div className="space-y-3 sm:space-y-4">
                  {professionals.map((professional, index) => {
                    const IconComponent = professional.icon;
                    return (
                      <a
                        key={index}
                        href={professional.href}
                        className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200 group text-sm sm:text-base"
                      >
                        <div className="bg-gray-800 p-1.5 sm:p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
                          <IconComponent className="h-3 w-3 sm:h-4 sm:w-4" />
                        </div>
                        <span>{professional.name}</span>
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 py-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Clynicare</h3>
            <p className="text-gray-300 mb-8">
              Subscribe to our newsletter for healthcare tips, service updates, and special offers.
            </p>
            
            <div className="flex flex-col sm:flex-row max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg sm:rounded-r-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
              />
              <button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 px-6 py-3 rounded-r-lg sm:rounded-l-none font-semibold transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-gray-800 py-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            
            {/* Copyright */}
            <div className="text-gray-400 text-center lg:text-left">
              <p>&copy; 2025 Clynicare. All rights reserved.</p>
              <p className="text-sm mt-1">
                Trusted healthcare platform serving patients across India
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-400">
                <Shield className="h-5 w-5" />
                <span className="text-sm">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <HelpCircle className="h-5 w-5" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm mr-2">Follow us:</span>
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
