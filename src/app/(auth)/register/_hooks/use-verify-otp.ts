import { verifyOtp } from "@/lib/apis/register.api";
import { VerifyResetCodeField } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";

export default function useVerifyOtp() {
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (fields: VerifyResetCodeField) => {
            const response = await verifyOtp(fields)

            if (!response?.status) {
                throw new Error(response?.message || 'Something went wrong')
            }
            return response
        },
    })

    return { isPending, error, verifyOtp: mutate }
}