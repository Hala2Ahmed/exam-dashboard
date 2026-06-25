import { loginSchema } from "../schemes/auth.schema";
import { User } from "./user";

export type LoginFields = z.infer<typeof loginSchema>

export type loginResponse = {
    token: string
    user: User
}
