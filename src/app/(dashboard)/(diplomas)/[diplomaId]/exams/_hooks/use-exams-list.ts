"use client"

import { useSearchParams } from "next/navigation"
import { EXAM_KEYS } from "@/lib/constants/query-keys.constant"
import usePaginatedList from "@/hooks/use-paginated-list"
import { Exam } from "@/lib/types/exams"

interface UseExamsListOptions {
    initialData?: PaginatedResponse<Exam>
}

export default function useExamsList(diplomaId: string, options: UseExamsListOptions = {}) {
    const searchParams = useSearchParams()

    const limitParam = searchParams.get('limit')
    const limit = limitParam ? Number(limitParam) : undefined

    return usePaginatedList<Exam>({
        queryKey: EXAM_KEYS.list(diplomaId, limit),
        endpoint: '/api/exams',
        limit,
        extraParams: { diplomaId },
        initialData: options.initialData,
    })
}