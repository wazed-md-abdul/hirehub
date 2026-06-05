"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff, FiCode } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";



const SignInPage = () => {
    const router = useRouter();


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {





            const { data, error } = await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                setError(error.message || "Invalid email or password.");
                setLoading(false);
                return;
            }

            // --- Remove this simulated delay when using real auth ---
            await new Promise(resolve => setTimeout(resolve, 1500));
            // --------------------------------------------------------

            setSuccess("Logged in successfully! Redirecting...");

            // Redirect to dashboard
            setTimeout(() => {
                router.push(`/`);
            }, 2000);

        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center px-4 py-12 relative overflow-hidden">

            {/* Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#633CFF]/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

            <div className="w-full max-w-md bg-[#121217]/90 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 shadow-2xl relative z-10">

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <Link href="/" className="flex items-center gap-3 group focus:outline-none">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] group-hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] transition-all">
                            <FiCode className="text-xl" />
                        </div>
                        <span className="text-white font-bold text-2xl tracking-tight">
                            Hire<span className="text-[#8A8A93] font-normal">Hub</span>
                        </span>
                    </Link>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
                    <p className="text-[#8A8A93] text-sm">Sign in to your account to continue.</p>
                </div>

                {/* Status Messages */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center">
                        {success}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email Input */}
                    <div className="relative group">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A93] group-focus-within:text-violet-500 transition-colors text-lg" />
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading || success}
                            className="w-full bg-[#0C0C10] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-[#6B6B75] disabled:opacity-50"
                            placeholder="Email address"
                        />
                    </div>

                    {/* Password Input Area */}
                    <div className="space-y-2">
                        <div className="relative group">
                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A93] group-focus-within:text-violet-500 transition-colors text-lg" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading || success}
                                className="w-full bg-[#0C0C10] border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-[#6B6B75] disabled:opacity-50"
                                placeholder="Password"
                            />

                            {/* Eye Toggle Button */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={loading || success}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8A93] hover:text-white transition-colors focus:outline-none disabled:opacity-50"
                            >
                                {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                            </button>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex justify-end">
                            <Link
                                href="/forgot-password"
                                className="text-[13px] text-[#8A8A93] hover:text-white transition-colors"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || success}
                        className="w-full bg-[#633CFF] hover:bg-[#522eea] text-white font-medium rounded-xl py-3.5 transition-all focus:outline-none focus:ring-2 focus:ring-[#633CFF]/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-2 shadow-[0_0_20px_rgba(99,60,255,0.2)] hover:shadow-[0_0_25px_rgba(99,60,255,0.4)]"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </span>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                {/* Back to Sign Up Link */}
                <div className="mt-8 text-center border-t border-white/5 pt-6">
                    <p className="text-[#8A8A93] text-sm">
                        {"Don't"} have an account?{" "}
                        <Link
                            href="/signup"
                            className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default SignInPage;