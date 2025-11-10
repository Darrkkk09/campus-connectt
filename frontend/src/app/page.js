"use client";

import LayoutWrapper from "@/components/LayoutWrapper";
import HomePage from "@/components/Landing";
import AIInterviewLanding from "@/components/Interview/AIInterviewLanding";

export default function Home() {
    return (
        <LayoutWrapper>
            <main className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
                <HomePage />
                <section id="ai-interview">
                    <AIInterviewLanding />
                </section>
            </main>
        </LayoutWrapper>
    );
}
