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
    message: string
    payload?: T
}

declare type ApiResponse<T> = ErrorResponse | SuccessResponse<T>
