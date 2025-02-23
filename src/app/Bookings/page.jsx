import React from 'react';
import { Calendar, Clock, DollarSign, X } from 'lucide-react';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';

// Mock data - replace with actual data from your backend
const bookedServices = [
  {
    id: 1,
    service_name: "blood-testing",
    service_description: "Comprehensive blood testing services at your doorstep",
    service_price: 49.99,
    service_category: "diagnostic",
    service_image: "/images/abouttwo.jpg"
  },
  {
    id: 2,
    service_name: "Feeding Assistance",
    service_description: "Helping individuals with eating and ensuring proper nutrition",
    service_price: 149.99,
    service_category: "Personal Care Assistance",
    service_image: "/images/abouttwo.jpg"
  }
];

function App() {
  const handleCancelService = (serviceId) => {
    // Implement your cancel logic here
    console.log(`Cancelling service with ID: ${serviceId}`);
  };

  return (
   <div>
    <Nav>
    </Nav>
     
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 mt-10">My Booked Services</h1>
        
        <div className="space-y-6">
          {bookedServices.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover md:w-48"
                    src={service.service_image}
                    alt={service.service_name}
                  />
                </div>
                <div className="p-6 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {service.service_name}
                      </h2>
                      <p className="mt-1 text-sm text-gray-600">
                        {service.service_description}
                      </p>
                    </div>
                    <button
                      
                      className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors duration-200"
                    >
                      <X size={16} className="mr-1" />
                      Cancel
                    </button>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {service.service_category}
                      </span>
                      <div className="flex items-center text-gray-600">
                        <DollarSign size={16} className="mr-1" />
                        <span className="text-lg font-semibold">
                          {service.service_price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {bookedServices.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No services booked</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't booked any services yet.
            </p>
          </div>
        )}
      </div>
    </div>
        </Suspense>

     
    <Footer></Footer>
    </div>
  );
}

export default App;