"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { getJobById } from "@/lib/api/jobs";
import { createApplication, getApplications } from "@/lib/actions/application";
import {
  FiArrowLeft,
  FiBriefcase,
  FiUser,
  FiMail,
  FiPhone,
  FiFileText,
  FiLink,
  FiGlobe,
  FiCheckCircle,
  FiMapPin,
  FiDollarSign,
  FiLayers
} from "react-icons/fi";

export default function JobApply() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending: isSessionLoading } = useSession();
  const userId = session?.user?.id || null;
  const [applications, setApplications] = useState([]);
  
  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form fields
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateEmail: "",
    candidatePhone: "",
    resumeUrl: "",
    portfolioUrl: "",
    coverLetter: "",
    experienceYears: "1-3 years",
  });

  // Pre-fill form fields when session loads
  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        candidateName: session.user.name || "",
        candidateEmail: session.user.email || "",
      }));
    }
  }, [session]);

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      const applicants = await getApplications(userId);
      setApplications(applicants);
      if (!id) return;
      setLoadingJob(true);
      try {
        const data = await getJobById(id);
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoadingJob(false);
      }
    };
    fetchJob();
  }, [id, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Prepare all data to be console logged as requested
    const companyData = job ? {
      id: job.company?.id || job.companyId,
      name: job.company?.name || job.companyName || "Acme Corp",
      industry: job.company?.industry || "Technology",
      logo: job.company?.logo || job.companyLogo,
      employees: job.company?.employees,
      website: job.company?.website,
      description: job.company?.description
    } : null;

    const applicationPayload = {
      jobId: id,
      jobTitle: job?.title,
      userId: session?.user?.id || null,
      userName: session?.user?.name || null,
      userEmail: session?.user?.email || null,
      companyData,
      formDetails: {
        ...formData
      },
      submittedAt: new Date().toISOString()
    };

    // Console log the required data
    console.log("=== Job Application Submitted ===");
    console.log(JSON.stringify(applicationPayload, null, 2));

    try {
      const response = await createApplication(applicationPayload);
      console.log("Database Response:", response);
      if (response.insertedId) {
        setSubmitted(true);
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application. Check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isSessionLoading || loadingJob) {
    return (
      <div className="flex-1 p-6 md:p-8 bg-[#0B0B0F] min-h-screen flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin"></div>
          <p className="text-xs text-[#8A8A93]">Loading application page...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex-1 p-6 md:p-8 bg-[#0B0B0F] min-h-screen flex items-center justify-center text-white">
        <div className="max-w-md w-full bg-[#121217] border border-white/5 rounded-[24px] p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto text-rose-400">
            <FiArrowLeft className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Job Not Found</h2>
            <p className="text-sm text-[#8A8A93] leading-relaxed">
              We couldn't load the details for this job position.
            </p>
          </div>
          <button
            onClick={() => router.push("/jobs")}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-gray-100 text-black font-bold text-sm transition-all focus:outline-none cursor-pointer"
          >
            Browse Jobs
          </button>
        </div>
      </div>
    );
  }

  const companyName = job.company?.name || job.companyName || "Acme Corp";
  const companyLogo = job.company?.logo || job.companyLogo;

  if (submitted) {
    return (
      <div className="bg-[#0B0B0F] min-h-screen text-white pt-28 pb-24 font-sans flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-[#121217] border border-white/5 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl"></div>
          
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
            <FiCheckCircle className="w-10 h-10" />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Application Sent!</h2>
            <p className="text-sm text-[#8A8A93] leading-relaxed max-w-md mx-auto">
              Your application for <span className="text-white font-semibold">{job.title}</span> at <span className="text-white font-semibold">{companyName}</span> has been processed. Check the developer console for logged submission details.
            </p>
          </div>

          <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push(`/jobs/${id}`)}
              className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white font-bold text-sm transition-all focus:outline-none cursor-pointer"
            >
              Back to Job Details
            </button>
            <button
              onClick={() => router.push("/jobs")}
              className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-gray-100 text-black font-bold text-sm transition-all focus:outline-none cursor-pointer"
            >
              Browse More Jobs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0F] min-h-screen text-white pt-28 pb-24 font-sans">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-6xl space-y-8">
        {/* Monthly Application Limit Progress Bar */}
        <div className="w-full bg-[#121217]/50 backdrop-blur-sm border border-white/5 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-violet-500 to-fuchsia-500"></div>
          <div className="pl-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-xl font-bold text-white">Monthly Application Status</h1>
                <p className="text-xs text-[#8A8A93] mt-0.5">Based on your current plan's application limit.</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-2xl font-black text-white">{applications.length}</span>
                <span className="text-[#8A8A93] text-sm"> / 3 applied this month</span>
              </div>
            </div>
            <div className="w-full bg-white/[0.03] rounded-full h-3 overflow-hidden border border-white/5 relative">
              <div
                className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${
                  applications.length >= 3 
                    ? "from-rose-500 to-red-500" 
                    : "from-violet-500 to-fuchsia-500"
                }`}
                style={{ width: `${Math.min((applications.length / 3) * 100, 100)}%` }}
              />
            </div>
            {applications.length >= 3 && (
              <div className="mt-4 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between gap-3 flex-wrap">
                <p className="text-xs text-rose-300">You have reached the monthly application limit of your Free plan.</p>
                <Link href="/pricing" className="text-xs font-semibold text-rose-400 hover:text-rose-300 hover:underline">
                  Upgrade to Pro for Unlimited Applications &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* Back Link */}
        <Link
          href={`/jobs/${id}`}
          className="inline-flex items-center gap-2 text-[#8A8A93] hover:text-white transition-colors text-sm font-semibold"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Job details
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Job Info Cards */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#121217] border border-white/5 rounded-3xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-violet-600/10 rounded-full blur-2xl"></div>
              
              <div className="flex items-center gap-4">
                {companyLogo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={companyLogo}
                    alt={companyName}
                    className="w-12 h-12 rounded-xl object-cover border border-white/10"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                    {companyName[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="text-xs font-bold text-[#8A8A93] uppercase tracking-wider">Applying For</h3>
                  <h2 className="text-lg font-bold text-white leading-tight">{job.title}</h2>
                  <p className="text-xs text-[#8A8A93]">{companyName}</p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 space-y-3 text-sm text-[#8A8A93]">
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-violet-400" />
                  <span>{job.isRemote ? "Remote" : `${job.city || "Various"}, ${job.country || ""}`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiBriefcase className="text-violet-400" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiDollarSign className="text-violet-400" />
                  <span>{Number(job.minSalary).toLocaleString()} - {Number(job.maxSalary).toLocaleString()} {job.currency || "USD"}</span>
                </div>
              </div>
            </div>

            {/* Instruction Card */}
            <div className="bg-[#121217] border border-white/5 rounded-3xl p-6 space-y-4 shadow-2xl">
              <h3 className="text-sm font-bold text-white">Application Note</h3>
              <p className="text-xs text-[#8A8A93] leading-relaxed">
                Fill in the details accurately. The application details will be linked to your profile and processed directly by our hiring portal. Make sure your resume URL is public and accessible.
              </p>
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-8 bg-[#121217] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-fuchsia-600/5 rounded-full blur-3xl"></div>
            
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white tracking-tight">Submit Your Application</h1>
              <p className="text-xs text-[#8A8A93]">Ensure your contact information is up to date.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="candidateName" className="text-xs font-bold text-[#8A8A93] uppercase tracking-wider flex items-center gap-1.5">
                    <FiUser className="text-violet-400" /> Full Name
                  </label>
                  <input
                    type="text"
                    id="candidateName"
                    name="candidateName"
                    required
                    value={formData.candidateName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-[#0B0B0F] border border-white/5 focus:border-violet-500/50 hover:border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 transition-all outline-none"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="candidateEmail" className="text-xs font-bold text-[#8A8A93] uppercase tracking-wider flex items-center gap-1.5">
                    <FiMail className="text-violet-400" /> Email Address
                  </label>
                  <input
                    type="email"
                    id="candidateEmail"
                    name="candidateEmail"
                    required
                    value={formData.candidateEmail}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full bg-[#0B0B0F] border border-white/5 focus:border-violet-500/50 hover:border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label htmlFor="candidatePhone" className="text-xs font-bold text-[#8A8A93] uppercase tracking-wider flex items-center gap-1.5">
                    <FiPhone className="text-violet-400" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    id="candidatePhone"
                    name="candidatePhone"
                    required
                    value={formData.candidatePhone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#0B0B0F] border border-white/5 focus:border-violet-500/50 hover:border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 transition-all outline-none"
                  />
                </div>

                {/* Experience Select */}
                <div className="space-y-1.5">
                  <label htmlFor="experienceYears" className="text-xs font-bold text-[#8A8A93] uppercase tracking-wider flex items-center gap-1.5">
                    <FiLayers className="text-violet-400" /> Years of Experience
                  </label>
                  <div className="relative">
                    <select
                      id="experienceYears"
                      name="experienceYears"
                      required
                      value={formData.experienceYears}
                      onChange={handleChange}
                      className="w-full bg-[#0B0B0F] border border-white/5 focus:border-violet-500/50 hover:border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 transition-all outline-none appearance-none cursor-pointer"
                    >
                      <option value="Entry-level">Entry-level (0-1 years)</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">Senior (5+ years)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8A8A93]">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume URL */}
              <div className="space-y-1.5">
                <label htmlFor="resumeUrl" className="text-xs font-bold text-[#8A8A93] uppercase tracking-wider flex items-center gap-1.5">
                  <FiLink className="text-violet-400" /> Resume Link (PDF / Drive)
                </label>
                <input
                  type="url"
                  id="resumeUrl"
                  name="resumeUrl"
                  required
                  value={formData.resumeUrl}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/file/... or link to your CV"
                  className="w-full bg-[#0B0B0F] border border-white/5 focus:border-violet-500/50 hover:border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 transition-all outline-none"
                />
              </div>

              {/* Portfolio URL */}
              <div className="space-y-1.5">
                <label htmlFor="portfolioUrl" className="text-xs font-bold text-[#8A8A93] uppercase tracking-wider flex items-center gap-1.5">
                  <FiGlobe className="text-violet-400" /> Portfolio / LinkedIn Link
                </label>
                <input
                  type="url"
                  id="portfolioUrl"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/yourusername or https://linkedin.com/in/..."
                  className="w-full bg-[#0B0B0F] border border-white/5 focus:border-violet-500/50 hover:border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 transition-all outline-none"
                />
              </div>

              {/* Cover Letter */}
              <div className="space-y-1.5">
                <label htmlFor="coverLetter" className="text-xs font-bold text-[#8A8A93] uppercase tracking-wider flex items-center gap-1.5">
                  <FiFileText className="text-violet-400" /> Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  required
                  rows="4"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Explain why you are the perfect candidate for this job position..."
                  className="w-full bg-[#0B0B0F] border border-white/5 focus:border-violet-500/50 hover:border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 transition-all outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-white hover:bg-gray-100 disabled:bg-white/20 disabled:text-gray-500 text-black font-bold text-sm tracking-wide transition-all shadow-[0_4px_20px_rgba(255,255,255,0.05)] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin"></div>
                      Submitting Application...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
