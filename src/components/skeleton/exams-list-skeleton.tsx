import ExamItemSkeleton from "./exam-item-skeleton"

interface ExamsListSkeletonProps {
    count?: number
}

export default function ExamsListSkeleton({ count = 6 }: ExamsListSkeletonProps) {
    return (
        <ul className="mt-6 flex flex-col gap-3">
            {Array.from({ length: count }).map((_, index) => (
                <ExamItemSkeleton key={index} />
            ))}
        </ul>
    )
}