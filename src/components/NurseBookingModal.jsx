"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, User, Phone, Heart, Video, Stethoscope, CreditCard } from 'lucide-react';

const NurseBookingModal = ({ isOpen, onClose, nurse, doctors = [] }) => {
  const [step, setStep] = useState(1);
  const [bookingStatus, setBookingStatus] = useState('idle'); // idle, loading, waiting, confirmed, failed
  const [bookingId, setBookingId] = useState(null);
  const [formData, setFormData] = useState({
    service_type: 'home_nursing',
    patient_details: {
      name: '',
      age: '',
      gender: 'male',
      medical_history: '',
      current_medications: '',
      allergies: ''
    },
    appointment_details: {
      date: '',
      time_slot: '',
      address: '',
      special_instructions: ''
    },
    doctor_id: '',
    pricing: {
      nurse_fee: nurse?.hourly_rate || 0,
      doctor_fee: 0,
      platform_fee: 50,
      total_amount: 0
    }
  });

  const updateFormData = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const calculateTotal = () => {
    const { nurse_fee, doctor_fee, platform_fee } = formData.pricing;
    const total = nurse_fee + doctor_fee + platform_fee;
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        total_amount: total
      }
    }));
  };

  const handleDoctorSelect = (doctorId) => {
    const selectedDoctor = doctors.find(d => d._id === doctorId);
    const doctorFee = selectedDoctor ? selectedDoctor.consultation_fee : 0;
    
    setFormData(prev => ({
      ...prev,
      doctor_id: doctorId,
      service_type: doctorId ? 'hybrid' : 'home_nursing',
      pricing: {
        ...prev.pricing,
        doctor_fee: doctorFee
      }
    }));
  };

  React.useEffect(() => {
    calculateTotal();
  }, [formData.pricing.nurse_fee, formData.pricing.doctor_fee]);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleSubmit = async () => {
    setBookingStatus('loading');
    
    try {
      const token = localStorage.getItem('token');
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';
      
      const response = await fetch(`${API_BASE_URL}/api/nurse-bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nurse_id: nurse._id,
          ...formData
        })
      });

      if (response.ok) {
        const result = await response.json();
        setBookingId(result.booking._id);
        setBookingStatus('waiting');
        setStep(4); // Move to waiting step
      } else {
        setBookingStatus('failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setBookingStatus('failed');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Book {nurse?.name}</h2>
                  <p className="text-blue-100">Professional Nursing Care</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Progress Steps */}
              <div className="flex items-center gap-4 mt-6">
                {[1, 2, 3, 4].map((stepNum) => (
                  <div key={stepNum} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step >= stepNum ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'
                    }`}>
                      {stepNum}
                    </div>
                    {stepNum < 4 && <div className="w-12 h-0.5 bg-blue-400 mx-2" />}
                  </div>
                ))}
              </div>
              
              {/* Step Labels */}
              <div className="flex justify-between text-xs text-blue-100 mt-2">
                <span>Service</span>
                <span>Details</span>
                <span>Payment</span>
                <span>Confirmation</span>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Step 1: Service Type & Doctor Selection */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Your Service</h3>
                  
                  {/* Service Type Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                      className={`p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                        formData.service_type === 'home_nursing' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, service_type: 'home_nursing', doctor_id: '' }))}
                    >
                      <div className="flex items-center gap-3">
                        <Heart className="w-6 h-6 text-blue-600" />
                        <div>
                          <h4 className="font-semibold">Home Nursing Only</h4>
                          <p className="text-sm text-gray-600">Professional nursing care at home</p>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                        formData.service_type === 'hybrid' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, service_type: 'hybrid' }))}
                    >
                      <div className="flex items-center gap-3">
                        <Video className="w-6 h-6 text-purple-600" />
                        <div>
                          <h4 className="font-semibold">Hybrid Care</h4>
                          <p className="text-sm text-gray-600">Nursing + Doctor Teleconsultation</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Selection (if hybrid) */}
                  {formData.service_type === 'hybrid' && (
                    <div>
                      <h4 className="font-semibold mb-3">Select a Doctor for Teleconsultation</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {doctors.slice(0, 4).map((doctor) => (
                          <div
                            key={doctor._id}
                            className={`p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                              formData.doctor_id === doctor._id
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => handleDoctorSelect(doctor._id)}
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={doctor.profile_image || '/images/default-doctor.jpg'}
                                alt={doctor.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <h5 className="font-semibold">{doctor.name}</h5>
                                <p className="text-sm text-gray-600">{doctor.specialization}</p>
                                <p className="text-sm font-medium text-purple-600">₹{doctor.consultation_fee}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all"
                  >
                    Continue to Patient Details
                  </button>
                </motion.div>
              )}

              {/* Step 2: Patient Details */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Patient Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                      <input
                        type="text"
                        value={formData.patient_details.name}
                        onChange={(e) => updateFormData('patient_details', 'name', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter patient name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                      <input
                        type="number"
                        value={formData.patient_details.age}
                        onChange={(e) => updateFormData('patient_details', 'age', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter age"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      <select
                        value={formData.patient_details.gender}
                        onChange={(e) => updateFormData('patient_details', 'gender', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Date</label>
                      <input
                        type="date"
                        value={formData.appointment_details.date}
                        onChange={(e) => updateFormData('appointment_details', 'date', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => updateFormData('appointment_details', 'time_slot', time)}
                          className={`p-2 text-sm rounded-lg border transition-all ${
                            formData.appointment_details.time_slot === time
                              ? 'bg-blue-500 text-white border-blue-500'
                              : 'border-gray-300 hover:border-blue-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      value={formData.appointment_details.address}
                      onChange={(e) => updateFormData('appointment_details', 'address', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                      placeholder="Enter complete address"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all"
                    >
                      Review & Pay
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review & Payment */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Review & Payment</h3>
                  
                  {/* Booking Summary */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-semibold mb-4">Booking Summary</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Nurse: {nurse?.name}</span>
                        <span className="font-medium">₹{formData.pricing.nurse_fee}</span>
                      </div>
                      {formData.doctor_id && (
                        <div className="flex justify-between">
                          <span>Doctor Consultation</span>
                          <span className="font-medium">₹{formData.pricing.doctor_fee}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Platform Fee</span>
                        <span className="font-medium">₹{formData.pricing.platform_fee}</span>
                      </div>
                      <div className="border-t pt-3 flex justify-between text-lg font-bold">
                        <span>Total Amount</span>
                        <span className="text-blue-600">₹{formData.pricing.total_amount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={bookingStatus === 'loading'}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {bookingStatus === 'loading' ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          Confirm Booking
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Booking Confirmation Status */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6 text-center"
                >
                  {bookingStatus === 'waiting' && (
                    <>
                      {/* Rapido-style Loading Animation */}
                      <div className="relative">
                        <div className="w-32 h-32 mx-auto mb-6">
                          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                          <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                          <div className="absolute inset-4 bg-blue-50 rounded-full flex items-center justify-center">
                            <Heart className="w-12 h-12 text-blue-500 animate-pulse" />
                          </div>
                        </div>
                        
                        {/* Animated dots */}
                        <div className="flex justify-center gap-2 mb-6">
                          {[0, 1, 2].map((i) => (
                            <div
                              key={i}
                              className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                              style={{ animationDelay: `${i * 0.2}s` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gray-900">Waiting for Nurse Confirmation</h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                          We've sent your booking request to <strong>{nurse?.name}</strong>. 
                          You'll receive an email and notification once the nurse confirms your appointment.
                        </p>
                        
                        {/* Booking Details Card */}
                        <div className="bg-blue-50 rounded-2xl p-6 max-w-md mx-auto">
                          <div className="space-y-3 text-left">
                            <div className="flex items-center gap-3">
                              <Calendar className="w-5 h-5 text-blue-600" />
                              <span className="text-sm">
                                {formData.appointment_details.date} at {formData.appointment_details.time_slot}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <MapPin className="w-5 h-5 text-blue-600" />
                              <span className="text-sm">{formData.appointment_details.address}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <User className="w-5 h-5 text-blue-600" />
                              <span className="text-sm">{formData.patient_details.name}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Status Messages */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 max-w-md mx-auto">
                          <div className="flex items-center gap-2 text-yellow-800">
                            <Clock className="w-5 h-5" />
                            <span className="font-medium">Typical confirmation time: 5-15 minutes</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>✓ Booking request sent to nurse</p>
                          <p>✓ Email notification sent to you</p>
                          <p className="text-blue-600 font-medium">⏳ Waiting for nurse confirmation...</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 max-w-md mx-auto">
                        <button
                          onClick={onClose}
                          className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
                        >
                          Close
                        </button>
                        <button
                          onClick={() => window.location.href = '/bookings'}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all"
                        >
                          View My Bookings
                        </button>
                      </div>
                    </>
                  )}
                  
                  {bookingStatus === 'failed' && (
                    <>
                      <div className="w-32 h-32 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
                        <X className="w-16 h-16 text-red-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Booking Failed</h3>
                      <p className="text-gray-600">Something went wrong. Please try again.</p>
                      <button
                        onClick={() => {
                          setBookingStatus('idle');
                          setStep(3);
                        }}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg transition-all"
                      >
                        Try Again
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NurseBookingModal;
