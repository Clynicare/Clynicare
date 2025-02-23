"use client";
import React, { useState } from "react";
import { Mail, Lock, ArrowRight, Loader } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:7000/api/login", formData);
            console.log("✅ Login Response:", response);

            if (typeof window !== "undefined") {
                localStorage.setItem("token", response.data.token);
            }

            setTimeout(() => {
                setLoading(false);
                alert("✅ Login successful!");
                router.push("/");
            }, 2000);

            setTimeout(async () => {
                const token = localStorage.getItem("token");
                if (token) {
                    const decrypted = await axios.post("http://localhost:7000/api/token-valid", {}, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    console.log("✅ Decrypted token:", decrypted.data);
                }
            }, 500);

        } catch (error) {
            console.error("❌ Login error:", error);
            setLoading(false);
            alert("❌ Invalid credentials!");
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-8">Welcome Back</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <Mail className="w-4 h-4 mr-2 text-blue-500" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <Lock className="w-4 h-4 mr-2 text-blue-500" />
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center group">
                            {loading ? <><Loader className="w-5 h-5 animate-spin mr-2" /> Redirecting...</> : <>Sign In <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
