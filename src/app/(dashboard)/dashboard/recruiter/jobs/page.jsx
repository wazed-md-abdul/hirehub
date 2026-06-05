"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
  FiZap,
  FiAlertCircle
} from "react-icons/fi";
import { getJobs } from "@/lib/api/jobs";
import { deleteJob } from "@/lib/actions/jobs";

const ManageJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Fetch jobs for 'company_123'
        const data = await getJobs("company_123");
        setJobs(data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (confirm("Are you sure you want to delete this job post?")) {
      try {
        const response = await deleteJob(jobId);
        // MongoDB deletedCount is typically returned in backend responses, or look for acknowledgment
        if (response.deletedCount > 0 || response.acknowledged || response.success) {
          alert("Job deleted successfully!");
          setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        } else {
          alert("Failed to delete job post. Please try again.");
        }
      } catch (error) {
        console.error("Failed to delete job:", error);
        alert("Error occurred while deleting the job.");
      }
    }
  };

  const handleUpdateClick = (job) => {
    alert(`Update functionality modal coming soon!\nJob Title: ${job.title}\nJob ID: ${job._id}`);
  };

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase();
    return (
      job.title?.toLowerCase().includes(query) ||
      job.category?.toLowerCase().includes(query) ||
      job.type?.toLowerCase().includes(query) ||
      job.city?.toLowerCase().includes(query) ||
      job.country?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#09090B] space-y-6 min-h-screen">
      {/* Header and Add Job Link */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Manage Jobs</h1>
          <p className="text-[#8A8A93] text-xs mt-0.5">
            Monitor, update, and manage your organization's open roles.
          </p>
        </div>
        <Link href="/dashboard/recruiter/jobs/new">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-black font-semibold text-sm transition-all active:scale-95 focus:outline-none cursor-pointer">
            <FiPlus className="w-4 h-4" />
            Post New Job
          </button>
        </Link>
      </div>

      {/* Main Content Card */}
      <div className="max-w-7xl mx-auto bg-[#121217] border border-white/5 rounded-[24px] p-6 space-y-6">

        {/* Search Bar container */}
        <div className="relative w-full max-w-md group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A93] group-focus-within:text-violet-500 transition-colors text-lg" />
          <input
            type="text"
            placeholder="Search jobs by title, category, type, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0C0C10] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all placeholder:text-[#6B6B75] text-sm"
          />
        </div>

        {/* Jobs Table */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-[#8A8A93] text-sm gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin"></div>
            <span>Loading job postings...</span>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="py-16 border border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center text-center p-6">
            <FiAlertCircle className="w-10 h-10 text-[#6B6B75] mb-3" />
            <h3 className="text-white font-semibold text-sm">No jobs found</h3>
            <p className="text-[#8A8A93] text-xs max-w-xs mt-1">
              {searchQuery ? "Try refining your search terms." : "You haven't posted any job openings yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-white/5 text-[11px] text-[#8A8A93] uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Job Details</th>
                  <th className="pb-3 font-semibold">Category & Type</th>
                  <th className="pb-3 font-semibold">Salary Range</th>
                  <th className="pb-3 font-semibold">Location</th>
                  <th className="pb-3 font-semibold">Deadline</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredJobs.map((job) => (
                  <tr key={job._id} className="group hover:bg-white/[0.01]">
                    {/* Job Title & Icon */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                          <FiBriefcase className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-white font-medium group-hover:text-violet-400 transition-colors truncate">
                            {job.title}
                          </span>
                          <span className="text-[#6B6B75] text-[11px] mt-0.5">
                            ID: {job._id ? job._id.substring(job._id.length - 8) : "N/A"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category & Type */}
                    <td className="py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[#8A8A93] text-xs">{job.category}</span>
                        <span className="inline-flex w-fit items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/5 border border-white/10 text-white">
                          {job.type}
                        </span>
                      </div>
                    </td>

                    {/* Salary Range */}
                    <td className="py-4 text-[#8A8A93]">
                      <div className="flex items-center gap-1 text-xs">
                        <FiDollarSign className="w-3.5 h-3.5 text-emerald-400" />
                        <span>
                          {Number(job.minSalary).toLocaleString()} - {Number(job.maxSalary).toLocaleString()} {job.currency}
                        </span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-4 text-[#8A8A93]">
                      <div className="flex items-center gap-1.5 text-xs">
                        <FiMapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span className="truncate">
                          {job.isRemote ? "Remote" : `${job.city}, ${job.country}`}
                        </span>
                      </div>
                    </td>

                    {/* Deadline */}
                    <td className="py-4 text-[#8A8A93]">
                      <div className="flex items-center gap-1.5 text-xs">
                        <FiCalendar className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{job.deadline}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                        <FiZap className="w-3 h-3" />
                        Active
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleUpdateClick(job)}
                          title="Edit Job"
                          className="p-2 rounded-lg bg-white/5 border border-white/5 text-[#8A8A93] hover:text-white hover:border-white/10 hover:bg-white/10 transition-all focus:outline-none"
                        >
                          <FiEdit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          title="Delete Job"
                          className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 transition-all focus:outline-none"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageJobsPage;
