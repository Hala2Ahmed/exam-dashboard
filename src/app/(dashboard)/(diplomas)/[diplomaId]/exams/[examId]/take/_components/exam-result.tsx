import Link from "next/link"
import { Compass, Check, X } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { SubmitExamResponse } from "@/lib/types/submissions"
import ExamResultChart from "./exam-result-chart"
import RestartButton from "./restart-button"
import ExamHeader from "./exam-header"

interface ExamResultProps {
    result: SubmitExamResponse
    examTitle: string
    totalQuestions: number
    onRestart: () => void
}

export default function ExamResult({ result, onRestart, examTitle, totalQuestions }: ExamResultProps) {
    const { submission, analytics } = result

    return (
        <div className="mt-6 border border-gray-100 bg-white p-6 shadow-sm">
            <ExamHeader
                examTitle={examTitle}
                currentQuestion={totalQuestions}
                totalQuestions={totalQuestions}
            />

            <h2 className="mt-6 text-xl font-bold text-blue-600">Results:</h2>

            <div className="mt-4 grid gap-6 md:grid-cols-[280px_1fr]">
                <div className="max-h-105 rounded-lg bg-blue-50 p-4">
                    <ExamResultChart correct={submission.correctAnswers} incorrect={submission.wrongAnswers} />

                    <ul className="mt-2 flex flex-col gap-1.5 text-sm">
                        <li className="flex items-center gap-2">
                            <span className="size-3 shrink-0 rounded-sm bg-green-600" />
                            Correct: {submission.correctAnswers}
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="size-3 shrink-0 rounded-sm bg-red-600" />
                            Incorrect: {submission.wrongAnswers}
                        </li>
                    </ul>
                </div>

                {/* Displays the detailed result for each question */}
                <ul className="flex max-h-105 flex-col gap-5 overflow-y-auto pr-2 custom-scrollbar">
                    {analytics.map((item) => (
                        <li key={item.questionId}>
                            <p className="font-semibold text-blue-600">{item.questionText}</p>

                            <div className="mt-2 flex flex-col gap-2">
                                {/* Shows the answer selected by the user, if one was provided */}
                                {item.selectedAnswer && (
                                    <div
                                        className={`flex items-center gap-2 rounded-md px-4 py-2.5 text-sm ${item.isCorrect
                                            ? "bg-green-50 text-green-800"
                                            : "bg-red-50 text-red-800"
                                            }`}
                                    >
                                        {item.isCorrect ? <Check size={16} /> : <X size={16} />}
                                        {item.selectedAnswer.text}
                                    </div>
                                )}

                                {/* Shows the correct answer when the user's answer was incorrect */}
                                {!item.isCorrect && item.correctAnswer && (
                                    <div className="flex items-center gap-2 rounded-md bg-green-50 px-4 py-2.5 text-sm text-green-800">
                                        <Check size={16} />
                                        {item.correctAnswer.text}
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Provides options to restart the exam or return to the home page */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <RestartButton onRestart={onRestart} />

                <Link href="/" className={buttonVariants({ variant: "default", className: "flex-1 min-w-0" })}>
                    <Compass size={16} />
                    Explore
                </Link>
            </div>
        </div>
    )
}