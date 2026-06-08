"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { getJobs } from "@/lib/api/jobs";
import {
  FiSearch,
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
  FiBookmark,
  FiCompass,
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
  FiCheckCircle
} from "react-icons/fi";

const BrowseJobsPage = () => {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minSalaryFilter, setMinSalaryFilter] = useState("");
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);
  const [sortBy, setSortBy] = useState("recent");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load jobs from backend
  const loadJobs = async () => {
    setLoading(true);
    try {
      // Fetch active jobs from the backend
      const data = await getJobs(null, "active", isRemoteOnly || null, debouncedSearch);
      setJobs(data || []);
    } catch (error) {
      console.error("Error loading jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [debouncedSearch, isRemoteOnly]);

  // Handle job type checkbox toggle
  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  // Handle category checkbox toggle
  const handleCategoryToggle = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedTypes([]);
    setSelectedCategories([]);
    setMinSalaryFilter("");
    setIsRemoteOnly(false);
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Filter jobs locally based on multiple criteria
  const filteredJobs = jobs.filter((job) => {
    // 1. Job Type filter
    if (selectedTypes.length > 0) {
      const matchType = selectedTypes.some(
        (type) => job.type?.toLowerCase() === type.toLowerCase()
      );
      if (!matchType) return false;
    }

    // 2. Category filter
    if (selectedCategories.length > 0) {
      const matchCategory = selectedCategories.some(
        (cat) => job.category?.toLowerCase() === cat.toLowerCase()
      );
      if (!matchCategory) return false;
    }

    // 3. Min Salary filter
    if (minSalaryFilter) {
      const jobMaxSalary = Number(job.maxSalary || 0);
      if (jobMaxSalary < Number(minSalaryFilter)) return false;
    }

    return true;
  });

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    } else if (sortBy === "salary") {
      return Number(b.maxSalary || 0) - Number(a.maxSalary || 0);
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);

  const jobTypesList = [
    { label: "Full-time", value: "Full-time" },
    { label: "Part-time", value: "Part-time" },
    { label: "Contract", value: "Contract" },
    { label: "Internship", value: "Internship" }
  ];

  return (
    <div className="bg-[#0B0B0F] min-h-screen text-white pt-28 pb-24 font-sans">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl space-y-10">

        {/* Search Bar Block */}
        <div className="relative bg-[#121217]/50 border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A93] group-focus-within:text-violet-500 transition-colors text-lg" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by job title, keywords, category, or location..."
                className="w-full bg-[#0C0C10] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-[#6B6B75] text-sm"
              />
            </div>
            <button
              onClick={loadJobs}
              className="w-full md:w-auto px-8 py-4 bg-white hover:bg-gray-100 text-black font-bold text-sm rounded-2xl transition-all shadow-[0_4px_20px_rgba(255,255,255,0.05)] active:scale-98 cursor-pointer whitespace-nowrap"
            >
              Search Jobs
            </button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Filters */}
          <div className="lg:col-span-3 bg-[#121217] border border-white/5 rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-white font-bold text-lg">Filters</h3>
              <button
                onClick={handleResetFilters}
                className="text-xs text-violet-400 hover:text-violet-300 font-semibold transition-colors cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Workplace / Remote switch */}
            <div className="space-y-3">
              <label className="text-xs text-[#8A8A93] font-bold uppercase tracking-wider">Workplace</label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isRemoteOnly}
                  onChange={(e) => setIsRemoteOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-[#0C0C10] text-violet-600 focus:ring-violet-500 cursor-pointer"
                />
                <span className="text-sm text-[#8A8A93] group-hover:text-white transition-colors">Remote Only</span>
              </label>
            </div>

            {/* Job Type Checkboxes */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              <label className="text-xs text-[#8A8A93] font-bold uppercase tracking-wider">Job Type</label>
              <div className="space-y-2.5">
                {jobTypesList.map((type) => (
                  <label key={type.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type.value)}
                      onChange={() => handleTypeToggle(type.value)}
                      className="w-4 h-4 rounded border-white/10 bg-[#0C0C10] text-violet-600 focus:ring-violet-500 cursor-pointer"
                    />
                    <span className="text-sm text-[#8A8A93] group-hover:text-white transition-colors">
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Checkboxes */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <label className="text-xs text-[#8A8A93] font-bold uppercase tracking-wider">Category</label>
              <div className="space-y-2.5">
                {["Engineering", "Design", "Product", "Marketing", "Sales", "Data Science"].map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
                      className="w-4 h-4 rounded border-white/10 bg-[#0C0C10] text-violet-600 focus:ring-violet-500 cursor-pointer"
                    />
                    <span className="text-sm text-[#8A8A93] group-hover:text-white transition-colors">
                      {cat === "Product" ? "Product Management" : cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Minimum Salary Range Filter */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <label className="text-xs text-[#8A8A93] font-bold uppercase tracking-wider flex items-center justify-between">
                <span>Min Salary</span>
                {minSalaryFilter && (
                  <span className="text-violet-400 font-bold font-mono text-[10px]">
                    ${Number(minSalaryFilter).toLocaleString()}
                  </span>
                )}
              </label>
              <input
                type="range"
                min="0"
                max="250000"
                step="10000"
                value={minSalaryFilter}
                onChange={(e) => {
                  setMinSalaryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-violet-500 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-[#6B6B75] font-mono">
                <span>$0</span>
                <span>$250k+</span>
              </div>
            </div>
          </div>

          {/* Right Column: Job Listings */}
          <div className="lg:col-span-9 space-y-6">

            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-xl font-bold tracking-tight text-white">
                Found <span className="text-violet-400 font-extrabold">{sortedJobs.length}</span> Professional Jobs
              </h2>
              <div className="flex items-center gap-2 text-sm text-[#8A8A93]">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#121217] border border-white/5 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-violet-500 cursor-pointer text-xs"
                >
                  <option value="recent">Most Recent</option>
                  <option value="salary">Highest Salary</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="py-24 flex flex-col items-center justify-center text-[#8A8A93] text-sm gap-3 bg-[#121217] border border-white/5 rounded-3xl">
                <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin"></div>
                <span>Loading active job postings...</span>
              </div>
            ) : currentJobs.length === 0 ? (
              <div className="py-24 border border-dashed border-white/10 rounded-3xl bg-[#121217] text-center p-8">
                <FiCompass className="w-12 h-12 text-[#6B6B75] mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg mb-1">No Jobs Found</h3>
                <p className="text-[#8A8A93] text-sm max-w-sm mx-auto">
                  We couldn't find any job openings matching your filters. Try clearing some selections or search terms.
                </p>
              </div>
            ) : (
              /* Job Cards List */
              <div className="space-y-4">
                {currentJobs.map((job) => {
                  const companyLogo = job.company?.logo || job.companyLogo;
                  const companyName = job.company?.name || job.companyName || "Acme Corp";
                  const isRemote = job.isRemote;

                  return (
                    <div
                      key={job._id}
                      className="bg-[#121217] border border-white/5 hover:border-white/10 hover:bg-[#15151C] rounded-3xl p-5 md:p-6 transition-all duration-300 relative group flex flex-col sm:flex-row gap-5 items-start sm:items-center shadow-md hover:shadow-xl"
                    >
                      {/* Logo */}
                      <div className="shrink-0">
                        {companyLogo ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={companyLogo}
                            alt={companyName}
                            className="w-14 h-14 rounded-2xl object-cover border border-white/10"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                            {companyName[0].toUpperCase()}
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 space-y-2.5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link href={`/jobs/${job._id}`} className="block">
                              <h3 className="text-white font-bold text-lg hover:text-violet-400 transition-colors tracking-tight line-clamp-1">
                                {job.title}
                              </h3>
                            </Link>
                            <p className="text-xs text-[#8A8A93] flex items-center gap-1.5 mt-0.5 font-medium">
                              <span className="text-violet-300 font-semibold">{companyName}</span>
                              <span>•</span>
                              <FiMapPin className="text-rose-400" />
                              <span>{isRemote ? "Remote" : `${job.city || "Various"}, ${job.country || ""}`}</span>
                            </p>
                          </div>
                          <button className="text-[#8A8A93] hover:text-white transition-colors shrink-0">
                            <FiBookmark className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Badges Container */}
                        <div className="flex flex-wrap gap-2 pt-1.5">
                          {/* Salary Badge */}
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            <FiDollarSign className="w-3.5 h-3.5" />
                            {Number(job.minSalary).toLocaleString()} - {Number(job.maxSalary).toLocaleString()} {job.currency || "USD"}
                          </span>

                          {/* Type Badge */}
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white">
                            <FiBriefcase className="w-3.5 h-3.5" />
                            {job.type}
                          </span>

                          {/* Work Setup Badge */}
                          {isRemote && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 border border-violet-500/20 text-violet-400">
                              Remote Work
                            </span>
                          )}

                          {/* Tag */}
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 ml-auto">
                            Easy Apply
                          </span>
                        </div>
                      </div>

                      {/* Action Arrow */}
                      <Link
                        href={`/jobs/${job._id}`}
                        className="self-end sm:self-center p-3 rounded-2xl bg-white/5 border border-white/5 text-white hover:bg-violet-600 hover:text-white transition-all active:scale-95 group-hover:border-violet-500/20"
                      >
                        <FiArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-2.5 rounded-xl bg-[#121217] border border-white/5 text-[#8A8A93] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;
                  const isActive = currentPage === pageNumber;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all ${isActive
                          ? "bg-white text-black font-bold"
                          : "bg-[#121217] border border-white/5 text-[#8A8A93] hover:text-white"
                        }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-2.5 rounded-xl bg-[#121217] border border-white/5 text-[#8A8A93] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseJobsPage;
