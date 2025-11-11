"use client";

import LayoutWrapper from "@/components/LayoutWrapper";
import HomePage from "@/components/Landing";
import AIInterviewLanding from "@/components/Interview/AIInterviewLanding";
import InternshipLanding from "@/components/Internship/InternshipLanding";
import CodingLanding from "@/components/Coding/CodingLanding";
import ContactPage from "@/components/Contact";

export default function Home() {
    return (
        <LayoutWrapper>
            <main className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
                <section id="home">
                    <HomePage />
                </section>

                <section id="ai-interview">
                    <AIInterviewLanding />
                </section>

                <section id="internships">
                    <InternshipLanding />
                </section>

                <section id="coding">
                    <CodingLanding />
                </section>
                <section id="contact">
                    <ContactPage />
                </section>
            </main>
        </LayoutWrapper>
    );
}
