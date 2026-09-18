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
        <aside className="flex h-178.25 flex-col justify-between bg-white p-6">
            <nav className="flex flex-col gap-3">
                {ACCOUNT_NAV_ITEMS.map((item) => {
                    // Check if the current page matches the navigation item
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 transition-colors",
                                isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-500 hover:bg-blue-100/60"
                            )}
                        >
                            <item.icon size={16} />
                            {item.title}
                        </Link>
                    )
                })}
            </nav>

            {/* Logout button */}
            <button
                type="button"
                onClick={() => signOut()}
                className="flex items-center gap-2.5 px-6 py-3 text-red-600 bg-red-50 cursor-pointer hover:bg-red-100/60"
            >
                <LogOut size={16} className="rotate-180" />
                Logout
            </button>
        </aside>
    )
}