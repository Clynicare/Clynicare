
//this is all done but the login page is not correct as it should be different from the signup
"use client";
import React, { useState } from 'react';
import { Heart, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
function Login() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response =await axios.post('http://localhost:7000/api/user',formData)
    if(response.status ===200){
      alert("the user has been successfully created",formData.name)
      router.push('/Login')
    }
    // Handle form submission
    console.log(formData);
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
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="John Doe"
                  required
                />
              </div>
            

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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>
          

            <button
              type="submit"
              className="w-full bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] hover:[#007BA7] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center group"
            >
              Create Account
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/login')}
              className="text-blue-600 hover:text-blue-700 font-medium transition"
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          
        </div>
      </div>
    </div>
  );
}

export default Login;