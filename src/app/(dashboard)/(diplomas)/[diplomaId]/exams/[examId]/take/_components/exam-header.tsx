import ExamProgress from "./exam-progress"

interface ExamHeaderProps {
    examTitle: string
    currentQuestion: number
    totalQuestions: number
}

export default function ExamHeader({ examTitle, currentQuestion, totalQuestions }: ExamHeaderProps) {
    return (
        <div>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <p className="truncate font-mono text-sm text-gray-800 sm:text-base">{examTitle}</p>
                <p className="shrink-0 font-mono text-xs text-gray-500 sm:text-sm">
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