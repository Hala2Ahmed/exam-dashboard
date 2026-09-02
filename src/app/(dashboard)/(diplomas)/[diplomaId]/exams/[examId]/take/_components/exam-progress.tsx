import { Progress } from "@/components/ui/progress"

interface ExamProgressProps {
    current: number
    total: number
}

export default function ExamProgress({ current, total }: ExamProgressProps) {
    // Calculate the current progress percentage
    const percentage = (current / total) * 100

    return (
        <Progress
            value={percentage}
            aria-label={`Question ${current} of ${total}`}
        />
    )
}