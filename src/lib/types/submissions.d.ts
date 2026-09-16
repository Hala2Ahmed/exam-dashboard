import { Answer } from "./questions"

export type SubmissionAnswerInput = {
    questionId: string
    answerId: string
}

export type SubmitExamPayload = {
    examId: string
    answers: SubmissionAnswerInput[]
    startedAt: string
}

export type Submission = {
    id: string
    examId: string
    examTitle: string
    score: number
    totalQuestions: number
    correctAnswers: number
    wrongAnswers: number
    submittedAt: string
}

export type SubmissionAnalyticsItem = {
    questionId: string
    questionText: string
    selectedAnswer: Answer | null
    isCorrect: boolean
    correctAnswer: Answer | null
}

export type SubmitExamResponse = {
    submission: Submission
    analytics: SubmissionAnalyticsItem[]
}