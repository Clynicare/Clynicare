"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Video, Clock, Shield, Users, Star, Phone, CheckCircle, ArrowRight, Stethoscope, Monitor, X, Calendar } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ServicesSection = () => {
  const [activeService, setActiveService] = useState('nursing');
  const [showQuickBooking, setShowQuickBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    patient_name: '',
    mobile_no: '',
    address: '',
    booking_date: '',
    service_type: 'nursing'
  });
  const [bookingStep, setBookingStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";

  const services = {
    nursing: {
      id: 'nursing',
      title: "Home Nursing Services",
      subtitle: "Professional Care at Your Doorstep",
      description: "Certified nurses provide personalized healthcare services in the comfort of your home with 24/7 availability and emergency support.",
      image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=600&h=400&fit=crop",
      price: "Starting from ₹200/visit",
      features: [
        { icon: Clock, text: "24/7 Emergency Availability" },
        { icon: Shield, text: "Certified & Verified Nurses" },
        { icon: Heart, text: "Personalized Care Plans" },
        { icon: Stethoscope, text: "Medical Equipment Provided" },
        { icon: Users, text: "Family Support & Training" },
        { icon: CheckCircle, text: "Insurance Accepted" }
      ],
      services: [
        "Wound Care and Dressing Changes",
        "IV Drip Setup and Monitoring", 
        "Medication Administration",
        "Injection Administration",
        "Blood Sample Collection",
        "Catheter Care and Replacement",
        "Ostomy Care",
        "Feeding Assistance",
        "Bathing and Personal Hygiene",
        "Mobility Assistance",
        "Respiratory Care",
        "Vital Signs Monitoring",
        "Pain Management",
        "Insulin Administration",
        "Vaccination Services",
        "Physical Therapy Support"
      ]
    },
    teleconsultancy: {
      id: 'teleconsultancy',
      title: "Hybrid Teleconsultancy",
      subtitle: "India's First Nurse-Assisted Video Consultation",
      description: "Experience the future of healthcare with our groundbreaking hybrid model. A certified nurse visits your home to conduct physical examinations while our expert doctors provide real-time consultation via HD video call - combining the best of both worlds for comprehensive, accurate diagnosis and treatment.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      price: "Starting from ₹800/session",
      features: [
        { icon: Video, text: "Ultra HD Video Consultations" },
        { icon: Heart, text: "Physical Examination by Nurse" },
        { icon: Monitor, text: "Live Vital Signs Monitoring" },
        { icon: Shield, text: "End-to-End Encrypted Platform" },
        { icon: CheckCircle, text: "Instant Digital Prescriptions" },
        { icon: Clock, text: "24/7 Emergency Availability" }
      ],
      services: [
        "Complete Physical Examination + Video Consultation",
        "Specialist Doctor Consultation with Nurse Support", 
        "Comprehensive Health Assessment & Live Diagnosis",
        "Real-time Medical Prescription & Treatment Plan",
        "Chronic Disease Management with Home Monitoring",
        "Emergency Consultation with Immediate Nurse Care",
        "Post-Surgery Follow-up with Physical Examination",
        "Geriatric Care with Assisted Video Consultation",
        "Pediatric Consultation with Parent & Nurse Support",
        "Mental Health Consultation with Comfort of Home",
        "Cardiology Consultation with ECG & Vitals",
        "Diabetes Management with Blood Sugar Monitoring",
        "Hypertension Care with BP Monitoring",
        "Wound Assessment with Real-time Doctor Guidance",
        "Medication Review with Nurse Administration",
        "Health Screening with Instant Doctor Analysis"
      ]
    }
  };

  return (
    <section id="services-section" className="py-20 px-4 md:px-8 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-cyan-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Healthcare Service</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience India's first hybrid healthcare model - Choose traditional home nursing care or our revolutionary nurse-assisted video consultations where certified nurses conduct physical examinations while expert doctors provide real-time consultation via video call
          </p>
        </motion.div>

        {/* Service Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-2 shadow-xl border border-white/50">
            <div className="flex">
              <button
                onClick={() => setActiveService('nursing')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeService === 'nursing'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Heart className="w-5 h-5" />
                Nursing Services
              </button>
              <button
                onClick={() => setActiveService('teleconsultancy')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeService === 'teleconsultancy'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Video className="w-5 h-5" />
                Teleconsultancy
              </button>
            </div>
          </div>
        </motion.div>

        {/* Service Content */}
        <motion.div
          key={activeService}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Service Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {services[activeService].title}
              </h3>
              <p className="text-xl text-blue-600 font-semibold mb-4">
                {services[activeService].subtitle}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {services[activeService].description}
              </p>
              <div className="text-2xl font-bold text-blue-600">
                {services[activeService].price}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {services[activeService].features.map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-700">{feature.text}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Services List */}
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4">Available Services:</h4>
              <div className="grid sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-2">
                {services[activeService].services.map((service, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="flex items-center gap-2 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{service}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-3 text-center">
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                  View All {services[activeService].services.length} Services →
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={() => {
                  setBookingData({...bookingData, service_type: activeService});
                  setShowQuickBooking(true);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Quick Book
              </motion.button>
              <motion.a
                href="tel:+91 8088058792"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </motion.a>
            </div>
          </div>

          {/* Right: Service Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={services[activeService].image}
                alt={services[activeService].title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              
              {/* Floating Stats */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">500+</div>
                      <div className="text-sm text-gray-600">Happy Patients</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">24/7</div>
                      <div className="text-sm text-gray-600">Available</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">4.9★</div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Booking Modal */}
        {showQuickBooking && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setShowQuickBooking(false);
                  setBookingStep(1);
                  setBookingData({ patient_name: '', mobile_no: '', address: '', booking_date: '', service_type: 'nursing' });
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  {activeService === 'nursing' ? <Heart className="w-8 h-8 text-white" /> : <Video className="w-8 h-8 text-white" />}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Quick Book {services[activeService].title}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className={`w-8 h-1 rounded-full ${bookingStep >= 1 ? 'bg-blue-500' : 'bg-gray-200'}`} />
                  <div className={`w-8 h-1 rounded-full ${bookingStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`} />
                </div>
                <p className="text-gray-600">
                  Step {bookingStep} of 2 - Quick & Easy!
                </p>
              </div>

              {bookingStep === 1 ? (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setBookingStep(2);
                }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingData.patient_name}
                      onChange={(e) => setBookingData({...bookingData, patient_name: e.target.value})}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={bookingData.mobile_no}
                      onChange={(e) => setBookingData({...bookingData, mobile_no: e.target.value})}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your mobile number"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowQuickBooking(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center justify-center gap-2"
                    >
                      <ArrowRight className="w-5 h-5" />
                      Next
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                      const errorDiv = document.createElement('div');
                      errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                      errorDiv.textContent = 'Please login first to book a service';
                      document.body.appendChild(errorDiv);
                      setTimeout(() => errorDiv.remove(), 3000);
                      router.push('/Login');
                      return;
                    }

                    const quickBookingData = {
                      service_type: bookingData.service_type === 'nursing' ? 'home_nursing' : 'hybrid',
                      patient_details: {
                        name: bookingData.patient_name,
                        age: 30,
                        gender: 'other'
                      },
                      appointment_details: {
                        date: bookingData.booking_date,
                        time_slot: '10:00 AM',
                        address: bookingData.address
                      },
                      pricing: {
                        nurse_fee: activeService === 'nursing' ? 500 : 500,
                        doctor_fee: activeService === 'nursing' ? 0 : 300,
                        platform_fee: 50,
                        total_amount: activeService === 'nursing' ? 550 : 850
                      }
                    };

                    const response = await axios.post(
                      `${API_BASE_URL}/api/nurse-bookings`,
                      quickBookingData,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                          'Content-Type': 'application/json',
                        },
                      }
                    );

                    if (response.status >= 200 && response.status < 300) {
                      const successDiv = document.createElement('div');
                      successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                      successDiv.textContent = 'Booking confirmed! We will contact you shortly.';
                      document.body.appendChild(successDiv);
                      setTimeout(() => successDiv.remove(), 3000);
                      setShowQuickBooking(false);
                      setBookingData({ patient_name: '', mobile_no: '', address: '', booking_date: '', service_type: 'nursing' });
                      setBookingStep(1);
                    }
                  } catch (error) {
                    console.error('Booking Error:', error);
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                    errorDiv.textContent = 'Booking failed. Please try again or call us directly.';
                    document.body.appendChild(errorDiv);
                    setTimeout(() => errorDiv.remove(), 3000);
                  } finally {
                    setIsSubmitting(false);
                  }
                }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Address *
                    </label>
                    <textarea
                      required
                      value={bookingData.address}
                      onChange={(e) => setBookingData({...bookingData, address: e.target.value})}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your complete address"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingData.booking_date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setBookingData({...bookingData, booking_date: e.target.value})}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="bg-green-50 p-4 rounded-xl">
                    <p className="text-sm text-green-700">
                      <strong>Almost done!</strong> We'll call you to confirm the exact time and any special requirements.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setBookingStep(1)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Confirm Booking
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
