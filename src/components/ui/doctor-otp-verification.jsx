"use client";

import React, { useState, useEffect } from 'react';
import { Stethoscope, Mail, ArrowLeft, RefreshCw, Shield, CheckCircle, Clock, Send, Award, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const DoctorOTPVerification = ({ 
  email, 
  userType = "doctor",
  onSuccess,
  onError,
  onBackToForm,
  API_BASE_URL = "http://localhost:7000"
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`doctor-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`doctor-otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/${userType}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otpString
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        throw new Error(data.message || 'Invalid OTP');
      }
    } catch (error) {
      setError(error.message || 'Verification failed');
      onError(error.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/${userType}/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setTimeLeft(600);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        setError('');
      } else {
        throw new Error('Failed to resend OTP');
      }
    } catch (error) {
      setError(error.message || 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const maskedEmail = email ? email.replace(/(.{2})(.*)(@.*)/, '$1***$3') : '';

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center space-y-6"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Medical Verification Complete!</h3>
          <p className="text-gray-600">Your medical credentials have been verified. Awaiting admin approval...</p>
        </div>
        <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
          <UserCheck className="w-5 h-5" />
          <span className="text-sm font-medium">Professional Account Created</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      {/* Header Section */}
      <div className="text-center mb-8">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <Stethoscope className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Medical License Verification</h2>
        <p className="text-gray-600">
          Verify your professional email to complete your medical practitioner registration
        </p>
      </div>

      {/* Professional Badge */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-4 mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Medical Professional</h3>
            <p className="text-blue-100 text-sm">Secure credential verification process</p>
          </div>
        </div>
      </motion.div>

      {/* Email Display Card */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-4 mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Mail className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Verification code sent to:</p>
            <p className="font-semibold text-gray-900">{maskedEmail}</p>
          </div>
        </div>
      </motion.div>

      {/* OTP Input Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
          Enter 6-digit medical verification code
        </label>
        <div className="flex gap-3 justify-center mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`doctor-otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 text-center text-2xl font-bold bg-white border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            />
          ))}
        </div>
      </motion.div>

      {/* Timer and Security Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {timeLeft > 0 ? `Expires in ${formatTime(timeLeft)}` : 'Code expired'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600">Medical Grade Security</span>
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-3 mb-4 text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-3"
      >
        <button
          onClick={handleVerify}
          disabled={isLoading || otp.join('').length !== 6}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Verifying Medical Credentials...
            </>
          ) : (
            <>
              <Stethoscope className="w-5 h-5" />
              Verify Medical License
            </>
          )}
        </button>

        <button
          onClick={handleResend}
          disabled={!canResend || isLoading}
          className="w-full bg-white border-2 border-gray-300 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 hover:border-purple-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          {canResend ? 'Resend Verification Code' : `Resend available in ${formatTime(timeLeft)}`}
        </button>

        <button
          onClick={onBackToForm}
          className="w-full text-gray-600 hover:text-purple-600 font-medium py-2 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Medical Registration
        </button>
      </motion.div>

      {/* Medical Security Notice */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Shield className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-purple-900 mb-1">Medical Data Protection</h4>
            <p className="text-xs text-purple-700">
              Your medical credentials and patient data are protected under healthcare privacy regulations. 
              This verification ensures compliance with medical licensing requirements.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Admin Approval Notice */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl"
      >
        <p className="text-xs text-blue-700 text-center">
          ℹ️ After verification, your medical license will be reviewed by our medical board for final approval.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default DoctorOTPVerification;
