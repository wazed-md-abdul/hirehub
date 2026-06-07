"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { createCompany, getCompanies, updateCompany, deleteCompany } from "@/lib/actions/companies";
import RegisterCompanyModal from "@/components/dashboard/RegisterCompanyModal";
import {
  FiPlus,
  FiMapPin,
  FiGlobe,
  FiBriefcase,
  FiClock,
  FiCheckCircle,
  FiEdit,
  FiTrash2
} from "react-icons/fi";
import { useRouter } from "next/navigation";

const CompanyPage = () => {
  const { data: session, isPending: sessionPending } = useSession();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const userId = session?.user?.id;
  const router = useRouter();

  const loadCompanies = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await getCompanies(userId);
      setCompanies(data);
    } catch (error) {
      console.error("Error loading companies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      loadCompanies();
    }
  }, [userId]);

  const handleSubmit = async (companyData) => {
    if (!userId) {
      alert("You must be logged in to manage a company.");
      return;
    }

    const payload = {
      ...companyData,
      userId: userId,
      status: "pending",
    };

    try {
      let response;
      if (editData?._id) {
        response = await updateCompany(editData._id, payload);
      } else {
        response = await createCompany(payload);
      }

      if (
        response.acknowledged === true ||
        response.modifiedCount > 0 ||
        response.success ||
        response._id
      ) {
        setIsModalOpen(false);
        setEditData(null);
        await loadCompanies();
      } else {
        alert("Operation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error saving company:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleDelete = async () => {
    const company = companies[0];
    if (!company?._id) return;

    setDeleting(true);
    try {
      const response = await deleteCompany(company._id);
      if (
        response.acknowledged === true ||
        response.deletedCount > 0 ||
        response.success
      ) {
        setIsDeleteDialogOpen(false);
        await loadCompanies();
      } else {
        alert("Failed to delete company. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  if (sessionPending) {
    return (
      <div className="flex-1 p-6 md:p-8 bg-[#09090B] min-h-screen flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
          <p className="text-xs text-[#8A8A93]">Loading session...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex-1 p-6 md:p-8 bg-[#09090B] min-h-screen flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold">Access Denied</h2>
          <p className="text-sm text-[#8A8A93]">Please sign in to manage your company.</p>
        </div>
      </div>
    );
  }

  const company = companies[0];

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 bg-[#09090B] space-y-6 min-h-screen relative text-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Company</h1>
          <p className="text-[#8A8A93] text-xs mt-0.5">
            Manage your registered organization details and view approval status.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-[#8A8A93] text-sm gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
            <span>Fetching organization details...</span>
          </div>
        ) : !company ? (
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
              onClick={() => {
                setEditData(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-gray-100 text-black font-bold text-sm shadow-[0_4px_20px_rgba(255,255,255,0.05)] transition-all active:scale-95 focus:outline-none cursor-pointer"
            >
              <FiPlus className="w-4.5 h-4.5" />
              Register a Company
            </button>
          </div>
        ) : (
          /* Company Full Card profile */
          <div className="bg-[#121217] border border-white/5 rounded-[24px] overflow-hidden hover:border-white/10 transition-all">
            {/* Cover Banner */}
            <div className="h-32 sm:h-48 bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 relative">
              {/* Status Badge in Banner */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                {company.status === "pending" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border bg-amber-500/10 border-amber-500/20 text-amber-400">
                    <FiClock className="w-3.5 h-3.5 animate-pulse" />
                    Pending Approval
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                    <FiCheckCircle className="w-3.5 h-3.5" />
                    Approved Company
                  </span>
                )}
              </div>
            </div>

            {/* Company Info Area */}
            <div className="px-4 sm:px-8 pb-8 relative">
              {/* Overlapping Logo */}
              <div className="absolute -top-10 sm:-top-12 left-4 sm:left-8">
                {company.logo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-[#09090B] bg-[#121217] shadow-xl"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-2xl sm:text-3xl border-4 border-[#09090B] shadow-xl">
                    {company.name ? company.name[0].toUpperCase() : "C"}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="pt-12 sm:pt-16 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{company.name}</h2>
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-[#8A8A93]">
                    <span className="font-semibold text-violet-400">{company.industry}</span>
                    <span>•</span>
                    <span>{company.employees}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <FiMapPin className="text-rose-400" />
                      <span>{company.location}</span>
                    </div>
                    {company.website && (
                      <>
                        <span>•</span>
                        <a
                          href={
                            company.website.startsWith("http")
                              ? company.website
                              : `https://${company.website}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-violet-400 hover:text-violet-300 transition-colors"
                        >
                          <FiGlobe />
                          <span>{company.website}</span>
                        </a>
                      </>
                    )}
                  </div>
                </div>

                {/* Edit / Delete Buttons */}
                <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
                  <button
                    onClick={() => {
                      setEditData(company);
                      setIsModalOpen(true);
                    }}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white font-semibold text-sm transition-all focus:outline-none cursor-pointer"
                  >
                    <FiEdit className="w-4 h-4" />
                    Edit Details
                  </button>
                  <button
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 font-semibold text-sm transition-all focus:outline-none cursor-pointer"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    Delete Company
                  </button>
                </div>
              </div>

              {/* Description Block */}
              <div className="mt-8 pt-8 border-t border-white/5 space-y-3">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">About Company</h3>
                <p className="text-sm text-[#8A8A93] leading-relaxed whitespace-pre-line">
                  {company.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal - Register/Edit Company */}
      <RegisterCompanyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
        initialData={editData}
      />

      {/* Delete Confirmation Dialogue */}
      {isDeleteDialogOpen && company && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            onClick={() => setIsDeleteDialogOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          <div className="bg-[#121217] border border-white/10 rounded-[24px] w-full max-w-md p-6 md:p-8 z-10 shadow-2xl relative text-white space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">Delete Company</h2>
              <p className="text-sm text-[#8A8A93] leading-relaxed">
                Are you sure you want to delete <span className="text-white font-semibold">{company.name}</span>? This action is permanent and cannot be undone. All jobs posted for this company might also be affected.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 text-white text-sm font-semibold transition-all focus:outline-none cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800 text-white text-sm font-semibold transition-all focus:outline-none cursor-pointer flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="w-3.5 h-3.5 rounded-full border border-white border-t-transparent animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Yes, Delete Company"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyPage;