"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getCompanyById } from "@/lib/actions/companies";
import { getJobs } from "@/lib/api/jobs";
import {
  FiMapPin,
  FiUsers,
  FiGlobe,
  FiArrowLeft,
  FiArrowRight,
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
  FiTrendingUp,
  FiAlertCircle
} from "react-icons/fi";

export default function CompanyProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const [company, setCompany] = useState(null);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyAndJobs = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const [companyData, allJobs] = await Promise.all([
          getCompanyById(id),
          getJobs()
        ]);
        
        setCompany(companyData);
        
        // Filter jobs posted by this company
        const filteredJobs = (allJobs || []).filter(
          job => job.companyId === id || job.company?._id === id || job.company?.id === id
        );
        setCompanyJobs(filteredJobs);
      } catch (error) {
        console.error("Error fetching company profile details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyAndJobs();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 p-6 md:p-8 bg-[#0B0B0F] min-h-screen flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin"></div>
          <p className="text-xs text-[#8A8A93]">Loading company profile...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex-1 p-6 md:p-8 bg-[#0B0B0F] min-h-screen flex items-center justify-center text-white">
        <div className="max-w-md w-full bg-[#121217] border border-white/5 rounded-[24px] p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto text-rose-400">
            <FiAlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Company Profile Not Found</h2>
            <p className="text-sm text-[#8A8A93] leading-relaxed">
              The company profile you are trying to view does not exist or may have been deleted.
            </p>
          </div>
          <button
            onClick={() => router.push("/companies")}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-gray-100 text-black font-bold text-sm transition-all focus:outline-none cursor-pointer"
          >
            Back to Companies
          </button>
        </div>
      </div>
    );
  }

  const websiteUrl = company.website && (company.website.startsWith("http") ? company.website : `https://${company.website}`);

  return (
    <div className="bg-[#0B0B0F] min-h-screen text-white pt-28 pb-24 font-sans">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-6xl space-y-8">
        
        {/* Back Link */}
        <Link
          href="/companies"
          className="inline-flex items-center gap-2 text-[#8A8A93] hover:text-white transition-colors text-sm font-semibold"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Companies
        </Link>

        {/* Company Header Card */}
        <div className="bg-[#121217] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl"></div>
          
          <div className="flex items-center gap-5 relative z-10">
            {company.logo ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={company.logo}
                alt={company.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-white/10"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                {company.name[0].toUpperCase()}
              </div>
            )}
            
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                {company.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#8A8A93]">
                <span className="font-bold text-violet-400 uppercase tracking-wider bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 rounded-full">
                  {company.industry || "Technology"}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FiMapPin /> {company.location || "Various"}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FiUsers /> {company.employees || "1-10"} Employees
                </span>
              </div>
            </div>
          </div>

          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white hover:bg-gray-100 text-black font-bold text-xs tracking-wider uppercase transition-all focus:outline-none shrink-0 relative z-10 w-full md:w-auto"
            >
              <FiGlobe className="text-sm" />
              Visit Website
            </a>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: About Section */}
          <div className="lg:col-span-7 bg-[#121217] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-[#8A8A93] uppercase tracking-wider flex items-center gap-2">
                <FiTrendingUp className="text-violet-400" /> About Company
              </h2>
              <p className="text-sm text-[#8A8A93] leading-relaxed whitespace-pre-line border-l-2 border-violet-500/30 pl-4">
                {company.description || `${company.name} is a leading professional services organization dedicated to quality and innovation.`}
              </p>
            </div>
          </div>

          {/* Right Column: Open Positions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121217] border border-white/5 rounded-3xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-white font-bold text-sm flex items-center gap-2">
                  <FiBriefcase className="text-violet-400" /> Open Positions
                </h3>
                <span className="text-[10px] font-bold text-[#8A8A93] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                  {companyJobs.length} {companyJobs.length === 1 ? "Job" : "Jobs"}
                </span>
              </div>

              {companyJobs.length === 0 ? (
                <p className="text-xs text-[#8A8A93] text-center py-4">
                  No active job listings at this time.
                </p>
              ) : (
                <div className="space-y-3">
                  {companyJobs.map((job) => (
                    <div
                      key={job._id}
                      className="group p-4 bg-[#0B0B0F]/50 border border-white/5 rounded-2xl hover:border-violet-500/20 hover:bg-[#0B0B0F]/80 transition-all duration-300 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1 min-w-0">
                        <Link
                          href={`/jobs/${job._id}`}
                          className="text-sm font-bold text-white group-hover:text-violet-400 transition-colors block truncate"
                        >
                          {job.title}
                        </Link>
                        <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#8A8A93]">
                          <span className="flex items-center gap-0.5">
                            <FiMapPin /> {job.isRemote ? "Remote" : `${job.city || "Various"}`}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-emerald-400 font-semibold">
                            <FiDollarSign /> {Number(job.minSalary).toLocaleString()} - {Number(job.maxSalary).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => router.push(`/jobs/${job._id}`)}
                        className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-white transition-all shrink-0 cursor-pointer"
                      >
                        <FiArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
