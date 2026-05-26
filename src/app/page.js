import Image from "next/image";
import React from "react";
import { FiSearch, FiMapPin, FiBriefcase, FiBarChart2, FiUser, FiStar } from "react-icons/fi";

export default function Home() {
  return (
    <>

      <section className="relative bg-[#0B0B0F] pt-24 pb-16 overflow-hidden min-h-screen flex flex-col">

        {/* Optional: Subtle space dots/stars effect in the very back */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[15%] left-[20%] w-1 h-1 bg-white/30 rounded-full blur-[1px]"></div>
          <div className="absolute top-[25%] left-[80%] w-1.5 h-1.5 bg-violet-400/40 rounded-full blur-[1px]"></div>
          <div className="absolute top-[50%] left-[10%] w-1 h-1 bg-white/20 rounded-full blur-[1px]"></div>
          <div className="absolute top-[60%] left-[85%] w-2 h-2 bg-blue-500/20 rounded-full blur-[2px]"></div>
        </div>

        {/* Background Globe Image covering entire section */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Purple Glow behind the globe */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[1000px] h-[600px] bg-[#633CFF]/15 blur-[120px] rounded-full"></div>

          {/* Fades for smooth top/bottom transitions */}
          <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#0B0B0F] to-transparent z-10" />
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#0B0B0F] to-transparent z-10" />

          {/* The Globe Image, responsive and centered */}
          <div className="absolute inset-0 flex justify-center items-center">
            <img
              src="/globe.png"
              alt="Globe Background"
              className="w-full  h-auto object-contain opacity-35 mix-blend-screen"
            />
          </div>
        </div>

        {/* --- Top Content Section (Titles & Search) --- */}
        <div className="relative z-20 flex flex-col items-center px-4 max-w-6xl mx-auto w-full mt-10">

          {/* Top Badge */}
          <div className="relative inline-flex items-center justify-center mb-8">
            {/* Fading Line Left */}
            <div className="absolute left-[-40px] w-[40px] h-[1px] bg-gradient-to-r from-transparent to-white/20"></div>

            <div className="px-5 py-2 rounded-full bg-[#16161A] border border-white/10 text-[11px] font-semibold flex items-center gap-2">
              <span className="text-sm">💼</span>
              <span className="text-white">50,000+</span>
              <span className="text-[#8A8A93] uppercase tracking-[0.2em] ml-1">New Jobs This Month</span>
            </div>

            {/* Fading Line Right */}
            <div className="absolute right-[-40px] w-[40px] h-[1px] bg-gradient-to-l from-transparent to-white/20"></div>
          </div>

          {/* Headlines */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center tracking-tight mb-6">
            Find Your Dream Job Today
          </h1>
          <p className="text-[#8A8A93] text-lg md:text-[19px] text-center max-w-3xl mb-12 leading-relaxed">
            HireHub connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-4xl bg-[#121217]/90 backdrop-blur-md border border-white/10 rounded-[20px] p-2 flex flex-col md:flex-row items-center gap-2 shadow-2xl">

            {/* Input 1: Job Title */}
            <div className="flex-1 flex items-center px-4 py-3 md:py-0 w-full group">
              <FiSearch className="text-[#8A8A93] text-xl shrink-0 group-focus-within:text-violet-500 transition-colors" />
              <input
                type="text"
                placeholder="Job title, skill or company"
                className="bg-transparent border-none text-white w-full outline-none ml-3 placeholder:text-[#6B6B75] text-[15px]"
              />
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-white/10"></div>
            <div className="md:hidden w-full h-px bg-white/10 my-1"></div>

            {/* Input 2: Location */}
            <div className="flex-1 flex items-center px-4 py-3 md:py-0 w-full group">
              <FiMapPin className="text-[#8A8A93] text-xl shrink-0 group-focus-within:text-violet-500 transition-colors" />
              <input
                type="text"
                placeholder="Location or Remote"
                className="bg-transparent border-none text-white w-full outline-none ml-3 placeholder:text-[#6B6B75] text-[15px]"
              />
            </div>

            {/* Submit Button */}
            <button className="w-full md:w-auto bg-[#633CFF] hover:bg-[#522eea] text-white rounded-2xl p-4 md:px-8 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#633CFF]/50 shrink-0">
              <FiSearch className="text-xl md:hidden" />
              <FiSearch className="text-xl hidden md:block" />
            </button>
          </div>

          {/* Trending Tags */}
          <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
            <span className="text-[13px] text-[#8A8A93]">Trending Position</span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {["Product Designer", "AI Engineering", "Dev-ops Engineer"].map(tag => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-[13px] text-[#8A8A93] hover:text-white transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* --- Bottom Section (Stats) --- */}
        <div className="relative w-full mt-10 md:mt-16 flex-grow flex flex-col justify-end pb-8">

          {/* 2. Text Overlapping the Globe */}
          <div className="relative z-20 text-center px-4 mb-16 md:mb-24 mt-20">
            <h2 className="text-3xl md:text-4xl lg:text-[42px] leading-tight text-gray-300 drop-shadow-2xl">
              Assisting over <span className="text-white font-semibold">15,000 job seekers</span><br className="hidden md:block" />
              find their dream positions.
            </h2>
          </div>

          {/* 3. Stats Grid overlapping the bottom of the globe */}
          <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-6xl mx-auto px-4">

            {/* Card 1 */}
            <div className="bg-[#0C0C10]/95 backdrop-blur-sm border border-white/5 rounded-[24px] p-6 md:p-8 flex flex-col hover:border-white/10 transition-colors">
              <FiBriefcase className="text-white text-xl mb-8" />
              <div className="mt-auto">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-1">50K</h3>
                <p className="text-[#8A8A93] text-[15px]">Active Jobs</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0C0C10]/95 backdrop-blur-sm border border-white/5 rounded-[24px] p-6 md:p-8 flex flex-col hover:border-white/10 transition-colors">
              <FiBarChart2 className="text-white text-xl mb-8" />
              <div className="mt-auto">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-1">12K</h3>
                <p className="text-[#8A8A93] text-[15px]">Companies</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0C0C10]/95 backdrop-blur-sm border border-white/5 rounded-[24px] p-6 md:p-8 flex flex-col hover:border-white/10 transition-colors">
              <FiUser className="text-white text-xl mb-8" />
              <div className="mt-auto">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-1">2M</h3>
                <p className="text-[#8A8A93] text-[15px]">Job Seekers</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#0C0C10]/95 backdrop-blur-sm border border-white/5 rounded-[24px] p-6 md:p-8 flex flex-col hover:border-white/10 transition-colors">
              <FiStar className="text-white text-xl mb-8" />
              <div className="mt-auto">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-1">97%</h3>
                <p className="text-[#8A8A93] text-[15px]">Satisfaction Rate</p>
              </div>
            </div>

          </div>
        </div>

      </section>

    </>
  );
}
