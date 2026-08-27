import Image from "next/image"
import Link from "next/link"
import { Clock, HelpCircle } from "lucide-react"
import { Exam } from "@/lib/types/exams"
import ExamDescription from "./exam-description"

interface ExamItemProps {
    exam: Exam
}

export default function ExamItem({ exam }: ExamItemProps) {
    return (
        <li className="flex flex-col gap-4 bg-blue-50 p-4 transition-colors hover:bg-blue-100 sm:flex-row sm:items-center">
            {/* Exam thumbnail image */}
            <div className="relative mx-auto h-20 w-20 shrink-0 overflow-hidden bg-blue-100 border border-blue-300 sm:mx-0 sm:h-25 sm:w-25">
                <Image src={exam.image} alt={exam.title} sizes="(min-width: 640px) 100px, 80px" fill className="object-contain p-3" />
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    {/* Exam title */}
                    <h3 className="font-semibold text-lg text-blue-600 sm:text-xl">{exam.title}</h3>

                    {/* Metadata: number of questions and duration */}
                    <span className="flex flex-wrap items-center gap-1 text-xs text-gray-800 sm:shrink-0 sm:text-sm">
                        <HelpCircle size={14} />
                        {exam.questionsCount} Questions
                        <span className="text-gray-300">|</span>
                        <Clock size={14} />
                        {exam.duration} minutes
                    </span>
                </div>

                {/* Expandable exam description with "See More" support */}
                <ExamDescription description={exam.description} />
            </div>

            {/* Navigates to the exam-taking page */}
            <Link
                href={`/exams/${exam.id}`}
                className="shrink-0 rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
                Start
            </Link>
        </li>
    )
}