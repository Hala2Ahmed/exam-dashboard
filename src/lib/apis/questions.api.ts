import { API_HEADERS } from "../constants/api-header.constant";
import { RESPONSE } from "../constants/response.constant";
import { getToken } from "../utils/manage-token";
import { GetQuestionsResponse } from "../types/questions";

// Fetch all questions belonging to a given exam
export async function getExamQuestions(examId: string) {
    const token = await getToken();

    if (!token?.token) {
        return RESPONSE.unauthorized
    }

    const response = await fetch(`${process.env.API}/questions/exam/${examId}`, {
        method: 'GET',
        headers: {
            ...API_HEADERS.jsonBody,
            ...API_HEADERS.authorization(token.token),
        },
    })

    const payload: ApiResponse<GetQuestionsResponse> = await response.json()
    return payload
}