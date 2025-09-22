'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  Stethoscope, 
  Heart, 
  Video, 
  Clock, 
  Star,
  User,
  Calendar,
  Phone,
  Syringe,
  Shield,
  Thermometer,
  Activity,
  FileText,
  MessageCircle,
  Monitor
} from 'lucide-react';
import NurseBookingModal from '../../components/NurseBookingModal';

const ServicesPage = () => {
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";
  const [selectedService, setSelectedService] = useState(null);
  const [showNurseModal, setShowNurseModal] = useState(false);

  // Authentication helper functions
  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Show login required message
      const loginMessage = document.createElement('div');
      loginMessage.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      loginMessage.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          <span>Please login to book services</span>
        </div>
      `;
      document.body.appendChild(loginMessage);
      
      // Auto remove message and redirect
      setTimeout(() => {
        loginMessage.remove();
        router.push('/Login');
      }, 2000);
      
      return false;
    }
    return true;
  };

  const submitBookingToBackend = async (bookingData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/nurse-bookings`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000
        }
      );

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        throw new Error('Booking submission failed');
      }
    } catch (error) {
      console.error('Backend booking error:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        router.push('/Login');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to submit booking. Please try again.');
    }
  };

  const teleconsultancyServices = [
    {
      id: 1,
      name: "General Consultation",
      icon: <Stethoscope className="w-8 h-8" />,
      description: "Comprehensive health assessment and diagnosis",
      price: "₹500",
      duration: "30 mins",
      specialty: "General Medicine"
    },
    {
      id: 2,
      name: "Specialist Consultation",
      icon: <Heart className="w-8 h-8" />,
      description: "Expert consultation with specialist doctors",
      price: "₹800",
      duration: "45 mins",
      specialty: "Cardiology, Dermatology, etc."
    },
    {
      id: 3,
      name: "Follow-up Consultation",
      icon: <Video className="w-8 h-8" />,
      description: "Follow-up sessions with your treating doctor",
      price: "₹300",
      duration: "20 mins",
      specialty: "All Specialties"
    },
    {
      id: 4,
      name: "Emergency Consultation",
      icon: <Phone className="w-8 h-8" />,
      description: "Urgent medical consultation 24/7",
      price: "₹1000",
      duration: "Available 24/7",
      specialty: "Emergency Medicine"
    }
  ];

  const nursingServices = [
    {
      id: 1,
      name: "Wound Care & Dressing",
      icon: <Shield className="w-8 h-8" />,
      description: "Professional wound cleaning and dressing",
      price: "₹200",
      type: "per visit"
    },
    {
      id: 2,
      name: "Injection Administration",
      icon: <Syringe className="w-8 h-8" />,
      description: "Safe administration of prescribed injections",
      price: "₹150",
      type: "per visit"
    },
    {
      id: 3,
      name: "Vital Signs Monitoring",
      icon: <Activity className="w-8 h-8" />,
      description: "Regular monitoring of blood pressure, temperature, pulse",
      price: "₹200",
      type: "per visit"
    },
    {
      id: 4,
      name: "Medication Management",
      icon: <FileText className="w-8 h-8" />,
      description: "Ensuring proper medication schedule and compliance",
      price: "₹250",
      type: "per visit"
    },
    {
      id: 5,
      name: "Post-Surgery Care",
      icon: <Monitor className="w-8 h-8" />,
      description: "Specialized post-operative care and monitoring",
      price: "₹400",
      type: "per visit"
    },
    {
      id: 6,
      name: "Elderly Care",
      icon: <Heart className="w-8 h-8" />,
      description: "Comprehensive care for elderly patients",
      price: "₹300",
      type: "per visit"
    }
  ];

  const handleTeleconsultancyBook = (service) => {
    // Check authentication first
    if (!checkAuthentication()) {
      return;
    }
    
    // This will redirect to doctor booking page or show doctor booking modal
    console.log("Booking teleconsultancy:", service);
    // For now, we'll just show an alert, but this should redirect to doctor booking
    alert(`Booking ${service.name} - This will redirect to doctor booking`);
  };

  const handleNursingBook = (service) => {
    // Check authentication first
    if (!checkAuthentication()) {
      return;
    }
    
    setSelectedService(service);
    setShowNurseModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Nav />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text mb-6">
              Choose Your Healthcare Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select from our comprehensive range of healthcare services designed to meet your every need
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Teleconsultancy Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100"
            >
              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Teleconsultancy</h2>
                <p className="text-gray-600">Expert medical consultation from the comfort of your home</p>
              </div>

              <div className="space-y-4">
                {teleconsultancyServices.map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => handleTeleconsultancyBook(service)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-blue-600">{service.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{service.name}</h3>
                          <p className="text-sm text-gray-600">{service.description}</p>
                          <p className="text-xs text-blue-600 mt-1">{service.specialty}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-blue-600">{service.price}</p>
                        <p className="text-xs text-gray-500">{service.duration}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Nursing Services Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-3xl shadow-xl p-8 border border-green-100"
            >
              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Home Nursing Services</h2>
                <p className="text-gray-600">Professional nursing care delivered to your doorstep</p>
              </div>

              <div className="space-y-4">
                {nursingServices.map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => handleNursingBook(service)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-green-600">{service.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{service.name}</h3>
                          <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-green-600">{service.price}</p>
                        <p className="text-xs text-gray-500">{service.type}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 bg-white rounded-3xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Why Choose Clynicare?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-800 mb-2">24/7 Availability</h4>
                <p className="text-gray-600">Round-the-clock healthcare support when you need it most</p>
              </div>
              <div className="text-center">
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-800 mb-2">Expert Professionals</h4>
                <p className="text-gray-600">Qualified doctors and certified nurses at your service</p>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-800 mb-2">Safe & Secure</h4>
                <p className="text-gray-600">Complete privacy and security for all your healthcare needs</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />

      {/* Nurse Booking Modal */}
      {showNurseModal && (
        <NurseBookingModal
          isOpen={showNurseModal}
          onClose={() => {
            setShowNurseModal(false);
            setSelectedService(null);
          }}
          onConfirm={async (bookingData) => {
            try {
              // Use our backend submission helper
              const result = await submitBookingToBackend(bookingData);
              
              console.log('Booking submitted successfully:', result);
              
              // Show success message
              const successDiv = document.createElement('div');
              successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
              successDiv.innerHTML = `
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Booking confirmed! We will contact you shortly.</span>
                </div>
              `;
              document.body.appendChild(successDiv);
              setTimeout(() => successDiv.remove(), 5000);
              
              // Close modal
              setShowNurseModal(false);
              setSelectedService(null);
              
            } catch (error) {
              console.error('Booking submission error:', error);
              
              // Show error message
              const errorDiv = document.createElement('div');
              errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
              errorDiv.innerHTML = `
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>${error.message}</span>
                </div>
              `;
              document.body.appendChild(errorDiv);
              setTimeout(() => errorDiv.remove(), 5000);
            }
          }}
          nurse={{
            name: "Professional Nurse",
            professional_info: {
              specialization: selectedService?.name || "Home Nursing Services",
              hourly_rate: selectedService?.price?.replace('₹', '') || "200"
            }
          }}
          selectedService={selectedService}
        />
      )}
    </div>
  );
};

export default ServicesPage;