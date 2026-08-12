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
                {items.map((item, index) => (
                    // Render each breadcrumb item
                    <BreadcrumbItem key={item.label}>
                        {index === items.length - 1 || !item.href ? (
                            // Render the current page as text
                            <BreadcrumbPage className="text-blue-600 py-4">
                                {item.label}
                            </BreadcrumbPage>
                        ) : (
                            // Render previous pages as links
                            <>
                                <BreadcrumbLink render={<Link href={item.href} />}>
                                    {item.label}
                                </BreadcrumbLink>

                                {/*Add separator between items */}
                                <BreadcrumbSeparator />
                            </>
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}