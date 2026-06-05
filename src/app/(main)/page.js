'use client'
import React from "react";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import JobDiscovery from "@/components/JobDiscovery";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";

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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/globe.png"
              alt="Globe Background"
              className="w-full h-auto object-contain opacity-35 mix-blend-screen"
            />
          </div>
        </div>

        <Hero />
        <Stats />
      </section>

      <div className="bg-[#0B0B0F] pb-24">
        <JobDiscovery />
        <Features />
        <Pricing />
        <CTA />
      </div>
    </>
  );
}
