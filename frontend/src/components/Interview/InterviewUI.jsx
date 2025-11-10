export default function InterviewUI({ isRecording, isLast, onNext, onEnd }) {
    return (
        <div className="flex gap-4 mt-6">
            <button
                onClick={isLast ? onEnd : onNext}
                className={`${
                    isLast
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-blue-500 hover:bg-blue-600"
                } px-6 py-2 rounded text-lg`}
            >
                {isLast ? "End Interview" : "Next Question"}
            </button>

            <div className="text-gray-400 text-sm mt-2">
                {isRecording ? "Recording in progress..." : ""}
            </div>
        </div>
    );
}
