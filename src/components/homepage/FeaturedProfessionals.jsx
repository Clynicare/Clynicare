'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Stethoscope, 
  Heart, 
  Star, 
  Clock,
  MapPin,
  Users,
  Award,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Shield,
  CheckCircle
} from 'lucide-react';

const FeaturedProfessionals = () => {
  const [activeCategory, setActiveCategory] = useState('agencies');
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { id: 'agencies', label: 'Care Agencies', icon: Building2, count: '50+' },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope, count: '200+' },
    { id: 'nurses', label: 'Nurses', icon: Heart, count: '500+' }
  ];

  const professionals = {
    agencies: [
      {
        id: 1,
        name: 'Healing Hands Care Agency',
        logo: '🏥',
        specialization: 'Post-surgical & Elder Care',
        rating: 4.9,
        reviews: 245,
        availability: 'Available Today',
        nurses: '100+ trained nurses',
        location: 'Bangalore, Mumbai, Delhi',
        verified: true,
        experience: '10+ years',
        services: ['Home Nursing', 'ICU Care', 'Physiotherapy', 'Elder Care']
      },
      {
        id: 2,
        name: 'CarePlus Healthcare',
        logo: '⚕️',
        specialization: 'Critical Care & Recovery',
        rating: 4.8,
        reviews: 189,
        availability: 'Available Today',
        nurses: '80+ trained nurses',
        location: 'Chennai, Hyderabad, Pune',
        verified: true,
        experience: '8+ years',
        services: ['Emergency Care', 'Wound Care', 'Medication Management', 'Medical Equipment']
      },
      {
        id: 3,
        name: 'Compassionate Care Services',
        logo: '💙',
        specialization: 'Palliative & Chronic Care',
        rating: 4.9,
        reviews: 156,
        availability: 'Available Tomorrow',
        nurses: '60+ trained nurses',
        location: 'Kolkata, Ahmedabad, Jaipur',
        verified: true,
        experience: '12+ years',
        services: ['Palliative Care', 'Chronic Disease Management', 'Dementia Care', 'Respite Care']
      }
    ],
    doctors: [
      {
        id: 1,
        name: 'Dr. Priya Sharma',
        logo: '👩‍⚕️',
        specialization: 'Internal Medicine & General Practice',
        rating: 4.9,
        reviews: 324,
        availability: 'Available Now',
        experience: '15+ years',
        location: 'Bangalore',
        verified: true,
        consultationFee: '₹500',
        languages: ['English', 'Hindi', 'Kannada']
      },
      {
        id: 2,
        name: 'Dr. Rajesh Kumar',
        logo: '👨‍⚕️',
        specialization: 'Cardiology & Heart Care',
        rating: 4.8,
        reviews: 278,
        availability: 'Available in 30 mins',
        experience: '20+ years',
        location: 'Mumbai',
        verified: true,
        consultationFee: '₹800',
        languages: ['English', 'Hindi', 'Marathi']
      },
      {
        id: 3,
        name: 'Dr. Ananya Patel',
        logo: '👩‍⚕️',
        specialization: 'Pediatrics & Child Care',
        rating: 4.9,
        reviews: 412,
        availability: 'Available Today',
        experience: '12+ years',
        location: 'Delhi',
        verified: true,
        consultationFee: '₹600',
        languages: ['English', 'Hindi', 'Gujarati']
      }
    ],
    nurses: [
      {
        id: 1,
        name: 'Nurse Kavitha R.',
        logo: '👩‍⚕️',
        specialization: 'ICU & Critical Care Specialist',
        rating: 4.9,
        reviews: 156,
        availability: 'Available Today',
        experience: '8+ years',
        location: 'Bangalore',
        verified: true,
        hourlyRate: '₹300/hour',
        certifications: ['ICU Certified', 'BLS Certified', 'Wound Care Specialist']
      },
      {
        id: 2,
        name: 'Nurse Ravi Kumar',
        logo: '👨‍⚕️',
        specialization: 'Post-surgical & Recovery Care',
        rating: 4.8,
        reviews: 98,
        availability: 'Available Tomorrow',
        experience: '6+ years',
        location: 'Chennai',
        verified: true,
        hourlyRate: '₹250/hour',
        certifications: ['Surgical Care', 'Medication Management', 'Patient Mobility']
      },
      {
        id: 3,
        name: 'Nurse Sunita Devi',
        logo: '👩‍⚕️',
        specialization: 'Elder Care & Chronic Disease',
        rating: 4.9,
        reviews: 203,
        availability: 'Available Today',
        experience: '10+ years',
        location: 'Mumbai',
        verified: true,
        hourlyRate: '₹280/hour',
        certifications: ['Geriatric Care', 'Diabetes Management', 'Physiotherapy Assistant']
      }
    ]
  };

  const currentProfessionals = professionals[activeCategory];
  const itemsPerSlide = 2;
  const maxSlides = Math.ceil(currentProfessionals.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const getCurrentItems = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return currentProfessionals.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Meet our trusted healthcare partners
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Connect with verified professionals who are committed to providing exceptional care
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8 sm:mb-12 overflow-x-auto px-4"
        >
          <div className="bg-gray-100 rounded-xl lg:rounded-2xl p-1.5 sm:p-2 inline-flex min-w-max">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setCurrentSlide(0);
                  }}
                  className={`flex items-center space-x-2 sm:space-x-3 px-3 sm:px-6 py-2 sm:py-3 rounded-lg lg:rounded-xl font-medium transition-all duration-300 whitespace-nowrap text-sm sm:text-base ${
                    activeCategory === category.id
                      ? 'bg-white text-blue-600 shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">{category.label}</span>
                  <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                  <span className="bg-blue-100 text-blue-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold">
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Professionals Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {getCurrentItems().map((professional, index) => (
              <motion.div
                key={professional.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl lg:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6 sm:p-8">
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="text-3xl sm:text-4xl">
                        {professional.logo}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                            {professional.name}
                          </h3>
                          {professional.verified && (
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                          )}
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mt-1">
                          {professional.specialization}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                      professional.availability.includes('Now') || professional.availability.includes('Today')
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <span className="hidden sm:inline">{professional.availability}</span>
                      <span className="sm:hidden">{professional.availability.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Rating and Reviews */}
                  <div className="flex items-center flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 fill-current" />
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">
                        {professional.rating}
                      </span>
                    </div>
                    <span className="text-gray-600 text-sm sm:text-base">
                      ({professional.reviews} reviews)
                    </span>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">{professional.experience}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">{professional.location}</span>
                    </div>
                    
                    {activeCategory === 'agencies' && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">{professional.nurses}</span>
                      </div>
                    )}
                    
                    {(activeCategory === 'doctors' || activeCategory === 'nurses') && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">
                          {activeCategory === 'doctors' 
                            ? professional.consultationFee 
                            : professional.hourlyRate}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Services/Certifications */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {(professional.services || professional.certifications || professional.languages || []).slice(0, 3).map((item, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-50 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 sm:px-6 rounded-lg lg:rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <span>
                      {activeCategory === 'agencies' ? 'View Agency' : 
                       activeCategory === 'doctors' ? 'Book Consultation' : 'Book Nurse'}
                    </span>
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {maxSlides > 1 && (
            <div className="flex justify-center space-x-3 sm:space-x-4">
              <button
                onClick={prevSlide}
                className="p-2 sm:p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 sm:p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/professionals'}
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 inline-flex items-center space-x-2 shadow-lg"
          >
            <span>Explore More Professionals</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProfessionals;
