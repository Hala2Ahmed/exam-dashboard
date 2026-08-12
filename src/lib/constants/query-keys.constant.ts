export const DIPLOMA_KEYS = {
    list: (limit?: number) => ['diplomas-list', limit ?? 'auto'] as const,
} as const