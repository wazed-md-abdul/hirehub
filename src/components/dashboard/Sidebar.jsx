'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiHome, FiBriefcase, FiUsers, FiSettings, FiLogOut, FiX } from "react-icons/fi";
import { useSession, authClient } from "@/lib/auth-client";

const Sidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = session?.user || {
    name: "Alex Sterling",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
    role: "recruiter"
  };

  const navLinks = [
    { name: "Dashboard", href: "/dashboard/recruiter", icon: FiGrid },
    { name: "My Company", href: "/dashboard/recruiter/company", icon: FiHome },
    { name: "Manage Jobs", href: "/dashboard/recruiter/jobs", icon: FiBriefcase },
    { name: "Applications", href: "#", icon: FiUsers },
    { name: "Settings", href: "#", icon: FiSettings },
  ];

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/auth/signin";
  };

  return (
    <aside className={`w-64 bg-[#09090B] border-r border-white/5 flex flex-col h-full shrink-0 z-50 fixed lg:relative inset-y-0 left-0 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
      {/* Logo */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_10px_rgba(124,58,237,0.3)]">
            H
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            Hire<span className="text-[#8A8A93] font-normal">Loop</span>
          </span>
        </Link>
        {/* Close Button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg bg-white/5 border border-white/5 text-[#8A8A93] hover:text-white transition-all focus:outline-none"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>

      {/* User Section */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3 mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-violet-500/20"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-white font-semibold text-sm truncate">
              {user.name}
            </span>
            <span className="text-[#8A8A93] text-[11px] capitalize">
              {user.role || "Recruiter"}
            </span>
          </div>
        </div>

        {/* Premium Badge */}
        <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-wider">
          Premium Account
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-[14px] font-medium transition-all group ${isActive
                ? "bg-white/5 text-white border-l-2 border-violet-500 shadow-[inset_1px_0_0_rgba(255,255,255,0.02)]"
                : "text-[#8A8A93] hover:text-white hover:bg-white/5"
                }`}
            >
              <Icon
                className={`w-[18px] h-[18px] transition-colors ${isActive ? "text-violet-500" : "text-[#8A8A93] group-hover:text-white"
                  }`}
              />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3.5 w-full px-4 py-3 rounded-xl text-[14px] font-medium text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all focus:outline-none"
        >
          <FiLogOut className="w-[18px] h-[18px]" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
