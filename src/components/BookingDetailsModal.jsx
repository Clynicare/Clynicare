import React from 'react';
import { X } from 'lucide-react';

export function BookingDetailsModal({ booking, isOpen, onClose }) {
  if (!isOpen || !booking) return null;

  const { booking_time, booking_date, user_name, user_id, service_id, status } = booking;
  const { service_name, service_category, service_description } = service_id;

  // Split the booking time into hours and minutes
  const [hours, minutes] = booking_time.split(":").map(Number);

  // Format the appointment time and date
  const formattedDate = new Date(booking_date).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = new Date(2000, 0, 1, hours, minutes).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Ensures AM/PM format
  });

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
          {/* Patient Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-500">Patient Information</h3>
            <p className="mt-1 text-sm text-gray-900">{user_name}</p>
            <p className="mt-1 text-sm text-gray-900">{user_id?.email}</p>
          </div>

          {/* Service Details */}
          <div>
            <h3 className="text-sm font-medium text-gray-500">Service Details</h3>
            <p className="mt-1 text-sm text-gray-900">{service_name}</p>
            <p className="mt-1 text-sm text-gray-900">Department: {service_category}</p>
          </div>

          {/* Nurse */}
          <div>
            <h3 className="text-sm font-medium text-gray-500">Nurse</h3>
            <p className="mt-1 text-sm text-gray-900">Kareem</p>
          </div>

          {/* Appointment Time */}
          <div>
            <h3 className="text-sm font-medium text-gray-500">Appointment Time</h3>
            <p className="mt-1 text-sm text-gray-900">
              {formattedDate} &nbsp; {formattedTime}
            </p>
          </div>

          {/* Service Description */}
          {service_description && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Service Description</h3>
              <p className="mt-1 text-sm text-gray-900">{service_description}</p>
            </div>
          )}

          {/* Status */}
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <p className="mt-1 text-sm text-gray-900 capitalize">{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
