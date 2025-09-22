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

  // Fallback doctor data
  const fallbackDoctors = [
    {
      name: "Dr. Amit Verma",
      specialty: "General Medicine",
      rating: 4.8,
      patients: "1200+",
      imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop&crop=face",
      experience: "12+ years",
      consultationFee: "₹800",
      specializations: ["Internal Medicine", "Preventive Care"],
      availability: "Mon-Fri",
      languages: ["English", "Hindi"]
    },
    {
      name: "Dr. Sunita Reddy",
      specialty: "Cardiology",
      rating: 4.9,
      patients: "800+",
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop&crop=face",
      experience: "15+ years",
      consultationFee: "₹1200",
      specializations: ["Interventional Cardiology", "Heart Failure"],
      availability: "Mon, Wed, Fri, Sat",
      languages: ["English", "Hindi", "Telugu"]
    },
    {
      name: "Dr. Priya Sharma",
      specialty: "Pediatrics",
      rating: 4.7,
      patients: "950+",
      imageUrl: "https://images.unsplash.com/photo-1594824475317-8b7d0516c5b4?w=400&h=500&fit=crop&crop=face",
      experience: "10+ years",
      consultationFee: "₹700",
      specializations: ["Child Care", "Vaccination"],
      availability: "Tue-Sat",
      languages: ["English", "Hindi"]
    },
    {
      name: "Dr. Rajesh Kumar",
      specialty: "Orthopedics",
      rating: 4.6,
      patients: "650+",
      imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=500&fit=crop&crop=face",
      experience: "8+ years",
      consultationFee: "₹900",
      specializations: ["Joint Care", "Sports Medicine"],
      availability: "Mon-Fri",
      languages: ["English", "Hindi"]
    }
  ];

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
        console.log('Using fallback doctor data');
        setDoctors(fallbackDoctors);
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

  // Removed error display since we use fallback data

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
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 max-w-7xl mx-auto">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.name}
              className="group relative rounded-3xl bg-white/90 backdrop-blur-lg shadow-xl transition-all duration-500 hover:shadow-2xl border border-white/60 h-full flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{ minHeight: '520px' }}
            >
              {/* Doctor Image */}
              <div className="aspect-[4/5] overflow-hidden relative rounded-t-3xl">
                <Image
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  width={400}
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  <span className="text-sm font-bold text-gray-800">{doctor.rating}</span>
                </div>

                {/* Specialization Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  {doctor.specialty}
                </div>
              </div>

              {/* Doctor Info - Fixed height container */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                {/* Header Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-[56px] flex items-center">{doctor.name}</h3>
                  
                  {/* Stats Row */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4 bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{doctor.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="font-medium">{doctor.patients}</span>
                    </div>
                  </div>

                  {/* Consultation Fee */}
                  <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3">
                    <span className="text-sm font-medium text-gray-700">Consultation Fee</span>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{doctor.consultationFee}</span>
                  </div>
                </div>

                {/* Specializations */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 min-h-[32px]">
                    {doctor.specializations.slice(0, 2).map((spec, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-200"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages & Availability */}
                <div className="mb-4 text-xs text-gray-600 bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="w-3 h-3 text-blue-500" />
                    <span className="font-medium">Languages: {doctor.languages.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-green-500" />
                    <span className="font-medium">Available: {doctor.availability}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                  <motion.button
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('tel:+91 8088058792', '_self')}
                  >
                    <Phone className="w-4 h-4" />
                    Book Now
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
