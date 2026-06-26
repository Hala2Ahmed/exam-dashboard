"use client"

import * as React from "react"

import { cn } from "@/lib/utils/tailwind-cn"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        'text-base font-medium text-gray-800 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  )
}

export { Label }
