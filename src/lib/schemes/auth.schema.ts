import z from "zod";

export const loginSchema = z.object({
    username: z.string().nonempty('Username is required'),
    password: z.string().nonempty('Password is required'),
}).strict()

export const emailSchema = z.object({
    email: z.email("Please enter a valid email address"),
});

export const verifyResetCodeSchema = z.object({
    code: z
        .string()
        .min(6, 'OTP must be 6 digits')
        .regex(/^\d{6}$/, 'OTP must contain only digits'),
})

export const registerSchema = z
    .object({
        username: z
            .string()
            .nonempty('Your username is required')
            .min(3, 'Username must be at least 3 characters'),
        email: z.email("Please enter a valid email address"),
        password: z
            .string()
            .nonempty('Your password is required')
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
            ),
        confirmPassword: z
            .string()
            .nonempty('Your password is required'),
        firstName: z
            .string()
            .nonempty('Your first name is required')
            .min(3, 'First name must be at least 3 characters')
            .regex(/^[a-zA-Z]+$/, 'First name must contain only letters'),
        lastName: z
            .string()
            .nonempty('Your last name is required')
            .min(3, 'Last name must be at least 3 characters')
            .regex(/^[a-zA-Z]+$/, 'Last name must contain only letters'),
        phone: z
            .string()
            .nonempty('Your phone is required')
            .regex(
                /^\+20(10|11|12|15)\d{8}$/,
                "Please enter a valid Egyptian phone number"
            ),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password and confirm password must match',
        path: ['confirmPassword'],
    })