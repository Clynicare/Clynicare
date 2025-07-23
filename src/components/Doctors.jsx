"use client";

import React, { useState } from "react";
import { Heart, Calendar, Star, Phone, Video, Award, Clock, Globe } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const Doctors = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const doctors = [
    {
      name: "Dr. John Anderson",
      specialty: "Cardiologist",
      content:
        "Dr. Anderson is a renowned cardiologist with over 15 years of experience in treating complex heart conditions.",
      likes: 50,
      rating: 4.9,
      patients: "2,500+",
      imageUrl: "/images/updoc1.jpg",
      availability: "Mon - Fri",
      education: "MD - Harvard Medical School",
      experience: "15+ years",
      languages: ["English", "Spanish"],
      consultationFee: "₹800",
      specializations: ["Heart Surgery", "Cardiac Care", "ECG Analysis"],
    },
    {
      name: "Dr. Sophia Martinez",
      specialty: "Pediatrician",
      content:
        "Dr. Martinez specializes in pediatric care and has 10 years of experience treating children.",
      likes: 70,
      rating: 4.8,
      patients: "1,800+",
      imageUrl: "/images/updoc5.jpg",
      availability: "Tue - Sat",
      education: "MD - Stanford University",
      experience: "10+ years",
      languages: ["English", "French"],
      consultationFee: "₹600",
      specializations: ["Child Care", "Vaccination", "Growth Monitoring"],
    },
    {
      name: "Dr. William Shaw",
      specialty: "Orthopedic Surgeon",
      content:
        "Dr. Shaw is a highly skilled orthopedic surgeon specializing in joint replacement and sports medicine.",
      likes: 45,
      rating: 4.7,
      patients: "3,200+",
      imageUrl: "/images/doctorFour.jpg",
      availability: "Mon - Fri",
      education: "MD - University of California",
      experience: "12+ years",
      languages: ["English", "German"],
      consultationFee: "₹1000",
      specializations: ["Joint Surgery", "Sports Medicine", "Fracture Care"],
    },
    {
      name: "Dr. Emma Walker",
      specialty: "Dermatologist",
      content:
        "Dr. Walker offers expert dermatology care, specializing in acne, eczema, and skin cancer prevention.",
      likes: 60,
      rating: 4.9,
      patients: "2,100+",
      imageUrl: "/images/doctorThree.jpg",
      availability: "Wed - Sun",
      education: "MD - Yale University",
      experience: "8+ years",
      languages: ["English", "Italian"],
      consultationFee: "₹700",
      specializations: ["Skin Care", "Acne Treatment", "Cosmetic Dermatology"],
    },
  ];

  return (
    <div className="min-h-screen px-4 py-20 md:px-8 relative overflow-hidden">
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
          <h1 className="mb-6 text-4xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text md:text-6xl">
            Expert Doctors via Video Consultation
          </h1>
          <p className="mx-auto max-w-4xl text-xl text-gray-600 leading-relaxed">
            Our certified nurses visit you at home, while expert doctors provide consultations via video call. 
            Experience our innovative hybrid approach where professional nursing care meets remote medical expertise.
          </p>
        </motion.div>

        {/* Doctors Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.name}
              className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-lg shadow-2xl transition-all duration-500 hover:shadow-3xl border border-white/50"
              onMouseEnter={() => setHoveredCard(doctor.name)}
              onMouseLeave={() => setHoveredCard(null)}
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
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
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
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>{doctor.patients}</span>
                    </div>
                  </div>

                  {/* Consultation Fee */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">Consultation</span>
                    <span className="text-lg font-bold text-green-600">{doctor.consultationFee}</span>
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
                    <Heart className="w-4 h-4" />
                    Learn More
                  </motion.button>
                </div>

              {/* Floating Info Overlay on Hover */}
              {hoveredCard === doctor.name && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-800/90 to-transparent rounded-3xl z-20 flex flex-col justify-end p-6 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Close overlay on click */}
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white text-sm font-bold">×</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-white">{doctor.name}</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <Video className="w-4 h-4 text-blue-200" />
                      <span className="text-sm text-blue-200 font-medium">Video Consultation Partner</span>
                    </div>
                    <p className="text-sm text-blue-100 leading-relaxed">{doctor.content}</p>
                    
                    <div className="grid grid-cols-1 gap-2 text-xs text-blue-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span className="font-medium">Available:</span>
                        <span>{doctor.availability}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-3 h-3" />
                        <span className="font-medium">Education:</span>
                        <span className="truncate">{doctor.education}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-3 h-3" />
                        <span className="font-medium">Languages:</span>
                        <span>{doctor.languages.join(", ")}</span>
                      </div>
                    </div>
                    
                    {/* Quick Action Buttons in Overlay */}
                    <div className="flex gap-2 mt-4">
                      <motion.button
                        className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-xs"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open('tel:+1234567890', '_self')}
                      >
                        <Phone className="w-3 h-3" />
                        Book
                      </motion.button>
                      <motion.button
                        className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-xs"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart className="w-3 h-3" />
                        Info
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* How Our Service Works - Animated Workflow */}
        <motion.div
          className="mt-20 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
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
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 transform -translate-y-1/2 hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {/* Step 1: Book Service */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    boxShadow: ['0 10px 25px rgba(59, 130, 246, 0.3)', '0 15px 35px rgba(59, 130, 246, 0.5)', '0 10px 25px rgba(59, 130, 246, 0.3)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Phone className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">1. Book Service</h3>
                <p className="text-sm text-gray-600">Patient calls and books our tele-consultancy service</p>
              </motion.div>

              {/* Step 2: Nurse Visits */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                  animate={{ 
                    y: [0, -5, 0],
                    boxShadow: ['0 10px 25px rgba(34, 197, 94, 0.3)', '0 15px 35px rgba(34, 197, 94, 0.5)', '0 10px 25px rgba(34, 197, 94, 0.3)']
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                >
                  <Heart className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">2. Nurse Visits</h3>
                <p className="text-sm text-gray-600">Certified nurse visits patient at home and takes vital signs</p>
              </motion.div>

              {/* Step 3: Doctor Video Call */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    boxShadow: ['0 10px 25px rgba(168, 85, 247, 0.3)', '0 15px 35px rgba(168, 85, 247, 0.5)', '0 10px 25px rgba(168, 85, 247, 0.3)']
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  <Video className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">3. Doctor Consultation</h3>
                <p className="text-sm text-gray-600">Expert doctor joins via video call for consultation</p>
              </motion.div>

              {/* Step 4: Treatment Execution */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: ['0 10px 25px rgba(249, 115, 22, 0.3)', '0 15px 35px rgba(249, 115, 22, 0.5)', '0 10px 25px rgba(249, 115, 22, 0.3)']
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: 1.5 }}
                >
                  <Award className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">4. Care Execution</h3>
                <p className="text-sm text-gray-600">Nurse executes doctor's instructions and provides care</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to experience our innovative hybrid healthcare approach?
          </p>
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-5 h-5" />
            Book Your Tele-Consultancy Service
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Doctors;
