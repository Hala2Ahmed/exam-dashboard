import { CircleX } from 'lucide-react'

interface ErrorMessageProps {
    message?: string
    className?: string
}

export function ErrorMessage({
    message,
    className = 'mt-10',
}: ErrorMessageProps) {
    if (!message) return null

    return (
        <div
            className={`relative border border-red-600 bg-red-50 py-2.5 text-center text-red-600 ${className}`}
        >
            <div className="absolute -top-2.5 left-1/2 z-10 -translate-x-1/2">
                <CircleX size={18} className="rounded-full bg-white text-red-600" />
            </div>
            <p className="text-sm">{message}</p>
        </div>
    )
}
