'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  CreditCard, 
  FileText, 
  Video, 
  Bell, 
  Plus,
  MapPin,
  Phone,
  Mail,
  Star,
  Activity,
  Pill,
  Receipt,
  HeartHandshake,
  AlertCircle,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { 
  bookingAPI, 
  teleconsultationAPI, 
  paymentAPI, 
  settlementAPI,
  apiUtils 
} from '@/lib/api';
import { toast } from 'sonner';
import TeleconsultationInterface from './TeleconsultationInterface';
import PaymentInterface from './PaymentInterface';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    profile: null,
    upcomingBookings: [],
    recentBookings: [],
    prescriptions: [],
    payments: [],
    teleConsultations: [],
    notifications: []
  });
  const [showTeleconsultation, setShowTeleconsultation] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load all dashboard data in parallel
      const [
        bookingsResponse,
        paymentsResponse,
        consultationsResponse
      ] = await Promise.all([
        bookingAPI.getUserBookings(),
        paymentAPI.getUserPayments(),
        teleconsultationAPI.getUserSessions()
      ]);

      setDashboardData(prev => ({
        ...prev,
        upcomingBookings: bookingsResponse.data?.upcoming || [],
        recentBookings: bookingsResponse.data?.recent || [],
        payments: paymentsResponse.data || [],
        teleConsultations: consultationsResponse.data || []
      }));

    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTeleconsultation = (booking) => {
    setSelectedBooking(booking);
    setShowTeleconsultation(true);
  };

  const handleMakePayment = (booking) => {
    setSelectedBooking(booking);
    setShowPayment(true);
  };

  const handleBookingAction = async (bookingId, action) => {
    try {
      let response;
      
      switch (action) {
        case 'cancel':
          response = await bookingAPI.cancelBooking(bookingId);
          toast.success('Booking cancelled successfully');
          break;
        case 'reschedule':
          // Handle reschedule logic
          break;
        default:
          return;
      }
      
      // Reload bookings after action
      loadDashboardData();
      
    } catch (error) {
      console.error(`Failed to ${action} booking:`, error);
      toast.error(`Failed to ${action} booking`);
    }
  };

  const DashboardStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-full">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Bookings</p>
            <p className="text-2xl font-semibold text-gray-900">
              {dashboardData.upcomingBookings.length + dashboardData.recentBookings.length}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center">
          <div className="bg-green-100 p-3 rounded-full">
            <Video className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Consultations</p>
            <p className="text-2xl font-semibold text-gray-900">
              {dashboardData.teleConsultations.length}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center">
          <div className="bg-purple-100 p-3 rounded-full">
            <CreditCard className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Spent</p>
            <p className="text-2xl font-semibold text-gray-900">
              ₹{dashboardData.payments.reduce((sum, payment) => sum + payment.amount, 0)}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center">
          <div className="bg-yellow-100 p-3 rounded-full">
            <Pill className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Prescriptions</p>
            <p className="text-2xl font-semibold text-gray-900">
              {dashboardData.prescriptions.length}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const UpcomingBookings = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
        <button
          onClick={() => window.location.href = '/Bookings'}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Book New</span>
        </button>
      </div>

      {dashboardData.upcomingBookings.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No upcoming appointments</p>
        </div>
      ) : (
        <div className="space-y-4">
          {dashboardData.upcomingBookings.map((booking, index) => (
            <motion.div
              key={booking.booking_id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <HeartHandshake className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{booking.service_type}</h4>
                    <p className="text-sm text-gray-600">
                      {booking.nurse_name} • {booking.agency_name}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{booking.appointment_date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{booking.appointment_time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{booking.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800'
                      : booking.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status}
                  </span>
                  
                  {booking.payment_status === 'pending' && (
                    <button
                      onClick={() => handleMakePayment(booking)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                    >
                      Pay Now
                    </button>
                  )}
                  
                  {booking.status === 'confirmed' && booking.teleconsultation_enabled && (
                    <button
                      onClick={() => handleJoinTeleconsultation(booking)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs flex items-center space-x-1"
                    >
                      <Video className="h-3 w-3" />
                      <span>Join Call</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleBookingAction(booking.booking_id, 'cancel')}
                    className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  const RecentActivity = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
      
      <div className="space-y-4">
        {dashboardData.recentBookings.map((booking, index) => (
          <div key={booking.booking_id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className={`p-2 rounded-full ${
              booking.status === 'completed' 
                ? 'bg-green-100'
                : booking.status === 'cancelled'
                ? 'bg-red-100'
                : 'bg-yellow-100'
            }`}>
              {booking.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-green-600" />}
              {booking.status === 'cancelled' && <AlertCircle className="h-4 w-4 text-red-600" />}
              {booking.status === 'pending' && <Clock className="h-4 w-4 text-yellow-600" />}
            </div>
            
            <div className="flex-1">
              <p className="font-medium text-gray-900">{booking.service_type}</p>
              <p className="text-sm text-gray-600">
                {booking.appointment_date} • {booking.nurse_name}
              </p>
            </div>
            
            <div className="text-right">
              <p className="font-medium text-gray-900">₹{booking.total_amount}</p>
              <p className={`text-xs ${
                booking.status === 'completed' 
                  ? 'text-green-600'
                  : booking.status === 'cancelled'
                  ? 'text-red-600'
                  : 'text-yellow-600'
              }`}>
                {booking.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const PaymentHistory = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment History</h3>
      
      <div className="space-y-4">
        {dashboardData.payments.map((payment, index) => (
          <div key={payment.payment_id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-2 rounded-full">
                <Receipt className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Payment #{payment.payment_id}</p>
                <p className="text-sm text-gray-600">
                  {new Date(payment.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-gray-900">₹{payment.amount}</p>
              <p className={`text-xs ${
                payment.status === 'success' 
                  ? 'text-green-600'
                  : payment.status === 'failed'
                  ? 'text-red-600'
                  : 'text-yellow-600'
              }`}>
                {payment.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProfileOverview = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-full">
          <User className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Welcome back!</h3>
          <p className="text-gray-600">Manage your healthcare appointments and consultations</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <button
              onClick={() => window.location.href = '/Bookings'}
              className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors flex items-center space-x-3"
            >
              <Plus className="h-5 w-5 text-blue-600" />
              <span>Book New Appointment</span>
            </button>
            
            <button
              onClick={() => setActiveTab('consultations')}
              className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors flex items-center space-x-3"
            >
              <Video className="h-5 w-5 text-green-600" />
              <span>Join Teleconsultation</span>
            </button>
            
            <button
              onClick={() => setActiveTab('payments')}
              className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors flex items-center space-x-3"
            >
              <CreditCard className="h-5 w-5 text-purple-600" />
              <span>View Payment History</span>
            </button>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Health Summary</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Appointments:</span>
              <span className="font-medium">
                {dashboardData.upcomingBookings.length + dashboardData.recentBookings.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Completed Sessions:</span>
              <span className="font-medium">
                {dashboardData.recentBookings.filter(b => b.status === 'completed').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Consultations:</span>
              <span className="font-medium">{dashboardData.teleConsultations.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (showTeleconsultation && selectedBooking) {
      return (
        <TeleconsultationInterface
          bookingData={selectedBooking}
          userRole="patient"
          onCallEnd={() => {
            setShowTeleconsultation(false);
            setSelectedBooking(null);
          }}
        />
      );
    }

    if (showPayment && selectedBooking) {
      return (
        <PaymentInterface
          bookingData={selectedBooking}
          onPaymentSuccess={() => {
            setShowPayment(false);
            setSelectedBooking(null);
            loadDashboardData();
          }}
          onPaymentFailure={() => {
            setShowPayment(false);
            setSelectedBooking(null);
          }}
        />
      );
    }

    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProfileOverview />
              <UpcomingBookings />
            </div>
            <RecentActivity />
          </div>
        );
      case 'bookings':
        return <UpcomingBookings />;
      case 'payments':
        return <PaymentHistory />;
      case 'consultations':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Teleconsultations</h3>
            {dashboardData.teleConsultations.map((session, index) => (
              <div key={session.session_id} className="border rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{session.doctor_name}</h4>
                    <p className="text-sm text-gray-600">{session.session_date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    session.status === 'completed' ? 'bg-green-100 text-green-800' :
                    session.status === 'active' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {session.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
            <p className="text-gray-600">Manage your healthcare journey</p>
          </div>
          
          <button
            onClick={loadDashboardData}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              { key: 'overview', label: 'Overview', icon: Activity },
              { key: 'bookings', label: 'Bookings', icon: Calendar },
              { key: 'consultations', label: 'Consultations', icon: Video },
              { key: 'payments', label: 'Payments', icon: CreditCard }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default PatientDashboard;
