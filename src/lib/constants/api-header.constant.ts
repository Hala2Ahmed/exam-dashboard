export const API_HEADERS = {
    jsonBody: {
        'Content-Type': 'application/json',
    },
    authorization: (token: string) => ({
        Authorization: `Bearer ${token}`,
    }),
}