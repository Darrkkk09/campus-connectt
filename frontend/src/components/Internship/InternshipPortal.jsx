"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../NavBar";
import Footer from "../Footer";

export default function InternshipPortal() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchJobs() {
            try {
                const res = await fetch("http://127.0.0.1:8000/jobs/");
                if (!res.ok) throw new Error("Failed to fetch job listings");
                const data = await res.json();
                setJobs(data.jobs || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchJobs();
    }, []);

    if (loading)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#45e35d] mb-6"></div>
                <p className="text-gray-300 text-lg tracking-wide">
                    Fetching latest internships...
                </p>
            </div>
        );

    if (error)
        return (
            <div className="text-center text-red-500 py-24 text-lg font-medium bg-black min-h-screen flex items-center justify-center">
                {error}
            </div>
        );

    return (
        <main className="min-h-screen bg-black text-gray-200 pt-6 px-6">
            {/* Header*/}
            <header className="flex flex-col items-center mb-12">
                <div className="flex flex-col items-center space-y-3 ">
                    <Image
                        onClick={() => router.push("/")}
                        src="/logo.svg"
                        alt="CampusConnect Logo"
                        width={200}
                        height={60}
                        className="object-contain transform transition-transform duration-500 hover:scale-110 hover:cursor-pointer"
                    />

                    <h1 className="text-3xl font-bold text-[#45e35d]">
                        Internship Opportunities
                    </h1>
                </div>
                <p className="text-gray-400 text-lg text-center max-w-2xl">
                    Explore the latest developer roles — powered by our AI job
                    fetch system. Stay ahead with new openings every day!
                </p>
            </header>

            {/* Job Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
                {jobs.map((job, idx) => (
                    <div
                        key={idx}
                        className="relative group bg-[#111] border border-gray-800 rounded-2xl p-6 flex flex-col overflow-hidden transition-all duration-300 hover:border-green-500"
                    >
                        {/* Job Info */}
                        <div className="relative z-10 mb-4">
                            <p className="text-sm text-[#45e35d] font-semibold uppercase tracking-wide mb-2">
                                {job.role || "Developer Role"}
                            </p>
                            <h2 className="text-xl font-bold text-white mb-1">
                                {job.title || "Untitled Internship"}
                            </h2>
                            <p className="text-sm text-gray-400 mb-1">
                                <strong className="text-gray-300">
                                    Company:
                                </strong>{" "}
                                {job.company || "Not specified"}
                            </p>
                            <p className="text-sm text-gray-400 mb-1">
                                <strong className="text-gray-300">
                                    Location:
                                </strong>{" "}
                                {job.location || "Remote / Flexible"}
                            </p>
                            <p className="text-sm text-gray-400 mb-3">
                                <strong className="text-gray-300">
                                    Country:
                                </strong>{" "}
                                {job.country || "IN"}
                            </p>
                        </div>

                        {/* Apply Button */}
                        <a
                            href={job.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative z-10 mt-auto px-5 py-2.5 bg-[#45e35d] text-black font-semibold rounded-xl text-center transition-all duration-300 hover:bg-[#3edb5a] hover:shadow-[0_0_15px_#45e35d90] flex items-center justify-center gap-2 group/button"
                        >
                            <span className="group-hover/button:translate-x-1 transition-transform duration-200">
                                Apply Now
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 group-hover/button:translate-x-1 transition-transform duration-200"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </a>
                    </div>
                ))}
            </section>
            <Footer />
        </main>
    );
}
