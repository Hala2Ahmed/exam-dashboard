"use client";

import { useState } from "react";
import { registerSteps } from "@/lib/types/auth";
import { REGISTER_STEPS, STEPPER_STEP } from "@/lib/constants/auth.constant";
import EmailStep from "./register-email-step";
import OtpStep from "./register-otp-step";
import { Stepper } from "@/components/ui/stepper";
import { SubTitle } from "@/components/shared/form-sub-title";
import RegisterAccountForm from "./register-account-form";

interface StepConfig {
    title?: string;
    subtitle?: string;
    form: React.ReactNode;
}

export default function RegisterSteps() {
    const [step, setStep] = useState<registerSteps>(REGISTER_STEPS.EMAIL);
    const [email, setEmail] = useState<string | null>(null);

    /* Central configuration for each register step */
    const steps: Record<registerSteps, StepConfig> = {
        [REGISTER_STEPS.EMAIL]: {
            form: <EmailStep email={email} setStep={setStep} setEmail={setEmail} />,
        },
        [REGISTER_STEPS.OTP]: {
            subtitle: "Verify OTP",
            form: <OtpStep email={email} setStep={setStep} />,
        },
            [REGISTER_STEPS.USER_INFO]: {
            form: <RegisterAccountForm email={email} step={step} setStep={setStep} />,
        },
        [REGISTER_STEPS.PASSWORD]: {
            form: <RegisterAccountForm email={email} step={step} setStep={setStep} />,
        },
    };

    const current = steps[step];

    return (
        <>
            <div>
                {STEPPER_STEP[step] !== undefined && (
                    <Stepper steps={4} currentStep={STEPPER_STEP[step]} />
                )}
                <h2 className="font-inter text-3xl font-bold text-gray-800 pt-5">Create Account</h2>
                {current.subtitle && (
                    <SubTitle subtitle={current.subtitle} />
                )}
            </div>
            <div>{current.form}</div>
        </>
    );
}