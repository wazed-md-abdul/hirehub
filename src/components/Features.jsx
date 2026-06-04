import React from "react";
import {
  FiSearch,
  FiTrendingUp,
  FiBarChart2,
  FiBookmark,
  FiMousePointer,
  FiFileText,
  FiHexagon,
  FiArrowUpRight,
} from "react-icons/fi";

const featuresData = [
  {
    icon: FiSearch,
    title: "Smart Search",
    desc: "Find your ideal job with advanced filters.",
  },
  {
    icon: FiTrendingUp,
    title: "Salary Insights",
    desc: "Get real salary data to negotiate confidently.",
  },
  {
    icon: FiBarChart2,
    title: "Top Companies",
    desc: "Apply to vetted companies that are hiring.",
  },
  {
    icon: FiBookmark,
    title: "Saved Jobs",
    desc: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: FiMousePointer,
    title: "One-Click Apply",
    desc: "Simplify your job applications for an easier process!",
  },
  {
    icon: FiFileText,
    title: "Resume Builder",
    desc: "Create professional resumes with modern templates.",
  },
  {
    icon: FiHexagon,
    title: "Skill-Based Matching",
    desc: "Discover jobs that match your skills and experience.",
  },
  {
    icon: FiArrowUpRight,
    title: "Career Growth Resources",
    desc: "Boost your career with quick interview tips.",
  },
];

const Features = () => {
  return (
    <section className="relative z-20 w-full max-w-6xl mx-auto px-4 py-20 md:py-28 flex flex-col items-center">
      {/* Badge */}
      <div className="flex items-center justify-center gap-2.5 mb-4">
        <span className="w-1.5 h-1.5 bg-[#633CFF] rotate-45"></span>
        <span className="text-[#8A8A93] uppercase tracking-[0.2em] text-[11px] font-semibold">
          Features Job
        </span>
        <span className="w-1.5 h-1.5 bg-[#633CFF] rotate-45"></span>
      </div>

      {/* Headline */}
      <h2 className="text-3xl md:text-5xl font-bold text-white text-center tracking-tight mb-20 max-w-3xl leading-tight">
        Everything you need<br className="sm:hidden" /> to succeed
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 w-full">
        {featuresData.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="flex items-start gap-4 group">
              {/* Icon container with border & hover glow */}
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#131316] border border-white/5 text-pink-400 shrink-0 transition-all duration-300 group-hover:border-pink-500/30 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.15)]">
                <IconComponent className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col pt-1">
                <h3 className="text-white font-semibold text-[16px] mb-1.5 group-hover:text-pink-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#8A8A93] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
