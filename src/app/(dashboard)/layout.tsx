import { AppSidebar } from "@/components/shared/dashboard-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import UserInfo from "@/components/shared/dashboard-user-info"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="bg-blue-50">
            {/* Desktop sidebar */}
            <AppSidebar userInfo={<UserInfo />} />

            {/* Mobile sidebar */}
            <SidebarInset>
                <header className="flex h-14 items-center gap-2 border-b border-gray-200 px-4 md:hidden">
                    <SidebarTrigger />
                    <span className="font-semibold text-blue-600">Exam App</span>
                </header>

                {/* Main content */}
                <div className="flex-1 px-6">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}