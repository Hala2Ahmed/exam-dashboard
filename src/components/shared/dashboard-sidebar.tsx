"use client"

import { usePathname } from "next/navigation"
import { FolderIcon, GraduationCap, User } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import DropDownMenu from "./dashboard-dropdown"

const items = [
    {
        title: "Diplomas",
        url: "/",
        icon: GraduationCap,
    },
    {
        title: "Account Settings",
        url: "/account-settings",
        icon: User,
    },
]

interface AppSidebarProps {
    userInfo: React.ReactNode
}

export function AppSidebar({ userInfo }: AppSidebarProps) {
    const pathname = usePathname()

    return (
        <Sidebar collapsible="offcanvas">
            {/* Logo + app name */}
            <SidebarHeader className="ps-10 pt-10">
                <Image
                    src="/assets/Final Logo 1.svg"
                    alt="elevate logo"
                    width={192}
                    height={37}
                    priority
                />

                <div className="mt-2.5 flex items-center gap-2.5 text-blue-600">
                    <FolderIcon />
                    <h1 className="text-xl font-semibold">Exam App</h1>
                </div>
            </SidebarHeader>

            {/* Nav items */}
            <SidebarContent className="px-10 pt-10">
                <SidebarMenu>
                    {items.map((item) => {
                        const isActive =
                            pathname === item.url || pathname?.startsWith(item.url + "/")
                        return (
                            <SidebarMenuItem key={item.title} className="pb-2.5">
                                <SidebarMenuButton
                                    render={<a href={item.url} />}
                                    isActive={isActive}
                                    className={
                                        isActive
                                            ? "bg-blue-100 border border-blue-500 text-blue-700 hover:bg-blue-200 hover:text-blue-700 data-active:bg-blue-100 data-active:text-blue-700 h-11"
                                            : "text-muted-foreground hover:bg-transparent hover:text-foreground"
                                    }
                                >
                                    <item.icon
                                        className={
                                            isActive ? "size-6 text-blue-500" : "size-4"
                                        }
                                    />
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="px-6 pb-6 md:px-10 md:pb-10">
                <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex flex-1 min-w-0 items-center gap-2">
                        <Avatar className="shrink-0">
                            <AvatarImage src="/assets/Avatar.jpg" alt="Avatar" />
                            <AvatarFallback>User</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                            {userInfo}
                        </div>

                        <div className="shrink-0">
                            <DropDownMenu />
                        </div>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}