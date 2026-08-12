declare type ValidationErrorDetail = {
    path: string
    messages: string[]
}

declare type ErrorResponse = {
    code: number
    status: false
    message: string
    errors?: ValidationErrorDetail[]
}

declare type SuccessResponse<T> = {
    status: true
    message?: string
    payload?: T
}

declare type ApiResponse<T> = ErrorResponse | SuccessResponse<T>

declare type PaginatedResponse<T> = {
    data: T[]
    metadata: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
}

declare type DocumentFields = {
    createdAt: string
    updatedAt: string
}