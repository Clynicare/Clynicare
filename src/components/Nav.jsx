"use client";
import React, { useState, useEffect } from "react";
import {
  Activity,
  LogIn,
  UserPlus,
  CircleUserRound,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { easeIn, motion } from "framer-motion";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLogin = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.post(
            "http://localhost:7000/api/token-valid",
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setUserinfo(response.data.userInfo);
        } catch (error) {
          console.error("Token validation failed:", error);
          setUserinfo(null);
        }
      }
      setLoading(false); // Ensure loading is false after fetching
    };

    handleLogin();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserinfo(null);
  };

  return (
    <section className="fixed w-full bg-transparent text-black py-4 backdrop-blur-md z-50 px-6 md:px-[100px]">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Activity className="w-8 h-8 text-[#4DA1A9] mr-2" />
          <Link href="/">
            <h1 className="font-bold text-4xl md:text-5xl tracking-tighter md:tracking-normal bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text font-bebas">
              CLYNICARE
            </h1>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#4DA1A9]">
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8 text-gray-500">
            <li><Link href="/" className="hover:text-[#4DA1A9] transition-colors">Home</Link></li>
            <li><Link href="/Services" className="hover:text-[#4DA1A9] transition-colors">Services</Link></li>
            <li><Link href="/Bookings" className="hover:text-[#4DA1A9] transition-colors">Bookings</Link></li>
            <li><Link href="/About" className="hover:text-[#4DA1A9] transition-colors">About Us</Link></li>
            <li><Link href="/Contact" className="hover:text-[#4DA1A9] transition-colors">Contact Us</Link></li>
          </ul>

          {/* Auth Buttons */}
          {loading ? (
            <p className="text-gray-500">Loading...</p> // Display loading until authentication is determined
          ) : userinfo ? (
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div className="flex items-center gap-2 text-[#4DA1A9] hover:text-[#007BA7] transition-colors">
                <CircleUserRound />
                <p className="font-rejoice">Welcome, {userinfo.name}!</p>
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 z-50 border border-gray-200">
                  <p className="text-gray-600 font-semibold">{userinfo.email}</p>
                  <Link
                    href="/profile"
                    className="flex items-center mt-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center mt-2 px-4 py-2 w-full text-red-600 hover:bg-gray-100 rounded-md transition"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                className="flex items-center px-4 py-2 text-[#4DA1A9] hover:text-[#007BA7] transition-colors"
                href="/Login"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
              <Link
                className="flex items-center px-4 py-2 bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] text-white rounded-full hover:shadow-lg transition"
                href="/Signup"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[60px] left-0 w-full bg-white shadow-lg rounded-b-lg py-4 px-6 text-center">
          <ul className="flex flex-col space-y-4 text-gray-700">
            <li><Link href="/" className="hover:text-[#4DA1A9] transition-colors">Home</Link></li>
            <li><Link href="/Services" className="hover:text-[#4DA1A9] transition-colors">Services</Link></li>
            <li><Link href="/Bookings" className="hover:text-[#4DA1A9] transition-colors">Bookings</Link></li>
            <li><Link href="/About" className="hover:text-[#4DA1A9] transition-colors">About Us</Link></li>
            <li><Link href="/Contact" className="hover:text-[#4DA1A9] transition-colors">Contact Us</Link></li>
          </ul>

          {/* Mobile Auth Buttons */}
          <div className="mt-4">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : userinfo ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: easeIn } }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
                className="flex flex-col items-center"
              >
                <p className="text-gray-700 font-semibold">{userinfo.name}</p>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 w-full text-red-600 hover:bg-gray-100 rounded-md transition mt-2"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </motion.div>
            ) : (
              <p className="text-gray-500">Please log in</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Nav;
