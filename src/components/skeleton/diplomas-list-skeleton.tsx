import DiplomaItemSkeleton from "./diploma-item-skeleton"

interface DiplomasListSkeletonProps {
    count?: number
}

export default function DiplomasListSkeleton({ count = 12 }: DiplomasListSkeletonProps) {
    return (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
            {Array.from({ length: count }).map((_, index) => (
                <DiplomaItemSkeleton key={index} />
            ))}
        </ul>
    )
}