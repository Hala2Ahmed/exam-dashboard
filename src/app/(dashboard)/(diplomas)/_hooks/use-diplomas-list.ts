"use client"

import { DIPLOMA_KEYS } from "@/lib/constants/query-keys.constant";
import { Diploma } from "@/lib/types/diplomas";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function useDiplomasList() {
    //Search params
    const searchParams = useSearchParams()

    // Get the limit from the URL
    const limitParam = searchParams.get('limit')
    const limit = limitParam ? Number(limitParam) : undefined

    const { isLoading, data, hasNextPage, fetchNextPage, error } = useInfiniteQuery({
        queryKey: DIPLOMA_KEYS.list(limit),
        queryFn: async ({ pageParam }) => {
            // Create the API URL
            const url = new URL('/api/diplomas', window.location.origin)

            // Add the page and limit parameter 
            if (pageParam) url.searchParams.set('page', pageParam.toString())
            if (limit) url.searchParams.set('limit', limit.toString())

            // Send the request
            const response = await fetch(url.toString())
            const data: ApiResponse<PaginatedResponse<Diploma>> = await response.json()

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
    })

    return {
        isLoading,
        data,
        hasNextPage,
        fetchNextPage,
        error,
    }
}
