import PageBreadcrumb from "@/components/shared/breadcrumb";
import DiplomasList from "./_components/diplomas-list";
import PageHeader from "@/components/shared/dashboard-header";
import { GraduationCap } from "lucide-react";

export default function page() {
    return (
        <main>
            {/* Breadcrumb */}
            <PageBreadcrumb items={[{ label: "Diplomas" }]} />

            {/* Header */}
            <PageHeader title="Diplomas" icon={GraduationCap} />

            {/* Diplomas List */}
            <DiplomasList />
        </main>
    )
}
