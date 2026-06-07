"use client";

import React, { useState, useEffect } from "react";
import { FiX, FiBriefcase, FiDollarSign, FiMapPin, FiCalendar, FiFileText } from "react-icons/fi";

const UpdateJobModal = ({ isOpen, onClose, onSubmit, jobData }) => {
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
    if (isOpen && jobData) {
      setFormData({
        title: jobData.title || "",
        category: jobData.category || "Engineering",
        type: jobData.type || "Full-time",
        minSalary: jobData.minSalary || "",
        maxSalary: jobData.maxSalary || "",
        currency: jobData.currency || "USD",
        city: jobData.city || "",
        country: jobData.country || "",
        isRemote: jobData.isRemote || false,
        deadline: jobData.deadline || "",
        responsibilities: jobData.responsibilities || "",
        requirements: jobData.requirements || "",
        benefits: jobData.benefits || "",
      });
    }
  }, [isOpen, jobData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.deadline.trim() || !formData.responsibilities.trim() || !formData.requirements.trim()) {
      alert("Please fill out all required fields.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="bg-[#121217] border border-white/10 rounded-[24px] w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 shadow-2xl relative text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-lg text-[#8A8A93] hover:text-white hover:bg-white/5 transition-all focus:outline-none cursor-pointer"
        >
          <FiX className="w-4.5 h-4.5" />
        </button>

        {/* Form Header */}
        <div className="p-6 md:p-8 border-b border-white/5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FiBriefcase className="text-violet-400" />
            Update Job Details
          </h2>
          <p className="text-xs text-[#8A8A93] mt-1">
            Modify the job post information below.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left Column: Job Info */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-[#6B6B75] text-sm"
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
                      className="w-full bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all text-sm appearance-none cursor-pointer pr-10"
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
                      className="w-full bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all text-sm appearance-none cursor-pointer pr-10"
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
                    className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all text-sm"
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
                    className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-[#6B6B75] text-sm"
                  />
                  <input
                    type="number"
                    name="maxSalary"
                    required
                    value={formData.maxSalary}
                    onChange={handleChange}
                    placeholder="Max Salary"
                    className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-[#6B6B75] text-sm"
                  />
                  <div className="relative">
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="w-full bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all text-sm appearance-none cursor-pointer pr-10"
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
                    className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-[#6B6B75] text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                  />
                  <input
                    type="text"
                    name="country"
                    required={!formData.isRemote}
                    disabled={formData.isRemote}
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-[#6B6B75] text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Job Description details */}
            <div className="space-y-6">
              {/* Responsibilities */}
              <div className="flex flex-col gap-2">
                <label className="text-white font-semibold text-sm">Responsibilities</label>
                <textarea
                  name="responsibilities"
                  required
                  rows={4}
                  value={formData.responsibilities}
                  onChange={handleChange}
                  placeholder="Detail the primary duties..."
                  className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-[#6B6B75] text-sm resize-none"
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
                  placeholder="List prerequisites..."
                  className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-[#6B6B75] text-sm resize-none"
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
                  className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-[#6B6B75] text-sm resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-4 border-t border-white/5 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 text-white text-sm font-semibold transition-all focus:outline-none cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-black text-sm font-bold transition-all active:scale-[0.98] focus:outline-none cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJobModal;
