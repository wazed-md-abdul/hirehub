"use client";

import React, { useState } from "react";
import { FiCheck, FiUser, FiBriefcase, FiZap } from "react-icons/fi";

export default function PricingPage() {
  const [billingType, setBillingType] = useState("seekers"); // 'seekers' or 'recruiters'

  const seekerPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Get started and find your first opportunity.",
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Basic profile",
        "Email alerts",
      ],
      cta: "Get Started",
      popular: false,
      accent: "from-blue-600 to-cyan-500",
    },
    {
      name: "Pro",
      price: "$19",
      period: "month",
      description: "Perfect for active job seekers looking for an edge.",
      features: [
        "Apply to up to 30 jobs per month",
        "Unlimited saved jobs",
        "Application tracking",
        "Salary insights",
      ],
      cta: "Go Pro",
      popular: true,
      accent: "from-violet-600 to-fuchsia-600",
    },
    {
      name: "Premium",
      price: "$39",
      period: "month",
      description: "Everything you need for full career acceleration.",
      features: [
        "Everything in Pro",
        "Unlimited applications",
        "Profile boost to recruiters",
        "Early access to new jobs",
        "Priority support",
      ],
      cta: "Go Premium",
      popular: false,
      accent: "from-amber-500 to-rose-500",
    },
  ];

  const recruiterPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Basic features for growing your team.",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management",
        "Standard listing visibility",
        "Great for company's first year",
      ],
      cta: "Start Free",
      popular: false,
      accent: "from-emerald-600 to-teal-500",
    },
    {
      name: "Growth",
      price: "$49",
      period: "month",
      description: "Expanded job posts and tools for growing companies.",
      features: [
        "Up to 10 active job posts",
        "Applicant tracking system",
        "Basic recruitment analytics",
        "Dedicated email support",
      ],
      cta: "Start Growth",
      popular: true,
      accent: "from-violet-600 to-fuchsia-600",
    },
    {
      name: "Enterprise",
      price: "$149",
      period: "month",
      description: "Advanced branding, security and analytics for teams.",
      features: [
        "Up to 50 active job posts",
        "Advanced analytics dashboard",
        "Featured job listings",
        "Team collaboration & permissions",
        "Custom branding",
        "Priority 24/7 support",
      ],
      cta: "Contact Sales",
      popular: false,
      accent: "from-fuchsia-600 to-pink-500",
    },
  ];

  const activePlans = billingType === "seekers" ? seekerPlans : recruiterPlans;

  return (
    <div className="bg-[#0B0B0F] min-h-screen text-white pt-28 pb-24 font-sans relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-fuchsia-600/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-6xl space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 border border-violet-500/20 text-violet-400">
            Pricing Plans
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Choose Your Tier
          </h1>
          <p className="text-sm text-[#8A8A93] leading-relaxed">
            Get the right tools to power your hiring or land your dream job. Flexible plans that grow with you.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center">
          <div className="bg-[#121217] border border-white/5 p-1.5 rounded-full flex gap-1 shadow-inner relative">
            <button
              onClick={() => setBillingType("seekers")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${billingType === "seekers"
                ? "bg-white text-black shadow-lg"
                : "text-[#8A8A93] hover:text-white"
                }`}
            >
              <FiUser className="text-lg" />
              For Job Seekers
            </button>
            <button
              onClick={() => setBillingType("recruiters")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${billingType === "recruiters"
                ? "bg-white text-black shadow-lg"
                : "text-[#8A8A93] hover:text-white"
                }`}
            >
              <FiBriefcase className="text-lg" />
              For Recruiters
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {activePlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`bg-[#121217] border rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative transition-all duration-300 hover:translate-y-[-6px] ${plan.popular
                ? "border-violet-500/30 ring-1 ring-violet-500/30"
                : "border-white/5 hover:border-white/10"
                }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/20">
                    <FiZap className="fill-white" /> Most Popular
                  </span>
                </div>
              )}

              {/* Top Plan Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">{plan.name} Plan</h3>
                  <p className="text-xs text-[#8A8A93] mt-1">{plan.description}</p>
                </div>

                <div className="flex items-baseline text-white">
                  <span className="text-5xl font-black tracking-tight">{plan.price}</span>
                  <span className="text-[#8A8A93] text-sm ml-2 font-medium">/{plan.period}</span>
                </div>

                {/* Features List */}
                <ul className="space-y-4 pt-2 border-t border-white/5">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3 text-sm text-[#8A8A93]">
                      <span className="mt-0.5 w-4.5 h-4.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                        <FiCheck className="w-3 h-3 text-emerald-400" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="pt-8 mt-auto">
                <form action="/api/checkout_sessions" method="POST">
                  <section>
                    <button className={`w-full py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer active:scale-98 ${plan.popular
                      ? "bg-white text-black hover:bg-gray-100 shadow-[0_4px_20px_rgba(255,255,255,0.05)]"
                      : "bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 text-white"
                      }`} type="submit" role="link">
                      {plan.cta}
                    </button>
                  </section>
                </form>
                <button

                >

                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
