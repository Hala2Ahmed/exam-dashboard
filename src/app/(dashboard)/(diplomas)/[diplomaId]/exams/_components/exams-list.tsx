"use client"

import { useMemo } from "react"
import { AlertCircle, FolderOpen } from "lucide-react"
import InfiniteScroll from "react-infinite-scroll-component"
import useExamsList from "../_hooks/use-exams-list"
import ExamItem from "./exam-item"
import StateMessage from "@/components/shared/state-message"
import ExamsListSkeleton from "@/components/skeleton/exams-list-skeleton"
import { Exam } from "@/lib/types/exams"

interface ExamsListProps {
    diplomaId: string
    initialData?: PaginatedResponse<Exam>
}

export default function ExamsList({ diplomaId, initialData }: ExamsListProps) {
    const { data: examPages, error, isLoading, hasNextPage, fetchNextPage } = useExamsList(diplomaId, { initialData })

    // Flatten all pages into one array
    const exams = useMemo(
        () => examPages?.pages.flatMap((page) => page?.data ?? []) ?? [],
        [examPages]
    )

    // Show loading state
    if (isLoading) return <ExamsListSkeleton />

    // Show error state
    if (error) {
        return <StateMessage icon={AlertCircle} iconClassName="text-red-500" message={error.message} />
    }

    // Show empty state
    if (exams.length === 0) {
        return <StateMessage icon={FolderOpen} iconClassName="text-gray-400" message="No exams found." />
    }

    return (
        <InfiniteScroll
            dataLength={exams.length}
            next={fetchNextPage}
            hasMore={hasNextPage ?? false}
            loader={<ExamsListSkeleton count={3} />}
            endMessage={<p className="py-6 text-center text-sm text-gray-400">End of list.</p>}
        >
            <ul className="mt-6 flex flex-col gap-3">
                {exams.map((exam) => (
                    <ExamItem key={exam.id} exam={exam} />
                ))}
            </ul>
        </InfiniteScroll>
    )
}