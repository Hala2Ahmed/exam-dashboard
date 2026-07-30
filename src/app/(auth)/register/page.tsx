import RegisterSteps from "./_components/register-steps";

export default function page() {
  return (
    <main className="flex flex-col items-center justify-center gap-10 h-full">
      <div className="flex flex-col gap-5 w-full max-w-113">
        {/* Form */}
        <RegisterSteps />
      </div>
    </main>
  )
}
