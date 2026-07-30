import { sendOtp } from "@/lib/apis/register.api";
import { EmailStepField } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useSendOtp() {
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (fields: EmailStepField) => {
            const response = await sendOtp(fields)

            if (!response?.status) {
                throw new Error(response?.message || 'Something went wrong')
            }
            return response
        },
        onSuccess: () => {
            toast.success("Otp sent successfully", { position: "bottom-right" });
        },
    })

    return { isPending, error, sendOtp: mutate }
}