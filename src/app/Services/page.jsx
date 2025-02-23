'use client';

import { useState,useEffect } from 'react';
import { Stethoscope, X } from 'lucide-react';
import Image from 'next/image';
import Nav from '@/components/Nav';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
// Services Data




// Service Card Component
function ServiceCard({ service, onClick }) {
  return (
    
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      onClick={() => onClick(service)}
    >
      <div className="relative h-48 w-full">
        <Image 
          src={service.service_image}
          alt={service.service_name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{service.service_name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.service_description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-semibold">${service.service_price}/hour</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {service.service_category}
          </span>
        </div>
      </div>
    </div>
  );
}

// Booking Modal Component
function BookingModal({ service, onClose }) {
  const [formData, setFormData] = useState({
    user_name: '',
    booking_date: '',
    booking_time: '',
    address: '',
    mobile_no: ''
  });
    const router = useRouter();
  

  const handleSubmit =async (e) => {
    e.preventDefault();
    const service_id=service._id
    const bothdata={service_id, ...formData}
    const submit_booking=await axios.post('http://localhost:7000/api/bookings',bothdata)
    if(submit_booking.status === 200){
      alert('Booking successful')
      router.push('/bookings')
      
    }else{
      alert('Booking failed')
    }
    console.log('Booking submitted:', { service_id, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Book {service.service_name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative h-48">
              <Image 
                src={service.service_image}
                alt={service.service_name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{service.service_name}</h3>
              <p className="text-gray-600 text-sm mb-2">{service.service_description}</p>
              <p className="text-primary font-semibold">${service.service_price}/hour</p>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {service.service_category}
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
                  value={formData.user_name}
                  onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  className="w-full p-2 border rounded-md"
                  value={formData.mobile_no}
                  onChange={(e) => setFormData({ ...formData, mobile_no: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  required
                  className="w-full p-2 border rounded-md"
                  value={formData.booking_date}
                  onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  required
                  className="w-full p-2 border rounded-md"
                  value={formData.booking_time}
                  onChange={(e) => setFormData({ ...formData, booking_time: e.target.value })}
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
  const [servicedata, setServiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const searchparams=useSearchParams()
  const nameofservice=searchparams.get('name')
  useEffect(() => {
    const fetchServices = async () => {
      let url="http://localhost:7000/Services"
      try {
        console.log("Fetching services...");
        if(nameofservice){
          console.log("Fetching services for specific service name...");
          const response = await axios.get(`http://localhost:7000/Services?name=${nameofservice}` );
          console.log("this is the response for ",response)
          setServiceData(response.data);
      console.log(servicedata)
        }else{
        const response = await axios.get(`http://localhost:7000/Services`);
        console.log("API Response:", response.data);
        setServiceData(response.data);
      console.log(servicedata)
      }
       
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to fetch services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  if (loading) return <p className="text-center mt-10">Loading services...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mt-12" >HomeHealth Services</h1>
            <p className="text-gray-600">Professional healthcare services at your home</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicedata.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                onClick={() => handleServiceClick(service)}
              />
            ))}
          </div>
        </main>
      </div>

      {selectedService && (
        <BookingModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}
