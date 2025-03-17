"use client"
import React, { useEffect, useState } from 'react';
import { BookingCard } from '../../components/BookingCard';
import { BookingDetailsModal } from '../../components/BookingDetailsModal';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import axios from 'axios';


function App() {
  const [mockBookings,setmockbookings] =useState([])
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
try {
  const forthe=async()=>{
    const token=localStorage.getItem("token")
    console.log(token)
    const bookingdetails=await axios.get("http://localhost:7000/Bookings",{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    console.log("this is the booking details",bookingdetails)
    setmockbookings(bookingdetails.data)
  }
  forthe()
} catch (error) {
  
}





const handleBookingClick = (booking) => {
  setSelectedBooking(booking);
  setIsModalOpen(true);
};

const handleCloseModal = () => {
  setIsModalOpen(false);
  setSelectedBooking(null);
};

console.log("this is the mockbooking",mockBookings.data)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm ">
        <Nav></Nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div key="some" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {mockBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onClick={() => handleBookingClick(booking)}
            />
          ))}
        </div>
      </main>

      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <Footer></Footer>
    </div>
  );
}

export default App;