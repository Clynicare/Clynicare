"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const services = [
  "Feeding Assistance",
  "Blood Testing",
  "Bathing and Personal Hygiene",
  "Incontinence and Diaper Changes",
  "Mobility Assistance and Transfers",
  "Compression Stocking Application",
  "Medication Administration and Monitoring",
  "Monitoring Vital Signs",
  "Wound Care and Dressing Changes",
  "Catheter Care and Replacement",
  "Ostomy Care",
  "Respiratory Care",
  "Injection Administration",
  "Vaccination Administration",
  "Physical Therapy Support",
  "Hormone Therapy Injections",
];

const ServiceSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  // Debounced function to handle search
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim() === "") {
        setSuggestions([]);
        return;
      }

      const filteredServices = services.filter((service) =>
        service.toLowerCase().includes(query.toLowerCase())
      );

      setSuggestions(filteredServices);
    }, 300); // 300ms debounce

    return () => clearTimeout(delay); // Cleanup function to prevent excessive calls
  }, [query]); // Runs only when `query` changes

  const handleServiceClick = (serviceName) => {
    router.push(`/Services?name=${encodeURIComponent(serviceName)}`);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a service..."
        aria-label="Search services"
        className="w-full p-3 border border-none border-gray-300 hover:border-transparent focus:border-transparent focus:ring-0 rounded-lg shadow-sm transition-all duration-300 ease-in-out outline-none"
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-200 rounded-lg mt-2 shadow-lg max-h-40 overflow-y-auto text-gray-700">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-3 flex items-center gap-2 border-none hover:bg-[#4DA1A9] hover:text-white cursor-pointer transition-all duration-200 ease-in-out rounded-md mx-2 my-1 text-sm font-medium"
              onClick={() => handleServiceClick(suggestion)}
            >
              🔍 {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceSearch;
