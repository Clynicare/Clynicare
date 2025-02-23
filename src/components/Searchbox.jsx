"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const services = [
  "Feeding Assistance",
  "blood-testing",
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

  // Filter services based on user input
  const handleSearch = (input) => {
    setQuery(input);

    if (input.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filteredServices = services.filter((service) =>
      service.toLowerCase().includes(input.toLowerCase())
    );

    setSuggestions(filteredServices);
  };

  // Redirect to services page on click
  const handleServiceClick = (serviceName) => {
    router.push(`/Services?name=${encodeURIComponent(serviceName)}`);
  };

  return (
    <div className="relative w-full max-w-md mx-auto ">
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search for a service..."
        className="w-full p-3 border border-none focus:outline-none rounded-lg "
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleServiceClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceSearch;
