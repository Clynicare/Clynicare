"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, Phone, Heart, Video, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Nav from '../../components/Nav';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/Login');
          return;
        }

        // Get user info
        const userResponse = await axios.post(
          `${API_BASE_URL}/api/token-valid`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserInfo(userResponse.data.userInfo);

        // Get bookings
        const bookingsResponse = await axios.get(
          `${API_BASE_URL}/api/nurse-bookings`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookings(bookingsResponse.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        if (error.response?.status === 401) {
          router.push('/Login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [router, API_BASE_URL]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Bookings</span>
          </h1>
          <p className="text-xl text-gray-600">
            Welcome back, {userInfo?.name}! Here are your healthcare appointments.
          </p>
        </motion.div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-6">Book your first healthcare service to get started</p>
            <button
              onClick={() => router.push('/#services-section')}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Book Now
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Left: Booking Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                      <div className="flex items-center gap-3">
                        {booking.service_type === 'hybrid' ? (
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <Video className="w-6 h-6 text-white" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                            <Heart className="w-6 h-6 text-white" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {booking.service_type === 'hybrid' ? 'Hybrid Teleconsultancy' : 'Home Nursing Service'}
                          </h3>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)} mt-1`}>
                            {booking.status || 'pending'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Appointment Details</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Patient</p>
                            <p className="font-medium text-gray-900">{booking.patient_details?.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Phone className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Contact</p>
                            <p className="font-medium text-gray-900">{booking.patient_details?.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium text-gray-900">{new Date(booking.appointment_details?.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Time</p>
                            <p className="font-medium text-gray-900">{booking.appointment_details?.time_slot || '10:00 AM'}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {booking.appointment_details?.address && (
                      <div className="bg-blue-50 rounded-xl p-4 mb-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-0.5">
                            <MapPin className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Service Address</p>
                            <p className="text-gray-700">{booking.appointment_details.address}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Healthcare Team */}
                    {(booking.nurse_id || booking.doctor_id) && (
                      <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Healthcare Team</h4>
                        <div className="space-y-3">
                          {booking.nurse_id && (
                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                              <img
                                src={booking.nurse_id.profile_image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'}
                                alt={booking.nurse_id.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                              />
                              <div>
                                <p className="font-medium text-gray-900">{booking.nurse_id.name}</p>
                                <p className="text-sm text-blue-600">Registered Nurse</p>
                              </div>
                            </div>
                          )}
                          {booking.doctor_id && (
                            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                              <img
                                src={booking.doctor_id.profile_image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face'}
                                alt={booking.doctor_id.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
                              />
                              <div>
                                <p className="font-medium text-gray-900">{booking.doctor_id.name}</p>
                                <p className="text-sm text-purple-600">{booking.doctor_id.specialization}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Pricing & Status */}
                  <div className="lg:w-80">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold text-blue-600 mb-1">
                          ₹{booking.pricing?.total_amount || 500}
                        </div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Nurse Fee:</span>
                          <span className="font-medium">₹{booking.pricing?.nurse_fee || 500}</span>
                        </div>
                        {booking.pricing?.doctor_fee > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Doctor Fee:</span>
                            <span className="font-medium">₹{booking.pricing.doctor_fee}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Platform Fee:</span>
                          <span className="font-medium">₹{booking.pricing?.platform_fee || 50}</span>
                        </div>
                      </div>
                      
                      <div className="text-center pt-4 border-t border-blue-200">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          {getStatusIcon(booking.status)}
                          <span className="font-semibold text-gray-900 capitalize">
                            {booking.status || 'pending'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Booked on {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default BookingsPage;
