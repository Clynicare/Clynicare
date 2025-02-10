"use client";

import { Heart, X } from "lucide-react";
import { useState } from "react";

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
      imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=80",
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
      imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&q=80",
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
      name: "Dr. David Chen",
      specialty: "Neurologist",
      content:
        "Dr. Chen is a leading neurologist specializing in innovative treatments for neurological disorders. His research has been published in several prestigious medical journals.",
      likes: 80,
      imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&q=80",
      availability: "Mon - Thu",
      education: "MD - Johns Hopkins University",
      experience: "12+ years",
      languages: ["English", "Mandarin"],
      specializations: [
        "Neurodegenerative Disorders",
        "Stroke Treatment",
        "Epilepsy Management"
      ]
    },
    {
      name: "Dr. Michael Roberts",
      specialty: "Orthopedic Surgeon",
      content:
        "Dr. Roberts is an experienced orthopedic surgeon known for his expertise in minimally invasive procedures. He has successfully performed over 1,000 surgeries in his career.",
      likes: 90,
      imageUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&q=80",
      availability: "Wed - Sun",
      education: "MD - Yale School of Medicine",
      experience: "18+ years",
      languages: ["English", "German"],
      specializations: [
        "Joint Replacement",
        "Sports Medicine",
        "Minimally Invasive Surgery"
      ]
    },
  ];

  return (
    <div className="min-h-screen  px-4 py-16 md:px-[100px]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-gradient-to-b from-[#4DA1A9] to-[#007BA7]">
            Meet Our Medical Experts
          </span>
          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
            World-Class Healthcare Professionals
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Our team of dedicated doctors brings together decades of experience and expertise
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
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
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

                <p className="mb-4 text-sm text-gray-600 line-clamp-3">{doctor.content}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Available: {doctor.availability}</span>
                </div>
              </div>

              {hoveredCard === doctor.name && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button 
                    onClick={() => setSelectedDoctor(doctor)}
                    className="transform rounded-full bg-white px-8 py-3 font-semibold text-gradient-to-b from-[#4DA1A9] to-[#007BA7] transition-transform hover:scale-105"
                  >
                    View Profile
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] px-8 py-3 font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
            View All Doctors
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>

      {/* Profile Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100"
            >
              <X size={24} />
            </button>

            <div className="mb-6 flex items-start gap-6">
              <img
                src={selectedDoctor.imageUrl}
                alt={selectedDoctor.name}
                className="h-32 w-32 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedDoctor.name}</h2>
                <p className="text-lg text-gradient-to-b from-[#4DA1A9] to-[#007BA7]">{selectedDoctor.specialty}</p>
                <p className="mt-2 text-gray-600">{selectedDoctor.content}</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Education</h3>
                  <p className="text-gray-600">{selectedDoctor.education}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Experience</h3>
                  <p className="text-gray-600">{selectedDoctor.experience}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Languages</h3>
                  <p className="text-gray-600">{selectedDoctor.languages.join(", ")}</p>
                </div>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-gray-900">Specializations</h3>
                <ul className="space-y-2">
                  {selectedDoctor.specializations.map((spec) => (
                    <li
                      key={spec}
                      className="rounded-full bg-blue-50 px-4 py-2 text-sm text-gradient-to-b from-[#4DA1A9] to-[#007BA7]"
                    >
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;