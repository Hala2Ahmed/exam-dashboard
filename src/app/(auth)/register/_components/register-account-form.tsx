"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFields, registerSteps } from "@/lib/types/auth";
import { registerSchema } from "@/lib/schemes/auth.schema";
import { REGISTER_STEPS } from "@/lib/constants/auth.constant";
import PasswordStep from "./register-password-step";
import UserInfoStep from "./register-userinfo-step";
import { SubTitle } from "@/components/shared/form-sub-title";

const STEP_HEADERS = {
    [REGISTER_STEPS.USER_INFO]: {
        subtitle: "Tell us more about you",
    },
    [REGISTER_STEPS.PASSWORD]: {
        subtitle: "Create a strong password",
    },
};

interface RegisterFormStepsProps {
    email: string | null;
    step: registerSteps;
    setStep: (step: registerSteps) => void;
}

export default function RegisterAccountForm({ email, step, setStep }: RegisterFormStepsProps) {
    const form = useForm<RegisterFields>({
        defaultValues: {
            email: email ?? "",
            firstName: "",
            lastName: "",
            username: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
        resolver: zodResolver(registerSchema),
    });

    const headerInfo = STEP_HEADERS[step as keyof typeof STEP_HEADERS];

    return (
        <FormProvider {...form}>
            {headerInfo && <SubTitle {...headerInfo} />}
            {step === REGISTER_STEPS.USER_INFO ? (
                <UserInfoStep onNext={() => setStep(REGISTER_STEPS.PASSWORD)} />
            ) : (
                <PasswordStep email={email} />
            )}
        </FormProvider>
    );
}