"use client"

import * as React from "react"
import { useState } from "react";
import { Activity } from 'lucide-react';
import { signIn } from 'next-auth/react';

const SignUp1 = ({ onSubmit, isLoading = false, title = "CLYNICARE", subtitle = "Join Clynicare for quality healthcare services" }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [error, setError] = React.useState("");
 
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[0-9]{10}$/.test(phone);
  };
 
  const handleSignUp = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePhone(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setError("");
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 relative overflow-hidden w-full py-8">
      {/* Centered glass card */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-gradient-to-r from-white/10 to-blue-900/20 backdrop-blur-sm shadow-2xl p-8 flex flex-col items-center border border-white/20 mb-8">
        {/* Logo */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-6 shadow-lg">
          <Activity className="w-6 h-6 text-white" />
        </div>
        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">
          {title}
        </h2>
        <p className="text-sm text-gray-300 mb-6 text-center leading-relaxed">
          {subtitle}
        </p>
        {/* Form */}
        <div className="flex flex-col w-full gap-4">
          <div className="w-full flex flex-col gap-3">
            <input
              placeholder="Full Name"
              type="text"
              value={formData.name}
              className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-white/20"
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <input
              placeholder="Email"
              type="email"
              value={formData.email}
              className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-white/20"
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <input
              placeholder="Phone Number"
              type="tel"
              value={formData.phone}
              className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-white/20"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                handleInputChange('phone', value);
              }}
              maxLength="10"
            />
            <input
              placeholder="Password"
              type="password"
              value={formData.password}
              className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-white/20"
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
            {error && (
              <div className="text-sm text-red-400 text-left">{error}</div>
            )}
          </div>
          <hr className="opacity-10" />
          <div>
            <button
              onClick={handleSignUp}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium px-5 py-3 rounded-full shadow hover:from-blue-700 hover:to-cyan-700 transition mb-3 text-sm disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 px-3 text-gray-300">Or</span>
              </div>
            </div>
            
            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-sm flex items-center justify-center gap-3 border border-gray-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
      {/* User count and avatars */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="text-gray-400 text-sm mb-3 leading-relaxed max-w-xs">
          Join <span className="font-medium text-white">thousands</span> of patients who trust Clynicare for their healthcare needs.
        </p>
        <div className="flex -space-x-2">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#181824] object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#181824] object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#181824] object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#181824] object-cover"
          />
        </div>
      </div>
    </div>
  );
};
 
export { SignUp1 };
