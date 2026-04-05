import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
        <p className="mt-2 text-sm text-gray-600">
          계정을 만들고 건강 기록을 관리해보세요.
        </p>

        <div className="mt-6">
          <SignupForm />
        </div>
      </div>
    </main>
  );
}
