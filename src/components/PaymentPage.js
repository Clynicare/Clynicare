/**
 * Example usage of RazorpayCheckout component
 * This demonstrates how to integrate UPI-only payments in your booking/payment pages
 */

import React, { useState } from 'react';
import RazorpayCheckout from './RazorpayCheckout';

const PaymentPage = ({ booking }) => {
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(null);

  // Mock user details (replace with actual user data from context/props)
  const userDetails = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210'
  };

  /**
   * Handle successful payment
   */
  const handlePaymentSuccess = (paymentResponse) => {
    console.log('🎉 Payment successful:', paymentResponse);
    setPaymentStatus('success');
    setPaymentData(paymentResponse);
    setError(null);

    // You can redirect to success page or update UI
    // Example: router.push(`/booking/${booking.id}/success`);
    
    // Show success message
    alert('Payment successful! Booking confirmed.');
  };

  /**
   * Handle payment errors
   */
  const handlePaymentError = (errorResponse) => {
    console.error('❌ Payment error:', errorResponse);
    setPaymentStatus('failed');
    setError(errorResponse.message);
    
    // Show user-friendly error message
    let userMessage = 'Payment failed. Please try again.';
    
    switch (errorResponse.type) {
      case 'verification_failed':
        userMessage = 'Payment verification failed. Please contact support.';
        break;
      case 'payment_failed':
        userMessage = errorResponse.message || 'Payment was declined. Please try again.';
        break;
      case 'initialization_failed':
        userMessage = 'Unable to initialize payment. Please check your connection.';
        break;
    }
    
    alert(userMessage);
  };

  /**
   * Handle payment cancellation
   */
  const handlePaymentCancel = (reason) => {
    console.log('⚠️ Payment cancelled:', reason);
    setPaymentStatus('cancelled');
    setError('Payment was cancelled');
    
    // Optionally show cancellation message
    // alert('Payment was cancelled. You can try again when ready.');
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Complete Payment</h2>
        <p className="text-gray-600">Booking ID: #{booking?.id || 'BOOK123'}</p>
      </div>

      {/* Booking Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Booking Summary</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Service:</span>
            <span className="font-medium">{booking?.service_name || 'Nurse Consultation'}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium">{booking?.duration || '2 hours'}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{booking?.date || '2024-02-15'}</span>
          </div>
          
          <hr className="my-2" />
          
          <div className="flex justify-between text-lg font-bold text-gray-800">
            <span>Total Amount:</span>
            <span>₹{booking?.amount || 1500}</span>
          </div>
        </div>
      </div>

      {/* Payment Status */}
      {paymentStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold">Payment Successful!</p>
              <p className="text-sm">Payment ID: {paymentData?.payment_id}</p>
            </div>
          </div>
        </div>
      )}

      {paymentStatus === 'failed' && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold">Payment Failed</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Razorpay Checkout Component */}
      <RazorpayCheckout
        bookingId={booking?.id || 'BOOK123'}
        amount={booking?.amount || 1500}
        userDetails={userDetails}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        onCancel={handlePaymentCancel}
        buttonText="Pay ₹1500 with UPI"
        disabled={paymentStatus === 'success'}
        className="mb-4"
      />

      {/* Payment Methods Info */}
      <div className="text-center text-xs text-gray-500">
        <p>🔒 100% Secure payments powered by Razorpay</p>
        <p className="mt-1">UPI payments only • No credit/debit cards needed</p>
        <p className="mt-1">Supports all major UPI apps: PhonePe, Google Pay, Paytm, etc.</p>
      </div>

      {/* Terms and Conditions */}
      <div className="mt-6 text-xs text-gray-500 text-center">
        <p>
          By proceeding with payment, you agree to our{' '}
          <a href="/terms" className="text-blue-600 hover:underline">Terms & Conditions</a>
          {' '}and{' '}
          <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;
