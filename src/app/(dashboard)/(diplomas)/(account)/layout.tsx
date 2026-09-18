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

            <div className="my-6 flex gap-6 overflow-hidden">
                {/* Sidebar */}
                <AccountSidebar />

                {/* Main content */}
                <div className="min-w-0 flex-1 p-4 sm:p-6 bg-white">
                    {children}
                </div>
            </div>
        </main>
    )
}