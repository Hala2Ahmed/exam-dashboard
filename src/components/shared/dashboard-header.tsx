import { LucideIcon } from "lucide-react"

interface PageHeaderProps {
    title: string
    icon: LucideIcon
}

export default function PageHeader({ title, icon: Icon }: PageHeaderProps) {
    return (
        <header className="flex flex-1 items-center gap-4 bg-blue-600 px-4 py-4">
            <Icon className="text-white" size={45} />
            <h1 className="text-3xl font-semibold text-white">{title}</h1>
        </header>
    )
}