declare type ErrorResponse = {
    message: string
    code: number
}

declare type SuccessResponse<T> = {
    message: string
    metadata?: {
        currentPage: number
        numberOfPages: number
        limit: number
    }
} & T

declare type ApiResponse<T> = ErrorResponse | SuccessResponse<T>
