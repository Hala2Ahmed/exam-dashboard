import { ResetPasswordFields } from "@/lib/types/auth";
import useResetPassword from "../_hooks/use-reset-password";
import { resetPasswordSchema } from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@/components/shared/form-error-message";
import { Button } from "@/components/ui/button";

interface ResetPasswordStepProps {
  token: string
}

export default function ResetPasswordStep({ token }: ResetPasswordStepProps) {
  //Mutation
  const { isPending, error, resetPassword } = useResetPassword(token);

  //form
  const form = useForm<ResetPasswordFields>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  //submit
  const onSubmit: SubmitHandler<ResetPasswordFields> = (values) => {
    resetPassword(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Password */}
      <FieldGroup>
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="newPassword">
                New Password
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
        {/* Reset Button */}
        <Button
          type="submit"
          disabled={
            isPending ||
            (!form.formState.isValid && form.formState.isSubmitted)
          }
          className="w-full my-5"
        >
          {isPending ? 'Loading...' : 'Reset Password'}
        </Button>
      </div>
    </form>
  )
}
