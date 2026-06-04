import React from "react";

const CTA = () => {
  return (
    <section className="relative z-20 w-full min-h-[500px] md:min-h-[580px] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#0B0B0F]">
      {/* Background Image Container */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-center items-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cta-bg.png"
          alt="CTA Grid Background"
          className="w-full  h-full object-cover opacity-80 mix-blend-screen"
        />
        {/* Soft radial glow in the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[800px] h-[300px] bg-[#633CFF]/10 blur-[100px] rounded-full"></div>
      </div>

      {/* Fades to blend into background */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0B0B0F] to-transparent z-10" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0B0B0F] to-transparent z-10" />

      {/* Content wrapper */}
      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-5xl lg:text-[46px] font-bold text-white tracking-tight leading-tight mb-4 max-w-3xl">
          Your next role is<br className="sm:hidden" /> already looking for you
        </h2>

        {/* Subtitle */}
        <p className="text-[#8A8A93] text-sm md:text-[17px] mb-10 max-w-2xl leading-relaxed">
          Build a profile in three minutes. The matches start arriving tomorrow morning.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button className="w-full sm:w-auto bg-white hover:bg-gray-100 text-black px-7 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-[0_4px_25px_rgba(255,255,255,0.08)] focus:outline-none">
            Create a free account
          </button>
          <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all focus:outline-none">
            View pricing
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
