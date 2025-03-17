import React from 'react';
import { Calendar, Clock, User, Building2 } from 'lucide-react';

export function BookingCard({ booking, onClick }) {
  const statusColors = {
    confirmed: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{booking.service_id}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[booking.status]}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <User className="w-5 h-5 mr-2" />
          <span>{booking.user_name}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 mr-2" />
          <span>{formatDate(booking.booking_date)}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Clock className="w-5 h-5 mr-2" />
          <span>{formatTime(booking.booking_time)}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Building2 className="w-5 h-5 mr-2" />
          <span>{booking.address}</span>
        </div>
      </div>
    </div>
  );
}