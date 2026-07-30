import { REGISTER_STEPS } from "../constants/auth.constant";
import { emailSchema, loginSchema, registerSchema, verifyResetCodeSchema } from "../schemes/auth.schema";
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
