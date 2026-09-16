"use client"

import { Pie, PieChart } from "recharts"
import { ChartContainer, ChartConfig } from "@/components/ui/chart"

interface ExamResultChartProps {
    correct: number
    incorrect: number
}

const chartConfig: ChartConfig = {
    correct: { label: "Correct", color: "#16A34A" },
    incorrect: { label: "Incorrect", color: "#DC2626" },
}

export default function ExamResultChart({ correct, incorrect }: ExamResultChartProps) {
    // Formats the exam result data for the pie chart
    const chartData = [
        { name: "correct", value: correct, fill: "var(--color-correct)" },
        { name: "incorrect", value: incorrect, fill: "var(--color-incorrect)" },
    ]

    return (
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-52">
            <PieChart>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    strokeWidth={2}
                />
            </PieChart>
        </ChartContainer>
    )
}