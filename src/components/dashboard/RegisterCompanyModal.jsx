"use client";

import React, { useState } from "react";
import { FiX, FiMapPin, FiUpload } from "react-icons/fi";

const RegisterCompanyModal = ({ isOpen, onClose, onSubmit }) => {
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
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const mockImgBBUpload = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!apiKey || apiKey === "your_imgbb_api_key_here") {
        const localUrl = await mockImgBBUpload(file);
        setFormData((prev) => ({ ...prev, logo: localUrl }));
        return;
      }
      
      const body = new FormData();
      body.append("image", file);
      
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body,
      });
      const result = await res.json();
      if (result.success) {
        setFormData((prev) => ({ ...prev, logo: result.data.url }));
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      const localUrl = await mockImgBBUpload(file);
      setFormData((prev) => ({ ...prev, logo: localUrl }));
    } finally {
      setUploading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.location.trim() || !formData.description.trim()) {
      alert("Please fill out all required fields.");
      return;
    }
    onSubmit(formData);
    setFormData(initialFormState);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="bg-[#121217] border border-white/10 rounded-[24px] w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 shadow-2xl relative text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-lg text-[#8A8A93] hover:text-white hover:bg-white/5 transition-all focus:outline-none cursor-pointer"
        >
          <FiX className="w-4.5 h-4.5" />
        </button>

        {/* Form Header */}
        <div className="p-6 md:p-8 border-b border-white/5">
          <h2 className="text-xl font-bold text-white">Register New Company</h2>
          <p className="text-xs text-[#8A8A93] mt-1">
            Enter your business details to start hiring on HireLoop.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleFormSubmit} className="p-6 md:p-8 space-y-6">
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
                className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all placeholder:text-[#6B6B75] text-sm"
              />
            </div>

            {/* Industry / Category */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-semibold text-sm">Industry / Category</label>
              <div className="relative">
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all text-sm appearance-none cursor-pointer pr-10"
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
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8A8A93]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Website URL */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-semibold text-sm">Website URL</label>
              <div className="flex rounded-xl overflow-hidden border border-white/10 focus-within:border-white/20 focus-within:ring-1 focus-within:ring-white/20 transition-all">
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
                  className="w-full bg-[#0C0C10] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all placeholder:text-[#6B6B75] text-sm"
                />
              </div>
            </div>

            {/* Employee Count Range */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-semibold text-sm">Employee Count Range</label>
              <div className="relative">
                <select
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                  className="w-full bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all text-sm appearance-none cursor-pointer pr-10"
                >
                  <option value="1-10 employees">1-10 employees</option>
                  <option value="11-50 employees">11-50 employees</option>
                  <option value="51-200 employees">51-200 employees</option>
                  <option value="201-500 employees">201-500 employees</option>
                  <option value="501+ employees">501+ employees</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8A8A93]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Company Logo Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-semibold text-sm">Company Logo</label>
              <label className="cursor-pointer flex items-center gap-3 bg-[#0C0C10] border border-white/10 hover:border-white/20 transition-all rounded-xl p-3 w-full h-[50px]">
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
                    className="w-8 h-8 rounded-lg object-cover border border-white/10"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-[#8A8A93]">
                    {uploading ? (
                      <div className="w-3.5 h-3.5 rounded-full border border-white border-t-transparent animate-spin" />
                    ) : (
                      <FiUpload className="w-4.5 h-4.5" />
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
              className="bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all placeholder:text-[#6B6B75] text-sm resize-none"
            ></textarea>
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
              disabled={uploading}
              className="px-6 py-2.5 rounded-xl bg-white hover:bg-gray-100 disabled:bg-gray-500 text-black text-sm font-bold transition-all active:scale-[0.98] focus:outline-none cursor-pointer"
            >
              Register Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterCompanyModal;
