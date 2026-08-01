import { resetPassword } from "@/lib/apis/forgot-password.api"
import { ResetPasswordFields } from "@/lib/types/auth"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useResetPassword(token: string) {
    const router = useRouter();

    const { isPending, error, mutate } = useMutation({
        mutationFn: async (fields: ResetPasswordFields) => {
            const response = await resetPassword(fields, token)

            if (!response?.status) {
                const detail = response?.errors?.[0]?.messages?.[0];
                throw new Error(detail || response?.message || "Failed to reset password");
            }
            return response
        },
        onSuccess: () => {
            toast.success("Password reset successfully", { position: "bottom-right" });
            router.push("/login");
        },
    })

    return { isPending, error, resetPassword: mutate }
}
