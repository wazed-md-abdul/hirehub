"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiPlus,
  FiMapPin,
  FiGlobe,
  FiBriefcase,
  FiUploadCloud,
  FiX,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiActivity
} from "react-icons/fi";
import { useSession } from "@/lib/auth-client";
import { createCompany, getCompanies } from "@/lib/actions/companies";

const CompanyPage = () => {
  const { data: session } = useSession();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const initialFormState = {
    name: "",
    industry: "Technology",
    website: "",
    location: "",
    employees: "1-10 employees",
    logo: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const loadCompanies = async () => {
    setLoading(true);
    try {
      const data = await getCompanies();
      const userEmail = session?.user?.email || "recruiter@example.com";
      const userCompanies = (data || []).filter(
        (c) => c.recruiterEmail === userEmail
      );
      setCompanies(userCompanies);
    } catch (error) {
      console.error("Error loading companies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const mockImgBBUpload = async (file) => {
    console.log("Mock sending to ImgBB server. File:", file.name);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await mockImgBBUpload(file);
      setFormData((prev) => ({ ...prev, logo: imageUrl }));
    } catch (error) {
      console.error("Mock upload failed:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.location.trim() || !formData.description.trim()) {
      alert("Please fill out all required fields.");
      return;
    }

    const payload = {
      ...formData,
      status: "pending",
      recruiterEmail: session?.user?.email || "recruiter@example.com",
    };

    try {
      const response = await createCompany(payload);
      if (response.acknowledged === true || response._id || response.success) {
        alert("Company registered successfully!");
        setFormData(initialFormState);
        setIsModalOpen(false);
        loadCompanies();
      } else {
        alert("Failed to register company. Please try again.");
      }
    } catch (error) {
      console.error("Error registering company:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#09090B] space-y-6 min-h-screen relative text-white">
      {/* Header and Add Button */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Companies</h1>
          <p className="text-[#8A8A93] text-xs mt-0.5">
            Manage your registered organizations and view approval status.
          </p>
        </div>
        {companies.length > 0 && (
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[#8A8A93]">
              {companies.length} {companies.length === 1 ? "Company" : "Companies"}
            </span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-black font-semibold text-sm transition-all active:scale-95 focus:outline-none cursor-pointer"
            >
              <FiPlus className="w-4 h-4" />
              Add Company
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-[#8A8A93] text-sm gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin"></div>
            <span>Fetching organization list...</span>
          </div>
        ) : companies.length === 0 ? (
          /* Empty State */
          <div className="py-24 border border-dashed border-white/10 rounded-[24px] bg-[#121217] flex flex-col items-center justify-center text-center p-6 max-w-xl mx-auto mt-12">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-6 text-[#8A8A93]">
              <FiBriefcase className="w-8 h-8 text-violet-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Company Registered</h3>
            <p className="text-[#8A8A93] text-sm max-w-sm mb-8 leading-relaxed">
              Register your business details to start hiring on HireLoop. Your postings will be linked to your organization.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-gray-100 text-black font-bold text-sm shadow-[0_4px_20px_rgba(255,255,255,0.05)] transition-all active:scale-95 focus:outline-none cursor-pointer"
            >
              <FiPlus className="w-4.5 h-4.5" />
              Register a Company
            </button>
          </div>
        ) : (
          /* Company Cards List */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <div
                key={company._id}
                className="bg-[#121217] border border-white/5 rounded-[24px] p-6 space-y-4 flex flex-col justify-between hover:border-white/10 transition-all group"
              >
                <div className="space-y-4">
                  {/* Top: Logo & Status Badge */}
                  <div className="flex items-start justify-between">
                    {company.logo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-12 h-12 rounded-xl object-cover border border-white/10"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {company.name ? company.name[0].toUpperCase() : "C"}
                      </div>
                    )}

                    {company.status === "pending" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-amber-500/10 border-amber-500/20 text-amber-400">
                        <FiClock className="w-3.5 h-3.5 animate-pulse" />
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                        <FiCheckCircle className="w-3.5 h-3.5" />
                        Approved
                      </span>
                    )}
                  </div>

                  {/* Body: Name & Details */}
                  <div>
                    <h2 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors">
                      {company.name}
                    </h2>
                    <p className="text-xs text-[#8A8A93] mt-1">
                      {company.industry} • {company.employees}
                    </p>
                  </div>

                  {/* Location & Description */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#8A8A93]">
                      <FiMapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{company.location}</span>
                    </div>
                    <p className="text-xs text-[#8A8A93] line-clamp-3 leading-relaxed">
                      {company.description}
                    </p>
                  </div>
                </div>

                {/* Footer: Website Link */}
                {company.website && (
                  <div className="pt-4 border-t border-white/5 mt-2">
                    <a
                      href={
                        company.website.startsWith("http")
                          ? company.website
                          : `https://${company.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 font-semibold transition-colors"
                    >
                      <FiGlobe className="w-3.5 h-3.5" />
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal - Register New Company */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <div className="bg-[#121217] border border-white/10 rounded-[24px] w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-1.5 rounded-lg bg-white/5 border border-white/5 text-[#8A8A93] hover:text-white hover:bg-white/10 transition-all focus:outline-none"
            >
              <FiX className="w-4 h-4" />
            </button>

            {/* Form Header */}
            <div className="p-6 md:p-8 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Register New Company</h2>
              <p className="text-xs text-[#8A8A93] mt-1">
                Enter your business details to start hiring on HireLoop.
              </p>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-white font-semibold text-sm">Company Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Acme Corp"
                    className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-[#6B6B75] text-sm"
                  />
                </div>

                {/* Industry / Category */}
                <div className="flex flex-col gap-2">
                  <label className="text-white font-semibold text-sm">Industry / Category</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Retail">Retail</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Website URL */}
                <div className="flex flex-col gap-2">
                  <label className="text-white font-semibold text-sm">Website URL</label>
                  <div className="flex rounded-xl overflow-hidden border border-white/10 focus-within:border-violet-500 transition-all">
                    <span className="bg-[#0C0C10] border-r border-white/10 px-4 py-3 text-[#8A8A93] text-sm select-none">
                      https://
                    </span>
                    <input
                      type="text"
                      name="website"
                      required
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="www.company.com"
                      className="flex-1 bg-transparent px-4 py-3 text-white focus:outline-none text-sm placeholder:text-[#6B6B75]"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-2">
                  <label className="text-white font-semibold text-sm">Location</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A93] text-base" />
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                      className="w-full bg-[#0C0C10] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-[#6B6B75] text-sm"
                    />
                  </div>
                </div>

                {/* Employee Count Range */}
                <div className="flex flex-col gap-2">
                  <label className="text-white font-semibold text-sm">Employee Count Range</label>
                  <select
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                    className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm"
                  >
                    <option value="1-10 employees">1-10 employees</option>
                    <option value="11-50 employees">11-50 employees</option>
                    <option value="51-200 employees">51-200 employees</option>
                    <option value="201-500 employees">201-500 employees</option>
                    <option value="501+ employees">501+ employees</option>
                  </select>
                </div>

                {/* Company Logo Upload */}
                <div className="flex flex-col gap-2">
                  <label className="text-white font-semibold text-sm">Company Logo</label>
                  <label className="cursor-pointer flex items-center gap-3 bg-[#0C0C10] border border-white/10 hover:border-white/20 transition-all rounded-xl p-3 w-full">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    {formData.logo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={formData.logo}
                        alt="Preview"
                        className="w-10 h-10 rounded-lg object-cover border border-white/10"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-[#8A8A93]">
                        {uploading ? (
                          <div className="w-4 h-4 rounded-full border border-violet-500 border-t-transparent animate-spin" />
                        ) : (
                          <FiUploadCloud className="w-5 h-5" />
                        )}
                      </div>
                    )}
                    <div className="flex flex-col text-left">
                      <span className="text-white text-xs font-semibold">
                        {uploading
                          ? "Uploading..."
                          : formData.logo
                          ? "Logo Uploaded"
                          : "Upload image"}
                      </span>
                      <span className="text-[#8A8A93] text-[10px]">PNG, JPG up to 5MB</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Brief Description */}
              <div className="flex flex-col gap-2">
                <label className="text-white font-semibold text-sm">Brief Description</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about your company's mission and culture..."
                  className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-[#6B6B75] text-sm resize-none"
                ></textarea>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-4 border-t border-white/5 pt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 text-white text-sm font-semibold transition-all focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2.5 rounded-xl bg-white hover:bg-gray-100 disabled:bg-gray-500 text-black text-sm font-bold transition-all active:scale-[0.98] focus:outline-none cursor-pointer"
                >
                  Register Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
