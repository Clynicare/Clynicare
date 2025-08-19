"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, Phone, Heart, Video, CheckCircle, AlertCircle, Activity, Star, MessageCircle, Navigation, FileText, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

const PatientDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    activeBookings: 0,
    completedServices: 0,
    nextAppointment: null
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/Login');
      return;
    }
    
    // Mock user data
    setUserInfo({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210'
    });
    
    fetchBookings();
  }, [router]);

  const fetchBookings = () => {
    // Mock recent bookings
    const mockBookings = [
      {
        id: '1',
        type: 'hybrid',
        status: 'confirmed',
        service: 'Hybrid Teleconsultancy',
        date: '2024-12-15',
        time: '2:00 PM',
        nurse: { name: 'Sarah Johnson', phone: '+91 9876543210', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face' },
        doctor: { name: 'Dr. Amit Verma', specialization: 'Cardiology', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face' },
        address: '123 Main Street, Mumbai',
        amount: 1350
      },
      {
        id: '2',
        type: 'nursing',
        status: 'completed',
        service: 'Home Nursing Service',
        date: '2024-12-10',
        time: '10:00 AM',
        nurse: { name: 'Priya Sharma', phone: '+91 9876543211', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face' },
        address: '123 Main Street, Mumbai',
        amount: 550,
        rating: 5
      }
    ];
    
    setBookings(mockBookings);
    setStats({
      activeBookings: mockBookings.filter(b => ['confirmed', 'pending'].includes(b.status)).length,
      completedServices: mockBookings.filter(b => b.status === 'completed').length,
      nextAppointment: mockBookings.find(b => b.status === 'confirmed')
    });
    setLoading(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'completed': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome back, <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{userInfo?.name}!</span>
            </h1>
            <p className="text-xl text-gray-600">Your Healthcare Dashboard</p>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Bookings</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.activeBookings}</p>
                  <button 
                    onClick={() => router.push('/Bookings')}
                    className="text-blue-600 text-sm hover:text-blue-700 font-medium"
                  >
                    View All
                  </button>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed Services</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completedServices}</p>
                  <button className="text-green-600 text-sm hover:text-green-700 font-medium">
                    History
                  </button>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Next Appointment</p>
                  {stats.nextAppointment ? (
                    <>
                      <p className="text-lg font-bold text-purple-600">Tomorrow</p>
                      <p className="text-sm text-gray-600">{stats.nextAppointment.time}</p>
                    </>
                  ) : (
                    <p className="text-lg font-bold text-gray-400">None scheduled</p>
                  )}
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-12"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => router.push('/#services-section')}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Book New Service</p>
                  <p className="text-sm text-gray-600">Schedule nursing or consultation</p>
                </div>
              </button>

              <button 
                onClick={() => router.push('/Nurses')}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Find Nurses</p>
                  <p className="text-sm text-gray-600">Browse certified nurses</p>
                </div>
              </button>

              <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Video Consultation</p>
                  <p className="text-sm text-gray-600">Talk to doctors online</p>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Recent Bookings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
              <button 
                onClick={() => router.push('/Bookings')}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                View All
              </button>
            </div>

            {bookings.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <div key={booking.id} className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          {booking.type === 'hybrid' ? (
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                              <Video className="w-6 h-6 text-white" />
                            </div>
                          ) : (
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                              <Heart className="w-6 h-6 text-white" />
                            </div>
                          )}
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{booking.service}</h3>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(booking.status)}
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                {booking.status.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{booking.time}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{booking.address}</span>
                            </div>
                          </div>
                        </div>

                        {/* Healthcare Team */}
                        <div className="bg-gray-50 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-900 mb-3">Healthcare Team</h4>
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={booking.nurse.image}
                                alt={booking.nurse.name}
                                className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                              />
                              <div>
                                <p className="font-medium text-gray-900">{booking.nurse.name}</p>
                                <p className="text-sm text-blue-600">Registered Nurse</p>
                              </div>
                            </div>
                            {booking.doctor && (
                              <div className="flex items-center gap-3">
                                <img
                                  src={booking.doctor.image}
                                  alt={booking.doctor.name}
                                  className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
                                />
                                <div>
                                  <p className="font-medium text-gray-900">{booking.doctor.name}</p>
                                  <p className="text-sm text-purple-600">{booking.doctor.specialization}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="lg:w-80">
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                          <div className="text-center mb-4">
                            <div className="text-2xl font-bold text-blue-600">₹{booking.amount}</div>
                            <p className="text-sm text-gray-600">Total Amount</p>
                          </div>

                          {booking.status === 'confirmed' && (
                            <div className="space-y-2">
                              <button className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                                <MessageCircle className="w-4 h-4" />
                                Contact Nurse
                              </button>
                              {booking.type === 'hybrid' && (
                                <button className="w-full bg-purple-600 text-white py-2 px-3 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                                  <Video className="w-4 h-4" />
                                  Join Video Call
                                </button>
                              )}
                              <button className="w-full bg-gray-600 text-white py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
                                Reschedule
                              </button>
                            </div>
                          )}

                          {booking.status === 'completed' && booking.rating && (
                            <div className="text-center">
                              <div className="flex justify-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-4 h-4 ${i < booking.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                ))}
                              </div>
                              <p className="text-sm text-gray-600">You rated this service</p>
                              <button className="w-full bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium mt-2 flex items-center justify-center gap-2">
                                <FileText className="w-4 h-4" />
                                Download Report
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600 mb-6">Book your first healthcare service to get started</p>
                <button
                  onClick={() => router.push('/#services-section')}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Book Now
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientDashboard;
