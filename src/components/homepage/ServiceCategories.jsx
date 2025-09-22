'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Video, 
  ArrowRight,
  Clock,
  Shield,
  Users
} from 'lucide-react';

const ServiceCategories = () => {
  const services = [
    {
      id: 'nursing',
      icon: Heart,
      title: 'Nursing Care',
      description: 'Qualified nurses for in-home care and recovery.',
      features: ['24/7 Availability', 'Post-surgery care', 'Elderly care', 'Medical assistance'],
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      stats: '500+ Nurses'
    },
    {
      id: 'teleconsultation',
      icon: Video,
      title: 'Teleconsultation',
      description: 'Video calls with experienced doctors.',
      features: ['Instant consultation', 'Prescription delivery', 'Follow-up care', 'Specialist doctors'],
      color: 'from-blue-600 to-blue-800',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      stats: '200+ Doctors'
    }
  ];

  const handleServiceClick = (serviceId) => {
    // Navigate to specific service booking page
    window.location.href = `/Bookings?service=${serviceId}`;
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50">
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
            Our Services
          </h2>
          <p className="text-base sm:text-lg lg:text-subtitle xl:text-subtitle-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            From nursing care to teleconsultations, Clynicare connects you with the right healthcare professionals seamlessly.
          </p>
        </motion.div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                onClick={() => handleServiceClick(service.id)}
                className="bg-white rounded-xl lg:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden"
              >
                
                {/* Card Header with Gradient */}
                <div className={`${service.bgColor} p-4 sm:p-6 relative`}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${service.color} rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg`}
                  >
                    <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-lg sm:text-xl lg:text-subtitle font-semibold text-gray-900 mb-3 sm:mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base lg:text-body text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Stats Badge */}
                  <div className={`inline-flex items-center ${service.textColor} bg-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-label font-medium`}>
                    <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    {service.stats}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-6">
                  
                  {/* Features List */}
                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm sm:text-base lg:text-body text-gray-600">
                        <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-3`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full ${service.textColor} bg-gradient-to-r ${service.color} bg-clip-text text-transparent font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-xl lg:rounded-2xl border-2 border-current group-hover:bg-gradient-to-r group-hover:from-current group-hover:to-current group-hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base lg:text-body-lg`}
                  >
                    <span>Book {service.title}</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16 lg:mt-20 text-center"
        >
          <div className="bg-white rounded-2xl lg:rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10 inline-block max-w-full mx-4">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-gray-600">
              
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                <span className="font-medium text-sm sm:text-base lg:text-body">Verified Professionals</span>
              </div>
              
              <div className="hidden sm:block h-6 lg:h-8 w-px bg-gray-300"></div>
              
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                <span className="font-medium text-sm sm:text-base lg:text-body">Quick Response</span>
              </div>
              
              <div className="hidden sm:block h-6 lg:h-8 w-px bg-gray-300"></div>
              
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900" />
                <span className="font-medium text-sm sm:text-base lg:text-body">Compassionate Care</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCategories;
