"use client";

import { FORGOT_PASSWORD_STEPS } from "@/lib/constants/auth.constant";
import { forgotPasswordSteps } from "@/lib/types/auth";
import { useState } from "react";
import EmailStep from "./email-step";
import ResetPasswordStep from "./reset-password-step";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface StepConfig {
  title: string;
  subtitle: React.ReactNode;
  showBack?: boolean;
  form?: React.ReactNode;
  paragraph?: React.ReactNode;
}

export default function ForgotPasswordSteps() {
  // get token from url
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get("token");

  // state
  const [step, setStep] = useState<forgotPasswordSteps>(
    tokenFromUrl ? FORGOT_PASSWORD_STEPS.RESET_PASSWORD : FORGOT_PASSWORD_STEPS.EMAIL
  );
  const [email, setEmail] = useState<string | null>(null);

  /* Central configuration for each forgot password step */
  const steps: Record<forgotPasswordSteps, StepConfig> = {
    [FORGOT_PASSWORD_STEPS.EMAIL]: {
      title: "Forgot Password",
      subtitle: "Don’t worry, we will help you recover your account.",
      form: <EmailStep email={email} setStep={setStep} setEmail={setEmail} />,
    },
    [FORGOT_PASSWORD_STEPS.CHECK_EMAIL]: {
      title: "Password Reset Sent",
      subtitle: (
        <>
          We have sent a password reset link to:{" "}
          <span className="text-blue-600 font-medium">{email}</span>.
        </>
      ),
      showBack: true,
      paragraph: (
        <p className="text-gray-700">
          Please check your inbox and follow the instructions to reset your password.  <br />  <br />
          If you don’t see the email within a few minutes, check your spam or junk folder.
        </p>
      )
    },
    [FORGOT_PASSWORD_STEPS.RESET_PASSWORD]: {
      title: "Create a New Password",
      subtitle: "Create a new strong password for your account.",
      form: <ResetPasswordStep token={tokenFromUrl ?? ""} />,
    },
  }

  const current = steps[step];

  return (
    <>
      {current.showBack && (
        <button
          type="button"
          onClick={() => setStep(FORGOT_PASSWORD_STEPS.EMAIL)}
          className="text-gray-700 hover:text-gray-900 mb-4 cursor-pointer"
          aria-label="Back"
        >
          <ArrowLeft size={20} />
        </button>
      )}

      <h2 className="font-inter text-3xl font-bold text-gray-800">
        {current.title}
      </h2>

      {current.subtitle && (
        <p className=" text-gray-500">
          {current.subtitle}
        </p>
      )}

      {current.paragraph}

      {current.form}
    </>
  )
}
