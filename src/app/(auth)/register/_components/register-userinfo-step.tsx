"use client";

import { Controller, useFormContext } from "react-hook-form";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RegisterFields } from "@/lib/types/auth";
import { PhoneInput } from "@/components/ui/phone-input";

const STEP_FIELDS = ["firstName", "lastName", "username", "phone"] as const;

interface UserInfoStepProps {
    onNext: () => void;
}

export default function UserInfoStep({ onNext }: UserInfoStepProps) {
    // Get form context
    const form = useFormContext<RegisterFields>();

    // Handle next
    const handleNext = async () => {
        const valid = await form.trigger(STEP_FIELDS);
        if (valid) onNext();
    };

    return (
        <div>
            {/* First Name */}
            <FieldGroup>
                <Controller
                    name="firstName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="firstName">
                                First Name
                            </FieldLabel>
                            <Input
                                {...field}
                                id="firstName"
                                aria-invalid={fieldState.invalid}
                                placeholder="Ahmed"
                                autoComplete="given-name"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            {/* Last Name */}
            <FieldGroup>
                <Controller
                    name="lastName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="lastName">
                                Last Name
                            </FieldLabel>
                            <Input
                                {...field}
                                id="lastName"
                                aria-invalid={fieldState.invalid}
                                placeholder="Mohamed"
                                autoComplete="family-name"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            {/* Username */}
            <FieldGroup>
                <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="username">
                                Username
                            </FieldLabel>
                            <Input
                                {...field}
                                id="username"
                                aria-invalid={fieldState.invalid}
                                placeholder="user123"
                                autoComplete="username"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            {/* phone number */}
            <FieldGroup>
                <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            {/* label */}
                            <FieldLabel htmlFor="phone">
                                Phone
                            </FieldLabel>

                            {/* field */}
                            <PhoneInput
                                {...field}
                                id="phone"
                                aria-invalid={fieldState.invalid}
                                placeholder="1012345678"
                                autoComplete="tel"
                            />

                            {/* error */}
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            {/* Next Button */}
            <Button type="button" onClick={handleNext} className="w-full my-5">
                Next <ChevronRight />
            </Button>
        </div>
    );
}