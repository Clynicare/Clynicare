"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Try different import patterns - uncomment the ones that work for your components
// Option 1: Default imports
import BookingCard from '../../components/BookingCard';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';

// Option 2: Named imports (try these if default imports don't work)
// import { BookingCard } from '../../components/BookingCard';
// import { Nav } from '@/components/Nav';
// import { Footer } from '@/components/Footer';
// import { Loading } from '@/components/Loading';

// This one is already correct as named import
import { BookingDetailsModal } from '../../components/BookingDetailsModal';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function App() {
  const [mockBookings, setMockBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found");
          setError("No token found. Please login.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/Bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response: ", response.data);
        
        if (Array.isArray(response.data)) {
          setMockBookings(response.data);
        } else {
          setError("Received data is not in the expected format.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings: ", error);
        setError("There was an error fetching bookings. Please try again.");
        setLoading(false);
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

  // Debug: Check if components are defined
  console.log("Component checks:", {
    BookingCard: typeof BookingCard,
    BookingDetailsModal: typeof BookingDetailsModal,
    Nav: typeof Nav,
    Footer: typeof Footer,
    Loading: typeof Loading
  });
  
  // Additional debug for BookingCard since it's showing as "object"
  console.log("BookingCard details:", BookingCard);
  console.log("BookingCard.default:", BookingCard.default);

  return (
    <div className="font-sans bg-white overflow-x-hidden min-h-screen">
      {Nav && React.isValidElement(<Nav />) ? <Nav /> : null}

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {loading ? (
            Loading ? <Loading /> : <div>Loading...</div>
          ) : error ? (
            <div className="h-[50vh] w-full flex items-center justify-center">
              <h1 className="text-center mt-10 text-black/50 text-lg">{error}</h1>
            </div>
          ) : Array.isArray(mockBookings) && mockBookings.length > 0 ? (
            mockBookings.map((booking) => {
              // Use _id as key since that's what's in your API response
              const bookingKey = booking._id || booking.id || Math.random();
              
              // Handle BookingCard being an object (might need .default)
              const BookingComponent = typeof BookingCard === 'function' ? BookingCard : BookingCard.default;
              
              return BookingComponent ? (
                <BookingComponent
                  key={bookingKey}
                  booking={booking}
                  onClick={() => handleBookingClick(booking)}
                />
              ) : (
                <div key={bookingKey} className="p-4 border rounded bg-gray-100">
                  <p className="font-semibold mb-2">Booking Details:</p>
                  <p><strong>Patient:</strong> {booking.patient_name}</p>
                  <p><strong>Service:</strong> {booking.service_id?.service_name}</p>
                  <p><strong>Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {booking.booking_time}</p>
                  <p><strong>Status:</strong> {booking.status}</p>
                  <p><strong>Address:</strong> {booking.address}</p>
                  <button 
                    onClick={() => handleBookingClick(booking)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </div>
              );
            })
          ) : (
            <div className="h-[50vh] w-full flex items-center justify-center">
              <h1 className="text-center mt-10 text-black/50 text-lg">
                No bookings found or kindly login
              </h1>
            </div>
          )}
        </div>
      </main>

      {BookingDetailsModal && (
        <BookingDetailsModal
          booking={selectedBooking}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      {Footer && <Footer />}
    </div>
  );
}

export default App;