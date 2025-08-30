"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Building, CheckCircle, XCircle, Clock, Users, Eye } from 'lucide-react';

const AdminDashboard = () => {
  const [pendingAgencies, setPendingAgencies] = useState([]);
  const [allAgencies, setAllAgencies] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";

  useEffect(() => {
    fetchPendingAgencies();
    fetchAllAgencies();
  }, []);

  const fetchPendingAgencies = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/agencies/pending`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setPendingAgencies(data || []);
    } catch (error) {
      console.error('Error fetching pending agencies:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllAgencies = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/agencies`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setAllAgencies(data.agencies || []);
    } catch (error) {
      console.error('Error fetching all agencies:', error);
    }
  };

  const handleAgencyAction = async (agencyId, status, reason = '') => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/agencies/${agencyId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status, rejection_reason: reason })
      });

      if (response.ok) {
        alert(`Agency ${status === 'active' ? 'approved' : 'rejected'} successfully!`);
        fetchPendingAgencies();
        fetchAllAgencies();
      }
    } catch (error) {
      alert('Error updating agency status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage agency approvals and system oversight</p>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">Clynicare Admin</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approvals</p>
                <p className="text-3xl font-bold text-orange-600">{pendingAgencies.length}</p>
              </div>
              <Clock className="w-12 h-12 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Agencies</p>
                <p className="text-3xl font-bold text-green-600">
                  {allAgencies.filter(a => a.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Agencies</p>
                <p className="text-3xl font-bold text-blue-600">{allAgencies.length}</p>
              </div>
              <Building className="w-12 h-12 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'pending'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500'
                }`}
              >
                Pending Approvals ({pendingAgencies.length})
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'all'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500'
                }`}
              >
                All Agencies ({allAgencies.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading agencies...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeTab === 'pending' ? (
                  pendingAgencies.length > 0 ? (
                    pendingAgencies.map((agency) => (
                      <div key={agency._id} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{agency.name}</h3>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-600">Email: {agency.email}</p>
                                <p className="text-sm text-gray-600">Phone: {agency.phone}</p>
                                <p className="text-sm text-gray-600">License: {agency.license_number}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">
                                  Address: {agency.address.street}, {agency.address.city}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Registered: {new Date(agency.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-4">{agency.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {agency.services_offered?.map((service, idx) => (
                                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => handleAgencyAction(agency._id, 'active')}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                const reason = prompt('Rejection reason:');
                                if (reason) handleAgencyAction(agency._id, 'inactive', reason);
                              }}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                            >
                              <XCircle className="w-4 h-4" />
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending approvals</h3>
                      <p className="text-gray-600">All agencies have been reviewed</p>
                    </div>
                  )
                ) : (
                  <div className="space-y-4">
                    {allAgencies.map((agency) => (
                      <div key={agency._id} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{agency.name}</h3>
                            <p className="text-gray-600">{agency.email}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              agency.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : agency.status === 'pending_verification'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {agency.status}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              agency.is_verified 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {agency.is_verified ? 'Verified' : 'Not Verified'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;