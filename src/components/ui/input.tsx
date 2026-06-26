import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils/tailwind-cn"
import { Eye, EyeOff } from "lucide-react"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = React.useState(false)
  const isPassword = type === "password"
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type

  return (
    <div className={cn("relative w-full", className)}>
      <InputPrimitive
        type={resolvedType}
        data-slot="input"
        className={cn(
          'flex h-11 w-full border border-gray-200 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 focus-visible:border focus-visible:border-blue-600 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          isPassword && "pe-10",
        )}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute inset-y-0 inset-e-0 flex cursor-pointer items-center pe-3 text-gray-400 transition-colors focus:outline-none disabled:pointer-events-none"
          tabIndex={-1}
        >
          {showPassword ? (
            <Eye width={20} height={20} />
          ) : (
            <EyeOff width={20} height={20} />
          )}
        </button>
      )}
    </div>
  )
}

export { Input }
