import { USER_ROLE } from "../constants/user.constant";

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE]

export interface User {
    id: string
    username: string
    email: string
    phone: string | null
    firstName: string
    lastName: string
    emailVerified: boolean
    phoneVerified: boolean
    role: UserRole
}