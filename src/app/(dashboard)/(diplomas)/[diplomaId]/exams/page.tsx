import { getExamsByDiploma } from "@/lib/apis/exams.api"
import ExamsList from "./_components/exams-list"
import PageBreadcrumb from "@/components/shared/breadcrumb"
import PageHeader from "@/components/shared/dashboard-header"
import { BookOpenCheck } from "lucide-react"

interface ExamsPageProps {
    params: Promise<{ diplomaId: string }>
}

export default async function page({ params }: ExamsPageProps) {
    // Await the params Promise to extract the diplomaId from the URL
    const { diplomaId } = await params

    const response = await getExamsByDiploma(diplomaId)
    const diplomaTitle = response.status ? response.payload?.data[0]?.diploma.title : undefined


    return (
        <main>
            {/* Navigation breadcrumb: Diplomas -> [Diploma Name] -> Exams */}
            <PageBreadcrumb
                items={[
                    { label: "Diplomas", href: "/" },
                    { label: diplomaTitle ?? "exams" },
                    { label: "Exams" },
                ]}
            />

            <div className="mt-4">
                <PageHeader
                    title={diplomaTitle ? `${diplomaTitle} Exams` : "Exams"}
                    icon={BookOpenCheck}
                    showBack
                />
            </div>

            <ExamsList diplomaId={diplomaId} initialData={response.status ? response.payload : undefined}
            />
        </main>
    )
}