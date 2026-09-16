import ExamProgress from "./exam-progress"

interface ExamHeaderProps {
    examTitle: string
    currentQuestion: number
    totalQuestions: number
}

export default function ExamHeader({ examTitle, currentQuestion, totalQuestions }: ExamHeaderProps) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <p className="font-mono text-gray-800">{examTitle}</p>
                <p className="font-mono text-sm text-gray-500">
                    Question <span className="font-mono font-bold text-blue-600">{currentQuestion}</span> of {totalQuestions}
                </p>
            </div>

            {/* Displays the user's current progress through the exam */}
            <div className="mt-1.5">
                <ExamProgress current={currentQuestion} total={totalQuestions} />
            </div>
        </div>
    )
}