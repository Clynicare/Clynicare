"use client";
import React, { useState } from "react";
import { Mail, Lock, ArrowRight, Loader } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post(`${API_BASE_URL}/api/login`, formData);
            localStorage.setItem("token", data.token);
            alert("✅ Login successful!");
            router.push("/");

            setTimeout(validateToken, 500);
        } catch (error) {
            console.error("❌ Login error:", error);
            alert("❌ Invalid credentials!");
        } finally {
            setLoading(false);
        }
    };

    const validateToken = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const { data } = await axios.post(`${API_BASE_URL}/api/token-valid`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("✅ Decrypted token:", data);
            } catch (error) {
                console.error("❌ Token validation error:", error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#4DA1A9] to-[#007BA7] flex items-center justify-center p-4 transition-all">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8 transition-all ease-in-out duration-300 transform hover:scale-105">
                    <div className="flex items-center justify-center mb-8">
                        <h1 className="font-bold text-4xl text-gray-800 bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text font-bebas">CLYNICARE</h1>
                    </div>

                    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-8">
                        {loading ? "Redirecting..." : "Welcome Back"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {['email', 'password'].map((field, idx) => (
                            <div key={idx} className="transition-all">
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    {field === 'email' ? <Mail className="w-4 h-4 mr-2 text-[#4DA1A9]" /> : <Lock className="w-4 h-4 mr-2 text-[#4DA1A9]" />}
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </label>
                                <input
                                    type={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    placeholder={field === 'email' ? "you@example.com" : "••••••••"}
                                    required
                                />
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] hover:bg-[#007BA7] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center group"
                        >
                            {loading ? <><Loader className="w-5 h-5 animate-spin mr-2" /> Redirecting...</> : <>Sign In <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></>}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => router.push('/Signup')}
                            className="text-blue-600 hover:text-blue-700 font-medium transition duration-300"
                        >
                            Don't have an account? Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
