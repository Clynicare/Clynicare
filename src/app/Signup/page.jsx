"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SignUp1 } from '../../components/ui/modern-stunning-sign-up';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';
  const router = useRouter();

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/user`, formData);
      if (response.status === 201) {
        // Show success message and redirect
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        successDiv.textContent = `Welcome ${formData.name}! Account created successfully.`;
        document.body.appendChild(successDiv);
        setTimeout(() => successDiv.remove(), 3000);
        router.push('/Login');
      }
    } catch (error) {
      console.error("Error during registration", error);
      // Show error message
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      errorDiv.textContent = 'Registration failed. Please try again.';
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <SignUp1 
        onSubmit={handleSubmit} 
        isLoading={isLoading}
        title="CLYNICARE"
        subtitle="Join Clynicare for quality healthcare services"
      />
      {/* Navigation link */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <p className="text-gray-400 text-sm text-center leading-relaxed">
          Already have an account?{" "}
          <Link href="/Login" className="text-blue-400 hover:text-blue-300 underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
