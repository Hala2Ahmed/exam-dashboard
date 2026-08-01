import { registerSteps } from "../types/auth";

export const REGISTER_STEPS = {
    EMAIL: "email",
    OTP: "otp",
    USER_INFO: "userInfo",
    PASSWORD: "password",
} as const;

export const STEPPER_STEP: Record<registerSteps, number> = {
    [REGISTER_STEPS.EMAIL]: 0,
    [REGISTER_STEPS.OTP]: 1,
    [REGISTER_STEPS.USER_INFO]: 2,
    [REGISTER_STEPS.PASSWORD]: 3,
};

export const OTP_COUNTDOWN_KEY = "otp-countdown";
export const OTP_COUNTDOWN_TIME = 60000;

export const FORGOT_PASSWORD_STEPS = {
    EMAIL: "email",
    CHECK_EMAIL: "check-email",
    RESET_PASSWORD: "reset-password"
} as const