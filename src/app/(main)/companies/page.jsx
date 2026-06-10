"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllCompanies } from "@/lib/actions/companies";
import { getJobs } from "@/lib/api/jobs";
import { FiMapPin, FiUsers, FiBriefcase, FiArrowRight, FiSearch, FiGlobe } from "react-icons/fi";

export default function CompaniesPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [compData, jobData] = await Promise.all([
          getAllCompanies(),
          getJobs()
        ]);
        
        // Filter only approved companies
        const approvedCompanies = (compData || []).filter(c => c.status === "approved");
        setCompanies(approvedCompanies);
        setJobs(jobData || []);
      } catch (error) {
        console.error("Error fetching companies or jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate open jobs count per company
  const getOpenJobsCount = (companyId) => {
    return jobs.filter(job => job.companyId === companyId || job.company?._id === companyId || job.company?.id === companyId).length;
  };

  // Get unique list of industries from approved companies
  const industries = ["All", ...new Set(companies.map(c => c.industry).filter(Boolean))];

  // Filter companies based on industry tab and search query
  const filteredCompanies = companies.filter(company => {
    const matchesIndustry = selectedIndustry === "All" || company.industry === selectedIndustry;
    const matchesSearch = company.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          company.industry?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIndustry && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex-1 p-6 md:p-8 bg-[#0B0B0F] min-h-screen flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin"></div>
          <p className="text-xs text-[#8A8A93]">Loading companies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0F] min-h-screen text-white pt-28 pb-24 font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-24 left-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-24 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 border border-violet-500/20 text-violet-400">
              Browse Organizations
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Meet Top Companies</h1>
            <p className="text-sm text-[#8A8A93] leading-relaxed max-w-xl">
              Discover industry leaders and startups hiring right now. Click on any organization to view details.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:max-w-xs">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121217] border border-white/5 focus:border-violet-500/50 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-600 transition-all outline-none"
            />
          </div>
        </div>

        {/* Industry Tabs */}
        {industries.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedIndustry === industry
                    ? "bg-white text-black font-semibold shadow-md"
                    : "bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 text-gray-400 hover:text-white"
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        )}

        {/* Companies Grid */}
        {filteredCompanies.length === 0 ? (
          <div className="bg-[#121217] border border-white/5 rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mx-auto text-[#8A8A93]">
              <FiSearch className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-white font-bold text-base">No Companies Found</h3>
              <p className="text-xs text-[#8A8A93]">
                Try adjusting your filters or search keywords.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => {
              const openJobs = getOpenJobsCount(company._id);
              return (
                <Link
                  key={company._id}
                  href={`/companies/${company._id}`}
                  className="group bg-[#121217] border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:border-white/15 transition-all duration-300 shadow-md hover:translate-y-[-4px]"
                >
                  <div className="space-y-5">
                    {/* Header: Logo & Name */}
                    <div className="flex items-start justify-between gap-4">
                      {company.logo ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
                          {company.name[0].toUpperCase()}
                        </div>
                      )}
                      
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-500/10 border border-violet-500/20 text-violet-400 uppercase tracking-wider">
                        {company.industry || "Technology"}
                      </span>
                    </div>

                    {/* Name & description */}
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold text-white leading-snug group-hover:text-violet-400 transition-colors">
                        {company.name}
                      </h3>
                      <p className="text-xs text-[#8A8A93] line-clamp-2 leading-relaxed">
                        {company.description || "A forward-thinking organization shaping the future."}
                      </p>
                    </div>
                  </div>

                  {/* Footer Stats */}
                  <div className="border-t border-white/5 pt-4 mt-5 grid grid-cols-3 gap-4 text-xs text-[#8A8A93]">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#6B6B75] uppercase tracking-wider flex items-center gap-1.5">
                        <FiMapPin /> Location
                      </span>
                      <p className="font-semibold text-white truncate" title={company.location || "Various"}>
                        {company.location || "Various"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#6B6B75] uppercase tracking-wider flex items-center gap-1.5">
                        <FiUsers /> Employees
                      </span>
                      <p className="font-semibold text-white">
                        {company.employees || "1-10"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#6B6B75] uppercase tracking-wider flex items-center gap-1.5">
                        <FiBriefcase /> Open Jobs
                      </span>
                      <p className={`font-semibold ${openJobs > 0 ? "text-emerald-400" : "text-white"}`}>
                        {openJobs}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
