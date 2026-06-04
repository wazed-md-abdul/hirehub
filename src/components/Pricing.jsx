import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

const CrownIcon = () => (
  <svg
    className="w-4 h-4 text-pink-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
    <path d="M3 20h18" />
  </svg>
);

const GrowthIcon = () => (
  <svg
    className="w-4 h-4 text-pink-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const LightningIcon = () => (
  <svg
    className="w-4 h-4 text-pink-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const PlusIcon = () => (
  <div className="flex items-center justify-center w-5 h-5 rounded-lg bg-white/5 border border-white/5 text-gray-400 text-[13px] font-medium shrink-0">
    +
  </div>
);

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      icon: CrownIcon,
      priceMonthly: 0,
      priceYearly: 0,
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited",
      ],
      isHighlighted: false,
    },
    {
      name: "Growth",
      icon: GrowthIcon,
      priceMonthly: 17,
      priceYearly: 12,
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited",
      ],
      isHighlighted: true,
    },
    {
      name: "Premium",
      icon: LightningIcon,
      priceMonthly: 99,
      priceYearly: 74,
      features: [
        "Everything in Pro",
        "Multi-profile career portfolios",
        "Shared talent rooms",
        "Recruiter view (read-only)",
      ],
      isHighlighted: false,
    },
  ];

  return (
    <section className="relative z-20 w-full max-w-6xl mx-auto px-4 py-20 md:py-28 flex flex-col items-center">
      {/* Badge */}
      <div className="flex items-center justify-center gap-2.5 mb-4">
        <span className="w-1.5 h-1.5 bg-[#633CFF] rotate-45"></span>
        <span className="text-[#8A8A93] uppercase tracking-[0.2em] text-[11px] font-semibold">
          Pricing
        </span>
        <span className="w-1.5 h-1.5 bg-[#633CFF] rotate-45"></span>
      </div>

      {/* Headline */}
      <h2 className="text-3xl md:text-5xl font-bold text-white text-center tracking-tight mb-8 max-w-3xl leading-tight">
        Pay for the leverage,<br className="sm:hidden" /> not the listings
      </h2>

      {/* Toggle */}
      <div className="bg-[#131316] p-1.5 rounded-full inline-flex items-center gap-1.5 border border-white/5 mb-16 relative">
        <button
          onClick={() => setIsYearly(false)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            !isYearly
              ? "bg-white text-black shadow-md"
              : "text-[#8A8A93] hover:text-white"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setIsYearly(true)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
            isYearly
              ? "bg-white text-black shadow-md"
              : "text-[#8A8A93] hover:text-white"
          }`}
        >
          <span>Yearly</span>
          <span className="px-2 py-0.5 rounded-full bg-[#D946EF] text-white text-[10px] font-bold">
            25%
          </span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
        {plans.map((plan, idx) => {
          const Icon = plan.icon;
          const displayPrice = isYearly ? plan.priceYearly : plan.priceMonthly;

          return (
            <div
              key={idx}
              className={`relative bg-[#131316] border rounded-[24px] p-6 md:p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.isHighlighted
                  ? "border-[#633CFF]/50 shadow-[0_0_30px_rgba(99,60,255,0.12)] hover:-translate-y-1 hover:border-[#633CFF]/80"
                  : "border-white/5 hover:border-white/15 hover:-translate-y-1"
              }`}
            >
              {plan.isHighlighted && (
                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-[#633CFF]/5 to-transparent pointer-events-none" />
              )}

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-black border border-white/5">
                      <Icon />
                    </div>
                    <span className="text-white font-semibold text-lg">
                      {plan.name}
                    </span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-white font-bold text-3xl">
                      ${displayPrice}
                    </span>
                    <span className="text-[#8A8A93] text-[13px] ml-1">
                      /month
                    </span>
                  </div>
                </div>

                {/* Subtitle */}
                <p className="text-white font-medium text-sm mb-5">
                  Start building your insights hub:
                </p>

                {/* Features */}
                <div className="flex flex-col gap-3.5 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3">
                      <PlusIcon />
                      <span className="text-gray-300 text-[14px]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-3.5 px-5 rounded-xl flex items-center justify-between font-semibold text-sm transition-all focus:outline-none ${
                  plan.isHighlighted
                    ? "bg-white hover:bg-gray-100 text-black shadow-[0_4px_20px_rgba(255,255,255,0.05)]"
                    : "bg-[#222227] hover:bg-[#2C2C35] text-white border border-white/5"
                }`}
              >
                <span>Choose This Plan</span>
                <FiArrowRight className="text-base" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Pricing;
