"use server"

import { API_HEADERS } from "../constants/api-header.constant";
import { RESPONSE } from "../constants/response.constant";
import { getToken } from "../utils/manage-token";
import { SubmitExamPayload, SubmitExamResponse } from "../types/submissions";

export async function submitExam(payload: SubmitExamPayload): Promise<ApiResponse<SubmitExamResponse>> {
    const token = await getToken();

    if (!token?.token) {
        return RESPONSE.unauthorized
    }

    const response = await fetch(`${process.env.API}/submissions`, {
        method: 'POST',
        headers: {
            ...API_HEADERS.jsonBody,
            ...API_HEADERS.authorization(token.token),
        },
        body: JSON.stringify(payload),
    })

    const data: ApiResponse<SubmitExamResponse> = await response.json()
    return data
}