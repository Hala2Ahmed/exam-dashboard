"use client"

import { usePathname } from "next/navigation"
import PageBreadcrumb from "@/components/shared/breadcrumb"

export default function AccountBreadcrumb() {
    const pathname = usePathname()

    // Check if the current page is the Change Password page
    const isChangePassword = pathname === "/change-password"

    return (
        <PageBreadcrumb
            items={
                isChangePassword
                    ? [{ label: "Account", href: "/profile" }, { label: "Change Password" }]
                    : [{ label: "Account" }]
            }
        />
    )
}