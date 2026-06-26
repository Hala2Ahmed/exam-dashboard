'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { LoginFields } from '@/lib/types/auth'
import { loginSchema } from '@/lib/schemes/auth.schema'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import useLogin from '../_hooks/use-login'
import { ErrorMessage } from '@/components/features/form-error-message'

export default function LoginForm() {
    //Mutation
    const { isPending, error, login } = useLogin()

    const form = useForm<LoginFields>({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: zodResolver(loginSchema),
    })

    const onSubmit: SubmitHandler<LoginFields> = async (values) => {
        login(values)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            {/* username */}
            <FieldGroup>
                <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            {/* label */}
                            <FieldLabel htmlFor="username">
                                Username
                            </FieldLabel>

                            {/* field */}
                            <Input
                                {...field}
                                id="username"
                                aria-invalid={fieldState.invalid}
                                placeholder="user123"
                                autoComplete="username"
                            />

                            {/* error */}
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            {/* password */}
            <FieldGroup className="mt-4">
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            {/* label */}
                            <FieldLabel htmlFor="password">
                                Password
                            </FieldLabel>

                            {/* field */}
                            <Input
                                type="password"
                                {...field}
                                id="password"
                                aria-invalid={fieldState.invalid}
                                placeholder="********"
                                autoComplete="current-password"
                            />

                            {/* error */}
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            {/* forget password */}
            <Link
                href="/forgot-password"
                className="block cursor-pointer mt-2.5 text-right text-sm font-medium text-blue-600"
            >
                Forgot your password?
            </Link>

            {/* Error Message */}
            {error && <ErrorMessage message={error?.message} />}

            {/* Button */}
            <Button
                type="submit"
                disabled={
                    isPending ||
                    (!form.formState.isValid && form.formState.isSubmitted)
                }
                className="w-full my-5"
            >
                {isPending ? 'Login...' : 'Login'}
            </Button>
        </form>
    )
}
