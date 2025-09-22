'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Clock, Calendar, MapPin, User, Phone, Mail, CreditCard, 
  Shield, Check, ChevronRight, ChevronLeft, Banknote, Smartphone,
  Heart, Activity, Pill, AlertCircle, Star, Award, BadgeCheck,
  UserCheck, FileText, DollarSign
} from 'lucide-react';

const NurseBookingModal = ({ 
  isOpen, 
  onClose, 
  nurse, 
  onConfirm,
  selectedService 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: 'male',
    medicalHistory: '',
    currentMedications: '',
    allergies: '',
    appointmentDate: '',
    timeSlot: '',
    address: '',
    specialInstructions: '',
    paymentMethod: '',
    doctorRequired: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData({
        patientName: '',
        age: '',
        gender: 'male',
        medicalHistory: '',
        currentMedications: '',
        allergies: '',
        appointmentDate: '',
        timeSlot: '',
        address: '',
        specialInstructions: '',
        paymentMethod: '',
        doctorRequired: false
      });
      setErrors({});
    }
  }, [isOpen]);

  // Available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM'
  ];

  // Payment methods with your theme colors
  const paymentMethods = [
    {
      id: 'cash',
      name: 'Cash on Service',
      icon: Banknote,
      description: 'Pay when the nurse arrives',
      recommended: true,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: Smartphone,
      description: 'Pay instantly via UPI',
      recommended: false,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'card',
      name: 'Card Payment',
      icon: CreditCard,
      description: 'Secure card payment',
      recommended: false,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  // Calculate pricing
  const calculatePricing = () => {
    const nurseFee = nurse?.pricing?.home_visit || 500;
    const doctorFee = formData.doctorRequired ? 300 : 0;
    const platformFee = 50;
    const total = nurseFee + doctorFee + platformFee;

    return { nurseFee, doctorFee, platformFee, total };
  };

  const pricing = calculatePricing();

  // Step validation
  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.patientName.trim()) newErrors.patientName = 'Patient name is required';
        if (!formData.age || formData.age < 1 || formData.age > 120) newErrors.age = 'Valid age is required';
        break;
      case 2:
        if (!formData.appointmentDate) newErrors.appointmentDate = 'Appointment date is required';
        if (!formData.timeSlot) newErrors.timeSlot = 'Time slot is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        break;
      case 4:
        if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment method is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setLoading(true);
    try {
      const bookingData = {
        nurse_id: nurse._id,
        service_type: selectedService?.type || 'home_nursing',
        patient_details: {
          name: formData.patientName,
          age: formData.age,
          gender: formData.gender,
          medical_history: formData.medicalHistory,
          current_medications: formData.currentMedications,
          allergies: formData.allergies
        },
        appointment_details: {
          date: formData.appointmentDate,
          time_slot: formData.timeSlot,
          address: formData.address,
          special_instructions: formData.specialInstructions
        },
        doctor_id: formData.doctorRequired ? 'required' : '',
        pricing: {
          nurse_fee: pricing.nurseFee,
          doctor_fee: pricing.doctorFee,
          platform_fee: pricing.platformFee,
          total_amount: pricing.total
        },
        payment_method: formData.paymentMethod
      };

      await onConfirm(bookingData);
      setCurrentStep(5);
    } catch (error) {
      console.error('Booking submission error:', error);
      setErrors({ submit: 'Failed to submit booking. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Step content components
  const renderPatientInfo = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserCheck className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Patient Information
        </h3>
        <p className="text-gray-600">Please provide the patient's basic details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.patientName}
            onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
              errors.patientName ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Enter patient's full name"
          />
          {errors.patientName && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.patientName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
              errors.age ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Age"
            min="1"
            max="120"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.age}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
        <div className="grid grid-cols-3 gap-3">
          {['male', 'female', 'other'].map((gender) => (
            <button
              key={gender}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, gender }))}
              className={`px-4 py-3 border-2 rounded-xl transition-all ${
                formData.gender === gender
                  ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
        <textarea
          value={formData.medicalHistory}
          onChange={(e) => setFormData(prev => ({ ...prev, medicalHistory: e.target.value }))}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          rows="3"
          placeholder="Any relevant medical history, conditions, or concerns..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
          <input
            type="text"
            value={formData.currentMedications}
            onChange={(e) => setFormData(prev => ({ ...prev, currentMedications: e.target.value }))}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            placeholder="List current medications"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
          <input
            type="text"
            value={formData.allergies}
            onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            placeholder="Any known allergies"
          />
        </div>
      </div>
    </motion.div>
  );

  const renderAppointmentDetails = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Appointment Details
        </h3>
        <p className="text-gray-600">Choose your preferred date, time, and location</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Appointment Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.appointmentDate}
            onChange={(e) => setFormData(prev => ({ ...prev, appointmentDate: e.target.value }))}
            min={new Date().toISOString().split('T')[0]}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all ${
              errors.appointmentDate ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          {errors.appointmentDate && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.appointmentDate}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Slot <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.timeSlot}
            onChange={(e) => setFormData(prev => ({ ...prev, timeSlot: e.target.value }))}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all ${
              errors.timeSlot ? 'border-red-500' : 'border-gray-200'
            }`}
          >
            <option value="">Select time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          {errors.timeSlot && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.timeSlot}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Service Address <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all ${
            errors.address ? 'border-red-500' : 'border-gray-200'
          }`}
          rows="3"
          placeholder="Enter complete address where the service is required"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.address}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
        <textarea
          value={formData.specialInstructions}
          onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all"
          rows="3"
          placeholder="Any special instructions or requirements for the nurse..."
        />
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-start space-x-3">
          <Heart className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Doctor Consultation Option</h4>
            <p className="text-blue-700 text-sm mb-3">
              Would you like to add a doctor consultation to this appointment for an additional ₹300?
            </p>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.doctorRequired}
                onChange={(e) => setFormData(prev => ({ ...prev, doctorRequired: e.target.checked }))}
                className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-medium text-blue-900">Add Doctor Consultation (+₹300)</span>
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderReview = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
          Review Your Booking
        </h3>
        <p className="text-gray-600">Please review all details before proceeding to payment</p>
      </div>

      {/* Nurse Information */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Selected Nurse</h4>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h5 className="font-semibold text-gray-900">
              {nurse?.personal_info?.full_name || nurse?.name || 'Professional Nurse'}
            </h5>
            <p className="text-gray-600 text-sm">
              {nurse?.professional_info?.specialization || 'Home Nursing Services'}
            </p>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 ml-1">
                {nurse?.rating || '4.8'} • {nurse?.experience || '5+ years experience'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Booking Summary</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Patient:</span>
            <span className="font-medium">{formData.patientName}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Date & Time:</span>
            <span className="font-medium">{formData.appointmentDate} at {formData.timeSlot}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Service:</span>
            <span className="font-medium">{selectedService?.name || 'Home Nursing'}</span>
          </div>
          <div className="flex items-start justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Address:</span>
            <span className="font-medium text-right max-w-xs">{formData.address}</span>
          </div>
          {formData.doctorRequired && (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Doctor Consultation:</span>
              <span className="font-medium text-green-600">Included</span>
            </div>
          )}
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
        <h4 className="font-semibold text-gray-900 mb-4">Cost Breakdown</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Nurse Fee:</span>
            <span className="font-medium">₹{pricing.nurseFee}</span>
          </div>
          {formData.doctorRequired && (
            <div className="flex justify-between">
              <span className="text-gray-600">Doctor Consultation:</span>
              <span className="font-medium">₹{pricing.doctorFee}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Platform Fee:</span>
            <span className="font-medium">₹{pricing.platformFee}</span>
          </div>
          <div className="border-t border-blue-200 pt-3 mt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount:</span>
              <span className="text-blue-600">₹{pricing.total}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderPayment = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <DollarSign className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Choose Payment Method
        </h3>
        <p className="text-gray-600">Select your preferred payment option</p>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => {
          const IconComponent = method.icon;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
              className={`w-full p-6 border-2 rounded-xl transition-all transform hover:scale-105 ${
                formData.paymentMethod === method.id
                  ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{method.name}</h4>
                      {method.recommended && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full font-medium">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{method.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-gray-400" />
                  {formData.paymentMethod === method.id && (
                    <Check className="h-5 w-5 text-blue-600" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {errors.paymentMethod && (
        <p className="text-red-500 text-sm flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {errors.paymentMethod}
        </p>
      )}

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
        <div className="flex items-start space-x-3">
          <Shield className="h-6 w-6 text-green-600 mt-1" />
          <div>
            <h4 className="font-semibold text-green-900">Secure & Protected</h4>
            <p className="text-green-700 text-sm mt-1">
              Your payment information is encrypted and secured. We never store your card details.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-semibold text-blue-900">Total Amount</h4>
            <p className="text-blue-700 text-sm">Including all charges</p>
          </div>
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ₹{pricing.total}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-8"
    >
      <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
        <Check className="h-12 w-12 text-white" />
      </div>
      <div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          Booking Confirmed!
        </h3>
        <p className="text-gray-600 text-lg">
          Your nurse booking has been successfully submitted. You will receive a confirmation shortly.
        </p>
      </div>
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
        <p className="text-green-800 font-medium text-lg">
          {formData.paymentMethod === 'cash' && '💰 Payment will be collected when the nurse arrives.'}
          {formData.paymentMethod === 'upi' && '📱 You will receive a UPI payment link shortly.'}
          {formData.paymentMethod === 'card' && '💳 Redirecting to secure payment gateway...'}
        </p>
      </div>
    </motion.div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderPatientInfo();
      case 2: return renderAppointmentDetails();
      case 3: return renderReview();
      case 4: return renderPayment();
      case 5: return renderSuccess();
      default: return null;
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {[1, 2, 3, 4, 5].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
            step < currentStep 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
              : step === currentStep 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                : 'bg-gray-200 text-gray-500'
          }`}>
            {step < currentStep ? <Check className="h-5 w-5" /> : step}
          </div>
          {step < 5 && (
            <div className={`h-1 w-8 md:w-16 ml-2 rounded-full transition-all ${
              step < currentStep ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-[999]"
        onClick={(e) => {
          if (e.target === e.currentTarget && currentStep !== 5) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Book Nurse Service</h2>
              <p className="text-blue-100 text-sm">Step {currentStep} of 5</p>
            </div>
            {currentStep !== 5 && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-[calc(90vh-200px)] overflow-y-auto">
            {renderStepIndicator()}
            {renderStepContent()}
            
            {errors.submit && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {errors.submit}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {currentStep !== 5 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
                  currentStep === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back</span>
              </button>

              <button
                onClick={currentStep === 4 ? handleSubmit : handleNext}
                disabled={loading}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span className="font-semibold">
                      {currentStep === 4 ? 'Confirm Booking' : 'Next'}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}

          {currentStep === 5 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all font-semibold transform hover:scale-105"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NurseBookingModal;