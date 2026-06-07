"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { getCompanies } from "@/lib/actions/companies";
import { createJob } from "@/lib/actions/jobs";
import { FiArrowLeft, FiBriefcase, FiDollarSign, FiMapPin, FiCalendar, FiFileText, FiAlertCircle } from "react-icons/fi";

const NewJobPage = () => {
  const { data: session, isPending: sessionPending } = useSession();
  const [company, setCompany] = useState(null);
  const [loadingCompany, setLoadingCompany] = useState(true);
  const router = useRouter();

  const initialFormState = {
    title: "",
    category: "Engineering",
    type: "Full-time",
    minSalary: "",
    maxSalary: "",
    currency: "USD",
    city: "",
    country: "",
    isRemote: false,
    deadline: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (sessionPending) return;
      if (!session?.user?.id) {
        setLoadingCompany(false);
        return;
      }
      try {
        const data = await getCompanies(session.user.id);
        if (data && data.length > 0) {
          setCompany(data[0]);
        }
      } catch (error) {
        console.error("Error fetching company details:", error);
      } finally {
        setLoadingCompany(false);
      }
    };
    fetchCompanyData();
  }, [session, sessionPending]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!company) {
      return;
    }

    const payload = {
      ...formData,
      company: company, // Store the complete company object
      companyName: company.name,
      companyLogo: company.logo,
      companyId: company._id,
      userId: session.user.id,
      status: 'active',
      isPubliclyVisible: true,
    };

    const response = await createJob(payload);

    if (response.acknowledged === true || response._id || response.success) {
      alert("Job posted successfully!");
      setFormData(initialFormState);
      router.push("/dashboard/recruiter/jobs");
    } else {
      alert("Failed to post job. Please try again.");
    }
  };

  if (sessionPending || loadingCompany) {
    return (
      <div className="flex-1 p-6 md:p-8 bg-[#09090B] min-h-screen flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
          <p className="text-xs text-[#8A8A93]">Loading details...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex-1 p-6 md:p-8 bg-[#09090B] min-h-screen flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold">Access Denied</h2>
          <p className="text-sm text-[#8A8A93]">Please sign in to post a job.</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex-1 p-6 md:p-8 bg-[#09090B] min-h-screen flex items-center justify-center text-white">
        <div className="max-w-md w-full bg-[#121217] border border-white/5 rounded-[24px] p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-amber-400">
            <FiAlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Company Registration Required</h2>
            <p className="text-sm text-[#8A8A93] leading-relaxed">
              You must register your organization before posting any job listings.
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard/recruiter/company")}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-gray-100 text-black font-bold text-sm transition-all focus:outline-none cursor-pointer"
          >
            Go to Company Registration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 bg-[#09090B] min-h-screen text-white">
      {/* Header and Back Button */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/recruiter"
            className="p-2.5 rounded-xl bg-[#121217] border border-white/5 text-[#8A8A93] hover:text-white hover:border-white/10 transition-all focus:outline-none"
          >
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Post a New Job</h1>
            <p className="text-[#8A8A93] text-xs mt-0.5">Reach top talent by creating a detailed job listing.</p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* Left Column: Job Info */}
        <div className="bg-[#121217] border border-white/5 rounded-[24px] p-4 sm:p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <FiBriefcase className="text-violet-400 w-5 h-5" />
            <h2 className="text-white font-bold text-base">Job Info</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-semibold text-sm">Job Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior Frontend Developer"
                className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-[#6B6B75] text-sm"
              />
            </div>

            {/* Job Category */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-semibold text-sm">Job Category</label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm appearance-none cursor-pointer pr-10"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Product">Product Management</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Data Science">Data Science</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8A8A93]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Job Type */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-semibold text-sm">Job Type</label>
              <div className="relative">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm appearance-none cursor-pointer pr-10"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Remote">Remote Only</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8A8A93]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Application Deadline */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-semibold text-sm flex items-center gap-1.5">
                <FiCalendar className="w-4 h-4 text-[#8A8A93]" />
                Application Deadline
              </label>
              <input
                type="date"
                name="deadline"
                required
                value={formData.deadline}
                onChange={handleChange}
                className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm"
              />
            </div>
          </div>

          {/* Salary Grid */}
          <div className="space-y-3">
            <label className="text-white font-semibold text-sm flex items-center gap-1.5">
              <FiDollarSign className="w-4 h-4 text-[#8A8A93]" />
              Salary Range
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="number"
                name="minSalary"
                required
                value={formData.minSalary}
                onChange={handleChange}
                placeholder="Min Salary"
                className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-[#6B6B75] text-sm"
              />
              <input
                type="number"
                name="maxSalary"
                required
                value={formData.maxSalary}
                onChange={handleChange}
                placeholder="Max Salary"
                className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-[#6B6B75] text-sm"
              />
              <div className="relative">
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm appearance-none cursor-pointer pr-10"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8A8A93]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Location Area */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-white font-semibold text-sm flex items-center gap-1.5">
                <FiMapPin className="w-4 h-4 text-[#8A8A93]" />
                Location
              </label>

              {/* Remote Toggle */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="isRemote"
                  checked={formData.isRemote}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-white/10 rounded-full peer-checked:bg-violet-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full relative"></div>
                <span className="text-[#8A8A93] text-xs font-semibold">Remote Position</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                required={!formData.isRemote}
                disabled={formData.isRemote}
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-[#6B6B75] text-sm disabled:opacity-30 disabled:cursor-not-allowed"
              />
              <input
                type="text"
                name="country"
                required={!formData.isRemote}
                disabled={formData.isRemote}
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-[#6B6B75] text-sm disabled:opacity-30 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Job Description, Company & Actions */}
        <div className="space-y-6">
          {/* Job Description card */}
          <div className="bg-[#121217] border border-white/5 rounded-[24px] p-4 sm:p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <FiFileText className="text-violet-400 w-5 h-5" />
              <h2 className="text-white font-bold text-base">Job Description</h2>
            </div>

            {/* Responsibilities */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-semibold text-sm">Responsibilities</label>
              <textarea
                name="responsibilities"
                required
                rows={4}
                value={formData.responsibilities}
                onChange={handleChange}
                placeholder="Detail the primary duties and responsibilities..."
                className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-[#6B6B75] text-sm resize-y font-sans"
              ></textarea>
            </div>

            {/* Requirements */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-semibold text-sm">Requirements</label>
              <textarea
                name="requirements"
                required
                rows={4}
                value={formData.requirements}
                onChange={handleChange}
                placeholder="List down prerequisites, experience, and certifications..."
                className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-[#6B6B75] text-sm resize-y font-sans"
              ></textarea>
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-semibold text-sm">Benefits (Optional)</label>
              <textarea
                name="benefits"
                rows={3}
                value={formData.benefits}
                onChange={handleChange}
                placeholder="Perks, insurance, allowances..."
                className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-[#6B6B75] text-sm resize-y font-sans"
              ></textarea>
            </div>
          </div>

          {/* Company details */}
          <div className="bg-[#121217] border border-white/5 rounded-[24px] p-4 sm:p-6 md:p-8 space-y-4">
            <label className="text-[#8A8A93] font-semibold text-xs uppercase tracking-wider">
              Posting Organization
            </label>
            <div className="flex items-center gap-4">
              {company?.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-12 h-12 rounded-xl object-cover border border-white/10"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {company?.name ? company.name[0].toUpperCase() : "C"}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm">{company?.name || "No Company"}</span>
                <span className="text-[#8A8A93] text-xs capitalize">
                  Auto-filled ({company?.status || "Pending"} Company)
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-2">
            <Link
              href="/dashboard/recruiter/jobs"
              className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white font-semibold text-sm transition-all focus:outline-none"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-white hover:bg-gray-100 text-black font-bold text-sm shadow-[0_4px_20px_rgba(255,255,255,0.05)] transition-all active:scale-[0.98] focus:outline-none cursor-pointer"
            >
              Post Job
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default NewJobPage;
