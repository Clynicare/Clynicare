'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Users, 
  Heart, 
  CheckCircle,
  Clock,
  Shield,
  Phone,
  Calendar
} from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: Search,
      title: 'Book a Service',
      description: 'Choose from nursing, doctor consultations, or more.',
      details: [
        'Select nursing care or teleconsultation services',
        'Set your preferred date and time',
        'Add your location and special requirements',
        'Get instant pricing and availability'
      ],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      icon: Users,
      title: 'Get Matched',
      description: 'We assign a verified nurse or doctor to your request.',
      details: [
        'Our smart algorithm finds the perfect match',
        'Verified professionals with excellent ratings',
        'Real-time availability and location matching',
        'Instant confirmation and contact details'
      ],
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50'
    },
    {
      id: 3,
      icon: Heart,
      title: 'Receive Care',
      description: 'Professional care delivered at your doorstep.',
      details: [
        'Professional arrives at your doorstep on time',
        'High-quality care with medical expertise',
        'Real-time updates and support',
        'Secure payment and digital receipts'
      ],
      color: 'from-blue-600 to-blue-800',
      bgColor: 'bg-blue-50'
    }
  ];

  const features = [
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'Most services available within 2 hours'
    },
    {
      icon: Shield,
      title: 'Verified Professionals',
      description: 'All healthcare providers are background checked'
    },
    {
      icon: Phone,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for emergencies'
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'Satisfaction guaranteed with every service'
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 xl:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-section xl:text-section-lg font-bold text-gray-900 mb-4 sm:mb-6">
            How Clynicare Works
          </h2>
          <p className="text-base sm:text-lg lg:text-subtitle xl:text-subtitle-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            A simple three-step process to get quality care at home.
          </p>
        </motion.div>

        {/* Steps Process */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-gray-300 z-0"></div>
                )}
                
                <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8 relative z-10">
                  
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${step.color} rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg mx-auto lg:mx-0`}
                  >
                    <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="text-center lg:text-left">
                    <h3 className="text-lg sm:text-xl lg:text-subtitle font-semibold text-gray-900 mb-3 sm:mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base lg:text-body text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details List */}
                    <ul className="space-y-3 sm:space-y-4">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start space-x-2 sm:space-x-3">
                          <div className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full mt-1.5 sm:mt-2 flex-shrink-0`}></div>
                          <span className="text-xs sm:text-sm lg:text-label text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-50 rounded-2xl lg:rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10 mt-12 sm:mt-16 lg:mt-20"
        >
          <h3 className="text-xl sm:text-2xl lg:text-section font-semibold text-gray-900 text-center mb-8 sm:mb-10 lg:mb-12">
            Why Choose Clynicare?
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                  </div>
                  
                  <h4 className="text-base sm:text-lg lg:text-subtitle font-semibold text-gray-900 mb-2 sm:mb-3">
                    {feature.title}
                  </h4>
                  
                  <p className="text-sm sm:text-base lg:text-body text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl lg:rounded-2xl p-6 sm:p-8 text-white">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
              Ready to get started?
            </h3>
            <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg">
              Book your first service today and experience healthcare like never before.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/Bookings'}
                className="bg-white text-blue-600 font-semibold py-3 px-6 sm:px-8 rounded-lg lg:rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Book a Service</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/Contact'}
                className="border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="h-5 w-5" />
                <span>Contact Support</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
