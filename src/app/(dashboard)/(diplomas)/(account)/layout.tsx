import { User } from "lucide-react"
import PageHeader from "@/components/shared/dashboard-header"
import AccountSidebar from "@/components/shared/account-sidebar"
import AccountBreadcrumb from "@/components/shared/account-breadcrumb"

export default function AccountSettingsLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            {/* Breadcrumb */}
            <AccountBreadcrumb />

            {/* Header */}
            <div className="mt-4">
                <PageHeader title="Account Settings" icon={User} showBack />
            </div>

            <div className="my-6 flex flex-col gap-4 overflow-hidden sm:flex-row sm:gap-6">
                <AccountSidebar />

                <div className="min-w-0 flex-1 bg-white p-4 sm:p-6">
                    {children}
                </div>
            </div>
        </main>
    )
}