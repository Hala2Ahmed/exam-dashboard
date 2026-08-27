import * as React from "react"
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export interface BreadcrumbItemType {
    label: string
    href?: string
}

interface PageBreadcrumbProps {
    items: BreadcrumbItemType[]
}

export default function PageBreadcrumb({ items }: PageBreadcrumbProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1

                    return (
                        // Fragment groups the item
                        <React.Fragment key={item.label}>
                            <BreadcrumbItem>
                                {isLast || !item.href ? (
                                    // Render the current page as text
                                    <BreadcrumbPage className="text-blue-600 py-4">
                                        {item.label}
                                    </BreadcrumbPage>
                                ) : (
                                    // Render previous pages as links
                                    <BreadcrumbLink render={<Link href={item.href} />}>
                                        {item.label}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>

                            {/* Separator */}
                            {!isLast && <BreadcrumbSeparator />}
                        </React.Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}