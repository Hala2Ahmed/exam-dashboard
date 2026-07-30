import { cn } from "@/lib/utils/tailwind-cn";

interface StepperProps {
    steps: number;
    currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
    return (
        <div className="flex items-center w-full">
            {Array.from({ length: steps }).map((_, index) => (
                <div key={index} className="flex items-center flex-1 last:flex-none">
                    {/* Circle */}
                    <div
                        className={cn(
                            "relative flex h-3 w-3 rotate-45 items-center justify-center",

                            index < currentStep && "bg-blue-600",

                            index === currentStep && "bg-blue-100",

                            index > currentStep && "border-2 border-blue-600 bg-white"
                        )}
                    >
                        {index === currentStep && (
                            <div className="h-2 w-2 bg-blue-600" />
                        )}
                    </div>

                    {/* Don't render a connector after the last step */}
                    {index < steps - 1 && (
                        <div
                            className={cn(
                                "h-0.5 flex-1 transition-colors",
                                index < currentStep ? "bg-blue-600" : "bg-blue-50  border border-dashed border-blue-600"
                            )}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}