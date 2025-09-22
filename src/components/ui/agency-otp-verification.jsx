"use client";

import React, { useState, useEffect } from 'react';
import { Building, Mail, ArrowLeft, RefreshCw, Shield, CheckCircle, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const AgencyOTPVerification = ({ 
  email, 
  userType = "agency",
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
      const nextInput = document.getElementById(`agency-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`agency-otp-${index - 1}`);
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
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Agency Verification Complete!</h3>
          <p className="text-gray-600">Your agency has been successfully registered. Redirecting...</p>
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
          className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <Building className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Agency Email</h2>
        <p className="text-gray-600">
          We've sent a verification code to complete your agency registration
        </p>
      </div>

      {/* Email Display Card */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-4 mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Mail className="w-5 h-5 text-blue-600" />
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
          Enter 6-digit verification code
        </label>
        <div className="flex gap-3 justify-center mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`agency-otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 text-center text-2xl font-bold bg-white border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
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
          <span className="text-sm text-green-600">Secure</span>
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
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Verifying Agency...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              Verify & Complete Registration
            </>
          )}
        </button>

        <button
          onClick={handleResend}
          disabled={!canResend || isLoading}
          className="w-full bg-white border-2 border-gray-300 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 hover:border-blue-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          {canResend ? 'Resend Verification Code' : `Resend available in ${formatTime(timeLeft)}`}
        </button>

        <button
          onClick={onBackToForm}
          className="w-full text-gray-600 hover:text-blue-600 font-medium py-2 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Registration Form
        </button>
      </motion.div>

      {/* Security Notice */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
      >
        <p className="text-xs text-blue-700 text-center">
          🔒 Your agency information is protected with enterprise-grade encryption. 
          This verification ensures the security of your healthcare services platform.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AgencyOTPVerification;
