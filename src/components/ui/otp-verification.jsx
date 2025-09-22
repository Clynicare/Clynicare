"use client";

import React, { useState, useEffect } from 'react';
import { Activity, Mail, ArrowLeft, RefreshCw } from 'lucide-react';

const OTPVerification = ({ 
  email, 
  onVerify, 
  onResend, 
  onBack, 
  isLoading = false, 
  title = "Verify Your Email",
  subtitle = "Enter the 6-digit code sent to your email"
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [canResend, setCanResend] = useState(false);

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
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    if (onVerify) {
      await onVerify(otpString);
    }
  };

  const handleResend = async () => {
    if (canResend && onResend) {
      setTimeLeft(600);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      setError('');
      await onResend();
    }
  };

  const maskedEmail = email ? email.replace(/(.{2})(.*)(@.*)/, '$1***$3') : '';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 relative overflow-hidden w-full py-8">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-gradient-to-r from-white/10 to-blue-900/20 backdrop-blur-sm shadow-2xl p-8 flex flex-col items-center border border-white/20">
        
        {/* Logo */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-6 shadow-lg">
          <Mail className="w-8 h-8 text-white" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-2 text-center">
          {title}
        </h2>
        <p className="text-sm text-gray-300 mb-6 text-center leading-relaxed">
          {subtitle}
        </p>

        {/* Email Display */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-6 w-full">
          <p className="text-center text-gray-300 text-sm">
            Code sent to: <span className="text-white font-medium">{maskedEmail}</span>
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex gap-3 mb-6 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-bold bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />
          ))}
        </div>

        {/* Timer */}
        <div className="text-center mb-4">
          {timeLeft > 0 ? (
            <p className="text-gray-300 text-sm">
              Code expires in: <span className="text-cyan-400 font-medium">{formatTime(timeLeft)}</span>
            </p>
          ) : (
            <p className="text-red-400 text-sm">Code expired! Please request a new one.</p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-sm text-red-400 text-center mb-4 bg-red-500/10 border border-red-500/20 rounded-lg p-2 w-full">
            {error}
          </div>
        )}

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={isLoading || otp.join('').length !== 6}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium py-3 rounded-xl shadow hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Verifying...
            </div>
          ) : (
            'Verify Email'
          )}
        </button>

        {/* Resend Button */}
        <button
          onClick={handleResend}
          disabled={!canResend || isLoading}
          className="text-cyan-400 hover:text-cyan-300 text-sm font-medium disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-200 mb-4"
        >
          {canResend ? 'Resend Code' : `Resend in ${formatTime(timeLeft)}`}
        </button>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Registration
        </button>
      </div>

      {/* Additional Info */}
      <div className="relative z-10 mt-6 text-center max-w-md">
        <p className="text-gray-400 text-xs leading-relaxed">
          Didn't receive the code? Check your spam folder or try a different email address.
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;
