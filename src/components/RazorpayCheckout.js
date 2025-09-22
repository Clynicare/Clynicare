/**
 * Razorpay UPI-Only Checkout Component for Clynicare
 * Features: UPI-only payments, custom theme, signature verification
 */

import { useState, useEffect } from 'react';

const RazorpayCheckout = ({ 
  bookingId, 
  amount, 
  userDetails, 
  onSuccess, 
  onError, 
  onCancel,
  buttonText = "Pay with UPI",
  className = "",
  disabled = false 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Load Razorpay script dynamically
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          setRazorpayLoaded(true);
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          setRazorpayLoaded(true);
          resolve(true);
        };
        script.onerror = () => {
          setError('Failed to load Razorpay script');
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  /**
   * Create payment order from backend
   */
  const createPaymentOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          booking_id: bookingId,
          amount: amount
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create payment order');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ Error creating payment order:', error);
      throw error;
    }
  };

  /**
   * Verify payment with backend
   */
  const verifyPayment = async (paymentData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/razorpay/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Payment verification failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ Error verifying payment:', error);
      throw error;
    }
  };

  /**
   * Handle payment process
   */
  const handlePayment = async () => {
    if (!razorpayLoaded) {
      setError('Razorpay is not loaded yet. Please try again.');
      return;
    }

    if (!window.Razorpay) {
      setError('Razorpay is not available. Please refresh the page.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Create payment order
      console.log('💳 Creating payment order...');
      const orderData = await createPaymentOrder();

      // Step 2: Configure Razorpay options with UPI-only method
      const options = {
        key: orderData.razorpay_key_id,
        amount: orderData.amount * 100, // Convert to paise
        currency: 'INR',
        name: 'Clynicare',
        description: orderData.description || `Payment for Booking #${bookingId}`,
        image: '/images/Logo.png', // Clynicare logo
        order_id: orderData.razorpay_order_id,
        
        // UPI-Only Configuration
        method: {
          upi: true,
          card: false,
          netbanking: false,
          wallet: false,
          emi: false,
          paylater: false
        },
        
        // Custom Theme with Clynicare Brand Color
        theme: {
          color: '#16a9e2', // Clynicare brand color
          backdrop_color: 'rgba(22, 169, 226, 0.1)'
        },
        
        // User Details Pre-fill
        prefill: {
          name: userDetails?.name || '',
          email: userDetails?.email || '',
          contact: userDetails?.phone || ''
        },
        
        // Modal Configuration
        modal: {
          backdropclose: false,
          escape: false,
          handleback: true,
          confirm_close: true,
          ondismiss: () => {
            console.log('💳 Payment modal dismissed');
            setIsLoading(false);
            if (onCancel) {
              onCancel('Payment cancelled by user');
            }
          }
        },
        
        // UPI Configuration
        config: {
          display: {
            blocks: {
              utib: { // UPI block
                name: 'Pay using UPI',
                instruments: [
                  {
                    method: 'upi',
                    flows: ['collect', 'intent']
                  }
                ]
              }
            },
            sequence: ['block.utib'],
            preferences: {
              show_default_blocks: false
            }
          }
        },

        // Success Handler
        handler: async (response) => {
          console.log('✅ Payment successful:', response);
          setIsLoading(true);
          
          try {
            // Step 3: Verify payment signature
            const verificationData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            };

            console.log('🔍 Verifying payment...');
            const verifiedPayment = await verifyPayment(verificationData);
            
            console.log('✅ Payment verified successfully');
            setIsLoading(false);
            
            if (onSuccess) {
              onSuccess({
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                signature: response.razorpay_signature,
                verified_data: verifiedPayment
              });
            }
          } catch (verifyError) {
            console.error('❌ Payment verification failed:', verifyError);
            setIsLoading(false);
            setError(verifyError.message);
            
            if (onError) {
              onError({
                type: 'verification_failed',
                message: verifyError.message,
                payment_id: response.razorpay_payment_id
              });
            }
          }
        }
      };

      // Step 4: Open Razorpay checkout
      console.log('🚀 Opening Razorpay checkout...');
      const rzp = new window.Razorpay(options);
      
      // Handle payment failure
      rzp.on('payment.failed', (response) => {
        console.error('❌ Payment failed:', response.error);
        setIsLoading(false);
        setError(response.error.description || 'Payment failed');
        
        if (onError) {
          onError({
            type: 'payment_failed',
            message: response.error.description,
            error_code: response.error.code,
            payment_id: response.error.metadata?.payment_id
          });
        }
      });

      // Open the payment modal
      rzp.open();

    } catch (error) {
      console.error('❌ Payment initiation failed:', error);
      setIsLoading(false);
      setError(error.message);
      
      if (onError) {
        onError({
          type: 'initialization_failed',
          message: error.message
        });
      }
    }
  };

  return (
    <div className={`razorpay-checkout-wrapper ${className}`}>
      {error && (
        <div className="error-message bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}
      
      <button
        onClick={handlePayment}
        disabled={disabled || isLoading || !razorpayLoaded}
        className={`
          w-full px-6 py-3 rounded-lg font-semibold text-white
          transition-all duration-200 ease-in-out
          ${disabled || isLoading || !razorpayLoaded 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-[#16a9e2] hover:bg-[#1496cc] active:bg-[#1283b3] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
          }
          focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
          flex items-center justify-center space-x-2
        `}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Processing...</span>
          </>
        ) : !razorpayLoaded ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{buttonText}</span>
          </>
        )}
      </button>
      
      {!razorpayLoaded && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Loading secure payment gateway...
        </p>
      )}
      
      <div className="text-xs text-gray-500 mt-3 text-center flex items-center justify-center space-x-1">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span>Secured by Razorpay | UPI Only</span>
      </div>
    </div>
  );
};

export default RazorpayCheckout;
