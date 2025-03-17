'use client';

import { useState, useEffect, useCallback } from 'react';
import { Stethoscope, X } from 'lucide-react';
import Image from 'next/image';
import Nav from '@/components/Nav';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import {easeIn, motion} from 'framer-motion'
import Footer from '@/components/Footer';
require('dotenv').config();



const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';

function ServiceCard({ service, onClick }) {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md cursor-pointer transform transition-transform hover:scale-105"
      onClick={() => onClick(service)}
    >
      <div className="relative h-48 w-full">
        <Image src={service.service_image} alt={service.service_name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{service.service_name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.service_description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-semibold">${service.service_price}/hour</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{service.service_category}</span>
        </div>
      </div>
    </motion.div>
  );
}

function BookingModal({ service, onClose }) {
  const [formData, setFormData] = useState({ user_name: '', mobile_no: '', booking_date: '', booking_time: '', address: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token=localStorage.getItem('token')
      console.log("this is the token which is in local storage",token)
      const response = await axios.post(`${API_URL}/api/bookings`, { service_id: service._id, ...formData },{headers:{
        "Authorization":`Bearer ${token}`,
        "content-type":"application/json"
      }});
      console.log(response)
      alert(response.status === 200 ? 'Booking successful' : 'Booking failed');
      router.push('/Bookings');
      onClose();
    } catch (error) {
      console.error("Booking Error:", error);
      alert('Error processing booking. Try again later.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{ease:'easeInOut' ,duration:0.5}} className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Book {service.service_name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['user_name', 'mobile_no', 'booking_date', 'booking_time', 'address'].map((field, index) => (
            <input 
              key={index}
              type={field.includes('date') ? 'date' : field.includes('time') ? 'time' : 'text'}
              placeholder={field.replace('_', ' ').toUpperCase()}
              required
              className={`p-2 border rounded-md ${field === 'address' ? 'md:col-span-2' : ''}`}
              value={formData[field]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            />
          ))}
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Book Service</button>
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
      const response = await axios.get(`${API_URL}/Services${serviceName ? `?name=${serviceName}` : ''}`);
      setServices(response.data);
    } catch (error) {
      console.error("Fetching services failed:", error);
    }
  }, [serviceName]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mt-12">HomeHealth Services</h1>
            <p className="text-gray-600">Professional healthcare services at your home</p>
          </div>
          {services && services.length>0?
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8,ease:easeIn}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} onClick={setSelectedService} />
            ))}
          </motion.div>
          :<Loading/>
          }
        </main>
      </div>
      {selectedService && <BookingModal service={selectedService} onClose={() => setSelectedService(null)} />}
        <Footer/>
    </div>
  );
}
