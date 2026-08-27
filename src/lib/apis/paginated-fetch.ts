import { getToken } from "next-auth/jwt";
import { NextRequest, userAgent } from "next/server";
import { API_HEADERS } from "../constants/api-header.constant";
import { RESPONSE } from "../constants/response.constant";

interface FetchPaginatedOptions {
    req: NextRequest
    endpoint: string
    extraParams?: Record<string, string | null>
}

export async function fetchPaginated<T>({ req, endpoint, extraParams = {} }: FetchPaginatedOptions) {
    // Get the device type
    const { device } = userAgent(req)
    // Use desktop as the default device
    const viewport = device.type || 'desktop'
    // Set the default limit based on device
    const defaultLimit = viewport === 'desktop' ? 12 : 6

    // Get the authentication token
    const token = await getToken({ req });

    // Return unauthorized if no token exists
    if (!token?.token) {
        return RESPONSE.unauthorized
    }

    // Get the page and limit from the URL
    const page: string = req.nextUrl.searchParams.get('page') ?? '1'
    const limit: string = req.nextUrl.searchParams.get('limit') ?? String(defaultLimit)

    const query = new URLSearchParams({ page, limit })

    for (const [key, value] of Object.entries(extraParams)) {
        if (value) query.set(key, value)
    }

    const response = await fetch(`${process.env.API}${endpoint}?${query.toString()}`, {
        method: 'GET',
        headers: {
            ...API_HEADERS.authorization(token?.token),
        },
    })

    const payload: ApiResponse<PaginatedResponse<T>> = await response.json()
    return payload
}