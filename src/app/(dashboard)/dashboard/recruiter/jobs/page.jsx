"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { getCompanies } from "@/lib/actions/companies";
import { getJobs } from "@/lib/api/jobs";
import { deleteJob, updateJob } from "@/lib/actions/jobs";
import UpdateJobModal from "@/components/dashboard/UpdateJobModal";
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
  FiAlertCircle,
  FiClock
} from "react-icons/fi";

const ManageJobsPage = () => {
  const { data: session, isPending: sessionPending } = useSession();
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isPendingAlertOpen, setIsPendingAlertOpen] = useState(false);

  const router = useRouter();
  const userId = session?.user?.id;

  const fetchCompanyAndJobs = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const companyData = await getCompanies(userId);
      if (companyData && companyData.length > 0) {
        const activeCompany = companyData[0];
        setCompany(activeCompany);
        const jobsData = await getJobs(activeCompany._id);
        setJobs(jobsData || []);
      } else {
        setCompany(null);
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching company or jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionPending && userId) {
      fetchCompanyAndJobs();
    }
  }, [userId, sessionPending]);

  const handleDeleteTrigger = (jobId) => {
    setJobToDelete(jobId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!jobToDelete) return;
    setDeleting(true);
    try {
      const response = await deleteJob(jobToDelete);
      if (response.deletedCount > 0 || response.acknowledged || response.success) {
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobToDelete));
        setIsDeleteDialogOpen(false);
        setJobToDelete(null);
      } else {
        alert("Failed to delete job post. Please try again.");
      }
    } catch (error) {
      console.error("Failed to delete job:", error);
      alert("Error occurred while deleting the job.");
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdateClick = (job) => {
    setSelectedJob(job);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async (updatedData) => {
    if (!selectedJob?._id) return;
    try {
      const payload = {
        ...updatedData,
        company: company,
        companyName: company.name,
        companyLogo: company.logo,
        companyId: company._id,
      };

      const response = await updateJob(selectedJob._id, payload);
      if (response.acknowledged || response.modifiedCount > 0 || response.success) {
        setIsUpdateModalOpen(false);
        setSelectedJob(null);
        await fetchCompanyAndJobs();
      } else {
        alert("Failed to update job. Please try again.");
      }
    } catch (error) {
      console.error("Failed to update job:", error);
      alert("Error occurred while updating the job.");
    }
  };

  const handlePostJobClick = () => {
    if (!company) {
      setIsAlertOpen(true);
    } else if (company.status === "pending") {
      setIsPendingAlertOpen(true);
    } else {
      router.push("/dashboard/recruiter/jobs/new");
    }
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

  if (sessionPending) {
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
          <p className="text-sm text-[#8A8A93]">Please sign in to manage your jobs.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 bg-[#09090B] space-y-6 min-h-screen text-white relative">
      {/* Header and Add Job Link */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Manage Jobs</h1>
          <p className="text-[#8A8A93] text-xs mt-0.5">
            Monitor, update, and manage your organization's open roles.
          </p>
        </div>
        <button
          onClick={handlePostJobClick}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-black font-semibold text-sm transition-all active:scale-95 focus:outline-none cursor-pointer"
        >
          <FiPlus className="w-4 h-4" />
          Post New Job
        </button>
      </div>

      {/* Main Content Card */}
      <div className="max-w-7xl mx-auto bg-[#121217] border border-white/5 rounded-[24px] p-4 sm:p-6 space-y-6">

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
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
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
                          className="p-2 rounded-lg bg-white/5 border border-white/5 text-[#8A8A93] hover:text-white hover:border-white/10 hover:bg-white/10 transition-all focus:outline-none cursor-pointer"
                        >
                          <FiEdit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTrigger(job._id)}
                          title="Delete Job"
                          className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 transition-all focus:outline-none cursor-pointer"
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

      {/* Update Job Modal */}
      <UpdateJobModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedJob(null);
        }}
        onSubmit={handleUpdateSubmit}
        jobData={selectedJob}
      />

      {/* Custom Delete Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            onClick={() => {
              setIsDeleteDialogOpen(false);
              setJobToDelete(null);
            }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          <div className="bg-[#121217] border border-white/10 rounded-[24px] w-full max-w-md p-6 md:p-8 z-10 shadow-2xl relative text-white space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">Delete Job Post</h2>
              <p className="text-sm text-[#8A8A93] leading-relaxed">
                Are you sure you want to delete this job posting? This action is permanent and cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteDialogOpen(false);
                  setJobToDelete(null);
                }}
                className="px-5 py-2.5 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 text-white text-sm font-semibold transition-all focus:outline-none cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDeleteConfirm}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800 text-white text-sm font-semibold transition-all focus:outline-none cursor-pointer flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="w-3.5 h-3.5 rounded-full border border-white border-t-transparent animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Yes, Delete Job"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Shadcn UI Alert Dialog */}
      {isAlertOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            onClick={() => setIsAlertOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          <div className="bg-[#121217] border border-white/10 rounded-[24px] w-full max-w-md p-6 md:p-8 z-10 shadow-2xl relative text-white space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <FiAlertCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Company Registration Required</h2>
              <p className="text-sm text-[#8A8A93] leading-relaxed">
                You must register your company details first before you can post a new job opening.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAlertOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 text-white text-sm font-semibold transition-all focus:outline-none cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAlertOpen(false);
                  router.push("/dashboard/recruiter/company");
                }}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-black text-sm font-semibold transition-all focus:outline-none cursor-pointer"
              >
                Register Company
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Shadcn UI Alert for Pending Approval */}
      {isPendingAlertOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            onClick={() => setIsPendingAlertOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          <div className="bg-[#121217] border border-white/10 rounded-[24px] w-full max-w-md p-6 md:p-8 z-10 shadow-2xl relative text-white space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#8A8A93]">
                <FiClock className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
              <h2 className="text-xl font-bold text-white">Company Approval Pending</h2>
              <p className="text-sm text-[#8A8A93] leading-relaxed">
                Your company <span className="text-white font-semibold">{company?.name}</span> is not approved. You can't post a job right now. Please wait to be approved.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsPendingAlertOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 text-white text-sm font-semibold transition-all focus:outline-none cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsPendingAlertOpen(false);
                  router.push("/dashboard/recruiter/company");
                }}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-black text-sm font-semibold transition-all focus:outline-none cursor-pointer"
              >
                View Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobsPage;
