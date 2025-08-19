"use client";

import React, { useState, useEffect } from "react";
import { Heart, Calendar, Star, Phone, Video, Award, Clock, Globe } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";

const Doctors = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000'}/api/doctors`);
        const doctorsData = response.data.doctors || response.data;
        
        // Transform backend data to match frontend expectations
        const transformedDoctors = doctorsData.map(doctor => ({
          name: doctor.name,
          specialty: doctor.specialization,
          rating: doctor.rating,
          patients: `${doctor.total_consultations}+`,
          imageUrl: doctor.profile_image || `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop&crop=face`,
          experience: `${doctor.experience_years}+ years`,
          consultationFee: `₹${doctor.consultation_fee}`,
          specializations: doctor.sub_specializations || [doctor.specialization],
          availability: doctor.availability?.days?.join(", ") || "Available",
          languages: doctor.languages || ["English"]
        }));
        
        setDoctors(transformedDoctors);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError('Failed to load doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 md:py-20 md:px-8 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-60 h-60 bg-cyan-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header Section */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-white font-medium shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Video className="w-5 h-5" />
            Our Tele-Consultancy Partners
          </motion.div>
          <h1 className="mb-4 md:mb-6 text-2xl md:text-4xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
            Expert Doctors via Video Consultation
          </h1>
          <p className="mx-auto max-w-4xl text-base md:text-xl text-gray-600 leading-relaxed px-4">
            Our certified nurses visit you at home, while expert doctors provide consultations via video call. 
            Experience our innovative hybrid approach where professional nursing care meets remote medical expertise.
          </p>
        </motion.div>

        {/* Doctors Cards */}
        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 max-w-7xl mx-auto">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.name}
              className="group relative rounded-3xl bg-white/80 backdrop-blur-lg shadow-2xl transition-all duration-500 hover:shadow-3xl border border-white/50 h-fit"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Doctor Image */}
              <div className="aspect-[4/5] overflow-hidden relative">
                <Image
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  width={400}
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                  <Star className="w-4 h-4 text-blue-500 fill-current" />
                  <span className="text-sm font-semibold text-gray-800">{doctor.rating}</span>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                {/* Header Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{doctor.specialty}</p>
                  
                  {/* Stats Row */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{doctor.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-blue-500" />
                      <span>{doctor.patients}</span>
                    </div>
                  </div>

                  {/* Consultation Fee */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">Consultation</span>
                    <span className="text-lg font-bold text-blue-600">{doctor.consultationFee}</span>
                  </div>
                </div>

                {/* Specializations */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {doctor.specializations.slice(0, 2).map((spec, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('tel:+1234567890', '_self')}
                  >
                    <Phone className="w-4 h-4" />
                    Book Service
                  </motion.button>
                  <motion.button
                    className="flex-1 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Video className="w-4 h-4" />
                    Video Call
                  </motion.button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* How Our Service Works - Animated Workflow */}
        <div className="mt-12 md:mt-20 mb-8 md:mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text mb-4">
              How Our Hybrid Tele-Consultancy Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the perfect blend of physical nursing care and remote medical expertise
            </p>
          </div>

          {/* Animated Workflow Steps */}
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 to-cyan-200 transform -translate-y-1/2 hidden lg:block" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10 px-4">
              {/* Step 1: Book Service */}
              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Phone className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">1. Book Service</h3>
                <p className="text-xs md:text-sm text-gray-600 px-2">Patient calls and books our tele-consultancy service</p>
              </div>

              {/* Step 2: Nurse Visits */}
              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">2. Nurse Visits</h3>
                <p className="text-xs md:text-sm text-gray-600 px-2">Certified nurse visits patient at home and takes vital signs</p>
              </div>

              {/* Step 3: Doctor Video Call */}
              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Video className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">3. Doctor Consultation</h3>
                <p className="text-xs md:text-sm text-gray-600 px-2">Expert doctor joins via video call for consultation</p>
              </div>

              {/* Step 4: Treatment Execution */}
              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">4. Care Execution</h3>
                <p className="text-xs md:text-sm text-gray-600 px-2">Nurse executes doctor's instructions and provides care</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-8 md:mt-16 text-center px-4">
          <p className="text-base md:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Ready to experience our innovative hybrid healthcare approach?
          </p>
          <a href="tel:+91 8088058792">
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 md:gap-3 mx-auto text-sm md:text-base">
            <Phone className="w-4 h-4 md:w-5 md:h-5" />
            Book Your Tele-Consultancy Service
          </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
