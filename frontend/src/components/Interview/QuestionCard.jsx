export default function QuestionCard({ question, index, total }) {
    return (
        <div className="bg-gray-800 text-white rounded-2xl p-6 w-[90%] max-w-2xl shadow-lg text-center">
            <p className="text-gray-400 mb-2">
                Question {index + 1} of {total}
            </p>
            <h2 className="text-xl font-semibold">{question}</h2>
        </div>
    );
}
