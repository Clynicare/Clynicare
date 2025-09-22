'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Activity, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  UserCheck,
  Building,
  Stethoscope,
  Heart,
  CreditCard,
  FileText,
  Settings,
  BarChart3,
  Shield,
  Database,
  RefreshCw,
  Download,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { 
  bookingAPI, 
  settlementAPI, 
  authAPI,
  apiUtils 
} from '@/lib/api';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalUsers: 0,
      totalBookings: 0,
      totalRevenue: 0,
      activeServices: 0,
      totalNurses: 0,
      totalAgencies: 0,
      totalDoctors: 0,
      completionRate: 0
    },
    recentBookings: [],
    settlements: [],
    users: [],
    agencies: [],
    nurses: [],
    doctors: [],
    systemLogs: [],
    analytics: {}
  });
  const [dateRange, setDateRange] = useState('30'); // Last 30 days
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, [dateRange]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load admin dashboard data
      const [
        bookingsResponse,
        settlementsResponse,
        usersResponse
      ] = await Promise.all([
        bookingAPI.getAllBookings({ limit: 50 }),
        settlementAPI.getAllSettlements({ limit: 50 }),
        authAPI.getAllUsers()
      ]);

      const bookings = bookingsResponse.data || [];
      const settlements = settlementsResponse.data || [];
      const users = usersResponse.data || [];

      // Calculate statistics
      const totalRevenue = settlements.reduce((sum, s) => sum + (s.total_amount || 0), 0);
      const completedBookings = bookings.filter(b => b.status === 'completed').length;
      const completionRate = bookings.length > 0 ? (completedBookings / bookings.length) * 100 : 0;

      const nurses = users.filter(u => u.role === 'nurse');
      const agencies = users.filter(u => u.role === 'agency');
      const doctors = users.filter(u => u.role === 'doctor');
      const patients = users.filter(u => u.role === 'patient');

      setDashboardData(prev => ({
        ...prev,
        stats: {
          totalUsers: users.length,
          totalBookings: bookings.length,
          totalRevenue,
          activeServices: bookings.filter(b => ['confirmed', 'in_progress'].includes(b.status)).length,
          totalNurses: nurses.length,
          totalAgencies: agencies.length,
          totalDoctors: doctors.length,
          completionRate: Math.round(completionRate)
        },
        recentBookings: bookings.slice(0, 10),
        settlements: settlements.slice(0, 10),
        users: patients,
        agencies,
        nurses,
        doctors
      }));

    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId, action) => {
    try {
      let response;
      
      switch (action) {
        case 'activate':
          response = await authAPI.updateUserStatus(userId, 'active');
          toast.success('User activated successfully');
          break;
        case 'deactivate':
          response = await authAPI.updateUserStatus(userId, 'inactive');
          toast.success('User deactivated successfully');
          break;
        case 'delete':
          if (confirm('Are you sure you want to delete this user?')) {
            response = await authAPI.deleteUser(userId);
            toast.success('User deleted successfully');
          }
          break;
        default:
          return;
      }
      
      // Reload data after action
      loadDashboardData();
      
    } catch (error) {
      console.error(`Failed to ${action} user:`, error);
      toast.error(`Failed to ${action} user`);
    }
  };

  const exportData = (type) => {
    try {
      let data = [];
      let filename = '';
      
      switch (type) {
        case 'bookings':
          data = dashboardData.recentBookings;
          filename = 'bookings_export.json';
          break;
        case 'settlements':
          data = dashboardData.settlements;
          filename = 'settlements_export.json';
          break;
        case 'users':
          data = dashboardData.users;
          filename = 'users_export.json';
          break;
        default:
          return;
      }
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      
      toast.success(`${type} data exported successfully`);
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Export failed');
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
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Users</p>
            <p className="text-2xl font-semibold text-gray-900">
              {dashboardData.stats.totalUsers}
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
            <Calendar className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Bookings</p>
            <p className="text-2xl font-semibold text-gray-900">
              {dashboardData.stats.totalBookings}
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
            <DollarSign className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="text-2xl font-semibold text-gray-900">
              ₹{dashboardData.stats.totalRevenue.toLocaleString()}
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
            <TrendingUp className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Completion Rate</p>
            <p className="text-2xl font-semibold text-gray-900">
              {dashboardData.stats.completionRate}%
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const UserTypeStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center">
          <div className="bg-red-100 p-3 rounded-full">
            <Heart className="h-6 w-6 text-red-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Nurses</p>
            <p className="text-2xl font-semibold text-gray-900">
              {dashboardData.stats.totalNurses}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center">
          <div className="bg-indigo-100 p-3 rounded-full">
            <Building className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Agencies</p>
            <p className="text-2xl font-semibold text-gray-900">
              {dashboardData.stats.totalAgencies}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center">
          <div className="bg-teal-100 p-3 rounded-full">
            <Stethoscope className="h-6 w-6 text-teal-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Doctors</p>
            <p className="text-2xl font-semibold text-gray-900">
              {dashboardData.stats.totalDoctors}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center">
          <div className="bg-orange-100 p-3 rounded-full">
            <Activity className="h-6 w-6 text-orange-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Active Services</p>
            <p className="text-2xl font-semibold text-gray-900">
              {dashboardData.stats.activeServices}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const RecentBookings = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
        <button
          onClick={() => exportData('bookings')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nurse
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dashboardData.recentBookings.map((booking, index) => (
              <tr key={booking.booking_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {booking.patient_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {booking.service_type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {booking.nurse_name || 'Unassigned'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {booking.appointment_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  ₹{booking.total_amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    booking.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : booking.status === 'confirmed'
                      ? 'bg-blue-100 text-blue-800'
                      : booking.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const UserManagement = () => {
    const [userType, setUserType] = useState('patients');
    
    const getCurrentUsers = () => {
      switch (userType) {
        case 'nurses': return dashboardData.nurses;
        case 'agencies': return dashboardData.agencies;
        case 'doctors': return dashboardData.doctors;
        default: return dashboardData.users;
      }
    };

    const filteredUsers = getCurrentUsers().filter(user =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="patients">Patients</option>
              <option value="nurses">Nurses</option>
              <option value="agencies">Agencies</option>
              <option value="doctors">Doctors</option>
            </select>
            <button
              onClick={() => exportData('users')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <tr key={user.user_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status || 'active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => window.open(`/user/${user.user_id}`, '_blank')}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleUserAction(user.user_id, user.status === 'active' ? 'deactivate' : 'activate')}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleUserAction(user.user_id, 'delete')}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const SettlementOverview = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Settlements</h3>
        <button
          onClick={() => exportData('settlements')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>

      <div className="space-y-4">
        {dashboardData.settlements.map((settlement, index) => (
          <div key={settlement.settlement_id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Settlement #{settlement.settlement_id}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {new Date(settlement.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-gray-900">₹{settlement.total_amount}</p>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>Agency: ₹{settlement.agency_share}</div>
                  <div>Platform: ₹{settlement.platform_fee}</div>
                  {settlement.doctor_share > 0 && (
                    <div>Doctor: ₹{settlement.doctor_share}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <DashboardStats />
            <UserTypeStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecentBookings />
              <SettlementOverview />
            </div>
          </div>
        );
      case 'users':
        return <UserManagement />;
      case 'bookings':
        return <RecentBookings />;
      case 'settlements':
        return <SettlementOverview />;
      case 'analytics':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Analytics Dashboard</h3>
            <p className="text-gray-600">Advanced analytics coming soon...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">System overview and management</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
            
            <button
              onClick={loadDashboardData}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              { key: 'overview', label: 'Overview', icon: BarChart3 },
              { key: 'users', label: 'Users', icon: Users },
              { key: 'bookings', label: 'Bookings', icon: Calendar },
              { key: 'settlements', label: 'Settlements', icon: CreditCard },
              { key: 'analytics', label: 'Analytics', icon: TrendingUp }
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

export default AdminDashboard;
