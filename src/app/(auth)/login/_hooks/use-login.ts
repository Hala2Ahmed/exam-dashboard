import { LoginFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export default function useLogin() {
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (fields: LoginFields) => {
            const response = await signIn('credentials', {
                username: fields.username,
                password: fields.password,
                redirect: false
            })

            if (!response?.ok) {
                throw new Error(response?.error || 'Something went wrong')
            }
            return response
        },
        onSuccess: () => {
            const callbackUrl =
                new URLSearchParams(location.search).get('callbackUrl') || '/'
            location.href = callbackUrl
        },
    })

    return { isPending, error, login: mutate }
}