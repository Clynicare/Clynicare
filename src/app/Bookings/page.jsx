"use client"
import React, { useEffect, useState } from 'react';
import { BookingCard } from '../../components/BookingCard';
import { BookingDetailsModal } from '../../components/BookingDetailsModal';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ;

function App() {
  const [mockBookings, setMockBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("thereis no token")
          
          return ;
        }

        const response = await axios.get(`${API_BASE_URL}/Bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Booking details: ", response.data);
        setMockBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings: ", error);
      }
    };

    fetchBookings();
  }, []);

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <Nav />
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div key={1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {Array.isArray(mockBookings) && mockBookings.length>0 ?(
            mockBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onClick={() => handleBookingClick(booking)}
              />
            ))
          ):(
            <div className='h-[50vh] w-[180vh] '>
              <h1 className='text-center mt-10 text-black/50 '>No bookings Found Or Kindly Login</h1>
            </div>
          )}
        </div>
      </main>

      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <Footer />
    </div>
  );
}

export default App;
