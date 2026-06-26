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
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                const result = loginSchema.safeParse({
                    username: credentials?.username,
                    password: credentials?.password,
                })

                if (!result.success) {
                    throw new Error(result.error.message)
                }

                const payload = await login(result.data)

                if ('code' in payload) {
                    throw new Error('Invalid username or password')
                }
                return {
                    id: payload.user.id,
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
