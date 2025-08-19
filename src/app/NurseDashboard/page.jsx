"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, MapPin, Phone, User, Heart, Video, CheckCircle, XCircle, AlertCircle, Activity, DollarSign, Navigation, MessageCircle, FileText, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NurseDashboard = () => {
  const [nurseInfo, setNurseInfo] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('assignments');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('nurseToken');
    const info = localStorage.getItem('nurseInfo');
    
    if (!token || !info) {
      router.push('/NurseLogin');
      return;
    }
    
    setNurseInfo(JSON.parse(info));
    fetchBookings();
  }, [router]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('nurseToken');
      if (!token) {
        console.log('No nurse token found');
        setLoading(false);
        return;
      }
      
      const response = await fetch('http://localhost:7000/api/nurse/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('🏥 [NURSE] Fetched bookings:', data);
        
        // Transform API data to match component structure
        const transformedBookings = data.map(booking => ({
          id: booking._id,
          type: booking.service_type,
          status: booking.status,
          patient: {
            name: booking.patient_details?.name || booking.patient_id?.name,
            age: booking.patient_details?.age || 'N/A',
            gender: booking.patient_details?.gender || 'N/A',
            phone: booking.patient_details?.phone || booking.patient_id?.phone
          },
          appointment: {
            date: booking.appointment_details?.date,
            time: booking.appointment_details?.time_slot,
            address: booking.appointment_details?.address
          },
          doctor: booking.doctor_id ? {
            name: booking.doctor_id.name,
            specialization: booking.doctor_id.specialization
          } : null,
          notes: booking.patient_details?.medical_history || 'No specific notes',
          pricing: {
            total: booking.pricing?.total_amount || 0,
            nurseShare: booking.pricing?.nurse_fee || 0
          }
        }));
        
        setBookings(transformedBookings);
      } else {
        console.error('Failed to fetch bookings:', response.status);
      }
    } catch (error) {
      console.error('❌ [NURSE] Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingAction = async (bookingId, action) => {
    try {
      console.log(`🏥 [NURSE] ${action}ing booking ${bookingId}`);
      
      const response = await fetch(`http://localhost:7000/api/nurse/bookings/${bookingId}/confirm`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: action === 'accept' ? 'confirm' : 'reject',
          rejection_reason: action === 'reject' ? 'Nurse unavailable' : undefined
        })
      });
      
      const result = await response.json();
      console.log(`🏥 [NURSE] API response:`, result);
      
      if (response.ok) {
        setBookings(prev => prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: action === 'accept' ? 'confirmed' : 'cancelled' }
            : booking
        ));
        
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        successDiv.textContent = `Booking ${action}ed successfully! Patient has been notified via SMS.`;
        document.body.appendChild(successDiv);
        setTimeout(() => successDiv.remove(), 4000);
      } else {
        throw new Error(result.message || 'Failed to update booking');
      }
    } catch (error) {
      console.error(`❌ [NURSE] Error ${action}ing booking:`, error);
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      errorDiv.textContent = `Failed to ${action} booking. Please try again.`;
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 4000);
    }
  };

  const handleHandoffToDoctor = async (bookingId) => {
    try {
      console.log(`🏥 [NURSE] Handing off to doctor for booking ${bookingId}`);
      
      const response = await fetch(`http://localhost:7000/api/bookings/${bookingId}/handoff-to-doctor`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vital_signs: {
            blood_pressure: '120/80',
            heart_rate: '72 bpm',
            temperature: '98.6°F'
          },
          nurse_notes: 'Initial assessment completed. Patient ready for doctor consultation.'
        })
      });
      
      const result = await response.json();
      console.log(`🏥 [NURSE] Handoff API response:`, result);
      
      if (response.ok) {
        setBookings(prev => prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'doctor_consultation' }
            : booking
        ));
        
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        successDiv.textContent = 'Handoff successful! Doctor will join shortly. Patient has been notified via SMS.';
        document.body.appendChild(successDiv);
        setTimeout(() => successDiv.remove(), 5000);
      } else {
        throw new Error(result.message || 'Failed to handoff to doctor');
      }
    } catch (error) {
      console.error(`❌ [NURSE] Error during handoff:`, error);
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      errorDiv.textContent = 'Failed to handoff to doctor. Please try again.';
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 4000);
    }
  };

  const handleCompleteService = async (bookingId) => {
    try {
      console.log(`🏥 [NURSE] Completing service for booking ${bookingId}`);
      
      const response = await fetch(`http://localhost:7000/api/bookings/${bookingId}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notes: 'Service completed successfully',
          vital_signs: {}
        })
      });
      
      const result = await response.json();
      console.log(`🏥 [NURSE] Complete service API response:`, result);
      
      if (response.ok) {
        setBookings(prev => prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'completed' }
            : booking
        ));
        
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        successDiv.textContent = 'Service completed successfully! Patient has been notified via SMS.';
        document.body.appendChild(successDiv);
        setTimeout(() => successDiv.remove(), 4000);
      } else {
        throw new Error(result.message || 'Failed to complete service');
      }
    } catch (error) {
      console.error(`❌ [NURSE] Error completing service:`, error);
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      errorDiv.textContent = 'Failed to complete service. Please try again.';
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 4000);
    }
  };

  const isServiceTimeReached = (appointmentDate, appointmentTime) => {
    const now = new Date();
    const appointmentDateTime = new Date(`${appointmentDate} ${appointmentTime}`);
    return now >= appointmentDateTime;
  };

  const handleLogout = () => {
    localStorage.removeItem('nurseToken');
    localStorage.removeItem('nurseInfo');
    router.push('/NurseLogin');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'in_progress': return <Activity className="w-5 h-5 text-blue-500" />;
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'doctor_consultation': return <Video className="w-5 h-5 text-purple-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'doctor_consultation': return 'bg-purple-100 text-purple-800';
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Nurse Portal</h1>
                <p className="text-gray-600">Welcome back, {nurseInfo?.name}!</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Appointments</p>
                <p className="text-3xl font-bold text-gray-900">3</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed This Week</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
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
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Earnings This Month</p>
                <p className="text-3xl font-bold text-gray-900">₹15,000</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Patient Rating</p>
                <p className="text-3xl font-bold text-gray-900">4.8★</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Assignments */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Assignments ({bookings.length})
            </h2>
          </div>

          {bookings.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6"
                >
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
                          <h3 className="text-lg font-bold text-gray-900">
                            {booking.type === 'hybrid' ? 'Hybrid Teleconsultancy' : 'Home Nursing Service'}
                          </h3>
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
                            <User className="w-4 h-4" />
                            <span>{booking.patient.name} ({booking.patient.age}, {booking.patient.gender})</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{booking.patient.phone}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{booking.appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{booking.appointment.time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-gray-600 mb-4">
                        <MapPin className="w-4 h-4 mt-0.5" />
                        <span className="text-sm">{booking.appointment.address}</span>
                      </div>

                      {booking.doctor && (
                        <div className="bg-purple-50 rounded-lg p-3 mb-4">
                          <p className="text-sm text-purple-700">
                            <strong>Doctor:</strong> {booking.doctor.name} - {booking.doctor.specialization}
                          </p>
                        </div>
                      )}

                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-700">
                          <strong>Notes:</strong> {booking.notes}
                        </p>
                      </div>
                    </div>

                    <div className="lg:w-80">
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                        <div className="text-center mb-3">
                          <div className="text-2xl font-bold text-blue-600">
                            ₹{booking.pricing.total}
                          </div>
                          <p className="text-sm text-gray-600">Total Amount</p>
                        </div>
                        
                        <div className="text-center mb-4">
                          <div className="text-lg font-semibold text-green-600">
                            ₹{booking.pricing.nurseShare}
                          </div>
                          <p className="text-xs text-gray-500">Your Share</p>
                        </div>

                        {booking.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleBookingAction(booking.id, 'accept')}
                              className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleBookingAction(booking.id, 'reject')}
                              className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                            >
                              Reject
                            </button>
                          </div>
                        )}

                        {booking.status === 'confirmed' && (
                          <div className="space-y-2">
                            <button className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                              <Navigation className="w-4 h-4" />
                              Navigate
                            </button>
                            <button className="w-full bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                              <Phone className="w-4 h-4" />
                              Call Patient
                            </button>
                            {isServiceTimeReached(booking.appointment.date, booking.appointment.time) && (
                              <>
                                {booking.type === 'hybrid' && (
                                  <button 
                                    onClick={() => handleHandoffToDoctor(booking.id)}
                                    className="w-full bg-purple-600 text-white py-2 px-3 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center justify-center gap-2 mb-2"
                                  >
                                    <Video className="w-4 h-4" />
                                    Handoff to Doctor
                                  </button>
                                )}
                                <button 
                                  onClick={() => handleCompleteService(booking.id)}
                                  className="w-full bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  Complete Service
                                </button>
                              </>
                            )}
                          </div>
                        )}

                        {booking.status === 'doctor_consultation' && (
                          <div className="bg-purple-100 border border-purple-200 rounded-lg p-3 text-center">
                            <Video className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-purple-800">Doctor Consultation</p>
                            <p className="text-xs text-purple-600">Handed off to doctor</p>
                          </div>
                        )}

                        {booking.status === 'completed' && (
                          <div className="bg-green-100 border border-green-200 rounded-lg p-3 text-center">
                            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-green-800">Service Completed</p>
                            <p className="text-xs text-green-600">Patient has been notified</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No assignments yet</h3>
              <p className="text-gray-600">New patient assignments will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NurseDashboard;
