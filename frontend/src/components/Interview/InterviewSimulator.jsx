/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useRef, useState } from "react";
import QuestionCard from "./QuestionCard";
import InterviewUI from "./InterviewUI";

export default function InterviewSimulator({ questions }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isInterviewStarted, setIsInterviewStarted] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioFile, setAudioFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [readyForFeedback, setReadyForFeedback] = useState(false);

    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const videoRef = useRef(null);

    // Speak question
    const speakQuestion = (text) => {
        const synth = window.speechSynthesis;
        synth.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 1;
        utter.pitch = 1;
        utter.lang = "en-US";
        synth.speak(utter);
    };

    const setupCameraPreview = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
            }
        } catch (err) {
            console.error("Camera access denied:", err);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            const recorder = new MediaRecorder(stream);
            chunksRef.current = [];

            recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
            recorder.onstop = async () => {
                const blob = new Blob(chunksRef.current, {
                    type: "audio/webm",
                });
                const file = new File([blob], "full_interview_audio.webm", {
                    type: "audio/webm",
                });
                setAudioFile(file);
                setIsProcessing(false);
                setReadyForFeedback(true);
            };

            recorder.start();
            mediaRecorderRef.current = recorder;
            setIsRecording(true);
        } catch (err) {
            console.error("Microphone access error:", err);
            alert("Please allow microphone access to continue the interview.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream
                .getTracks()
                .forEach((t) => t.stop());
            setIsRecording(false);
        }
    };

    const handleStartInterview = async () => {
        setIsInterviewStarted(true);
        await setupCameraPreview();
        speakQuestion(questions[0].question);
        startRecording();
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            const next = currentIndex + 1;
            setCurrentIndex(next);
            speakQuestion(questions[next].question);
        }
    };

    const endInterview = async () => {
        stopRecording();
        setIsProcessing(true);

        let waited = 0;
        while (!audioFile && waited < 3000) {
            await new Promise((res) => setTimeout(res, 300));
            waited += 300;
        }
    };

    const getAIInterviewFeedback = async () => {
        if (!audioFile) {
            alert("Audio not ready yet. Please wait a moment.");
            return;
        }

        const formData = new FormData();
        formData.append("audio_feedback", audioFile);

        try {
            setIsProcessing(true);
            const res = await fetch(
                "http://127.0.0.1:8000/interview/analyze_feedback",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (res.ok) {
                const data = await res.json();
                console.log("✅ Upload success:", data);
                window.location.href = "/interview/feedback";
            } else {
                const error = await res.json();
                alert("Upload failed: " + error.detail);
            }
        } catch (err) {
            console.error("❌ Upload error:", err);
            alert("Error uploading audio.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            {!isInterviewStarted ? (
                <button
                    onClick={handleStartInterview}
                    className="bg-green-500 px-6 py-3 rounded text-xl font-semibold hover:bg-green-600"
                >
                    Start Interview
                </button>
            ) : isProcessing ? (
                <div className="flex flex-col items-center justify-center gap-3">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-400"></div>
                    <p className="text-gray-300 text-lg">
                        Processing your responses...
                    </p>
                </div>
            ) : readyForFeedback ? (
                <div className="flex flex-col items-center gap-4">
                    <p className="text-green-400 text-lg font-medium">
                        You have successfully completed your Interview
                    </p>
                    <button
                        onClick={getAIInterviewFeedback}
                        className="bg-blue-500 px-6 py-3 rounded text-lg font-semibold hover:bg-blue-600"
                    >
                        Get AI Feedback
                    </button>
                </div>
            ) : (
                <>
                    <QuestionCard
                        question={questions[currentIndex].question}
                        index={currentIndex}
                        total={questions.length}
                    />

                    <InterviewUI
                        isRecording={isRecording}
                        isLast={currentIndex === questions.length - 1}
                        onNext={nextQuestion}
                        onEnd={endInterview}
                    />

                    <video
                        ref={videoRef}
                        className="mt-8 rounded-xl border border-gray-700 w-80 h-60 bg-black"
                        muted
                        autoPlay
                        playsInline
                    />
                </>
            )}
        </div>
    );
}
