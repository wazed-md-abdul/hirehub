'use client'
import React from "react";
import { FiSearch, FiBell, FiMenu } from "react-icons/fi";
import { useSession } from "@/lib/auth-client";

const Header = ({ onMenuClick }) => {
  const { data: session } = useSession();

  const user = session?.user || {
    name: "Alex Sterling",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
    company: "TechFlow Inc."
  };

  return (
    <header className="h-20 bg-[#09090B] border-b border-white/5 flex items-center justify-between px-4 md:px-8 z-20 shrink-0">
      {/* Mobile Menu & Search wrapper */}
      <div className="flex items-center gap-4 flex-1">
        {/* Hamburger Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl bg-[#121217] border border-white/5 text-[#8A8A93] hover:text-white transition-all focus:outline-none"
        >
          <FiMenu className="text-lg" />
        </button>

        {/* Search Input */}
        <div className="relative w-full max-w-md group hidden sm:block">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A93] group-focus-within:text-violet-500 transition-colors text-lg" />
          <input
            type="text"
            placeholder="Search applications, jobs, or talent..."
            className="w-full bg-[#121217] border border-white/5 rounded-xl py-2.5 pl-12 pr-4 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all placeholder:text-[#6B6B75] text-sm"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative w-10 h-10 rounded-xl bg-[#121217] border border-white/5 flex items-center justify-center text-[#8A8A93] hover:text-white hover:border-white/10 transition-all focus:outline-none">
          <FiBell className="text-lg" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-violet-500 rounded-full"></span>
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-white/5"></div>

        {/* User Card */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end min-w-0">
            <span className="text-white font-semibold text-sm truncate">
              {user.name}
            </span>
            <span className="text-[#8A8A93] text-[11px]">
              {user.company || "TechFlow Inc."}
            </span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"}
            alt={user.name}
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-violet-500/20"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
