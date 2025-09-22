'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight,
  Heart,
  Shield,
  Clock,
  Users,
  MapPin
} from 'lucide-react';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Bangalore',
      avatar: '👩',
      rating: 5,
      service: 'Nursing Care',
      quote: "Booking a nurse was so easy, and the care was exceptional! My mother received excellent post-surgery care at home. The nurse was professional, compassionate, and very knowledgeable.",
      date: '2 weeks ago',
      serviceType: 'Post-surgical Care'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      location: 'Mumbai',
      avatar: '👨',
      rating: 5,
      service: 'Teleconsultation',
      quote: "The doctor's teleconsultation saved me a hospital trip. I got expert advice from home, and the prescription was delivered the same day. Highly recommended!",
      date: '1 week ago',
      serviceType: 'General Consultation'
    },
    {
      id: 3,
      name: 'Anita Patel',
      location: 'Delhi',
      avatar: '👵',
      rating: 5,
      service: 'Elder Care',
      quote: "Clynicare made healthcare accessible for my family. The nurse who comes for my father's diabetes management is wonderful. Professional service at affordable rates.",
      date: '3 days ago',
      serviceType: 'Chronic Care Management'
    },
    {
      id: 4,
      name: 'Suresh Reddy',
      location: 'Hyderabad',
      avatar: '👨‍💼',
      rating: 5,
      service: 'Emergency Care',
      quote: "When my wife had a medical emergency, Clynicare's ambulance arrived within 15 minutes. The paramedics were well-trained and handled the situation perfectly.",
      date: '5 days ago',
      serviceType: 'Emergency Response'
    },
    {
      id: 5,
      name: 'Meera Singh',
      location: 'Chennai',
      avatar: '👩‍🦳',
      rating: 5,
      service: 'Lab Tests',
      quote: "Home collection for lab tests was seamless. The technician was punctual, professional, and I received digital reports within hours. Very convenient service.",
      date: '1 week ago',
      serviceType: 'Diagnostic Services'
    },
    {
      id: 6,
      name: 'Vikram Agarwal',
      location: 'Pune',
      avatar: '👨‍💻',
      rating: 5,
      service: 'Physiotherapy',
      quote: "After my knee surgery, the physiotherapist from Clynicare helped me recover faster than expected. Regular home sessions made all the difference in my recovery.",
      date: '2 weeks ago',
      serviceType: 'Rehabilitation Care'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Patients', icon: Users },
    { number: '50+', label: 'Cities Covered', icon: MapPin },
    { number: '4.9', label: 'Average Rating', icon: Star },
    { number: '24/7', label: 'Support Available', icon: Clock }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
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
          className="text-center mb-20"
        >
          <h2 className="text-section md:text-section-lg font-bold text-gray-900 mb-6">
            Trusted by Families Everywhere
          </h2>
          <p className="text-subtitle md:text-subtitle-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Thousands of patients and families rely on Clynicare for safe, reliable, and affordable healthcare services.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="h-10 w-10 text-blue-600" />
                </div>
                <div className="text-display font-bold text-gray-900 mb-3">
                  {stat.number}
                </div>
                <div className="text-body text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
          >
            
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 opacity-10">
              <Quote className="h-24 w-24 text-blue-600" />
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto text-center"
              >
                
                {/* Rating Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-blue-500 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 mb-8 leading-relaxed">
                  "{testimonials[currentSlide].quote}"
                </blockquote>

                {/* Patient Info */}
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-2xl">
                    {testimonials[currentSlide].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-lg">
                      {testimonials[currentSlide].name}
                    </div>
                    <div className="text-gray-600 flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{testimonials[currentSlide].location}</span>
                    </div>
                  </div>
                </div>

                {/* Service Badge */}
                <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                  <Heart className="h-4 w-4 text-blue-600" />
                  <span>{testimonials[currentSlide].serviceType}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">{testimonials[currentSlide].date}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-gray-900" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-gray-900" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide
                  ? 'bg-blue-600'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gray-50 rounded-2xl p-8 inline-block">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">
                We're building India's most reliable doorstep healthcare platform
              </span>
            </div>
            <p className="text-gray-600 max-w-2xl">
              Join thousands of satisfied patients who trust Clynicare for their healthcare needs. 
              Experience the difference of professional, compassionate care delivered right to your home.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
