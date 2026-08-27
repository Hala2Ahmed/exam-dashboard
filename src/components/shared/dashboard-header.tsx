import { LucideIcon } from "lucide-react"
import BackButton from "./back-button"

interface PageHeaderProps {
    title: string
    icon: LucideIcon
    showBack?: boolean
}

export default function PageHeader({ title, icon: Icon, showBack = false }: PageHeaderProps) {
    return (
        <header className="flex items-center gap-2 sm:gap-3">
            {showBack && <BackButton />}
            <div className="flex h-16 sm:h-20 md:h-24 flex-1 items-center gap-2 sm:gap-3 md:gap-4 bg-blue-600 px-3 py-3 sm:px-4 sm:py-4">
                <Icon className="text-white shrink-0" size={28} />
                <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-white truncate">
                    {title}
                </h1>
            </div>
        </header>
    )
}