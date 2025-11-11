"use client";

import { useEffect, useState } from "react";
import FeedbackSection from "@/components/Interview/FeedbackSection";

export default function FeedbackPage() {
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const res = await fetch(
                    "http://127.0.0.1:8000/interview/analyze_feedback"
                );
                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const data = await res.json();

                let cleaned = data.feedback?.trim() || "";
                cleaned = cleaned.replace(/```json|```/g, "").trim();

                let parsed;
                try {
                    parsed = JSON.parse(cleaned);
                } catch {
                    parsed = { summary: cleaned };
                }

                setFeedback(parsed);
            } catch (err) {
                console.error("Fetch error:", err);
                setFeedback({ summary: "Error connecting to backend." });
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, []);

    if (loading)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#45e35d] mb-6"></div>
                <p className="text-gray-300 text-lg tracking-wide">
                    Loading your Interview Feedback...
                </p>
            </div>
        );

    return <FeedbackSection feedback={feedback} />;
}
