import React from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";

const Hero = () => {
  return (
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
          <FiSearch className="text-xl" />
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
  );
};

export default Hero;
