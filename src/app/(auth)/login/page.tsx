import Link from "next/link";
import LoginForm from "./_components/form-login";

export default function page() {
    return (
        <main className="flex flex-col items-center justify-center gap-10 h-full">
            <div className="flex flex-col gap-10 w-full max-w-113">
                {/* Heading */}
                <h2 className="font-inter text-3xl font-bold text-gray-800">Login</h2>

                {/* Form */}
                <LoginForm />

                {/* Link */}
                <p className="text-sm font-medium text-gray-500 text-center">
                    Don’t have an account?{' '}
                    <Link href="/register" className="cursor-pointer text-blue-600">
                        Create yours
                    </Link>
                </p>
            </div>
        </main>
    )
}
