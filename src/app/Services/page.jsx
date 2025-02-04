'use client';
import React, { useState } from 'react';
import { Syringe, Droplets, Heart, Stethoscope, Microscope, Ban as Bandage, ChevronFirst as FirstAid, Activity, Calendar, Clock, DollarSign } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
        
const services = [
  {
    icon: Syringe,
    title: "Vaccinations",
    description: "Comprehensive vaccination services for all age groups, including flu shots and travel vaccines.",
    image: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&q=80&w=800",
    price: 75,
    duration: "30 min"
  },
  {
    icon: Droplets,
    title: "Blood Testing",
    description: "Advanced blood work and analysis with quick, accurate results and detailed reporting.",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=800",
    price: 120,
    duration: "45 min"
  },
  {
    icon: Bandage,
    title: "Wound Care",
    description: "Professional dressing and wound management services with sterile techniques.",
    image: "/images/woundDressing.jpg",
    price: 90,
    duration: "40 min"
  },
  {
    icon: Heart,
    title: "Urinary Catheter Care",
    description: "Regular heart health check-ups and continuous cardiac monitoring services.",
    image: "/images/urineService.jpg",
    price: 150,
    duration: "60 min"
  },
  {
    icon: Stethoscope,
    title: "General Check-ups",
    description: "Thorough physical examinations and health assessments by experienced professionals.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    price: 100,
    duration: "45 min"
  },
  {
    icon: Microscope,
    title: "Laboratory Services",
    description: "Full-service medical laboratory offering a wide range of diagnostic tests.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800",
    price: 200,
    duration: "90 min"
  },
  {
    icon: FirstAid,
    title: "Emergency Care",
    description: "Immediate medical attention for urgent health concerns and injuries.",
    image: "/images/EmergencyCare.jpg",
    price: 250,
    duration: "60 min"
  },
  {
    icon: Activity,
    title: "Health Monitoring",
    description: "Continuous health tracking and regular vital sign monitoring services.",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=800",
    price: 180,
    duration: "75 min"
  }
];

function App() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleBooking = (service) => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time for your appointment");
      return;
    }
    alert(`Booking confirmed for ${service.title} on ${selectedDate} at ${selectedTime}`);
  };

  return (
    <div>
        <Nav />
    <div className="min-h-screen py-[100px] " >
             <p className=' font-bold text-[30px]  text-center font-rejoice '>Services We Provide </p>
                                    
      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-[100px] py-12">
       

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {services.map((service, index) => (
            <div key={index} className="group perspective">
              <div className="relative preserve-3d duration-1000 group-hover:rotate-y-180">
                {/* Front of card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden backface-hidden">
                  <div className="relative h-48">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.duration}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {service.price}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 bg-white rounded-xl shadow-lg p-6 backface-hidden rotate-y-180">
                  <div className="h-full flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Book {service.title}</h3>
                    
                    <div className="space-y-4 flex-grow">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select Date
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select Time
                        </label>
                        <input
                          type="time"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                        />
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {service.duration}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {service.price}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBooking(service)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      
    </div>
    <Footer></Footer>
    </div>
  );
}

export default App;