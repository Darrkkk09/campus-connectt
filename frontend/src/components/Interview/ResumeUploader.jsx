"use client";

import { useState } from "react";

export default function ResumeUploader({ onQuestionsReady }) {
    const [resume, setResume] = useState(null);
    const [role, setRole] = useState("");
    const [company, setCompany] = useState("");
    const [jd, setJd] = useState("");
    const [loading, setLoading] = useState(false);

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
                "http://127.0.0.1:8000/resume/get_interview_questions",
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-2xl shadow-lg w-[90%] max-w-lg"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Upload Resume
                </h2>

                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setResume(e.target.files[0])}
                    className="mb-4 w-full bg-gray-700 p-2 rounded"
                />

                <input
                    type="text"
                    placeholder="Role (e.g. Frontend Developer)"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mb-4 w-full bg-gray-700 p-2 rounded"
                    required
                />

                <input
                    type="text"
                    placeholder="Company (optional)"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mb-4 w-full bg-gray-700 p-2 rounded"
                />

                <textarea
                    placeholder="Job Description (optional)"
                    value={jd}
                    onChange={(e) => setJd(e.target.value)}
                    className="mb-4 w-full bg-gray-700 p-2 rounded h-24"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-500 w-full py-2 rounded text-lg font-semibold hover:bg-green-600 transition"
                >
                    {loading ? "Generating Questions..." : "Start Interview"}
                </button>
            </form>
        </div>
    );
}
