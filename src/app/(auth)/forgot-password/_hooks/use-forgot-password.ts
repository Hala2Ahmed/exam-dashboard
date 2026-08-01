import { sendEmail } from "@/lib/apis/forgot-password.api";
import { EmailStepField } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";

export default function useForgotPassword() {
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (fields: EmailStepField) => {
            const response = await sendEmail(fields)

            if (!response?.status) {
                throw new Error(response?.message || "Failed to send reset email")
            }
            return response
        }
    })

    return { isPending, error, sendForgotPasswordEmail: mutate }
}