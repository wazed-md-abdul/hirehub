"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiBriefcase, FiDollarSign, FiMapPin, FiCalendar, FiFileText } from "react-icons/fi";
import { createJob } from "@/lib/actions/jobs";

const NewJobPage = () => {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const payload = {
      ...formData,
      company: "TechFlow Inc.", // Auto-filled mock company
      companyId: 'company_123',
      status: 'active',
      isPubliclyVisible: true,
    };


    const response = await createJob(payload);

    if (response.acknowledged === true) {
      alert("Job posted successfully!");
    } else {
      alert("Failed to post job. Please try again.");
    }

    // Reset the form state / refresh the page fields
    setFormData(initialFormState);
  };

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#09090B]">
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
        <div className="bg-[#121217] border border-white/5 rounded-[24px] p-6 md:p-8 space-y-6">
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
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm"
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Product">Product Management</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>

            {/* Job Type */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-semibold text-sm">Job Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote Only</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
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
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
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
          <div className="bg-[#121217] border border-white/5 rounded-[24px] p-6 md:p-8 space-y-6">
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
                className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-[#6B6B75] text-sm resize-y"
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
                className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-[#6B6B75] text-sm resize-y"
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
                className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-[#6B6B75] text-sm resize-y"
              ></textarea>
            </div>
          </div>

          {/* Company details */}
          <div className="bg-[#121217] border border-white/5 rounded-[24px] p-6 md:p-8 space-y-4">
            <label className="text-[#8A8A93] font-semibold text-xs uppercase tracking-wider">
              Posting Organization
            </label>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                T
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm">TechFlow Inc.</span>
                <span className="text-[#8A8A93] text-xs">Auto-filled (Approved Company)</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-2">
            <Link
              href="/dashboard/recruiter"
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
