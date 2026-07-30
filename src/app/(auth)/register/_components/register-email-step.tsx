"use client"

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { OTP_COUNTDOWN_KEY, OTP_COUNTDOWN_TIME, REGISTER_STEPS } from "@/lib/constants/auth.constant";
import { emailSchema } from "@/lib/schemes/auth.schema";
import { EmailStepField, registerSteps } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useSendOtp from "../_hooks/use-send-otp";
import { ErrorMessage } from "@/components/shared/form-error-message";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCountdown } from "../_hooks/use-countdown";

interface EmailStepProps {
    setStep: Dispatch<React.SetStateAction<registerSteps>>;
    email: string | null;
    setEmail: Dispatch<React.SetStateAction<string | null>>;
}

export default function EmailStep({ setStep, email, setEmail }: EmailStepProps) {
    //Mutations
    const { isPending, error, sendOtp } = useSendOtp()

    //Hooks
    const { start, isActive } = useCountdown(OTP_COUNTDOWN_KEY);


    //form
    const form = useForm<EmailStepField>({
        defaultValues: {
            email: email || "",
        },
        resolver: zodResolver(emailSchema),
    })

    //submit
    const onSubmit: SubmitHandler<EmailStepField> = (values) => {
        // If the previous OTP is still valid, skip sending a new one and continue directly to the verification step.
        if (isActive) {
            setStep(REGISTER_STEPS.OTP);
            return;
        }

        sendOtp(values, {
            onSuccess: () => {
                // start the countdown
                start(OTP_COUNTDOWN_TIME / 1000);

                // store email in the state of the parent component
                setEmail(values.email);

                // go to the next step
                setStep(REGISTER_STEPS.OTP);
            }
        });
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* email */}
            <FieldGroup>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            {/* label */}
                            <FieldLabel htmlFor="email">
                                Email
                            </FieldLabel>

                            {/* field */}
                            <Input
                                type="email"
                                {...field}
                                id="email"
                                aria-invalid={fieldState.invalid}
                                placeholder="user@example.com"
                                autoComplete="email"
                            />

                            {/* error */}
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            {/* Error Message */}
            {error && <ErrorMessage message={error.message} />}

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={
                    isPending ||
                    (!form.formState.isValid && form.formState.isSubmitted)
                }
                className="w-full my-5"
            >
                {isPending ? 'Loading...' : 'Next'} <ChevronRight />
            </Button>

            {/* Link */}
            <p className="text-sm font-medium text-gray-500 text-center">
                Already have an account?{' '}
                <Link href="/login" className="cursor-pointer text-blue-600">
                    Login
                </Link>
            </p>
        </form>
    )
}
