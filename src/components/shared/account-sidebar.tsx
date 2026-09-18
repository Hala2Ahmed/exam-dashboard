"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Lock, LogOut } from "lucide-react"
import { cn } from "@/lib/utils/tailwind-cn"
import { signOut } from "next-auth/react"

const ACCOUNT_NAV_ITEMS = [
    { title: "Profile", href: "/profile", icon: User },
    { title: "Change Password", href: "/change-password", icon: Lock },
] as const

export default function AccountSidebar() {
    const pathname = usePathname()

    return (
        <aside className="flex md:h-178.25 flex-col justify-between bg-white p-6">
            <nav className="flex flex-col gap-3">
                {ACCOUNT_NAV_ITEMS.map((item) => {
                    // Check if the current page matches the navigation item
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-1 items-center justify-center gap-2 px-3 py-2.5 text-sm transition-colors sm:flex-none sm:justify-start sm:px-6 sm:py-3 sm:text-base",
                                isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-500 hover:bg-blue-100/60"
                            )}
                        >
                            <item.icon size={16} className="shrink-0" />
                            <span className="truncate">{item.title}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Logout button */}
            <button
                type="button"
                onClick={() => signOut()}
                className="mt-2 flex items-center justify-center gap-2.5 bg-red-50 px-6 py-3 text-red-600 hover:bg-red-100/60 sm:mt-0 sm:justify-start"
            >
                <LogOut size={16} className="shrink-0 rotate-180" />
                Logout
            </button>
        </aside>
    )
}