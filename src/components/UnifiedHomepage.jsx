"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Video, Shield, Star, Users, ArrowRight, Stethoscope, Phone, Calendar, Award, Building, CheckCircle, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

const UnifiedHomepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = [
    {
      icon: Heart,
      title: "Home Nursing",
      description: "Professional nurses providing personalized care at your home",
      link: "/Nurses",
      color: "blue"
    },
    {
      icon: Video,
      title: "Teleconsultation", 
      description: "Connect with specialist doctors via secure video calls",
      link: "/Services",
      color: "purple"
    },
    {
      icon: Stethoscope,
      title: "Hybrid Care",
      description: "Comprehensive care combining nursing and doctor consultation",
      link: "/Services", 
      color: "green"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All nurses and doctors are certified and background verified"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock healthcare services when you need them"
    },
    {
      icon: Users,
      title: "Trusted Platform",
      description: "Join thousands of satisfied patients and healthcare providers"
    }
  ];

  const doctors = [
    {
      name: "Dr. Amit Verma",
      specialization: "General Medicine",
      experience: "12+ Years",
      rating: 4.8,
      availability: "Mon-Fri 9AM-5PM",
      image: "/images/updoc1.jpg"
    },
    {
      name: "Dr. Sunita Reddy", 
      specialization: "Cardiology",
      experience: "15+ Years",
      rating: 4.9,
      availability: "Mon,Wed,Fri 10AM-4PM",
      image: "/images/updoc2.jpg"
    },
    {
      name: "Dr. Rajesh Kumar",
      specialization: "Pediatrics",
      experience: "10+ Years", 
      rating: 4.7,
      availability: "Tue-Sat 8AM-6PM",
      image: "/images/updoc3.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
          <div className="absolute top-40 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20"></div>
          <div className="absolute -bottom-8 left-20 w-32 h-32 bg-cyan-200 rounded-full opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6"
            >
              <Shield className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Trusted by 10,000+ Patients</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-transparent bg-clip-text">
                Healthcare
              </span>
              <br />
              <span className="text-gray-900">Reimagined</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Your bridge between professional nursing care and expert medical consultation. 
              Experience the future of healthcare at home.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto"
            >
              <div className="text-center p-3 bg-white/50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Nurses</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">100+</div>
                <div className="text-sm text-gray-600">Doctors</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">4.9★</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
            >
              <Link href="/Nurses" className="flex-1">
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4" />
                  Find Nurses
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              
              <Link href="/Services" className="flex-1">
                <button className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition-all flex items-center justify-center gap-2">
                  <Video className="w-4 h-4" />
                  Teleconsultation
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Healthcare Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare solutions designed for your comfort and convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center border border-gray-100"
                >
                  <div className={`w-16 h-16 bg-${service.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <Icon className={`w-8 h-8 text-${service.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Link href={service.link}>
                    <button className={`text-${service.color}-600 font-semibold flex items-center justify-center gap-2 mx-auto hover:gap-3 transition-all`}>
                      Learn More <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text mb-4">
              How Our Hybrid Care Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the perfect blend of physical nursing care and remote medical expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Phone, title: "Book Service", desc: "Patient books our healthcare service" },
              { icon: Heart, title: "Nurse Visits", desc: "Certified nurse visits and takes vital signs" },
              { icon: Video, title: "Doctor Consultation", desc: "Expert doctor joins via video call" },
              { icon: Award, title: "Care Execution", desc: "Nurse executes doctor's instructions" }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{index + 1}. {step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Doctors
            </h2>
            <p className="text-lg text-gray-600">
              Consult with certified specialists from the comfort of your home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-center mb-2">{doctor.name}</h3>
                <p className="text-blue-600 text-center font-medium mb-2">{doctor.specialization}</p>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{doctor.rating}</span>
                </div>
                <p className="text-sm text-gray-600 text-center mb-4">{doctor.experience}</p>
                <p className="text-xs text-gray-500 text-center mb-4">{doctor.availability}</p>
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all">
                  Book Consultation
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Agency Banner */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Building className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Are you a Nursing Agency?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join our platform and manage your nurses, track bookings, and grow your healthcare business
            </p>

            <Link href="/AgencyLogin">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto">
                Access Agency Dashboard
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Clynicare?
            </h2>
            <p className="text-lg text-gray-600">
              Your trusted partner in comprehensive healthcare solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience Better Healthcare?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied patients who trust Clynicare for their healthcare needs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link href="/Nurses" className="flex-1">
              <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                Find Nurses
              </button>
            </Link>
            <a href="tel:+918088058792" className="flex-1">
              <button className="w-full border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UnifiedHomepage;
