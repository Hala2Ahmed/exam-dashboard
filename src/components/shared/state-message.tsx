import { LucideIcon } from "lucide-react"

interface StateMessageProps {
    icon: LucideIcon
    iconClassName?: string
    message: string
}

export default function StateMessage({ icon: Icon, iconClassName, message }: StateMessageProps) {
    return (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
            <Icon className={iconClassName} size={32} />
            <p className="text-gray-600">{message}</p>
        </div>
    )
}