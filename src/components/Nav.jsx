"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Activity,
  LogIn,
  UserPlus,
  CircleUserRound,
  User,
  LogOut,
  Menu,
  X,
  Heart,
  Stethoscope,
} from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/token-valid`,
          {},
          { 
            headers: { Authorization: `Bearer ${token}` },
            timeout: 5000
          }
        );
        if (response.data && response.data.userInfo) {
          setUserinfo(response.data.userInfo);
        } else {
          localStorage.removeItem("token");
          setUserinfo(null);
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.removeItem("token");
        setUserinfo(null);
      }
    } else {
      setUserinfo(null);
    }
    setLoading(false);
  }, [API_BASE_URL]);

  useEffect(() => {
    handleLogin();
  }, [handleLogin]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setUserinfo(null);
  }, []);

  return (
    <motion.section
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-2xl border-b border-white/20"
          : "bg-gradient-to-r from-white/80 via-blue-50/80 to-cyan-50/80 backdrop-blur-lg"
      }`}
      style={{ height: '80px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.02 }}>
            <Link href="/" className="flex items-center">
              <Image
                src="/images/Logo.png"
                alt="Clynicare Logo"
                width={230}
                height={230}
                className="w-40 h-40 object-contain"
                priority
              />
            </Link>
          </motion.div>

          <motion.div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </motion.div>

          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              {["Home", "Services", "Nurses", "Bookings", "About Us", "Contact Us"].map((item, index) => (
                <motion.div key={item} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  {item === "Services" ? (
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          if (window.location.pathname === '/') {
                            document.querySelector('#services-section')?.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            window.location.href = '/#services-section';
                          }
                        }
                      }}
                      className="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 group"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:w-full transition-all duration-300"></span>
                    </button>
                  ) : (
                    <Link
                      href={item === "Home" ? "/" : `/${item.replace(" ", "")}`}
                      className="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 group"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {loading ? (
                <div className="animate-pulse flex space-x-2">
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
              ) : userinfo ? (
                <motion.div
                  className="relative cursor-pointer"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-2 text-blue-600 hover:text-cyan-600 transition-colors">
                    <CircleUserRound className="w-5 h-5" />
                    <span className="font-medium">Welcome, {userinfo.name}!</span>
                  </div>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-4 z-50 border border-white/20"
                    >
                      <p className="text-gray-600 font-semibold mb-3">{userinfo.email}</p>
                      <Link href="/PatientDashboard" className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-xl transition-colors">
                        <Activity className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                      <Link href="/profile" className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-xl transition-colors">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center px-3 py-2 w-full text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-1"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <div className="flex items-center space-x-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/Login"
                      className="flex items-center px-4 py-2 text-blue-600 hover:text-cyan-600 font-medium transition-colors"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/Signup"
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl hover:shadow-xl transition-all font-medium"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Sign Up
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white/95 backdrop-blur-xl border-t border-white/20"
        >
          <div className="px-4 py-6 space-y-4">
            <nav className="space-y-4">
              {["Home", "Services", "Nurses", "Bookings", "About Us", "Contact Us"].map((item) => {
                if (item === "Services") {
                  return (
                    <button
                      key={item}
                      onClick={() => {
                        setIsMenuOpen(false);
                        if (typeof window !== 'undefined') {
                          if (window.location.pathname === '/') {
                            setTimeout(() => {
                              document.querySelector('#services-section')?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                          } else {
                            window.location.href = '/#services-section';
                          }
                        }
                      }}
                      className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-xl hover:bg-blue-50 transition-all w-full text-left"
                    >
                      {item}
                    </button>
                  );
                } else {
                  return (
                    <Link 
                      key={item}
                      href={item === "Home" ? "/" : `/${item.replace(" ", "")}`}
                      className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-xl hover:bg-blue-50 transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  );
                }
              })}
            </nav>

            <div className="pt-4 border-t border-gray-200">
              {loading ? (
                <div className="animate-pulse h-4 bg-gray-300 rounded w-20 mx-auto"></div>
              ) : userinfo ? (
                <div className="text-center space-y-3">
                  <p className="text-gray-700 font-semibold">{userinfo.name}</p>
                  <Link
                    href="/profile"
                    className="flex items-center justify-center px-4 py-2 w-full text-blue-600 hover:bg-blue-50 rounded-xl transition-colors mb-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-center px-4 py-2 w-full text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/Login"
                    className="flex items-center justify-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                  <Link
                    href="/Signup"
                    className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default React.memo(Nav);
