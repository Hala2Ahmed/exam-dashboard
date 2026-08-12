import { Skeleton } from "@/components/ui/skeleton"

export default function DiplomaItemSkeleton() {
    return (
        <li className="relative h-64 overflow-hidden rounded-xl md:h-72 lg:h-100">
            <Skeleton className="h-full w-full" />

            <div className="absolute inset-x-0 bottom-0 max-h-24 space-y-2 p-4">
                <Skeleton className="h-5 w-2/3 bg-white/30" />
                <Skeleton className="h-3 w-full bg-white/20" />
                <Skeleton className="h-3 w-4/5 bg-white/20" />
            </div>
        </li>
    )
}