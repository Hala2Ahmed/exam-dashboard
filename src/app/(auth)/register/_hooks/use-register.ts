import { registerUser } from "@/lib/apis/register.api";
import { RegisterFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useRegister() {
    const router = useRouter();
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (fields: RegisterFields) => {
            const response = await registerUser(fields);
            
            if (!response?.status) {
                throw new Error(response?.message || "Registration failed");
            }
            return response;
        },
        onSuccess: () => {
            router.push("/login");
        },
    });

    return { isPending, error, register: mutate };
}