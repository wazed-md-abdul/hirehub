"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { getJobById } from "@/lib/api/jobs";
import {
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
  FiBookmark,
  FiCheckCircle,
  FiArrowLeft,
  FiGlobe,
  FiUsers,
  FiTrendingUp,
  FiCpu,
  FiAlertCircle
} from "react-icons/fi";

const JobDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  const isRecruiter = session?.user?.role === "recruiter";

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getJobById(id);
        if (data) {
          setJob(data);
        } else {
          setJob(null);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [id]);

  const handleApply = () => {
    if (isRecruiter) return;
    router.push(`/jobs/${id}/apply`);
  };

  if (loading) {
    return (
      <div className="flex-1 p-6 md:p-8 bg-[#0B0B0F] min-h-screen flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin"></div>
          <p className="text-xs text-[#8A8A93]">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex-1 p-6 md:p-8 bg-[#0B0B0F] min-h-screen flex items-center justify-center text-white">
        <div className="max-w-md w-full bg-[#121217] border border-white/5 rounded-[24px] p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto text-rose-400">
            <FiAlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Job Post Not Found</h2>
            <p className="text-sm text-[#8A8A93] leading-relaxed">
              This job listing may have been closed or deleted by the poster.
            </p>
          </div>
          <button
            onClick={() => router.push("/jobs")}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-gray-100 text-black font-bold text-sm transition-all focus:outline-none cursor-pointer"
          >
            Back to Browse Jobs
          </button>
        </div>
      </div>
    );
  }

  const companyLogo = job.company?.logo || job.companyLogo;
  const companyName = job.company?.name || job.companyName || "Acme Corp";
  const companyIndustry = job.company?.industry || "Technology";
  const companyEmployees = job.company?.employees || "1-10 employees";
  const companyWebsite = job.company?.website || "";
  const companyDescription = job.company?.description || "A leading professional services firm.";

  return (
    <div className="bg-[#0B0B0F] min-h-screen text-white pt-28 pb-24 font-sans">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl space-y-8">
        
        {/* Back Link */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-[#8A8A93] hover:text-white transition-colors text-sm font-semibold"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Browse Jobs
        </Link>

        {/* Top Header Card */}
        <div className="bg-[#121217] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
          <div className="flex items-center gap-5">
            {/* Logo */}
            <div>
              {companyLogo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={companyLogo}
                  alt={companyName}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-white/10"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-2xl shadow-inner">
                  {companyName[0].toUpperCase()}
                </div>
              )}
            </div>
            
            {/* Titles */}
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-[#8A8A93]">
                <span className="font-semibold text-white">{companyName}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-violet-400 font-semibold text-xs bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/20">
                  <FiCheckCircle className="w-3 h-3" />
                  Verified Employer
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <button className="flex-1 md:flex-none p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-[#8A8A93] hover:text-white transition-all">
              <FiBookmark className="w-5 h-5 mx-auto" />
            </button>
            {isRecruiter ? (
              <div className="flex-1 md:flex-none relative group">
                <button
                  disabled
                  className="w-full md:w-auto px-8 py-3.5 bg-white/10 border border-white/5 text-gray-500 font-bold text-sm rounded-2xl transition-all cursor-not-allowed"
                >
                  Recruiters Cannot Apply
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#1E1E24] text-xs text-[#8A8A93] border border-white/10 rounded-lg py-2 px-3 shadow-lg whitespace-nowrap z-50">
                  Application disabled for recruiters
                </div>
              </div>
            ) : (
              <button
                onClick={handleApply}
                disabled={applied}
                className="flex-1 md:flex-none px-8 py-3.5 bg-white hover:bg-gray-100 disabled:bg-emerald-600 disabled:text-white text-black font-bold text-sm rounded-2xl transition-all shadow-[0_4px_20px_rgba(255,255,255,0.05)] active:scale-98 cursor-pointer"
              >
                {applied ? "Applied" : "Apply Now"}
              </button>
            )}
          </div>
        </div>

        {/* Four Details Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#121217] border border-white/5 rounded-2xl p-5 space-y-1 shadow-md">
            <span className="text-[10px] font-bold text-[#8A8A93] uppercase tracking-wider">Salary Range</span>
            <p className="text-white font-bold text-sm sm:text-base flex items-center gap-1">
              <FiDollarSign className="text-emerald-400 shrink-0" />
              <span>{Number(job.minSalary).toLocaleString()} - {Number(job.maxSalary).toLocaleString()} {job.currency || "USD"}</span>
            </p>
          </div>
          <div className="bg-[#121217] border border-white/5 rounded-2xl p-5 space-y-1 shadow-md">
            <span className="text-[10px] font-bold text-[#8A8A93] uppercase tracking-wider">Location</span>
            <p className="text-white font-bold text-sm sm:text-base flex items-center gap-1 truncate">
              <FiMapPin className="text-rose-400 shrink-0" />
              <span>{job.isRemote ? "Remote Work" : `${job.city || "Various"}, ${job.country || ""}`}</span>
            </p>
          </div>
          <div className="bg-[#121217] border border-white/5 rounded-2xl p-5 space-y-1 shadow-md">
            <span className="text-[10px] font-bold text-[#8A8A93] uppercase tracking-wider">Job Type</span>
            <p className="text-white font-bold text-sm sm:text-base flex items-center gap-1">
              <FiBriefcase className="text-violet-400 shrink-0" />
              <span>{job.type}</span>
            </p>
          </div>
          <div className="bg-[#121217] border border-white/5 rounded-2xl p-5 space-y-1 shadow-md">
            <span className="text-[10px] font-bold text-[#8A8A93] uppercase tracking-wider">Deadline</span>
            <p className="text-white font-bold text-sm sm:text-base flex items-center gap-1">
              <FiCalendar className="text-sky-400 shrink-0" />
              <span>{job.deadline}</span>
            </p>
          </div>
        </div>

        {/* Columns Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Job description details */}
          <div className="lg:col-span-8 bg-[#121217] border border-white/5 rounded-3xl p-6 md:p-8 space-y-8 shadow-2xl">
            {/* Responsibilities */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white tracking-tight uppercase tracking-wider text-xs font-semibold text-[#8A8A93]">Job Responsibilities</h2>
              <div className="text-sm text-[#8A8A93] leading-relaxed whitespace-pre-line border-l-2 border-violet-500/30 pl-4">
                {job.responsibilities}
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h2 className="text-lg font-bold text-white tracking-tight uppercase tracking-wider text-xs font-semibold text-[#8A8A93]">Job Requirements</h2>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 border border-violet-500/20 text-violet-400">
                  {job.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white">
                  {job.type}
                </span>
              </div>

              <div className="text-sm text-[#8A8A93] leading-relaxed whitespace-pre-line border-l-2 border-violet-500/30 pl-4">
                {job.requirements}
              </div>
            </div>

            {/* Benefits */}
            {job.benefits && (
              <div className="space-y-4 pt-4 border-t border-white/5">
                <h2 className="text-lg font-bold text-white tracking-tight uppercase tracking-wider text-xs font-semibold text-[#8A8A93]">Benefits & Perks</h2>
                <div className="text-sm text-[#8A8A93] leading-relaxed whitespace-pre-line border-l-2 border-violet-500/30 pl-4">
                  {job.benefits}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Company Overview */}
          <div className="lg:col-span-4 bg-[#121217] border border-white/5 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div>
              <h3 className="text-white font-bold text-md border-b border-white/5 pb-3">Company Overview</h3>
            </div>

            {/* Premium Illustration of Company Space */}
            <div className="h-44 rounded-2xl overflow-hidden relative border border-white/5 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600"
                alt="Workspace"
                className="w-full h-full object-cover opacity-75 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121217] to-transparent z-10"></div>
            </div>

            {/* Size / Employees */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#8A8A93] font-medium flex items-center gap-2">
                <FiUsers className="text-violet-400" />
                Company Size
              </span>
              <span className="text-white font-bold">{companyEmployees}</span>
            </div>

            {/* Industry */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#8A8A93] font-medium flex items-center gap-2">
                <FiTrendingUp className="text-violet-400" />
                Industry
              </span>
              <span className="text-white font-bold truncate max-w-[150px]" title={companyIndustry}>
                {companyIndustry}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <span className="text-xs text-[#8A8A93] font-bold uppercase tracking-wider">About Company</span>
              <p className="text-xs text-[#8A8A93] leading-relaxed line-clamp-4">
                {companyDescription}
              </p>
            </div>

            {/* Website Link */}
            {companyWebsite && (
              <a
                href={
                  companyWebsite.startsWith("http")
                    ? companyWebsite
                    : `https://${companyWebsite}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full mt-4 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white font-semibold text-xs tracking-wide transition-all focus:outline-none"
              >
                <FiGlobe className="text-violet-400 text-sm" />
                Visit Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
