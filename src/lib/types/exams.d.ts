export type DiplomaSummary = {
    id: string
    title: string
}

export type Exam = DocumentFields & {
    id: string
    title: string
    description: string
    image: string
    duration: number
    questionsCount: number
    diplomaId: string
    diploma: DiplomaSummary
    immutable: boolean
}
