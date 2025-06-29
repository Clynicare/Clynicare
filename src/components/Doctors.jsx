"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
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
      imageUrl: "/images/updoc1.jpg",
      availability: "Mon - Fri",
      education: "MD - Harvard Medical School",
      experience: "15+ years",
      languages: ["English", "Spanish"],
    },
    {
      name: "Dr. Sophia Martinez",
      specialty: "Pediatrician",
      content:
        "Dr. Martinez specializes in pediatric care and has 10 years of experience treating children.",
      likes: 70,
      imageUrl: "/images/updoc5.jpg",
      availability: "Tue - Sat",
      education: "MD - Stanford University",
      experience: "10+ years",
      languages: ["English", "French"],
    },
    {
      name: "Dr. William Shaw",
      specialty: "Orthopedic Surgeon",
      content:
        "Dr. Shaw is a highly skilled orthopedic surgeon specializing in joint replacement and sports medicine.",
      likes: 45,
      imageUrl: "/images/doctorFour.jpg",
      availability: "Mon - Fri",
      education: "MD - University of California",
      experience: "12+ years",
      languages: ["English", "German"],
    },
    {
      name: "Dr. Emma Walker",
      specialty: "Dermatologist",
      content:
        "Dr. Walker offers expert dermatology care, specializing in acne, eczema, and skin cancer prevention.",
      likes: 60,
      imageUrl: "/images/doctorThree.jpg",
      availability: "Wed - Sun",
      education: "MD - Yale University",
      experience: "8+ years",
      languages: ["English", "Italian"],
    },
  ];

  return (
    <div className="min-h-screen px-4 py-16 md:px-[100px]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-gradient-to-b from-[#4DA1A9] to-[#007BA7]">
            Meet Our Supporting Doctors
          </span>
          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
            Bellary's Top Class Professional Doctors
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Our trusted doctors bring decades of experience to provide you with the highest quality medical care.
          </p>
        </div>

        {/* Doctors Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.name}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
              onMouseEnter={() => setHoveredCard(doctor.name)}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover={{ scale: 1.05 }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <Image
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  width={300}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy" // Lazy loading image for better performance
                />
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-sm text-blue-600">{doctor.specialty}</p>
                  </div>
                  <button className="flex items-center gap-1 rounded-full bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] px-3 py-1 text-white transition-transform hover:scale-105">
                    <Heart size={14} />
                    <span className="text-sm">{doctor.likes}</span>
                  </button>
                </div>

                {/* Hovered Doctor's Content */}
                {hoveredCard === doctor.name && (
                  <div className="mt-4 text-sm text-gray-600">
                    <p className="mb-2">{doctor.content}</p>
                    <p className="font-semibold">Availability: {doctor.availability}</p>
                    <p className="font-semibold">Education: {doctor.education}</p>
                    <p className="font-semibold">Experience: {doctor.experience}</p>
                    <p className="font-semibold">Languages: {doctor.languages.join(", ")}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
