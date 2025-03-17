import React from 'react';
import { X } from 'lucide-react';

export function BookingDetailsModal({ booking, isOpen, onClose }) {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Booking Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Patient Information</h3>
            <p className="mt-1 text-sm text-gray-900">{booking.patientName}</p>
            <p className="mt-1 text-sm text-gray-900">{booking.patientEmail}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Service Details</h3>
            <p className="mt-1 text-sm text-gray-900">{booking.service}</p>
            <p className="mt-1 text-sm text-gray-900">Department: {booking.department}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Doctor</h3>
            <p className="mt-1 text-sm text-gray-900">{booking.doctorName}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Appointment Time</h3>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(booking.dateTime).toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          {booking.symptoms && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Symptoms/Notes</h3>
              <p className="mt-1 text-sm text-gray-900">{booking.symptoms}</p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <p className="mt-1 text-sm text-gray-900 capitalize">{booking.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}