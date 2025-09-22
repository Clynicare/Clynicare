"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Mail, Phone, MapPin, FileText, Plus, X, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import DoctorOTPVerification from '../../components/ui/doctor-otp-verification';

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    medical_license: '',
    specialization: '',
    sub_specializations: [''],
    experience_years: '',
    consultation_fee: '',
    education: [''],
    availability: {
      days: [],
      hours: {
        start: '09:00',
        end: '17:00'
      }
    },
    bio: '',
    languages: ['']
  });
  const [step, setStep] = useState(1); // 1: registration form, 2: OTP verification
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const specializations = [
    'General Medicine', 'Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology',
    'Neurology', 'Oncology', 'Orthopedics', 'Pediatrics', 'Psychiatry', 'Pulmonology',
    'Rheumatology', 'Urology', 'Gynecology', 'Ophthalmology', 'ENT', 'Anesthesiology',
    'Emergency Medicine', 'Family Medicine', 'Internal Medicine', 'Surgery'
  ];

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 5000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const doctorData = {
        ...formData,
        sub_specializations: formData.sub_specializations.filter(s => s.trim()),
        education: formData.education.filter(e => e.trim()),
        languages: formData.languages.filter(l => l.trim()),
        experience_years: parseInt(formData.experience_years),
        consultation_fee: parseInt(formData.consultation_fee)
      };

      const response = await fetch(`${API_BASE_URL}/api/doctor/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification('OTP sent to your email! Please check your inbox.', 'success');
        setStep(2);
      } else {
        throw new Error(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      showNotification(error.message || 'Failed to send OTP', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSuccess = () => {
    showNotification('Doctor registration successful! Awaiting admin verification...', 'success');
    setTimeout(() => {
      router.push('/DoctorLogin');
    }, 2000);
  };

  const handleOTPError = (message) => {
    showNotification(message, 'error');
  };

  const addField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateField = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        days: prev.availability.days.includes(day)
          ? prev.availability.days.filter(d => d !== day)
          : [...prev.availability.days, day]
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8"
        >
          {/* Notification */}
          {notification.message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mb-6 p-4 rounded-xl ${
                notification.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              {notification.message}
            </motion.div>
          )}

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Registration</h1>
            <p className="text-gray-600">
              {step === 1 ? "Join Clynicare's network of medical professionals" : "Verify your email to complete registration"}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleFormSubmit} className="space-y-8">
              {/* Basic Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder="Dr. John Smith"
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
                      placeholder="doctor@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder="9876543210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medical License Number *</label>
                    <input
                      type="text"
                      required
                      value={formData.medical_license}
                      onChange={(e) => setFormData(prev => ({ ...prev, medical_license: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder="MED123456789"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Specialization *</label>
                    <select
                      required
                      value={formData.specialization}
                      onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Specialization</option>
                      {specializations.map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="50"
                      value={formData.experience_years}
                      onChange={(e) => setFormData(prev => ({ ...prev, experience_years: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee (₹) *</label>
                    <input
                      type="number"
                      required
                      min="100"
                      value={formData.consultation_fee}
                      onChange={(e) => setFormData(prev => ({ ...prev, consultation_fee: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder="500"
                    />
                  </div>
                </div>
              </div>

              {/* Sub-specializations */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Sub-specializations</h2>
                  <button
                    type="button"
                    onClick={() => addField('sub_specializations')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    Add Subspecialty
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.sub_specializations.map((subspecialty, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={subspecialty}
                        onChange={(e) => updateField('sub_specializations', index, e.target.value)}
                        placeholder="e.g., Interventional Cardiology"
                        className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      />
                      {formData.sub_specializations.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeField('sub_specializations', index)}
                          className="p-3 text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Education</h2>
                  <button
                    type="button"
                    onClick={() => addField('education')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    Add Degree
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.education.map((degree, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={degree}
                        onChange={(e) => updateField('education', index, e.target.value)}
                        placeholder="e.g., MBBS from AIIMS Delhi"
                        className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      />
                      {formData.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeField('education', index)}
                          className="p-3 text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Languages Spoken</h2>
                  <button
                    type="button"
                    onClick={() => addField('languages')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    Add Language
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.languages.map((language, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={language}
                        onChange={(e) => updateField('languages', index, e.target.value)}
                        placeholder="e.g., English, Hindi"
                        className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      />
                      {formData.languages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeField('languages', index)}
                          className="p-3 text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Availability</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Available Days</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {daysOfWeek.map(day => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handleDayToggle(day)}
                          className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                            formData.availability.days.includes(day)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {day.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                      <input
                        type="time"
                        value={formData.availability.hours.start}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          availability: {
                            ...prev.availability,
                            hours: { ...prev.availability.hours, start: e.target.value }
                          }
                        }))}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                      <input
                        type="time"
                        value={formData.availability.hours.end}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          availability: {
                            ...prev.availability,
                            hours: { ...prev.availability.hours, end: e.target.value }
                          }
                        }))}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description about your experience, expertise, and approach to patient care..."
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => router.push('/DoctorLogin')}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                >
                  Back to Login
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50"
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </div>
            </form>
          ) : (
            <DoctorOTPVerification
              email={formData.email}
              userType="doctor"
              onSuccess={handleOTPSuccess}
              onError={handleOTPError}
              onBackToForm={() => setStep(1)}
              API_BASE_URL={API_BASE_URL}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorRegister;
