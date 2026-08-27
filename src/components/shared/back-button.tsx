"use client"

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BackButton() {
    const router = useRouter()

    return (
        <button
            type="button"
            onClick={() => router.back()}
            className="flex h-16 sm:h-20 md:h-24 w-9 sm:w-10 shrink-0 items-center justify-center border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 cursor-pointer"
            aria-label="Back"
        >
            <ChevronLeft size={18} className="sm:size-5" />
        </button>
    )
}