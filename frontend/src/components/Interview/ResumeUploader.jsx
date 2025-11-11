"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ResumeUploader({ onQuestionsReady }) {
    const [resume, setResume] = useState(null);
    const [role, setRole] = useState("");
    const [company, setCompany] = useState("");
    const [jd, setJd] = useState("");
    const [loading, setLoading] = useState(false);
    const [homeLoading, setHomeLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resume) return alert("Please upload a PDF resume.");

        setLoading(true);
        const formData = new FormData();
        formData.append("resume", resume);
        formData.append("role", role);
        formData.append("company_name", company);
        formData.append("job_description", jd);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/resume/get_interview_questions`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();
            if (data.questions) onQuestionsReady(data.questions);
            else alert("Failed to generate questions.");
        } catch (err) {
            console.error(err);
            alert("Error connecting to backend.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 py-10 space-y-6">
            {/* Logo at the Top */}
            <div className="flex flex-col items-center space-y-3 hover:cursor-pointer">
                <Image
                    src="/logo.svg"
                    alt="CampusConnect Logo"
                    width={200}
                    height={60}
                    onClick={() => {
                        setHomeLoading(true);
                        router.push("/");
                    }}
                    className="object-contain transform transition-transform duration-500 hover:scale-110 hover:cursor-pointer"
                />
                <h1 className="text-3xl font-bold text-[#45e35d]">
                    AI Resume Interviewer
                </h1>
            </div>

            {/* Intro Section */}
            <div className="max-w-2xl text-center text-gray-300 space-y-2">
                <p>
                    Upload your resume and let our AI analyze your profile to
                    generate personalized interview questions tailored to your
                    role and experience.
                </p>
                <p className="text-sm text-gray-500">
                    Our system understands your strengths, experience, and
                    aspirations — preparing you for your dream role.
                </p>
            </div>

            {/* Upload Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-2xl shadow-lg w-[90%] max-w-lg mt-4"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-white">
                    Upload Resume
                </h2>

                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setResume(e.target.files[0])}
                    className="mb-4 w-full bg-gray-700 p-2 rounded focus:outline-none"
                />

                <input
                    type="text"
                    placeholder="Role (e.g. Frontend Developer)"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mb-4 w-full bg-gray-700 p-2 rounded focus:outline-none"
                    required
                />

                <input
                    type="text"
                    placeholder="Company (optional)"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mb-4 w-full bg-gray-700 p-2 rounded focus:outline-none"
                />

                <textarea
                    placeholder="Job Description (optional)"
                    value={jd}
                    onChange={(e) => setJd(e.target.value)}
                    className="mb-4 w-full bg-gray-700 p-2 rounded h-24 focus:outline-none"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#04c821] w-full py-2 rounded text-lg font-semibold hover:bg-[#08821c] transition flex justify-center items-center"
                >
                    {loading ? (
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                    ) : (
                        "Start Interview"
                    )}
                </button>
            </form>

            {/* Go Back Home Button */}
            <button
                onClick={() => {
                    setHomeLoading(true);
                    router.push("/");
                }}
                className="px-6 py-2 text-green-400 rounded transition-all font-semibold border border-green-300 hover:rounded-full flex justify-center items-center"
            >
                {homeLoading ? (
                    <svg
                        className="animate-spin h-5 w-5 text-green-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                    </svg>
                ) : (
                    "Go Back Home"
                )}
            </button>
        </div>
    );
}
