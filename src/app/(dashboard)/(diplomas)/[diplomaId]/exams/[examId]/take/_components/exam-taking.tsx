"use client"

import { useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import { ChevronLeft, ChevronRight, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExamAnswersFields, Question } from "@/lib/types/questions"
import QuestionCard from "./question-card"
import ExamTimer from "./exam-timer"
import { SubmitExamResponse } from "@/lib/types/submissions"
import { submitExam } from "@/lib/apis/submissions.api"
import ExamResult from "./exam-result"
import ExamHeader from "./exam-header"

interface ExamTakingProps {
    examId: string
    examTitle: string
    duration: number
    questions: Question[]
}

export default function ExamTaking({ examId, examTitle, duration, questions }: ExamTakingProps) {
    const timerKey = `exam-timer-${examId}`

    // Index of the question currently shown
    const [currentIndex, setCurrentIndex] = useState(0)
    // Stores the time when the user starts the exam
    const [startedAt] = useState(() => new Date().toISOString())
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [result, setResult] = useState<SubmitExamResponse | null>(null)

    const { control, getValues, reset } = useForm<ExamAnswersFields>({
        defaultValues: { answers: {} },
    })

    // Get the question currently displayed based on the current index
    const currentQuestion = questions[currentIndex]
    // Used to disable the Previous button on the first question
    const isFirst = currentIndex === 0
    // Used to show the Finish button on the last question
    const isLast = currentIndex === questions.length - 1

    const submitAnswers = useCallback(async (answers: { questionId: string; answerId: string }[]) => {
        setIsSubmitting(true)

        // Sends the exam answers to the backend for submission and grading
        const data = await submitExam({ examId, startedAt, answers })

        setIsSubmitting(false)

        if (data.status && data.payload) {
            // The exam is submitted, so the saved timer is no longer needed
            localStorage.removeItem(timerKey)
            // Store the result to display the result screen
            setResult(data.payload)
        }
    }, [examId, startedAt, timerKey])

    // Converts the form answers into the format expected by the backend
    const buildAnswers = useCallback((values: ExamAnswersFields) => {
        return questions
            // Include only questions that have been answered
            .filter((question) => values.answers[question.id])
            // Convert each answer into a { questionId, answerId } object
            .map((question) => ({
                questionId: question.id,
                answerId: values.answers[question.id],
            }))
    }, [questions])

    const handleManualSubmit = useCallback(() => {
        // Get the current answers stored by react-hook-form
        const values = getValues()

        // Build the API payload and submit the exam
        submitAnswers(buildAnswers(values))
    }, [getValues, buildAnswers, submitAnswers])

    const handleTimeUp = useCallback(() => {
        // Get the answers currently stored by react-hook-form
        const values = getValues()

        // Automatically submit the answered questions when time runs out
        submitAnswers(buildAnswers(values))
    }, [getValues, buildAnswers, submitAnswers])

    const handleRestart = () => {
        // Remove the previous timer so the restarted exam starts with a new timer
        localStorage.removeItem(timerKey)

        // Return to the exam-taking screen
        setResult(null)

        // Start again from the first question
        setCurrentIndex(0)

        // Clear all previously selected answers
        reset({ answers: {} })
    }

    // Display the result screen after the exam has been successfully submitted
    if (result) {
        return (
            <ExamResult
                result={result}
                examTitle={examTitle}
                totalQuestions={questions.length}
                onRestart={handleRestart}
            />
        )
    }

    return (
        <div className="mt-6 border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative min-w-0 flex-1 pr-4 after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-gray-200 sm:pr-6">
                    <ExamHeader
                        examTitle={examTitle}
                        currentQuestion={currentIndex + 1}
                        totalQuestions={questions.length}
                    />
                </div>

                {/* Countdown timer for the whole exam */}
                <ExamTimer durationMinutes={duration} examId={examId} onTimeUp={handleTimeUp} />
            </div>

            <div className="mt-6 sm:mt-8">
                <QuestionCard question={currentQuestion} control={control} />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                {/* Go back one question (disabled on the first question) */}
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setCurrentIndex((prev) => prev - 1)}
                    disabled={isFirst}
                    className="flex-1 min-w-0"
                >
                    <ChevronLeft size={16} className="hidden sm:inline" />
                    Previous
                </Button>

                {isLast ? (
                    // Finish the exam
                    <Button type="button" onClick={handleManualSubmit} disabled={isSubmitting} className="flex-1 min-w-0">
                        <Flag size={16} />
                        {isSubmitting ? "Submitting..." : "Finish"}
                    </Button>
                ) : (
                    // Go to the next question
                    <Button type="button" onClick={() => setCurrentIndex((prev) => prev + 1)} className="flex-1 min-w-0">
                        Next
                        <ChevronRight size={16} className="hidden sm:inline" />
                    </Button>
                )}
            </div>
        </div>
    )
}