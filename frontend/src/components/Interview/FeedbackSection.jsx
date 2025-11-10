"use client";

import Link from "next/link";

export default function FeedbackSection({ feedback }) {
    if (!feedback) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <p>No feedback available yet.</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4 flex items-center justify-center">
            <article className="bg-gray-800/80 backdrop-blur-md p-8 rounded-2xl w-full max-w-3xl shadow-xl border border-gray-700">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">
                        💬 AI Interview Feedback
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Automatically generated insights from your mock
                        interview
                    </p>
                </header>

                {feedback.summary && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-100 mb-3">
                            🧭 Summary
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            {feedback.summary}
                        </p>
                    </section>
                )}

                {feedback.strengths?.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-green-400 mb-3">
                            ✅ Strengths
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            {feedback.strengths.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {feedback.areas_to_improve?.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-yellow-400 mb-3">
                            ⚙️ Areas to Improve
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            {feedback.areas_to_improve.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {feedback.practice_tips?.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-400 mb-3">
                            💡 Practice Tips
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            {feedback.practice_tips.map((tip, i) => (
                                <li key={i}>{tip}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {feedback.final_rating && (
                    <footer className="border-t border-gray-700 pt-6 text-center space-y-4">
                        <div>
                            <h3 className="text-2xl font-semibold text-purple-400 mb-1">
                                ⭐ Final Rating
                            </h3>
                            <p className="text-lg text-gray-300">
                                {feedback.final_rating}
                            </p>
                        </div>

                        <Link href="/">
                            <button className="mt-6 px-6 py-3 bg-[#45e35d] text-black font-semibold rounded-xl hover:bg-[#39d152] transition-all">
                                ← Back to Home
                            </button>
                        </Link>
                    </footer>
                )}
            </article>
        </main>
    );
}
