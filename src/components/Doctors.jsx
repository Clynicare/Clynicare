"use client";

import { Heart, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const Doctors = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctors = [
    {
      name: "Dr. John Anderson",
      specialty: "Cardiologist",
      content:
        "Dr. Anderson is a renowned cardiologist with over 15 years of experience in treating complex heart conditions. His innovative approach to patient care has earned him numerous accolades in the field.",
      likes: 50,
      imageUrl: "/images/updoc1.jpg",
      availability: "Mon - Fri",
      education: "MD - Harvard Medical School",
      experience: "15+ years",
      languages: ["English", "Spanish"],
      specializations: [
        "Interventional Cardiology",
        "Heart Failure Management",
        "Preventive Cardiology"
      ]
    },
    {
      name: "Dr. Sophia Martinez",
      specialty: "Pediatrician",
      content:
        "Dr. Martinez is a compassionate pediatrician who has dedicated her career to children's healthcare. With 10 years of experience, she specializes in developmental pediatrics and preventive care.",
      likes: 70,
      imageUrl: "/images/updoc5.jpg",
      availability: "Tue - Sat",
      education: "MD - Stanford University",
      experience: "10+ years",
      languages: ["English", "French"],
      specializations: [
        "Developmental Pediatrics",
        "Preventive Care",
        "Behavioral Health"
      ]
    },
    {
      name: "Dr. Sophia Martinez",
      specialty: "Pediatrician",
      content:
        "Dr. Martinez is a compassionate pediatrician who has dedicated her career to children's healthcare. With 10 years of experience, she specializes in developmental pediatrics and preventive care.",
      likes: 70,
      imageUrl: "/images/doctorFour.jpg",
      availability: "Tue - Sat",
      education: "MD - Stanford University",
      experience: "10+ years",
      languages: ["English", "French"],
      specializations: [
        "Developmental Pediatrics",
        "Preventive Care",
        "Behavioral Health"
      ]
    },{
      name: "Dr. Sophia Martinez",
      specialty: "Pediatrician",
      content:
        "Dr. Martinez is a compassionate pediatrician who has dedicated her career to children's healthcare. With 10 years of experience, she specializes in developmental pediatrics and preventive care.",
      likes: 70,
      imageUrl: "/images/doctorThree.jpg",
      availability: "Tue - Sat",
      education: "MD - Stanford University",
      experience: "10+ years",
      languages: ["English", "French"],
      specializations: [
        "Developmental Pediatrics",
        "Preventive Care",
        "Behavioral Health"
      ]
    },
    {
      name: "Dr. Sophia Martinez",
      specialty: "Pediatrician",
      content:
        "Dr. Martinez is a compassionate pediatrician who has dedicated her career to children's healthcare. With 10 years of experience, she specializes in developmental pediatrics and preventive care.",
      likes: 70,
      imageUrl: "/images/doctorTwo.jpg",
      availability: "Tue - Sat",
      education: "MD - Stanford University",
      experience: "10+ years",
      languages: ["English", "French"],
      specializations: [
        "Developmental Pediatrics",
        "Preventive Care",
        "Behavioral Health"
      ]
    }
  ];

  return (
    <div className="min-h-screen px-4 py-16 md:px-[100px]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-gradient-to-b from-[#4DA1A9] to-[#007BA7]">
            Meet Our Supporting Doctors
          </span>
          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
            Bellary's Top Class Proffesional Doctors
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Our trusted dedicated doctors sends together decades of experienced Nurses with expertise
            to provide you with the highest quality medical care.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
              onMouseEnter={() => setHoveredCard(doctor.name)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <Image
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  width={300}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
