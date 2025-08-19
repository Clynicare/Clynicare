"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Clock, 
  Award, 
  Phone, 
  Calendar,
  Heart,
  Shield,
  Users
} from 'lucide-react';

const NurseCard = ({ nurse, onBook }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <img
              src={nurse.profile_image || '/images/default-nurse.jpg'}
              alt={nurse.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-100"
            />
            {nurse.is_verified && (
              <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                <Shield className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{nurse.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700">
                {nurse.rating.toFixed(1)} ({nurse.total_reviews} reviews)
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{nurse.location.city}, {nurse.location.state}</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              ₹{nurse.hourly_rate}
            </div>
            <div className="text-sm text-gray-500">per hour</div>
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {nurse.specializations.slice(0, 3).map((spec, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
              >
                {spec}
              </span>
            ))}
            {nurse.specializations.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                +{nurse.specializations.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-t border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Award className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-sm font-semibold text-gray-900">{nurse.experience_years}+ Years</div>
            <div className="text-xs text-gray-500">Experience</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-sm font-semibold text-gray-900">{nurse.total_reviews}</div>
            <div className="text-xs text-gray-500">Patients</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {nurse.availability.days.length}
            </div>
            <div className="text-xs text-gray-500">Days/Week</div>
          </div>
        </div>

        {/* Availability */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Available</span>
          </div>
          <div className="text-sm text-gray-600">
            {nurse.availability.days.slice(0, 3).join(', ')}
            {nurse.availability.days.length > 3 && ` +${nurse.availability.days.length - 3} more`}
          </div>
          <div className="text-sm text-gray-600">
            {nurse.availability.hours.start} - {nurse.availability.hours.end}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            onClick={() => onBook(nurse)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Calendar className="w-4 h-4" />
            Book Now
          </motion.button>
          
          <motion.button
            className="px-4 py-3 border-2 border-blue-200 hover:border-blue-300 text-blue-600 rounded-2xl transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            className="px-4 py-3 border-2 border-pink-200 hover:border-pink-300 text-pink-600 rounded-2xl transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Hover Overlay */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent pointer-events-none rounded-3xl"
          />
        )}
      </div>
    </motion.div>
  );
};

export default NurseCard;
