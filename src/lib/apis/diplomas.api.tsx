import { getToken } from "next-auth/jwt";
import { NextRequest, userAgent } from "next/server";
import { API_HEADERS } from "../constants/api-header.constant";
import { Diploma } from "../types/diplomas";
import { RESPONSE } from "../constants/response.constant";

export async function getDiplomas(req: NextRequest) {
    // Get the device type
    const { device } = userAgent(req)
    // Use desktop as the default device
    const viewport = device.type || 'desktop'
    // Set the default limit based on device
    const defaultLimit = viewport === 'desktop' ? 12 : 6

    // Get the authentication token
    const token = await getToken({ req });

    // Get the page and limit from the URL
    const page = req.nextUrl.searchParams.get('page')
    const limit = req.nextUrl.searchParams.get('limit') || defaultLimit

    // Return unauthorized if no token exists
    if (!token?.token) {
        return RESPONSE.unauthorized
    }

    // Fetch diplomas from the API
    const response = await fetch(`${process.env.API}/diplomas?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            ...API_HEADERS.authorization(token?.token),
        },


    })

    const payload: ApiResponse<PaginatedResponse<Diploma>> = await response.json()
    return payload
}
