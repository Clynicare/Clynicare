"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Calendar, User, Phone, Clock, FileText, CheckCircle, XCircle, AlertCircle, Activity, DollarSign, Stethoscope, LogOut, MessageCircle, Download, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DoctorDashboard = () => {
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [activeConsultation, setActiveConsultation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [consultationNotes, setConsultationNotes] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('doctorToken');
    const info = localStorage.getItem('doctorInfo');
    
    if (!token || !info) {
      router.push('/DoctorLogin');
      return;
    }
    
    setDoctorInfo(JSON.parse(info));
    fetchConsultations();
  }, [router]);

  const fetchConsultations = () => {
    // Mock data for doctor consultations
    const mockConsultations = [
      {
        id: '1',
        status: 'pending',
        patient: { name: 'John Doe', age: 45, gender: 'Male' },
        nurse: { name: 'Sarah Johnson', phone: '+91 9876543210' },
        appointment: { date: '2024-12-15', time: '2:30 PM' },
        complaint: 'Chest pain, shortness of breath',
        vitals: { bp: '140/90', hr: '85', temp: '98.6', o2sat: '96' },
        medicalHistory: 'Hypertension, Diabetes',
        fee: 800
      },
      {
        id: '2',
        status: 'confirmed',
        patient: { name: 'Mary Smith', age: 65, gender: 'Female' },
        nurse: { name: 'Priya Sharma', phone: '+91 9876543211' },
        appointment: { date: '2024-12-15', time: '4:00 PM' },
        complaint: 'Post-surgery cardiac checkup',
        vitals: { bp: '120/80', hr: '72', temp: '98.2', o2sat: '98' },
        medicalHistory: 'Recent cardiac surgery',
        fee: 800
      }
    ];
    setConsultations(mockConsultations);
    setLoading(false);
  };

  const handleConsultationAction = (consultationId, action) => {
    setConsultations(prev => prev.map(consultation => 
      consultation.id === consultationId 
        ? { ...consultation, status: action === 'accept' ? 'confirmed' : 'cancelled' }
        : consultation
    ));
    
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successDiv.textContent = `Consultation ${action}ed successfully!`;
    document.body.appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 3000);
  };

  const startVideoCall = (consultation) => {
    setActiveConsultation(consultation);
  };

  const endVideoCall = () => {
    setActiveConsultation(null);
    setConsultationNotes('');
    setDiagnosis('');
    setPrescription('');
  };

  const saveConsultationNotes = () => {
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successDiv.textContent = 'Consultation notes saved successfully!';
    document.body.appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('doctorToken');
    localStorage.removeItem('doctorInfo');
    router.push('/DoctorLogin');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'completed': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
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

  // Video Consultation Interface
  if (activeConsultation) {
    return (
      <div className="min-h-screen bg-gray-900">
        {/* Video Call Header */}
        <div className="bg-gray-800 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Live Consultation</h1>
              <p className="text-gray-300">{activeConsultation.patient.name} | Duration: 15:30</p>
            </div>
            <button
              onClick={endVideoCall}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              End Call
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 h-[calc(100vh-80px)]">
          {/* Video Interface */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-2xl p-6 h-full">
              <div className="grid grid-cols-2 gap-4 h-3/4">
                <div className="bg-gray-700 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <User className="w-16 h-16 mx-auto mb-2" />
                    <p>Patient</p>
                    <p className="text-sm text-gray-300">(via nurse camera)</p>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <Stethoscope className="w-16 h-16 mx-auto mb-2" />
                    <p>Nurse</p>
                    <p className="text-sm text-gray-300">{activeConsultation.nurse.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-4 mt-6">
                <button className="bg-gray-600 hover:bg-gray-500 p-3 rounded-full">
                  <MessageCircle className="w-6 h-6 text-white" />
                </button>
                <button className="bg-gray-600 hover:bg-gray-500 p-3 rounded-full">
                  <Video className="w-6 h-6 text-white" />
                </button>
                <button className="bg-gray-600 hover:bg-gray-500 p-3 rounded-full">
                  <FileText className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Patient Info & Notes */}
          <div className="space-y-6">
            {/* Patient Information */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Patient Information</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {activeConsultation.patient.name}</p>
                <p><strong>Age:</strong> {activeConsultation.patient.age} | {activeConsultation.patient.gender}</p>
                <p><strong>Chief Complaint:</strong> {activeConsultation.complaint}</p>
                <p><strong>Medical History:</strong> {activeConsultation.medicalHistory}</p>
              </div>
            </div>

            {/* Real-time Vitals */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Real-time Vitals</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600">BP</p>
                  <p className="font-semibold">{activeConsultation.vitals.bp} mmHg</p>
                </div>
                <div>
                  <p className="text-gray-600">HR</p>
                  <p className="font-semibold">{activeConsultation.vitals.hr} bpm</p>
                </div>
                <div>
                  <p className="text-gray-600">Temp</p>
                  <p className="font-semibold">{activeConsultation.vitals.temp}°F</p>
                </div>
                <div>
                  <p className="text-gray-600">O2 Sat</p>
                  <p className="font-semibold">{activeConsultation.vitals.o2sat}%</p>
                </div>
              </div>
              <button className="mt-3 text-blue-600 text-sm hover:text-blue-700">
                Refresh Vitals
              </button>
            </div>

            {/* Consultation Notes */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Consultation Notes</h3>
              <textarea
                value={consultationNotes}
                onChange={(e) => setConsultationNotes(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                rows="4"
                placeholder="Enter consultation notes..."
              />
              
              <h4 className="font-semibold text-gray-900 mt-4 mb-2">Diagnosis & Treatment</h4>
              <textarea
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                rows="3"
                placeholder="Enter diagnosis and treatment plan..."
              />
              
              <h4 className="font-semibold text-gray-900 mt-4 mb-2">Prescription</h4>
              <textarea
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                rows="3"
                placeholder="Enter prescription details..."
              />
              
              <div className="flex gap-2 mt-4">
                <button
                  onClick={saveConsultationNotes}
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Notes
                </button>
                <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Send Prescription
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Doctor Portal</h1>
                <p className="text-gray-600">Welcome back, {doctorInfo?.name}!</p>
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
                <p className="text-sm text-gray-600">Today's Consultations</p>
                <p className="text-3xl font-bold text-gray-900">5</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Video className="w-6 h-6 text-blue-600" />
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
                <p className="text-3xl font-bold text-gray-900">28</p>
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
                <p className="text-3xl font-bold text-gray-900">₹22,400</p>
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
                <p className="text-3xl font-bold text-gray-900">4.9★</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Consultation Requests */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Consultation Requests ({consultations.length})
            </h2>
          </div>

          {consultations.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {consultations.map((consultation) => (
                <motion.div
                  key={consultation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {consultation.appointment.time} | Hybrid Consultation
                          </h3>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(consultation.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(consultation.status)}`}>
                              {consultation.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <User className="w-4 h-4" />
                            <span>{consultation.patient.name} ({consultation.patient.age}, {consultation.patient.gender})</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Stethoscope className="w-4 h-4" />
                            <span>Nurse: {consultation.nurse.name}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{consultation.appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{consultation.appointment.time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-700">
                          <strong>Chief Complaint:</strong> {consultation.complaint}
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          <strong>Medical History:</strong> {consultation.medicalHistory}
                        </p>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm text-blue-700 font-semibold mb-1">Vital Signs:</p>
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          <span>BP: {consultation.vitals.bp}</span>
                          <span>HR: {consultation.vitals.hr}</span>
                          <span>Temp: {consultation.vitals.temp}°F</span>
                          <span>O2: {consultation.vitals.o2sat}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-80">
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                        <div className="text-center mb-3">
                          <div className="text-2xl font-bold text-blue-600">
                            ₹{consultation.fee}
                          </div>
                          <p className="text-sm text-gray-600">Consultation Fee</p>
                        </div>

                        {consultation.status === 'pending' && (
                          <div className="flex gap-2 mb-3">
                            <button
                              onClick={() => handleConsultationAction(consultation.id, 'accept')}
                              className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleConsultationAction(consultation.id, 'reject')}
                              className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                            >
                              Reject
                            </button>
                          </div>
                        )}

                        {consultation.status === 'confirmed' && (
                          <div className="space-y-2">
                            <button
                              onClick={() => startVideoCall(consultation)}
                              className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                            >
                              <Video className="w-4 h-4" />
                              Join Video Call
                            </button>
                            <button className="w-full bg-gray-600 text-white py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                              <FileText className="w-4 h-4" />
                              View History
                            </button>
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
              <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No consultations yet</h3>
              <p className="text-gray-600">New consultation requests will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
