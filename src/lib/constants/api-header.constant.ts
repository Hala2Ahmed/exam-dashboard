export const API_HEADERS = {
    'Content-Type': 'application/json',
    authorization: (token: string) => ({
        Authorization: `Bearer ${token}`,
    }),
}