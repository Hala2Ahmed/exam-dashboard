import { getExamQuestions } from "@/lib/apis/questions.api"
import { getExamById } from "@/lib/apis/exams.api"
import ExamTaking from "./_components/exam-taking"
import PageBreadcrumb from "@/components/shared/breadcrumb"
import PageHeader from "@/components/shared/dashboard-header"
import { HelpCircle } from "lucide-react"
import { redirect } from "next/navigation"

interface TakeExamPageProps {
    params: Promise<{ diplomaId: string; examId: string }>
}

export default async function page({ params }: TakeExamPageProps) {
    const { diplomaId, examId } = await params

    // Fetch exam questions and exam details in parallel
    const [questionsResponse, examResponse] = await Promise.all([
        getExamQuestions(examId),
        getExamById(examId),
    ])

    // If there are no questions, there's nothing to take — send user back to the exams list
    if (!questionsResponse.status || !questionsResponse.payload?.questions.length) {
        redirect(`/${diplomaId}/exams`)
    }

    const exam = examResponse.status ? examResponse.payload?.exam : undefined

    return (
        <main>
            {/* Breadcrumb: Diplomas > current diploma > current exam */}
            <PageBreadcrumb
                items={[
                    { label: "Diplomas", href: "/" },
                    { label: exam?.diploma.title ?? "Diploma", href: `/${diplomaId}/exams` },
                    { label: exam?.title ?? "Exam" },
                ]}
            />

            <div className="mt-4">
                <PageHeader
                    title={exam ? `${exam.title} Questions` : "Exam Questions"}
                    icon={HelpCircle}
                    showBack
                />
            </div>

            {/* Main exam-taking component, given the fetched questions and exam info */}
            <ExamTaking
                examId={examId}
                examTitle={exam ? `${exam.diploma.title} - ${exam.title}` : "Exam"}
                duration={exam?.duration ?? 30}
                questions={questionsResponse.payload.questions}
            />
        </main>
    )
}