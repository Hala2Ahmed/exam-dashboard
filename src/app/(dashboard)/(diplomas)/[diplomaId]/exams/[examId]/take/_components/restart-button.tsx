import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RestartButtonProps {
    onRestart: () => void
}

export default function RestartButton({ onRestart }: RestartButtonProps) {
    return (
        <Button type="button" variant="secondary" onClick={onRestart} className="flex-1">
            <RotateCcw size={16} />
            Restart
        </Button>
    )
}