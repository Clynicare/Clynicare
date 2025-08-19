"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Users, Star, MapPin, Phone, Mail, Calendar, DollarSign, Activity, Shield, Search, Filter } from 'lucide-react';

const AgencyDashboard = () => {
  const [nurses, setNurses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('nurses');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNurse, setEditingNurse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalNurses: 0,
    activeBookings: 0,
    totalEarnings: 0,
    averageRating: 0
  });

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";

  useEffect(() => {
    fetchNurses();
    fetchBookings();
    fetchStats();
  }, []);

  const fetchNurses = async () => {
    try {
      const token = localStorage.getItem('agencyToken');
      const response = await fetch(`${API_BASE_URL}/api/agency/nurses`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setNurses(data || []);
    } catch (error) {
      console.error('Error fetching nurses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('agencyToken');
      const response = await fetch(`${API_BASE_URL}/api/agency/bookings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchStats = async () => {
    // Mock stats for now - implement actual API call
    setStats({
      totalNurses: 12,
      activeBookings: 8,
      totalEarnings: 45000,
      averageRating: 4.7
    });
  };

  const handleBookingAction = async (bookingId, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        fetchBookings();
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        successDiv.textContent = `Booking ${status} successfully!`;
        document.body.appendChild(successDiv);
        setTimeout(() => successDiv.remove(), 3000);
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleDeleteNurse = async (nurseId) => {
    if (!confirm('Are you sure you want to delete this nurse?')) return;
    
    try {
      const token = localStorage.getItem('agencyToken');
      const response = await fetch(`${API_BASE_URL}/api/agency/nurses/${nurseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setNurses(nurses.filter(nurse => nurse._id !== nurseId));
        alert('Nurse deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting nurse:', error);
      alert('Failed to delete nurse');
    }
  };

  const filteredNurses = nurses.filter(nurse =>
    nurse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nurse.specializations.some(spec => 
      spec.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Agency Dashboard</h1>
              <p className="text-gray-600">Manage your nurses and bookings</p>
            </div>
            <motion.button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5" />
              Add Nurse
            </motion.button>
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
                <p className="text-sm text-gray-600">Total Nurses</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalNurses}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
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
                <p className="text-sm text-gray-600">Active Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeBookings}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
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
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-3xl font-bold text-gray-900">₹{stats.totalEarnings.toLocaleString()}</p>
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
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-3xl font-bold text-gray-900">{stats.averageRating}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('nurses')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'nurses'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Nurses ({nurses.length})
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Bookings ({bookings.filter(b => b.status === 'pending').length} pending)
              </button>
            </nav>
          </div>
          
          {activeTab === 'nurses' && (
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search nurses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Filter className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'nurses' ? (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Nurses ({filteredNurses.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading nurses...</p>
            </div>
          ) : filteredNurses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nurse
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Specializations
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredNurses.map((nurse) => (
                    <motion.tr
                      key={nurse._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={nurse.profile_image || '/images/default-nurse.jpg'}
                            alt={nurse.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{nurse.name}</div>
                            <div className="text-sm text-gray-500">{nurse.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {nurse.specializations.slice(0, 2).map((spec, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                            >
                              {spec}
                            </span>
                          ))}
                          {nurse.specializations.length > 2 && (
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                              +{nurse.specializations.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {nurse.experience_years} years
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{nurse.hourly_rate}/hr
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-900">{nurse.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          nurse.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {nurse.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingNurse(nurse)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteNurse(nurse._id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No nurses found</h3>
              <p className="text-gray-600 mb-4">Start by adding your first nurse to the platform</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Nurse
              </button>
            </div>
          )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Booking Requests ({bookings.length})
              </h2>
            </div>
            
            {bookings.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <div key={booking._id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-3 h-3 rounded-full ${
                            booking.status === 'pending' ? 'bg-yellow-400' :
                            booking.status === 'confirmed' ? 'bg-green-400' : 'bg-red-400'
                          }`} />
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking.service_type === 'hybrid' ? 'Hybrid Teleconsultancy' : 'Home Nursing'}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Patient: {booking.patient_details?.name}</p>
                            <p className="text-sm text-gray-600">Phone: {booking.patient_details?.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Date: {new Date(booking.appointment_details?.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600">Time: {booking.appointment_details?.time_slot}</p>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4">
                          Address: {booking.appointment_details?.address}
                        </p>
                        
                        <div className="text-lg font-semibold text-blue-600">
                          Total: ₹{booking.pricing?.total_amount}
                        </div>
                      </div>
                      
                      {booking.status === 'pending' && (
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleBookingAction(booking._id, 'confirmed')}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleBookingAction(booking._id, 'cancelled')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600">Booking requests will appear here</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Nurse Modal */}
      <AddNurseModal
        isOpen={showAddModal || !!editingNurse}
        onClose={() => {
          setShowAddModal(false);
          setEditingNurse(null);
        }}
        nurse={editingNurse}
        onSuccess={() => {
          fetchNurses();
          setShowAddModal(false);
          setEditingNurse(null);
        }}
      />
    </div>
  );
};

// Add Nurse Modal Component
const AddNurseModal = ({ isOpen, onClose, nurse, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    license_number: '',
    specializations: ['General Nursing'],
    experience_years: 1,
    hourly_rate: 500,
    bio: 'Experienced healthcare professional',
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      zipcode: '400001'
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      hours: {
        start: '09:00',
        end: '17:00'
      }
    },
    status: 'active',
    is_verified: true,
    rating: 4.5,
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";

  useEffect(() => {
    if (nurse) {
      setFormData(nurse);
    }
  }, [nurse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone || !formData.license_number || 
          !formData.location.city || !formData.location.state || !formData.location.zipcode || !formData.password) {
        throw new Error('Please fill in all required fields including password');
      }
      
      // Validate password length
      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
      
      // Validate phone number format
      if (!/^[0-9]{10}$/.test(formData.phone)) {
        throw new Error('Phone number must be exactly 10 digits');
      }
      
      const token = localStorage.getItem('agencyToken');
      if (!token) {
        throw new Error('Please login again');
      }
      
      const url = nurse 
        ? `${API_BASE_URL}/api/agency/nurses/${nurse._id}`
        : `${API_BASE_URL}/api/agency/nurses`;
      
      console.log('Submitting nurse data:', formData);
      
      const response = await fetch(url, {
        method: nurse ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (response.ok) {
        // Show success notification
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        successDiv.textContent = nurse ? 'Nurse updated successfully!' : 'Nurse added successfully!';
        document.body.appendChild(successDiv);
        setTimeout(() => successDiv.remove(), 3000);
        
        onSuccess();
      } else {
        throw new Error(result.message || 'Failed to save nurse');
      }
    } catch (error) {
      console.error('Error saving nurse:', error);
      
      // Show error notification
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      errorDiv.textContent = error.message || 'Failed to save nurse';
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {nurse ? 'Edit Nurse' : 'Add New Nurse'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone (10 digits) *</label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                maxLength="10"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                  setFormData(prev => ({ ...prev, phone: value }));
                }}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="1234567890"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">License Number *</label>
              <input
                type="text"
                required
                value={formData.license_number}
                onChange={(e) => setFormData(prev => ({ ...prev, license_number: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years) *</label>
              <input
                type="number"
                required
                min="0"
                max="50"
                value={formData.experience_years}
                onChange={(e) => setFormData(prev => ({ ...prev, experience_years: parseInt(e.target.value) || 0 }))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (₹) *</label>
              <input
                type="number"
                required
                min="100"
                max="10000"
                value={formData.hourly_rate}
                onChange={(e) => setFormData(prev => ({ ...prev, hourly_rate: parseInt(e.target.value) || 0 }))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Login Password *</label>
              <input
                type="password"
                required
                minLength="6"
                value={formData.password || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Password for nurse login"
              />
              <p className="text-xs text-gray-500 mt-1">This password will be used by the nurse to login</p>
            </div>
          </div>

          {/* Location Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  required
                  value={formData.location.city}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    location: { ...prev.location, city: e.target.value }
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                <input
                  type="text"
                  required
                  value={formData.location.state}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    location: { ...prev.location, state: e.target.value }
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zipcode *</label>
                <input
                  type="text"
                  required
                  value={formData.location.zipcode}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    location: { ...prev.location, zipcode: e.target.value }
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              maxLength="500"
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description about the nurse..."
            />
            <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/500 characters</p>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {nurse ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                nurse ? 'Update Nurse' : 'Add Nurse'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgencyDashboard;
