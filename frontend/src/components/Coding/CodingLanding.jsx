"use client";

import Image from "next/image";
import { Code, Brain, Rocket, Target } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CodingLanding() {
    const router = useRouter();

    return (
        <main className="bg-black text-gray-200 min-h-screen flex flex-col items-center justify-center">
            {/* Hero Section */}
            <section className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-24 min-h-screen">
                {/* Left Text Section */}
                <div className="flex-1 mt-12 md:mt-0 flex justify-center">
                    <Image
                        src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80"
                        alt="Coding Practice Illustration"
                        width={480}
                        height={360}
                        className="rounded-2xl shadow-[0_0_40px_#45e35d20]"
                    />
                </div>
                <div className="flex-1 space-y-6 text-center md:text-left">
                    <Code className="w-16 h-16 text-[#45e35d] mx-auto md:mx-0" />
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        Practice Smart with AI-Curated Coding Problems
                    </h2>
                    <p className="text-gray-400 text-lg max-w-md mx-auto md:mx-0">
                        Get personalized coding challenges tailored to your
                        skill level, interests, and career goals. Practice
                        problems are fetched live from top sources - keeping you
                        sharp and interview-ready.
                    </p>

                    <button
                        onClick={() => router.push("/coding")}
                        className="border bg-[#45e35d] text-black px-5 py-3 rounded-xl font-semibold hover:border-[#0df22f] hover:bg-black hover:text-[#45e35d] transition-all duration-200"
                    >
                        Start Practicing
                    </button>
                </div>
            </section>

            {/* Why Coding Practice Section */}
            <section className="w-full py-20 bg-[#0a0a0a] border-t border-gray-800">
                <div className="max-w-6xl mx-auto px-6 md:px-10 text-center space-y-10">
                    <h2 className="text-3xl font-bold text-white">
                        Why Practice with AI-Powered Coding?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: Code,
                                title: "Adaptive Learning",
                                desc: "AI suggests questions based on your skill level and job role to keep your growth consistent.",
                            },
                            {
                                icon: Rocket,
                                title: "Boost Interview Readiness",
                                desc: "Sharpen your DSA, system design, and coding logic with curated challenges.",
                            },
                            {
                                icon: Target,
                                title: "Goal-Based Practice",
                                desc: "Select job titles or roles, and get real interview questions for focused preparation.",
                            },
                        ].map(({ icon: Icon, title, desc }) => (
                            <div
                                key={title}
                                className="p-8 bg-[#111] border border-gray-800 rounded-2xl hover:border-[#45e35d] hover:shadow-[0_0_25px_#45e35d40] transition-all duration-300"
                            >
                                <Icon className="w-10 h-10 text-[#45e35d] mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    {title}
                                </h3>
                                <p className="text-gray-400">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
