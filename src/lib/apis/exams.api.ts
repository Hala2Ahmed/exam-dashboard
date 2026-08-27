import { NextRequest } from "next/server";
import { Exam } from "../types/exams";
import { fetchPaginated } from "./paginated-fetch";
import { API_HEADERS } from "../constants/api-header.constant";
import { RESPONSE } from "../constants/response.constant";
import { getToken } from "../utils/manage-token"

export async function getExams(req: NextRequest) {
    const diplomaId = req.nextUrl.searchParams.get('diplomaId')

    return fetchPaginated<Exam>({ req, endpoint: '/exams', extraParams: { diplomaId } })
}


// Fetch the first page of exams for a specific diploma
export async function getExamsByDiploma(diplomaId: string): Promise<ApiResponse<PaginatedResponse<Exam>>> {
    const token = await getToken()

    if (!token?.token) {
        return RESPONSE.unauthorized
    }

    const query = new URLSearchParams({ page: '1', diplomaId })

    const response = await fetch(`${process.env.API}/exams?${query.toString()}`, {
        method: 'GET',
        headers: {
            ...API_HEADERS.authorization(token.token),
        },
    })

    const payload: ApiResponse<PaginatedResponse<Exam>> = await response.json()
    return payload
}