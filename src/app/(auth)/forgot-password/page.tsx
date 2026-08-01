import Link from "next/link";
import ForgotPasswordSteps from "./_components/forgot-password-flow";

export default function page() {
  return (
    <main className="flex flex-col items-center justify-center gap-10 h-full">
      <div className="flex flex-col gap-5 w-full max-w-113">
        {/* Form */}
        <ForgotPasswordSteps />
      </div>

      {/* Link */}
      <footer className="text-sm font-medium text-gray-500 text-center">
        Don’t have an account?{' '}
        <Link href="/register" className="cursor-pointer text-blue-600">
          Create yours
        </Link>
      </footer>
    </main>
  )
}
