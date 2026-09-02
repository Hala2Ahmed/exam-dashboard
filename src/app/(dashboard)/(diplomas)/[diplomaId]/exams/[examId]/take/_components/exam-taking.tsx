"use client"

import { useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExamAnswersFields, Question } from "@/lib/types/questions"
import QuestionCard from "./question-card"
import ExamProgress from "./exam-progress"
import ExamTimer from "./exam-timer"

interface ExamTakingProps {
    examId: string
    examTitle: string
    duration: number
    questions: Question[]
}

export default function ExamTaking({ examId, examTitle, duration, questions }: ExamTakingProps) {
    // Index of the question currently shown
    const [currentIndex, setCurrentIndex] = useState(0)

    // Form state for all answers, keyed by question id
    const { control } = useForm<ExamAnswersFields>({
        defaultValues: { answers: {} },
    })

    const handleTimeUp = useCallback(() => {
        // submit logic here
    }, [])

    const currentQuestion = questions[currentIndex]
    const isFirst = currentIndex === 0
    const isLast = currentIndex === questions.length - 1

    return (
        <div className="mt-6 p-6">
            <div className="flex items-center gap-6">
                <div className="relative flex-1 pr-6 after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-gray-200">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-800 font-mono">{examTitle}</p>
                        <p className="font-mono text-sm text-gray-500">
                            Question <span className="font-bold font-mono text-blue-600">{currentIndex + 1}</span> of {questions.length}
                        </p>
                    </div>

                    <div className="mt-1.5">
                        <ExamProgress current={currentIndex + 1} total={questions.length} />
                    </div>
                </div>

                {/* Countdown timer for the whole exam */}
                <ExamTimer
                    durationMinutes={duration}
                    examId={examId}
                    onTimeUp={handleTimeUp}
                />
            </div>

            <div className="mt-8">
                <QuestionCard question={currentQuestion} control={control} />
            </div>

            <div className="mt-8 flex items-center gap-3">
                {/* Go back one question (disabled on the first question) */}
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setCurrentIndex((prev) => prev - 1)}
                    disabled={isFirst}
                    className="flex-1"
                >
                    <ChevronLeft size={16} />
                    Previous
                </Button>

                {/* Go to next question */}
                {!isLast && (
                    <Button
                        type="button"
                        onClick={() => setCurrentIndex((prev) => prev + 1)}
                        className="flex-1"
                    >
                        Next
                        <ChevronRight size={16} />
                    </Button>
                )}
            </div>
        </div>
    )
}