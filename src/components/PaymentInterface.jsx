'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Wallet, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Receipt,
  Download,
  RefreshCw
} from 'lucide-react';
import { paymentAPI, apiUtils } from '@/lib/api';
import { toast } from 'sonner';

// Razorpay script loader
const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const PaymentInterface = ({ 
  bookingData, 
  paymentType = 'booking',
  onPaymentSuccess,
  onPaymentFailure 
}) => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, processing, success, failed
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [settlementInfo, setSettlementInfo] = useState(null);

  useEffect(() => {
    initializeRazorpay();
  }, []);

  const initializeRazorpay = async () => {
    const loaded = await loadRazorpay();
    setRazorpayLoaded(loaded);
    
    if (!loaded) {
      toast.error('Failed to load payment gateway');
    }
  };

  const createPaymentOrder = async () => {
    try {
      setLoading(true);
      
      const orderData = {
        booking_id: bookingData.booking_id,
        amount: bookingData.total_amount,
        payment_type: paymentType
      };
      
      const response = await paymentAPI.createPaymentOrder(orderData);
      return response.data;
    } catch (error) {
      console.error('Failed to create payment order:', error);
      throw new Error(apiUtils.handleAPIError(error));
    } finally {
      setLoading(false);
    }
  };

  const processPayment = async () => {
    if (!razorpayLoaded) {
      toast.error('Payment gateway not loaded. Please refresh and try again.');
      return;
    }

    try {
      setLoading(true);
      setPaymentStatus('processing');
      
      // Create payment order
      const orderData = await createPaymentOrder();
      
      // Configure Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_key',
        amount: orderData.order.amount * 100, // Convert to paise
        currency: 'INR',
        name: 'Clynicare',
        description: `Payment for ${paymentType}`,
        order_id: orderData.razorpay_order_id,
        handler: async function (response) {
          await verifyPayment(response);
        },
        prefill: {
          name: bookingData.patient_name,
          email: bookingData.patient_email,
          contact: bookingData.patient_phone
        },
        theme: {
          color: '#3B82F6'
        },
        modal: {
          ondismiss: function() {
            setPaymentStatus('pending');
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Payment processing failed:', error);
      setPaymentStatus('failed');
      setLoading(false);
      toast.error(error.message);
      onPaymentFailure?.(error);
    }
  };

  const verifyPayment = async (razorpayResponse) => {
    try {
      const verificationData = {
        razorpay_order_id: razorpayResponse.razorpay_order_id,
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_signature: razorpayResponse.razorpay_signature
      };
      
      const response = await paymentAPI.verifyPayment(verificationData);
      
      if (response.data.payment) {
        setPaymentStatus('success');
        setPaymentDetails(response.data.payment);
        setSettlementInfo(response.data.settlement);
        toast.success('Payment successful!');
        onPaymentSuccess?.(response.data);
      } else {
        throw new Error('Payment verification failed');
      }
      
    } catch (error) {
      console.error('Payment verification failed:', error);
      setPaymentStatus('failed');
      toast.error('Payment verification failed');
      onPaymentFailure?.(error);
    } finally {
      setLoading(false);
    }
  };

  const processRefund = async () => {
    if (!paymentDetails) return;
    
    try {
      setLoading(true);
      
      const refundData = {
        payment_id: paymentDetails.payment_id,
        amount: paymentDetails.amount,
        reason: 'Service cancellation'
      };
      
      const response = await paymentAPI.processRefund(refundData);
      
      toast.success('Refund processed successfully');
      setPaymentStatus('refunded');
      
    } catch (error) {
      console.error('Refund processing failed:', error);
      toast.error('Failed to process refund');
    } finally {
      setLoading(false);
    }
  };

  const downloadReceipt = () => {
    if (paymentDetails?.receipt_url) {
      window.open(paymentDetails.receipt_url, '_blank');
    }
  };

  const PaymentSummary = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Service Type</span>
          <span className="font-medium">{bookingData.service_type}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Patient Name</span>
          <span className="font-medium">{bookingData.patient_name}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Scheduled Date</span>
          <span className="font-medium">{bookingData.appointment_date}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Time Slot</span>
          <span className="font-medium">{bookingData.appointment_time}</span>
        </div>
        
        <hr className="my-4" />
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Nurse Fee</span>
            <span>₹{bookingData.nurse_fee}</span>
          </div>
          
          {bookingData.doctor_fee > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Doctor Consultation</span>
              <span>₹{bookingData.doctor_fee}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Platform Fee</span>
            <span>₹{bookingData.platform_fee}</span>
          </div>
          
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total Amount</span>
            <span className="text-blue-600">₹{bookingData.total_amount}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const PaymentStatusDisplay = () => {
    switch (paymentStatus) {
      case 'pending':
        return (
          <div className="text-center">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Pending</h3>
            <p className="text-gray-600 mb-6">Ready to process your payment</p>
          </div>
        );
        
      case 'processing':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Processing Payment</h3>
            <p className="text-gray-600 mb-6">Please do not refresh or close this window</p>
          </div>
        );
        
      case 'success':
        return (
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-6">Your payment has been processed successfully</p>
            
            {paymentDetails && (
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Payment ID:</span>
                    <span className="font-mono">{paymentDetails.payment_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transaction Date:</span>
                    <span>{new Date(paymentDetails.created_at).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount Paid:</span>
                    <span className="font-semibold">₹{paymentDetails.amount}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'failed':
        return (
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Failed</h3>
            <p className="text-gray-600 mb-6">There was an issue processing your payment</p>
          </div>
        );
        
      default:
        return null;
    }
  };

  const SettlementBreakdown = () => {
    if (!settlementInfo) return null;
    
    return (
      <div className="bg-blue-50 rounded-lg p-4 mt-4">
        <h4 className="font-medium text-blue-900 mb-3">Settlement Breakdown</h4>
        <div className="text-sm space-y-2 text-blue-800">
          <div className="flex justify-between">
            <span>Agency Share (60%):</span>
            <span>₹{settlementInfo.agency_share}</span>
          </div>
          {settlementInfo.doctor_share > 0 && (
            <div className="flex justify-between">
              <span>Doctor Share (25%):</span>
              <span>₹{settlementInfo.doctor_share}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Platform Fee (15%):</span>
            <span>₹{settlementInfo.platform_fee}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-full">
            <CreditCard className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Secure Payment</h2>
            <p className="text-gray-600">Complete your booking payment</p>
          </div>
        </div>

        <PaymentSummary />
        
        <PaymentStatusDisplay />
        
        {paymentStatus === 'pending' && (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-4">
              <Shield className="h-4 w-4" />
              <span>Secured by SSL encryption</span>
            </div>
            
            <button
              onClick={processPayment}
              disabled={loading || !razorpayLoaded}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <RefreshCw className="h-5 w-5 animate-spin" />
              ) : (
                <Wallet className="h-5 w-5" />
              )}
              <span>
                {loading ? 'Processing...' : `Pay ₹${bookingData.total_amount}`}
              </span>
            </button>
            
            <p className="text-xs text-gray-500 text-center">
              By proceeding, you agree to our terms and conditions
            </p>
          </div>
        )}
        
        {paymentStatus === 'success' && (
          <div className="space-y-4">
            <SettlementBreakdown />
            
            <div className="flex space-x-4">
              <button
                onClick={downloadReceipt}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Receipt</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/PatientDashboard'}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
        
        {paymentStatus === 'failed' && (
          <div className="space-y-4">
            <button
              onClick={processPayment}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Retry Payment</span>
            </button>
            
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Go Back
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentInterface;
