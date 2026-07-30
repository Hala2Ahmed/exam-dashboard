"use client";

import { Controller, useFormContext, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@/components/shared/form-error-message";
import { RegisterFields } from "@/lib/types/auth";
import useRegister from "../_hooks/use-register";

interface PasswordStepProps {
    email: string | null;
}

export default function PasswordStep({ email }: PasswordStepProps) {
    // Get form context
    const form = useFormContext<RegisterFields>();

    // Mutations
    const { isPending, error, register } = useRegister();

    // Submit
    const onSubmit: SubmitHandler<RegisterFields> = (values) => {
        register({ ...values, email: email! });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Password */}
            <FieldGroup>
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="password">
                                Password
                            </FieldLabel>
                            <Input
                                {...field}
                                type="password"
                                id="password"
                                aria-invalid={fieldState.invalid}
                                placeholder="********"
                                autoComplete="new-password"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            {/* Confirm Password */}
            <FieldGroup className="mt-4">
                <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="confirmPassword">
                                Confirm Password
                            </FieldLabel>
                            <Input
                                {...field}
                                type="password"
                                id="confirmPassword"
                                aria-invalid={fieldState.invalid}
                                placeholder="********"
                                autoComplete="new-password"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            {/* Error Message */}
            {error && <ErrorMessage message={error.message} />}

            <div className="flex gap-3 my-5">
                {/* Create Account Button */}
                <Button
                    type="submit"
                    disabled={
                        isPending ||
                        (!form.formState.isValid && form.formState.isSubmitted)
                    }
                    className="w-full my-5"
                >
                    {isPending ? 'Loading...' : 'Create Account'}
                </Button>
            </div>
        </form>
    );
}