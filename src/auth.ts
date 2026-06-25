import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { login } from './lib/apis/login.api'
import { loginSchema } from './lib/schemes/auth.schema'

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/login',
        error: '/login',
        signOut: '/login',
    },
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const result = loginSchema.safeParse({
                    email: credentials?.email,
                    password: credentials?.password,
                })

                if (!result.success) {
                    throw new Error(result.error.message)
                }

                const payload = await login(result.data)

                if ('code' in payload) {
                    throw new Error('Invalid email or password')
                }
                return {
                    id: payload.user._id,
                    token: payload.token,
                    user: payload.user,
                }
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.token = user.token
                token.user = user.user
            }
            return token
        },
        session: ({ session, token }) => {
            session.user = token.user
            return session
        },
    },
}
