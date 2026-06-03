import React from "react";
import { FiBriefcase, FiBarChart2, FiUser, FiStar } from "react-icons/fi";

const Stats = () => {
  return (
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
  );
};

export default Stats;
