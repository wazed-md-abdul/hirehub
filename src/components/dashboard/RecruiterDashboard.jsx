'use client'
import React from "react";
import {
  FiFileText,
  FiUsers,
  FiZap,
  FiCheckCircle,
  FiPlus,
  FiSearch,
} from "react-icons/fi";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

const RecruiterDashboard = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Alex Sterling";

  const stats = [
    { label: "Total Job Posts", value: "48", icon: FiFileText },
    { label: "Total Applicants", value: "1,284", icon: FiUsers },
    { label: "Active Jobs", value: "18", icon: FiZap },
    { label: "Jobs Closed", value: "32", icon: FiCheckCircle },
  ];

  const recentApplications = [
    {
      name: "Julianne Moore",
      role: "Senior Product Designer",
      date: "Oct 24, 2023",
      exp: "6 years",
      status: "Interviewing",
      statusClass: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    },
    {
      name: "Robert Downey",
      role: "Backend Engineer",
      date: "Oct 23, 2023",
      exp: "4 years",
      status: "New",
      statusClass: "bg-white/5 border-white/10 text-white",
    },
    {
      name: "Emma Stone",
      role: "Marketing Lead",
      date: "Oct 22, 2023",
      exp: "8 years",
      status: "Reviewing",
      statusClass: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    },
    {
      name: "Chris Pratt",
      role: "Product Manager",
      date: "Oct 21, 2023",
      exp: "5 years",
      status: "Rejected",
      statusClass: "bg-rose-500/10 border-rose-500/20 text-rose-400",
    },
  ];

  const topCompanies = [
    {
      name: "Google Inc.",
      domain: "Technology • Mountain View",
      jobs: 24,
      logoColor: "from-blue-600 to-red-500",
      letter: "G",
    },
    {
      name: "Meta Platforms",
      domain: "Social Media • Menlo Park",
      jobs: 18,
      logoColor: "from-blue-500 to-teal-400",
      letter: "M",
    },
    {
      name: "Stripe",
      domain: "Fintech • San Francisco",
      jobs: 12,
      logoColor: "from-indigo-500 to-purple-500",
      letter: "S",
    },
    {
      name: "Tesla",
      domain: "Automotive • Austin",
      jobs: 31,
      logoColor: "from-red-600 to-zinc-800",
      letter: "T",
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-[#09090B] space-y-6 md:space-y-10 relative">
      {/* Welcome Heading */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Welcome back, {userName}
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-[#121217] border border-white/5 rounded-2xl p-5 md:p-6 flex flex-col justify-between transition-all hover:border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#8A8A93] text-sm font-medium">
                  {stat.label}
                </span>
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white border border-white/5">
                  <Icon className="w-4 h-4 text-violet-400" />
                </div>
              </div>
              <span className="text-white text-2xl md:text-3xl font-bold">{stat.value}</span>
            </div>
          );
        })}
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Recent Applications Table (Left column) */}
        <div className="xl:col-span-8 bg-[#121217] border border-white/5 rounded-[24px] p-4 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-bold text-lg">Recent Applications</h2>
            <button className="text-violet-400 hover:text-violet-300 text-xs font-medium transition-colors">
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[11px] text-[#8A8A93] uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Candidate Name</th>
                  <th className="pb-3 font-semibold">Role</th>
                  <th className="pb-3 font-semibold">Date Applied</th>
                  <th className="pb-3 font-semibold">Experience</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {recentApplications.map((app, index) => (
                  <tr key={index} className="group hover:bg-white/[0.01]">
                    <td className="py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-white text-[11px] font-bold">
                        {app.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-white font-medium group-hover:text-violet-400 transition-colors">
                        {app.name}
                      </span>
                    </td>
                    <td className="py-4 text-[#8A8A93]">{app.role}</td>
                    <td className="py-4 text-[#8A8A93]">{app.date}</td>
                    <td className="py-4 text-[#8A8A93]">{app.exp}</td>
                    <td className="py-4 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${app.statusClass}`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* My Top Companies List (Right column) */}
        <div className="xl:col-span-4 bg-[#121217] border border-white/5 rounded-[24px] p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">My Top Companies</h2>
              <button className="text-violet-400 hover:text-violet-300 text-xs font-medium transition-colors">
                View all
              </button>
            </div>

            <div className="space-y-4">
              {topCompanies.map((company, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-all border border-transparent hover:border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg bg-gradient-to-br ${company.logoColor} flex items-center justify-center text-white font-bold text-sm shadow-md`}
                    >
                      {company.letter}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-semibold text-sm">
                        {company.name}
                      </span>
                      <span className="text-[#8A8A93] text-[11px]">
                        {company.domain}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-white font-bold text-sm">
                      {company.jobs}
                    </span>
                    <span className="text-[#8A8A93] text-[9px] uppercase tracking-wider font-semibold">
                      Active Jobs
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full mt-6 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white font-semibold text-xs tracking-wide transition-all focus:outline-none">
            View All Companies
          </button>
        </div>
      </div>

      {/* FAB Floating action button */}
      <Link href="/dashboard/recruiter/jobs/new">
        <button className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-white hover:bg-gray-100 text-black shadow-lg shadow-white/5 flex items-center justify-center z-40 transition-all active:scale-95 focus:outline-none cursor-pointer">
          <FiPlus className="w-6 h-6" />
        </button>
      </Link>
    </div>
  );
};

export default RecruiterDashboard;
