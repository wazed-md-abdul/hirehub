import React from "react";
import Link from "next/link";
import { FiCode } from "react-icons/fi";
import { FaFacebookF, FaPinterestP, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0B0B0F] pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-8 lg:px-12">

                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Logo & Description */}
                    <div className="lg:col-span-5 pr-4">
                        <Link href="/" className="flex items-center gap-3 group focus:outline-none mb-6 inline-flex">
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg">
                                <FiCode className="text-xl" aria-hidden="true" />
                            </div>
                            <span className="text-white font-bold text-xl tracking-tight">
                                Hire<span className="text-gray-400 font-normal">Hub</span>
                            </span>
                        </Link>
                        <p className="text-[#8A8A93] text-[15px] leading-relaxed max-w-sm">
                            The AI-native career platform. Built for people who take their work seriously.
                        </p>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
                        {/* Column 1 */}
                        <div>
                            <h3 className="text-violet-600 font-medium mb-6">Product</h3>
                            <ul className="flex flex-col gap-4">
                                <li><Link href="/discovery" className="text-[#8A8A93] hover:text-white transition-colors text-[15px]">Job discovery</Link></li>
                                <li><Link href="/ai" className="text-[#8A8A93] hover:text-white transition-colors text-[15px]">Worker AI</Link></li>
                                <li><Link href="/companies" className="text-[#8A8A93] hover:text-white transition-colors text-[15px]">Companies</Link></li>
                                <li><Link href="/salary" className="text-[#8A8A93] hover:text-white transition-colors text-[15px]">Salary data</Link></li>
                            </ul>
                        </div>

                        {/* Column 2 */}
                        <div>
                            <h3 className="text-violet-600 font-medium mb-6">Navigations</h3>
                            <ul className="flex flex-col gap-4">
                                <li><Link href="/help" className="text-[#8A8A93] hover:text-white transition-colors text-[15px]">Help center</Link></li>
                                <li><Link href="/library" className="text-[#8A8A93] hover:text-white transition-colors text-[15px]">Career library</Link></li>
                                <li><Link href="/contact" className="text-[#8A8A93] hover:text-white transition-colors text-[15px]">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Column 3 */}
                        <div>
                            <h3 className="text-violet-600 font-medium mb-6">Resources</h3>
                            <ul className="flex flex-col gap-4">
                                <li><Link href="/guidelines" className="text-[#8A8A93] hover:text-white transition-colors text-[15px]">Brand Guideline</Link></li>
                                <li><Link href="/news" className="text-[#8A8A93] hover:text-white transition-colors text-[15px]">Newsroom</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-[#1C1C21]">

                    {/* Social Icons */}
                    <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
                        <a
                            href="#"
                            className="w-10 h-10 rounded-lg bg-[#16161A] flex items-center justify-center text-gray-300 hover:bg-white/10 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-violet-500"
                            aria-label="Facebook"
                        >
                            <FaFacebookF className="text-lg" />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 rounded-lg bg-[#633CFF] flex items-center justify-center text-white hover:bg-[#522eea] shadow-[0_0_15px_rgba(99,60,255,0.3)] hover:shadow-[0_0_20px_rgba(99,60,255,0.5)] transition-all focus:outline-none focus:ring-2 focus:ring-[#633CFF]"
                            aria-label="Pinterest"
                        >
                            <FaPinterestP className="text-lg" />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 rounded-lg bg-[#16161A] flex items-center justify-center text-gray-300 hover:bg-white/10 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-violet-500"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedinIn className="text-lg" />
                        </a>
                    </div>

                    {/* Copyright and Legal */}
                    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-[#6B6B75] text-sm w-full md:w-auto justify-center md:justify-end">
                        <p>Copyright {currentYear} — HireHub</p>
                        <div className="hidden md:block w-px h-4 bg-[#2A2A35]"></div>
                        <div className="flex items-center gap-1">
                            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms & Policy</Link>
                            <span className="px-1">-</span>
                            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Guideline</Link>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;