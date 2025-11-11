"use client";

import { useState } from "react";
import { Code, Loader2, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Footer from "../Footer";

export default function CodingPage() {
    const [jobTitle, setJobTitle] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [jobDescription, setJobDescription] = useState("");
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const fetchQuestions = async () => {
        if (!jobTitle.trim()) {
            setError("Please enter a job title.");
            return;
        }

        setLoading(true);
        setError("");
        setQuestions([]);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/coding/coding_questions`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        job_title: jobTitle,
                        difficulty,
                        job_description: jobDescription,
                    }),
                }
            );

            if (!res.ok) throw new Error("Failed to fetch questions");

            const data = await res.json();
            setQuestions(data.questions || []);
        } catch (err) {
            console.error(err);
            setError("Something went wrong while fetching questions.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <main className="flex flex-1">
                {/* LEFT PANEL (Form + Logo) */}
                <aside className="w-full md:w-[35%] lg:w-[30%] bg-[#111] border-r border-gray-800 p-8 flex flex-col items-center sticky top-0 h-screen">
                    {/* Logo + Title */}
                    <div className="flex flex-col items-center mb-10 space-y-3">
                        <Image
                            onClick={() => router.push("/")}
                            src="/logo.svg"
                            alt="CampusConnect Logo"
                            width={200}
                            height={50}
                            className="object-contain transform transition-transform duration-500 hover:scale-110 hover:cursor-pointer"
                        />
                        <h1 className="text-2xl font-bold text-[#45e35d] text-center">
                            AI Coding Assistant
                        </h1>
                        <p className="text-gray-400 text-sm text-center">
                            Generate coding challenges tailored to your role and
                            skill level.
                        </p>
                    </div>

                    {/* Input Form */}
                    <section className="w-full space-y-6">
                        <FormFields
                            jobTitle={jobTitle}
                            setJobTitle={setJobTitle}
                            difficulty={difficulty}
                            setDifficulty={setDifficulty}
                            jobDescription={jobDescription}
                            setJobDescription={setJobDescription}
                        />

                        <div className="flex justify-center">
                            <button
                                onClick={fetchQuestions}
                                disabled={loading}
                                className="bg-[#45e35d] text-black font-semibold px-6 py-3 rounded-xl hover:bg-[#39d152] transition-all duration-200 w-full disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2 justify-center">
                                        <Loader2 className="animate-spin w-5 h-5" />
                                        Fetching Questions...
                                    </span>
                                ) : (
                                    "Generate Questions"
                                )}
                            </button>
                        </div>

                        {error && (
                            <p className="text-red-400 text-center font-medium">
                                {error}
                            </p>
                        )}
                    </section>
                </aside>

                {/* RIGHT PANEL (Content / Questions) */}
                <section className="flex-1 p-10 overflow-y-auto">
                    {questions.length === 0 && !loading ? (
                        <div className="max-w-3xl mx-auto text-center mt-20">
                            <Code className="w-14 h-14 text-[#45e35d] mx-auto mb-6" />
                            <h2 className="text-4xl font-bold mb-4">
                                Master Coding for Your Dream Role
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Our AI curates coding problems that align with
                                your career goals. Whether you are aiming for
                                frontend, backend, or full-stack roles — we’ve
                                got you covered.
                                <br />
                                <br />
                                Select your desired role, difficulty, and get
                                problem sets similar to what top tech companies
                                ask during interviews.
                            </p>
                        </div>
                    ) : (
                        <QuestionGrid questions={questions} loading={loading} />
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}

function FormFields({
    jobTitle,
    setJobTitle,
    difficulty,
    setDifficulty,
    jobDescription,
    setJobDescription,
}) {
    return (
        <>
            <div>
                <label className="block text-gray-300 mb-2 font-medium">
                    Job Title
                </label>
                <input
                    type="text"
                    placeholder="e.g. SDE, Frontend Developer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#45e35d]"
                />
            </div>

            <div>
                <label className="block text-gray-300 mb-2 font-medium">
                    Difficulty
                </label>
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#45e35d]"
                >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>
            </div>

            <div>
                <label className="block text-gray-300 mb-2 font-medium">
                    Job Description (optional)
                </label>
                <textarea
                    placeholder="Paste job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#45e35d] min-h-[120px]"
                />
            </div>
        </>
    );
}

function QuestionGrid({ questions, loading }) {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center mt-20">
                <Loader2 className="animate-spin w-10 h-10 text-[#45e35d]" />
                <p className="text-gray-400 mt-4">Generating questions...</p>
            </div>
        );
    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
            {questions.map((q, i) => (
                <div
                    key={i}
                    className="bg-[#111] border border-gray-800 rounded-2xl p-6 hover:border-[#45e35d] hover:shadow-[0_0_20px_#45e35d30] transition-all duration-300"
                >
                    <h3 className="text-xl font-semibold text-white mb-2">
                        {q.question_title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                        {q.topics || "—"}
                    </p>
                    <a
                        href={q.question_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#45e35d] hover:text-[#3edb5a] font-medium"
                    >
                        Practice Now <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                </div>
            ))}
        </section>
    );
}
