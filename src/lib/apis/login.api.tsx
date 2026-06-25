import { API_HEADERS } from "../constants/api-header.constant";
import { LoginFields, loginResponse } from "../types/auth";

export async function login(loginFields: LoginFields) {
    const response = await fetch(`${process.env.API}/auth/signin`, {
        method: 'POST',
        body: JSON.stringify(loginFields),
        headers: {
            ...API_HEADERS,
        },
    })

    const payload: ApiResponse<loginResponse> = await response.json()
    return payload
}