"use server";

import { API_HEADERS } from "../constants/api-header.constant";
import { EmailStepField, RegisterFields, RegisterResponse, VerifyResetCodeField } from "../types/auth";

export async function sendOtp(emailStepField: EmailStepField) {
    const response = await fetch(`${process.env.API}/auth/send-email-verification`, {
        method: 'POST',
        body: JSON.stringify(emailStepField),
        headers: {
            ...API_HEADERS.jsonBody,
        },
    })

    const payload: ApiResponse<null> = await response.json()
    return payload
}

export async function verifyOtp(verifyResetCodeField: VerifyResetCodeField) {
    const response = await fetch(`${process.env.API}/auth/confirm-email-verification`, {
        method: 'POST',
        body: JSON.stringify(verifyResetCodeField),
        headers: {
            ...API_HEADERS,
        },
    })

    const payload: ApiResponse<null> = await response.json()
    return payload
}

export async function registerUser(registerFields: RegisterFields) {
    const response = await fetch(`${process.env.API}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(registerFields),
        headers: {
            ...API_HEADERS,
        },
    })

    const payload: ApiResponse<RegisterResponse> = await response.json()
    return payload
}