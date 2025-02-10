'use client';

import { useState } from 'react';
import { Stethoscope, X } from 'lucide-react';
import Image from 'next/image';
import Nav from '@/components/Nav';

// Services Data
const services = [
  {
    id: 'blood-testing',
    name: 'Blood Testing',
    description: 'Comprehensive blood testing services at your doorstep. Our certified phlebotomists use state-of-the-art equipment for accurate results.',
    image: '/images/abouttwo.jpg',
    pricePerHour: 50,
    category: 'diagnostic'
  },
  {
    id: 'bp-monitoring',
    name: 'Blood Pressure Monitoring',
    description: 'Regular blood pressure monitoring with detailed reporting and immediate medical consultation if needed.',
    image: '/images/abouttwo.jpg',
    pricePerHour: 30,
    category: 'diagnostic'
  },
  {
    id: 'wound-care',
    name: 'Wound Care',
    description: 'Professional wound cleaning, dressing, and monitoring services by experienced nurses.',
    image: '/images/abouttwo.jpg',
    pricePerHour: 45,
    category: 'nursing'
  },
  {
    id: 'general-checkup',
    name: 'General Health Check-up',
    description: 'Comprehensive health assessment including vital signs, physical examination, and basic diagnostic tests.',
    image: '/images/abouttwo.jpg',
    pricePerHour: 60,
    category: 'preventive'
  },
  {
    id: 'physiotherapy',
    name: 'Physiotherapy',
    description: 'Personalized physiotherapy sessions for rehabilitation and pain management.',
    image: '/images/abouttwo.jpg',
    pricePerHour: 70,
    category: 'therapeutic'
  },
  {
    id: 'elderly-care',
    name: 'Elderly Care',
    description: 'Comprehensive care services for elderly patients including medication management and mobility assistance.',
    image: '/images/abouttwo.jpg',
    pricePerHour: 55,
    category: 'nursing'
  },
  {
    id: 'diabetes-management',
    name: 'Diabetes Management',
    description: 'Regular blood sugar monitoring, insulin administration, and dietary guidance.',
    image: '/images/abouttwo.jpg',
    pricePerHour: 40,
    category: 'diagnostic'
  },
  {
    id: 'iv-therapy',
    name: 'IV Therapy',
    description: 'Professional IV therapy services including fluid administration and medication delivery.',
    image: '/images/abouttwo.jpg',
    pricePerHour: 80,
    category: 'therapeutic'
  },
  {
    id: 'vaccination',
    name: 'Vaccination Services',
    description: 'Home vaccination services for all age groups with proper storage and administration.',
    image: '/images/abouttwo.jpg',
    pricePerHour: 35,
    category: 'preventive'
  },
  {
    id: 'ecg',
    name: 'ECG Monitoring',
    description: 'Professional ECG monitoring and reporting with immediate doctor consultation if required.',
    image: '/images/abouttwo.jpg',
    pricePerHour: 65,
    category: 'diagnostic'
  }
];

// Service Card Component
function ServiceCard({ service, onClick }) {
  return (
    
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      onClick={() => onClick(service)}
    >
      <div className="relative h-48 w-full">
        <Image 
          src={service.image}
          alt={service.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-semibold">${service.pricePerHour}/hour</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {service.category}
          </span>
        </div>
      </div>
    </div>
  );
}

// Booking Modal Component
function BookingModal({ service, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    address: '',
    mobile: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', { service, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Book {service.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative h-48">
              <Image 
                src={service.image}
                alt={service.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{service.description}</p>
              <p className="text-primary font-semibold">${service.pricePerHour}/hour</p>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {service.category}
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded-md"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  className="w-full p-2 border rounded-md"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  required
                  className="w-full p-2 border rounded-md"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  required
                  className="w-full p-2 border rounded-md"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  required
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Book Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


// Main Services Page Component
export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  return (
    <div className=''>
      <Nav></Nav>
    <div className="min-h-screen bg-gray-50  ">
      {/* Header */}
      <div className="bg-white shadow-sm ">
        
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex-col items-center justify-center text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[50px] ">
          <div className="flex items-center gap-3  text-center">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 text-center">HomeHealth Services</h1>
          </div>
        </div>
         
          <p className="text-gray-600">Professional healthcare services in the comfort of your home</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={handleServiceClick}
            />
          ))}
        </div>
      </main>
      </div>

      {/* Booking Modal */}
      {selectedService && (
        <BookingModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}