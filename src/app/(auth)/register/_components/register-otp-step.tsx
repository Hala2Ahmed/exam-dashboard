"use client"

import { ErrorMessage } from "@/components/shared/form-error-message"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import useVerifyOtp from "../_hooks/use-verify-otp"
import { registerSteps, VerifyResetCodeField } from "@/lib/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { verifyResetCodeSchema } from "@/lib/schemes/auth.schema"
import { Dispatch } from "react"
import { OTP_COUNTDOWN_KEY, OTP_COUNTDOWN_TIME, REGISTER_STEPS } from "@/lib/constants/auth.constant"
import { useCountdown } from "../_hooks/use-countdown"
import useSendOtp from "../_hooks/use-send-otp"

interface OtpStepProps {
    setStep: Dispatch<React.SetStateAction<registerSteps>>;
    email: string | null;
}

export default function OtpStep({ setStep, email }: OtpStepProps) {
    //Mutations
    const { isPending, error, verifyOtp } = useVerifyOtp()
    const { isPending: isResending, sendOtp } = useSendOtp()

    //Hooks
    const { seconds, isActive, start } = useCountdown(OTP_COUNTDOWN_KEY);

    //form
    const form = useForm<VerifyResetCodeField>({
        defaultValues: {
            code: '',
        },
        resolver: zodResolver(verifyResetCodeSchema),
    })

    //submit
    const onSubmit: SubmitHandler<VerifyResetCodeField> = (values) => {
        if (!email) return;

        verifyOtp(
            {
                code: values.code,
                email,
            },
            {
                onSuccess: () => {
                    // go to the next step
                    setStep(REGISTER_STEPS.USER_INFO);
                },
            },
        )
    }

    //resend otp
    const handleResend = () => {
        // Prevent sending a new OTP while the current one is still valid.
        if (!email || isActive) return;

        sendOtp(
            { email },
            {
                onSuccess: () => {
                    // start the countdown
                    start(OTP_COUNTDOWN_TIME / 1000);
                },
            },
        )
    }

    return (
        <>
            <p className="text-gray-500">
                Please enter the 6-digit code we have sent to:{" "}
                <span className="text-gray-800">{email}</span>.{" "}

                {/* Edit Email Button */}
                <button
                    type="button"
                    onClick={() => setStep(REGISTER_STEPS.EMAIL)}
                    className="text-blue-600 underline cursor-pointer"
                >
                    Edit
                </button>
            </p>

            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
                <FieldGroup>
                    <Controller
                        name="code"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <InputOTP
                                    {...field}
                                    maxLength={6}
                                    autoComplete="one-time-code"
                                >
                                    {Array.from({ length: 6 }).map((_, index) => (
                                        <InputOTPGroup key={index}>
                                            <InputOTPSlot index={index} />
                                        </InputOTPGroup>
                                    ))}
                                </InputOTP>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>

                {/* Resend Button */}
                <div className="text-center text-sm mt-4">
                    {isActive ? (
                        <p className="text-gray-500">
                            You can request another code in: {seconds}s
                        </p>
                    ) : (
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={isResending}
                            className="text-blue-600 hover:underline disabled:opacity-50 cursor-pointer"
                        >
                            {isResending ? 'Sending...' : 'Resend code'}
                        </button>
                    )}
                </div>

                {/* Error Message */}
                {error && <ErrorMessage message={error.message} />}

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full my-5"
                >
                    {isPending ? 'Verifying...' : 'Verify Code'}
                </Button>
            </form>
        </>
    )
}