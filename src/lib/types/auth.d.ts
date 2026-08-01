import { FORGOT_PASSWORD_STEPS, REGISTER_STEPS } from "../constants/auth.constant";
import { emailSchema, loginSchema, registerSchema, resetPasswordSchema, verifyResetCodeSchema } from "../schemes/auth.schema";
import { User } from "./user";

export type LoginFields = z.infer<typeof loginSchema>

export type loginResponse = {
    token: string
    user: User
}

export type registerSteps = (typeof REGISTER_STEPS)[keyof typeof REGISTER_STEPS];

export type EmailStepField = z.infer<typeof emailSchema>;

export type VerifyResetCodeField = z.infer<typeof verifyResetCodeSchema>

export type RegisterFields = z.infer<typeof registerSchema>

export type RegisterResponse = {
    token: string
    user: User
}

export type forgotPasswordSteps = (typeof FORGOT_PASSWORD_STEPS)[keyof typeof FORGOT_PASSWORD_STEPS];

export type ResetPasswordFields = z.infer<typeof resetPasswordSchema>

export type ForgotPasswordResponse = {
    message: string
    resetToken: string
}