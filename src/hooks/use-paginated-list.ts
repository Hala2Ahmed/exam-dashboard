"use client"

import { useInfiniteQuery } from "@tanstack/react-query";

interface UsePaginatedListOptions<T> {
    queryKey: readonly unknown[]
    endpoint: string
    limit?: number
    extraParams?: Record<string, string>
    initialData?: PaginatedResponse<T>
}

export default function usePaginatedList<T>({ queryKey, endpoint, limit, extraParams = {}, initialData }: UsePaginatedListOptions<T>) {
    return useInfiniteQuery({
        queryKey,
        queryFn: async ({ pageParam }) => {
            // Create the API URL
            const url = new URL(endpoint, window.location.origin)

            // Add the page and limit parameter 
            if (pageParam) url.searchParams.set('page', pageParam.toString())
            if (limit) url.searchParams.set('limit', limit.toString())

            // Attach any additional filter params (e.g. diplomaId)  
            for (const [key, value] of Object.entries(extraParams)) {
                url.searchParams.set(key, value)
            }

            // Send the request
            const response = await fetch(url.toString())
            const data: ApiResponse<PaginatedResponse<T>> = await response.json()

            if (!data.status) throw new Error(data.message)

            return data.payload
        },
        // Start from page 1
        initialPageParam: 1,
        // Determine the next page
        getNextPageParam: (lastPage) => {
            if (!lastPage) return undefined

            const { page, totalPages } = lastPage.metadata
            if (page === totalPages) return undefined
            return page + 1
        },
        // Seed the query cache with the server-fetched page 1,
        // so the client renders instantly instead of showing a loading skeleton.
        initialData: initialData
            ? { pages: [initialData], pageParams: [1] }
            : undefined,
    })
}
