'use client';

import { useState, useEffect, useCallback } from 'react';
import { Stethoscope, X } from 'lucide-react';
import Image from 'next/image';
import Nav from '@/components/Nav';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { easeIn, motion } from 'framer-motion';
import Footer from '@/components/Footer';
require('dotenv').config();

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';

function ServiceCard({ service, onClick }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl overflow-hidden"
      onClick={() => onClick(service)}
    >
      <div className="relative h-56 w-full">
        <Image
          src={service.service_image}
          alt={service.service_name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.service_name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.service_description}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-semibold text-lg">${service.service_price}/hour</span>
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {service.service_category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function BookingModal({ service, onClose }) {
  const [formData, setFormData] = useState({
    user_name: '',
    mobile_no: '',
    booking_date: '',
    booking_time: '',
    address: '',
    additional_requirements: '',
    gender: '',
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:7000/api/bookings`,
        { service_id: service._id, ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert(response.status === 200 ? 'Booking successful' : 'Booking failed');
      router.push('/Bookings');
      onClose();
    } catch (error) {
      console.error('Booking Error:', error);
      alert('Error processing booking. Try again later.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
        className="bg-white shadow-2xl rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-all"
        >
          <X size={28} />
        </button>

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Book <span className="text-blue-600">{service.service_name}</span>
        </h2>
        <p className="text-gray-600 text-center text-sm mb-6">
          {service.service_description ||
            'This service helps with daily tasks to ensure comfort and safety.'}
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {['user_name', 'mobile_no', 'booking_date', 'booking_time', 'address', 'gender'].map(
            (field, index) => (
              <div key={index} className={`relative ${field === 'address' ? 'col-span-2' : ''}`}>
                {field === 'gender' ? (
                  <div className="relative w-full">
                    <select
                      required
                      value={formData[field]}
                      className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer shadow-sm"
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    >
                      <option value="" disabled className="text-gray-400">
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Prefer Not To Say">Prefer Not To Say</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      ▼
                    </div>
                  </div>
                ) : (
                  <input
                    type={
                      field.includes('date')
                        ? 'date'
                        : field.includes('time')
                        ? 'time'
                        : 'text'
                    }
                    placeholder={field.replace('_', ' ').toUpperCase()}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  />
                )}
              </div>
            )
          )}

          <textarea
            placeholder="Any additional requirements?"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            rows="3"
            value={formData.additional_requirements}
            onChange={(e) => setFormData({ ...formData, additional_requirements: e.target.value })}
          ></textarea>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all"
            >
              Book Now
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const getQueryParam = (key) => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get(key);
    }
    return null;
  };

  const serviceName = getQueryParam('name');
  const fetchServices = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:7000/Services${serviceName ? `?name=${serviceName}` : ''}`
      );
      setServices(response.data);
    } catch (error) {
      console.error('Fetching services failed:', error);
    }
  }, [serviceName]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-gray-50 ">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-sans font-bold text-gray-900 text-center mt-11">HomeHealth Services</h1>
          {services.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeIn }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
            >
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} onClick={setSelectedService} />
              ))}
            </motion.div>
          ) : (
            <Loading />
          )}
        </main>
      </div>
      {selectedService && <BookingModal service={selectedService} onClose={() => setSelectedService(null)} />}
      <Footer />
    </div>
  );
}
