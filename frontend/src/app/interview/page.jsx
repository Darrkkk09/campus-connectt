"use client";

import { useState } from "react";
import ResumeUploader from "@/components/Interview/ResumeUploader";
import InterviewSimulator from "@/components/Interview/InterviewSimulator";

export default function InterviewPage() {
    const [questions, setQuestions] = useState([]);

    if (questions.length === 0) {
        return <ResumeUploader onQuestionsReady={setQuestions} />;
    }

    return <InterviewSimulator questions={questions} />;
}
