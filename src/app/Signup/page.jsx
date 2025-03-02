"use client";
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Heart } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
require('dotenv').config();


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:7000/api/auth/login', formData);
      
      if (response.status === 200) {
        alert("Login successful!");
        router.push('/dashboard'); // Redirect to a dashboard or home page
      }
    } catch (error) {
      alert("Invalid email or password.");
      console.error(error);
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
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-8">
            <Heart className="h-8 w-8 text-[#4DA1A9] mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Clynicare</h1>
          </div>

          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-8">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="you@example.com"
                required
              />
            </div>

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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] hover:bg-[#007BA7] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center group"
            >
              Sign In
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/signup')}
              className="text-blue-600 hover:text-blue-700 font-medium transition"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
