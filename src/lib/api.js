/**
 * Centralized API Service for Clynicare Frontend
 * Connects to the comprehensive backend system
 */

import axios from 'axios';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';
const API_TIMEOUT = 30000; // 30 seconds

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or unauthorized
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      window.location.href = '/Login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  // User Authentication
  sendUserOTP: (userData) => apiClient.post('/api/user/send-otp', userData),
  verifyUserOTP: (otpData) => apiClient.post('/api/user/verify-otp', otpData),
  resendUserOTP: (email) => apiClient.post('/api/user/resend-otp', { email }),
  userLogin: (credentials) => apiClient.post('/api/login', credentials),
  googleAuth: (googleData) => apiClient.post('/api/auth/google', googleData),
  
  // Agency Authentication
  sendAgencyOTP: (agencyData) => apiClient.post('/api/agency/send-otp', agencyData),
  verifyAgencyOTP: (otpData) => apiClient.post('/api/agency/verify-otp', otpData),
  resendAgencyOTP: (email) => apiClient.post('/api/agency/resend-otp', { email }),
  agencyLogin: (credentials) => apiClient.post('/api/agency/login', credentials),
  
  // Doctor Authentication
  sendDoctorOTP: (doctorData) => apiClient.post('/api/doctor/send-otp', doctorData),
  verifyDoctorOTP: (otpData) => apiClient.post('/api/doctor/verify-otp', otpData),
  resendDoctorOTP: (email) => apiClient.post('/api/doctor/resend-otp', { email }),
  doctorLogin: (credentials) => apiClient.post('/api/doctor/login', credentials),
  setDoctorPassword: (passwordData) => apiClient.post('/api/doctor/set-password', passwordData),
  
  // Nurse Authentication
  nurseLogin: (credentials) => apiClient.post('/api/nurse/login', credentials),
  
  // Admin Authentication
  adminLogin: (credentials) => apiClient.post('/api/admin/login', credentials),
  
  // Token Validation
  validateToken: () => apiClient.post('/api/token-valid'),
};

// Services API
export const servicesAPI = {
  getAllServices: (name) => apiClient.get('/Services', { params: { name } }),
  getServiceById: (id) => apiClient.get(`/Services/${id}`),
};

// Booking API
export const bookingAPI = {
  // Basic Booking
  createBooking: (bookingData) => apiClient.post('/api/bookings', bookingData),
  getUserBookings: () => apiClient.get('/Bookings'),
  getBookingStatus: (bookingId) => apiClient.get(`/api/bookings/${bookingId}/status`),
  
  // Nurse Booking (Enhanced)
  createNurseBooking: (bookingData) => apiClient.post('/api/nurse-bookings', bookingData),
  getUserNurseBookings: () => apiClient.get('/api/nurse-bookings'),
  updateBookingStatus: (bookingId, statusData) => apiClient.put(`/api/bookings/${bookingId}/status`, statusData),
  handoffToDoctor: (bookingId, handoffData) => apiClient.put(`/api/bookings/${bookingId}/handoff-to-doctor`, handoffData),
  completeService: (bookingId, completionData) => apiClient.put(`/api/bookings/${bookingId}/complete`, completionData),
};

// Nurse API
export const nurseAPI = {
  getAllNurses: (filters) => apiClient.get('/api/nurses', { params: filters }),
  getNurseById: (nurseId) => apiClient.get(`/api/nurses/${nurseId}`),
  getNurseBookings: () => apiClient.get('/api/nurse/bookings'),
  confirmBooking: (bookingId, action, data) => apiClient.put(`/api/nurse/bookings/${bookingId}/confirm`, { action, ...data }),
  updateNurseLocation: (locationData) => apiClient.put('/api/nurse/location', locationData),
};

// Doctor API
export const doctorAPI = {
  getAllDoctors: (filters) => apiClient.get('/api/doctors', { params: filters }),
  getDoctorById: (doctorId) => apiClient.get(`/api/doctors/${doctorId}`),
};

// Agency API
export const agencyAPI = {
  // Nurse Management
  addNurse: (nurseData) => apiClient.post('/api/agency/nurses', nurseData),
  getAgencyNurses: () => apiClient.get('/api/agency/nurses'),
  updateNurse: (nurseId, nurseData) => apiClient.put(`/api/agency/nurses/${nurseId}`, nurseData),
  deleteNurse: (nurseId) => apiClient.delete(`/api/agency/nurses/${nurseId}`),
  
  // Booking Management
  getAgencyBookings: () => apiClient.get('/api/agency/bookings'),
  
  // Settlement Management
  getAgencySettlements: (filters) => apiClient.get('/api/settlements/agency', { params: filters }),
};

// Admin API
export const adminAPI = {
  // Agency Management
  getPendingAgencies: () => apiClient.get('/api/admin/agencies/pending'),
  updateAgencyStatus: (agencyId, statusData) => apiClient.put(`/api/admin/agencies/${agencyId}/status`, statusData),
  getAllAgencies: (filters) => apiClient.get('/api/admin/agencies', { params: filters }),
};

// Teleconsultation API
export const teleconsultationAPI = {
  initiateTeleconsultation: (sessionData) => apiClient.post('/api/teleconsultation/initiate', sessionData),
  doctorJoinSession: (sessionId) => apiClient.post(`/api/teleconsultation/${sessionId}/doctor-join`),
  patientJoinSession: (sessionId) => apiClient.post(`/api/teleconsultation/${sessionId}/patient-join`),
  endSession: (sessionId, sessionData) => apiClient.post(`/api/teleconsultation/${sessionId}/end`, sessionData),
  getSessionDetails: (sessionId) => apiClient.get(`/api/teleconsultation/${sessionId}`),
};

// Prescription API
export const prescriptionAPI = {
  generatePrescription: (prescriptionData) => apiClient.post('/api/prescriptions/generate', prescriptionData),
  getPrescriptionById: (prescriptionId) => apiClient.get(`/api/prescriptions/${prescriptionId}`),
  getUserPrescriptions: () => apiClient.get('/api/prescriptions'),
};

// Payment API
export const paymentAPI = {
  createPaymentOrder: (paymentData) => apiClient.post('/api/payments/create-order', paymentData),
  verifyPayment: (verificationData) => apiClient.post('/api/payments/verify', verificationData),
  processRefund: (refundData) => apiClient.post('/api/payments/refund', refundData),
};

// Settlement API
export const settlementAPI = {
  getAgencySettlements: (filters) => apiClient.get('/api/settlements/agency', { params: filters }),
  getDoctorSettlements: (filters) => apiClient.get('/api/settlements/doctor', { params: filters }),
};

// Notification API
export const notificationAPI = {
  getUserNotifications: (limit) => apiClient.get('/api/notifications', { params: { limit } }),
  sendTestNotification: (notificationData) => apiClient.post('/api/notifications/test', notificationData),
};

// Test API
export const testAPI = {
  sendTestSMS: (phoneData) => apiClient.post('/api/test-sms', phoneData),
};

// Utility functions
export const apiUtils = {
  setAuthToken: (token) => {
    localStorage.setItem('authToken', token);
  },
  
  removeAuthToken: () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
  },
  
  getAuthToken: () => {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  },
  
  isAuthenticated: () => {
    return !!apiUtils.getAuthToken();
  },
  
  handleAPIError: (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
      return error.response.data.message || 'An error occurred';
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
      return 'Network error. Please check your connection.';
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return error.message;
    }
  },
};

// Export default API client for custom requests
export default apiClient;
