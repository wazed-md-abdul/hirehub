"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { createCompany, getCompanies } from "@/lib/actions/companies";
import RegisterCompanyModal from "@/components/dashboard/RegisterCompanyModal";
import {
  FiPlus,
  FiMapPin,
  FiGlobe,
  FiBriefcase,
  FiClock,
  FiCheckCircle
} from "react-icons/fi";

import { useRouter } from "next/navigation";

const CompanyPage = () => {

  const { data: session, isPending: sessionPending } = useSession();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = session?.user?.id;
  const router = useRouter();
  useEffect(() => {
    const userId = session?.user?.id;
    const loadCompanies = async () => {
      if (!session?.user?.id) return;
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
    loadCompanies();
  }, [session]);

  const handleSubmit = async (companyData) => {
    if (!session?.user?.id) {
      alert("You must be logged in to register a company.");
      return;
    }

    const payload = {
      ...companyData,
      userId: session.user.id,
      status: "pending",
    };

    try {
      const response = await createCompany(payload);
      if (response.acknowledged === true || response._id || response.success) {
        setIsModalOpen(false);
        const loadCompanies = async () => {
          if (!session?.user?.id) return;
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
        loadCompanies();
      } else {
        alert("Failed to register company. Please try again.");
      }
    } catch (error) {
      console.error("Error registering company:", error);
      alert("An error occurred. Please try again.");
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
            <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
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
      <RegisterCompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CompanyPage;