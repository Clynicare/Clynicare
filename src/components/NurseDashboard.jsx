"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, User, MapPin, Phone, Calendar, Check, X, Heart, Video } from 'lucide-react';

const NurseDashboard = ({ nurseId = "674b8b8b123456789abcdef1" }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`http://localhost:7000/api/pending-bookings`);
      const data = await response.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingAction = async (bookingId, action, rejectionReason = '') => {
    try {
      console.log(`${action}ing booking:`, bookingId);
      const response = await fetch(`http://localhost:7000/api/nurse/bookings/${bookingId}/confirm`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          rejection_reason: rejectionReason
        })
      });
      
      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);

      if (response.ok) {
        // Remove booking from list after action
        setBookings(prev => prev.filter(booking => booking._id !== bookingId));
        
        // Show success message
        const message = action === 'confirm' ? 'Booking confirmed!' : 'Booking rejected!';
        const div = document.createElement('div');
        div.className = `fixed top-4 right-4 ${action === 'confirm' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-3 rounded-lg shadow-lg z-50`;
        div.textContent = message;
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 3000);
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nurse Dashboard</h1>
          <p className="text-gray-600">Manage your booking requests</p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No pending bookings</h3>
            <p className="text-gray-500">New booking requests will appear here</p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.patient_details.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {booking.patient_details.age} years old • {booking.patient_details.gender}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {booking.service_type === 'hybrid' && (
                      <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                        <Video className="w-3 h-3" />
                        Hybrid Care
                      </div>
                    )}
                    <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                      Pending
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(booking.appointment_details.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{booking.appointment_details.time_slot}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{booking.patient_id.phone}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5" />
                      <span>{booking.appointment_details.address}</span>
                    </div>
                  </div>
                </div>

                {booking.appointment_details.special_instructions && (
                  <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Special Instructions:</strong> {booking.appointment_details.special_instructions}
                    </p>
                  </div>
                )}

                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Amount:</span>
                    <span className="text-lg font-bold text-blue-600">
                      ₹{booking.pricing.total_amount}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleBookingAction(booking._id, 'reject', 'Not available at this time')}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleBookingAction(booking._id, 'confirm')}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Confirm Booking
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NurseDashboard;
