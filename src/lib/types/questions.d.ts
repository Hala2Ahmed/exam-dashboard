export type Answer = {
    id: string
    text: string
}

export type Question = DocumentFields & {
    id: string
    text: string
    examId: string
    immutable: boolean
    answers: Answer[]
}

export type GetQuestionsResponse = {
    questions: Question[]
}

export type ExamAnswersFields = {
    answers: Record<string, string>
}