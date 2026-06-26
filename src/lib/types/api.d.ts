declare type ErrorResponse = {
    code: number
    status: boolean
    message: string
}

declare type SuccessResponse<T> = {
    status: boolean
    message: string
    payload: T
}

declare type ApiResponse<T> = ErrorResponse | SuccessResponse<T>
