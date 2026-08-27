export const DIPLOMA_KEYS = {
    list: (limit?: number) => ['diplomas-list', limit ?? 'auto'] as const,
} as const

export const EXAM_KEYS = {
    list: (diplomaId: string, limit?: number) => ['exams-list', diplomaId, limit ?? 'auto'] as const,
} as const