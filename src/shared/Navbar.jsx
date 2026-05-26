"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { FiCode } from "react-icons/fi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Apply glassmorphism effect on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Browse Jobs", href: "/jobs" },
        { name: "Companies", href: "/companies" },
        { name: "Pricing", href: "/pricing" },
        { name: "Dashboard", href: "/dashboard" },
    ];

    return (
        <header
            className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-[#0B0B0F]/80 backdrop-blur-md border-b border-white/5 py-3 shadow-lg"
                : "bg-[#0B0B0F] py-5" // Solid or transparent starting state
                }`}
        >
            <div className="container mx-auto px-4 md:px-8 lg:px-12">
                <nav className="flex items-center justify-between">

                    {/* 1. Left Side -> Logo */}
                    <Link href="/" className="flex items-center gap-3 group focus:outline-none">
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg group-hover:shadow-violet-500/40 transition-all duration-300">
                            <FiCode className="text-xl" aria-hidden="true" />
                        </div>
                        <span className="text-white font-bold text-xl tracking-tight">
                            Hire<span className="text-gray-400 font-normal">Hub</span>
                        </span>
                    </Link>

                    {/* 2. Middle/Right Side -> Desktop Links */}
                    <div className="hidden lg:flex items-center">

                        {/* Pill-shaped link container for modern SaaS look */}
                        <ul className="flex items-center bg-[#1A1A20]/80 backdrop-blur-md border border-white/10 rounded-full px-1.5 py-1.5 mr-6 shadow-inner">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 block ${isActive
                                                ? "bg-white/10 text-white"
                                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                                }`}
                                            aria-current={isActive ? "page" : undefined}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-5 border-l border-white/10 pl-6">
                            <Link
                                href="/auth/signin"
                                className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/50 rounded-md px-2 py-1"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/auth/signup"
                                className="px-5 py-2.5 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-100 transition-all duration-200 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        className="lg:hidden text-gray-400 hover:text-white p-2 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-md transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation menu"
                    >
                        {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
                    </button>
                </nav>
            </div>

            {/* 3. Mobile Navigation Menu */}
            <div
                className={`lg:hidden absolute top-full left-0 w-full bg-[#0B0B0F]/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[500px] opacity-100 py-4 shadow-2xl" : "max-h-0 opacity-0 py-0"
                    }`}
            >
                <ul className="flex flex-col px-4 gap-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                        ? "bg-white/10 text-white"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}

                    <li aria-hidden="true" className="h-px w-full bg-white/10 my-3"></li>

                    <li className="flex flex-col gap-3 px-4 pt-1">
                        <Link
                            href="/signin"
                            className="text-sm font-medium text-center text-violet-400 py-2.5 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-violet-500/30"
                            onClick={() => setIsOpen(false)}
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/signup"
                            className="text-sm font-semibold text-center bg-white text-black py-3 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Get Started
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;