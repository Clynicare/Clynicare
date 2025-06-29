"use client";

import { useState, useEffect, useReducer } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Mail, Phone, User, Heart, Clock, CheckCircle } from "lucide-react";
import Image from "next/image";

// Reducer function for handling form state
const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return { ...state, [action.field]: action.value };
    case "RESET_FORM":
      return { name: "", phoneNumber: "", email: "", description: "" };
    default:
      return state;
  }
};

export default function ContactForm() {
  const [formData, dispatch] = useReducer(formReducer, {
    name: "",
    phoneNumber: "",
    email: "",
    description: "",
  });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [status, setStatus] = useState(""); // Track form status

  // Check if the user is on a mobile device
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    dispatch({ type: "SET_FORM_DATA", field: e.target.name, value: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        dispatch({ type: "RESET_FORM" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      setStatus("Failed to send message.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Nav />
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-[70px]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Flippable Image */}
            <div
              className="relative w-full h-[400px] lg:h-[500px] perspective"
              onMouseEnter={() => !isMobile && setIsFlipped(true)}
              onMouseLeave={() => !isMobile && setIsFlipped(false)}
              onClick={() => isMobile && setIsFlipped(!isFlipped)}
              style={{ perspective: "1000px" }}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front Side */}
                <div className="absolute w-full h-full backface-hidden" style={{ backfaceVisibility: "hidden" }}>
                  <Image
                    src="/images/contactusimage.jpg"
                    alt="Office"
                    width={300}
                    height={600}
                    priority
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center p-6 bg-black/30 rounded-lg">
                    <h2 className="text-2xl font-bold text-white">Get in Touch</h2>
                    <p className="text-white opacity-90">We're here to help and answer any questions.</p>
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className="absolute w-full h-full bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-white p-6 rounded-lg rotate-y-180 flex flex-col justify-center space-y-4"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="flex items-center space-x-3">
                    <Heart className="h-6 w-6 text-pink-400" />
                    <div>
                      <h3 className="text-lg font-bold">Customer Satisfaction</h3>
                      <p className="text-sm opacity-90">98% satisfaction rate</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-yellow-400" />
                    <div>
                      <h3 className="text-lg font-bold">Quick Response</h3>
                      <p className="text-sm opacity-90">Avg response time under 2 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                    <div>
                      <h3 className="text-lg font-bold">Expert Support</h3>
                      <p className="text-sm opacity-90">Dedicated team at your service</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="p-12">
              <h2 className="text-3xl font-semibold text-gray-900 mb-8">Contact Us</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                  rows={4}
                  className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                />

                <button
                  type="submit"
                  className="w-full bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-white py-4 rounded-lg font-semibold hover:from-black hover:to-black transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Send Message
                </button>

                {/* Status Message Below Button */}
                {status && (
                  <div className={`mt-4 text-center font-medium ${status === "Message sent successfully!" ? "text-green-600" : "text-red-600"}`}>
                    {status}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
