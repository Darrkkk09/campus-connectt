"use client";

import Image from "next/image";
import Link from "next/link";
import { UserCheck, Code, Briefcase, ArrowRight } from "lucide-react";

export default function HomePage() {
    return (
        <main className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
            <section className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between px-6 md:px-10 pt-32 pb-24 h-full">
                <div className="flex-1 space-y-6 text-center md:text-left">
                    <span className="text-[#45e35d] text-sm uppercase tracking-wider">
                        AI Career Assistant
                    </span>
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                        Accelerate Your{" "}
                        <span className="text-[#45e35d]">Career Journey</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-md mx-auto md:mx-0">
                        Get AI-powered interview prep, coding practice, and job
                        discovery — built for ambitious learners like you.
                    </p>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <Link href="/interview">
                            <button className="bg-[#45e35d] text-black px-5 py-3 rounded-xl font-semibold hover:border hover:border-[#0df22f] hover:bg-black hover:text-[#45e35d] transition-all duration-200">
                                Get Started
                            </button>
                        </Link>
                        <Link href="/coding">
                            <button className="border border-gray-600 text-gray-300 px-5 py-3 rounded-xl hover:border hover:border-[#0df22f] hover:bg-black hover:text-[#45e35d] transition-all duration-200">
                                Learn More
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="flex-1 mt-10 md:mt-0 flex justify-center">
                    <Image
                        src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800&q=80"
                        alt="AI Illustration"
                        width={480}
                        height={360}
                        className="rounded-2xl shadow-[0_0_40px_#45e35d20]"
                    />
                </div>
            </section>

            <section className="w-full py-20 bg-[#0a0a0a] border-t border-gray-800 mt-30">
                <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
                    <h2 className="text-3xl font-bold mb-12 text-white">
                        Smart Tools for Smart Careers
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: UserCheck,
                                title: "AI Interviewer",
                                desc: "Experience personalized AI-led interviews that adapt to your skills and responses.",
                            },
                            {
                                icon: Code,
                                title: "Coding Practice",
                                desc: "Sharpen problem-solving with curated LeetCode-style questions.",
                            },
                            {
                                icon: Briefcase,
                                title: "Job Finder",
                                desc: "AI-powered job search engine finding perfect roles for you.",
                            },
                        ].map(({ icon: Icon, title, desc, img }) => (
                            <div
                                key={title}
                                className="p-8 bg-[#111] border border-gray-800 rounded-2xl hover:border-[#45e35d] hover:shadow-[0_0_25px_#45e35d40] transition-all duration-300"
                            >
                                <Icon className="w-10 h-10 text-[#45e35d] mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    {title}
                                </h3>
                                <p className="text-gray-400 mb-6">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
