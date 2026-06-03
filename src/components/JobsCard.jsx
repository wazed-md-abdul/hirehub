import React from "react";
import {
    FiMapPin,
    FiClock,
    FiArrowRight,
    FiFigma,
    FiSlack,
    FiGithub
} from "react-icons/fi";

const jobsData = [
    {
        id: 1,
        title: "Senior Frontend Engineer",
        company: "Figma",
        icon: <FiFigma />,
        color: "text-orange-400 bg-orange-400/10 border border-orange-400/20",
        location: "Remote, US",
        type: "Full-Time",
        salary: "$140k - $180k",
        posted: "2 days ago",
        tags: ["React", "TypeScript", "Next.js"],
    },
    {
        id: 2,
        title: "Product Designer",
        company: "Slack",
        icon: <FiSlack />,
        color: "text-blue-400 bg-blue-400/10 border border-blue-400/20",
        location: "San Francisco, CA",
        type: "Full-Time",
        salary: "$120k - $160k",
        posted: "5 hours ago",
        tags: ["UI/UX", "Prototyping", "Figma"],
    },
    {
        id: 3,
        title: "Backend Developer",
        company: "GitHub",
        icon: <FiGithub />,
        color: "text-gray-200 bg-white/10 border border-white/20",
        location: "Remote, Worldwide",
        type: "Contract",
        salary: "$80 - $120 / hr",
        posted: "1 day ago",
        tags: ["Node.js", "MongoDB", "Go"],
    }
];

const JobCards = () => {
    return (
        <>
            <section className="bg-[#0B0B0F] py-20 relative overflow-hidden">

                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>

                <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-5xl relative z-10">

                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <span className="px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-[11px] font-semibold tracking-wider text-violet-400 uppercase inline-block mb-3">
                            Curated Jobs
                        </span>
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                            Latest Opportunities
                        </h2>
                        <p className="text-[#8A8A93] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                            Explore the newest job openings from top companies around the world.
                        </p>
                    </div>

                    {/* Job Cards List - Rows on Large Devices */}
                    <div className="flex flex-col gap-4">
                        {jobsData.map((job) => (
                            <div
                                key={job.id}
                                className="relative group bg-[#121217]/40 backdrop-blur-md border border-white/5 hover:border-violet-500/30 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(99,60,255,0.04)] hover:-translate-y-0.5 overflow-hidden"
                            >
                                {/* Inner Glow Hover Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-fuchsia-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                                {/* Left: Icon, title, company */}
                                <div className="flex items-center gap-4 lg:w-[35%] z-10">
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-105 ${job.color} shrink-0`}>
                                        {job.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-white font-semibold text-[15px] leading-tight truncate group-hover:text-violet-300 transition-colors">
                                            {job.title}
                                        </h3>
                                        <span className="text-gray-400 text-xs mt-0.5 block">{job.company}</span>
                                    </div>
                                </div>

                                {/* Middle Left: Location & Time */}
                                <div className="flex items-center gap-4 text-xs text-[#8A8A93] lg:w-[20%] z-10">
                                    <div className="flex items-center gap-1.5">
                                        <FiMapPin className="text-violet-400/80 shrink-0" />
                                        <span className="truncate">{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <FiClock className="text-violet-400/80 shrink-0" />
                                        <span>{job.posted}</span>
                                    </div>
                                </div>

                                {/* Middle Right: Tags */}
                                <div className="flex flex-wrap gap-1.5 lg:w-[25%] z-10">
                                    {job.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/[0.04] text-[10px] font-medium tracking-wide text-gray-400 group-hover:border-violet-500/10 group-hover:text-violet-300 transition-colors"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Right: Salary & Apply Button */}
                                <div className="flex items-center justify-between lg:justify-end gap-5 lg:w-[20%] border-t lg:border-t-0 border-white/5 pt-3 lg:pt-0 z-10">
                                    <div className="lg:text-right">
                                        <span className="text-white font-bold text-[15px]">{job.salary}</span>
                                        <span className="text-[#8A8A93] text-[10px] ml-1 block lg:inline">
                                            / {job.type === 'Contract' ? 'hr' : 'yr'}
                                        </span>
                                    </div>
                                    <button className="text-[12px] font-semibold text-white bg-white/5 hover:bg-[#633CFF] border border-white/5 hover:border-violet-500/20 px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 group/btn cursor-pointer shadow-[0_0_10px_rgba(99,60,255,0)] hover:shadow-[0_0_15px_rgba(99,60,255,0.2)]">
                                        Apply
                                        <FiArrowRight className="group-hover/btn:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* Explore More Button */}
                    <div className="mt-12 flex justify-center">
                        <button className="px-6 py-3 bg-transparent border border-white/10 hover:border-violet-500/50 text-white text-xs font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,60,255,0.1)] hover:bg-violet-600/10 flex items-center gap-2 group cursor-pointer">
                            Explore More
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform text-violet-400" />
                        </button>
                    </div>

                </div>
            </section>
        </>
    );
};

export default JobCards;