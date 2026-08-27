"use server";

import { API_HEADERS } from "../constants/api-header.constant";
import { EmailStepField, ForgotPasswordResponse, ResetPasswordFields } from "../types/auth";

export async function sendEmail(emailStepField: EmailStepField) {
    const response = await fetch(`${process.env.API}/auth/forgot-password`, {
        method: 'POST',
        body: JSON.stringify({
            ...emailStepField,
            redirectUrl: `${process.env.NEXTAUTH_URL}/forgot-password`,
        }),
        headers: {
            ...API_HEADERS.jsonBody,
        },
    })

    const payload: ApiResponse<ForgotPasswordResponse> = await response.json()
    return payload
}

export async function resetPassword(resetPasswordFields: ResetPasswordFields, token: string) {
    const response = await fetch(`${process.env.API}/auth/reset-password`, {
        method: 'POST',
        body: JSON.stringify({
            token,
            ...resetPasswordFields
        }),
        headers: { ...API_HEADERS.jsonBody },
    })

    const payload: ApiResponse<null> = await response.json()
    return payload
}