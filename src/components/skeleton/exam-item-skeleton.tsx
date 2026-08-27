import { Skeleton } from "@/components/ui/skeleton"

export default function ExamItemSkeleton() {
    return (
        <li className="flex flex-col gap-4 bg-blue-50 p-4 sm:flex-row sm:items-center">
            {/* Image */}
            <Skeleton className="mx-auto h-20 w-20 shrink-0 rounded-none sm:mx-0 sm:h-25 sm:w-25" />

            {/* Title + details + description */}
            <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-4 w-40 shrink-0" />
                </div>

                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
            </div>

            {/* Start button */}
            <Skeleton className="h-9 w-full shrink-0 sm:w-20" />
        </li>
    )
}