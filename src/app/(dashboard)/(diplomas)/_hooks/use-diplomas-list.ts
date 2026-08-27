"use client"

import { useSearchParams } from "next/navigation"
import { DIPLOMA_KEYS } from "@/lib/constants/query-keys.constant"
import { Diploma } from "@/lib/types/diplomas"
import usePaginatedList from "@/hooks/use-paginated-list"

export default function useDiplomasList() {
    const searchParams = useSearchParams()
    const limit = Number(searchParams.get('limit'))

    return usePaginatedList<Diploma>({
        queryKey: DIPLOMA_KEYS.list(limit),
        endpoint: '/api/diplomas',
        limit,
    })
}