import { USER_ROLE } from "../constants/user.constant";

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE]

export interface User {
    _id: string
    username: string
    firstName: string
    lastName: string
    email: string
    phone: string | null
    role: UserRole
    isVerified: boolean
    createdAt: string
}