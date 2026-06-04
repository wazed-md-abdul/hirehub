'use client'
import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex bg-[#09090B] relative">
            {/* Backdrop for mobile */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
                />
            )}

            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <Header onMenuClick={() => setIsSidebarOpen(true)} />

                {/* Content Body */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;