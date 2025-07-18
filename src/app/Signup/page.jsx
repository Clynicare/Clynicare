"use client";

import React, { useState } from 'react';
import { Heart, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/user`, formData);
      if (response.status === 201) {
        alert(`User ${formData.name} successfully created`);
        router.push('/Login');
      }
    } catch (error) {
      console.error("Error during login or registration", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-center mb-8">
          <h1 className="font-bold text-gray-800 bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text font-bebas text-6xl">
            CLYNICARE
          </h1>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-8">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2 text-[#4DA1A9]" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 mr-2 text-[#4DA1A9]" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Lock className="w-4 h-4 mr-2 text-[#4DA1A9]" />
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 mr-2 text-blue-500" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/Login')}
            className="text-blue-600 hover:text-blue-700 font-medium transition-all"
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
