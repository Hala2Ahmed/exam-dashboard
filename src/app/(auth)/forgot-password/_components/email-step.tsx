"use client"

import { EmailStepField, forgotPasswordSteps } from "@/lib/types/auth"
import { Dispatch, SetStateAction } from "react"
import useForgotPassword from "../_hooks/use-forgot-password"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { emailSchema } from "@/lib/schemes/auth.schema"
import { FORGOT_PASSWORD_STEPS } from "@/lib/constants/auth.constant"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ErrorMessage } from "@/components/shared/form-error-message"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface EmailStepProps {
  setStep: Dispatch<SetStateAction<forgotPasswordSteps>>
  setEmail: Dispatch<SetStateAction<string | null>>
  email: string | null
}

export default function EmailStep({ setStep, setEmail, email }: EmailStepProps) {
  //Mutation
  const { isPending, error, sendForgotPasswordEmail } = useForgotPassword()

  //form
  const form = useForm<EmailStepField>({
    defaultValues: {
      email: email || "",
    },
    resolver: zodResolver(emailSchema),
  })

  //submit
  const onSubmit: SubmitHandler<EmailStepField> = (values) => {
    sendForgotPasswordEmail(values, {
      onSuccess: () => {
        // store email in the state of the parent component
        setEmail(values.email);

        // go to the next step
        setStep(FORGOT_PASSWORD_STEPS.CHECK_EMAIL);
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
    </form>
  )
}
