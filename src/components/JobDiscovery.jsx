import React from "react";
import { FiMapPin, FiBriefcase, FiArrowRight } from "react-icons/fi";

const EuroIcon = () => (
  <svg
    className="w-3.5 h-3.5 text-pink-400 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6a6 6 0 0 0-12 0v12a6 6 0 0 0 12 0" />
    <path d="M4 10h10" />
    <path d="M4 14h10" />
  </svg>
);

const JobCard = () => {
  return (
    <div className="group relative bg-[#131316] border border-white/5 rounded-[24px] p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#633CFF]/30 hover:shadow-[0_0_30px_rgba(99,60,255,0.08)]">
      {/* Subtle glow effect behind card on hover */}
      <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-[#633CFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10">
        <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
          Frontend Developer
        </h3>
        <p className="text-[#8A8A93] text-[14px] leading-relaxed mb-6">
          Showcase your commitment to diversity and inclusion by highlighting initiatives
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[12px] text-gray-300 font-medium">
            <FiMapPin className="text-pink-400" />
            <span>New York, USA</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[12px] text-gray-300 font-medium">
            <FiBriefcase className="text-pink-400" />
            <span>Hybrid</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[12px] text-gray-300 font-medium">
            <EuroIcon />
            <span>€25–€40/hour</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-[#8c6eff] transition-colors"
        >
          <span>Apply Now</span>
          <FiArrowRight className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

const JobDiscovery = () => {
  return (
    <section className="relative z-20 w-full max-w-6xl mx-auto px-4 py-20 md:py-28 flex flex-col items-center">
      {/* Badge */}
      <div className="flex items-center justify-center gap-2.5 mb-4">
        <span className="w-1.5 h-1.5 bg-[#633CFF] rotate-45"></span>
        <span className="text-[#8A8A93] uppercase tracking-[0.2em] text-[11px] font-semibold">
          Smart Job Discovery
        </span>
        <span className="w-1.5 h-1.5 bg-[#633CFF] rotate-45"></span>
      </div>

      {/* Headline */}
      <h2 className="text-3xl md:text-5xl font-bold text-white text-center tracking-tight mb-16 max-w-3xl leading-tight">
        The roles you'd never<br className="sm:hidden" /> find by searching
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12">
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </div>

      {/* Action Button */}
      <div className="flex justify-center mt-4">
        <button className="px-6 py-3 rounded-xl bg-white hover:bg-gray-100 text-black text-sm font-semibold transition-all shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.15)] focus:outline-none">
          View all job open
        </button>
      </div>
    </section>
  );
};

export default JobDiscovery;
