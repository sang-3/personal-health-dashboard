"use client";

import Link from "next/link";
import { useState, useActionState } from "react";

// ── 타입 ──────────────────────────────────────────────
type State = {
  error?: string;
  success?: boolean;
} | null;

// ── 액션 ──────────────────────────────────────────────
async function signupAction(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!name || !email || !password || !confirmPassword) {
    return { error: "모든 항목을 입력해주세요." };
  }

  if (password !== confirmPassword) {
    return { error: "비밀번호가 일치하지 않습니다." };
  }

  // TODO: 회원가입 API 호출
  console.log("signup", { name, email, password, confirmPassword });

  return { success: true };
}

// ── 컴포넌트 ──────────────────────────────────────────
export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 비밀번호 불일치 실시간 체크 (confirmPassword가 입력된 경우에만 표시)
  const isPasswordMismatch = !!confirmPassword && password !== confirmPassword;

  const isDisabled =
    !name || !email || !password || !confirmPassword || isPasswordMismatch;

  const [state, formAction, isPending] = useActionState(signupAction, null);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        {/* ── 왼쪽 패널 ── */}
        <section className="hidden bg-slate-900 px-10 py-16 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <Link href="/" className="text-lg font-bold tracking-tight">
              Health Dashboard
            </Link>
            <p className="mt-2 text-sm text-slate-300">
              Personal Health Analytics
            </p>
          </div>

          <div className="max-w-md">
            <p className="mb-4 text-sm font-semibold text-slate-300">
              Start Your Health Flow
            </p>
            <h1 className="text-4xl font-bold leading-tight">
              건강 기록을 쌓고,
              <br />
              변화까지 확인해 보세요.
            </h1>
            <p className="mt-6 text-base leading-7 text-slate-300">
              러닝, 체중, 수면 기록을 기반으로 나만의 주간·월간 건강 리포트를
              확인할 수 있습니다.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm font-semibold">기록 입력</p>
              <p className="mt-1 text-sm text-slate-300">
                러닝, 체중, 수면 데이터를 간단하게 입력
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm font-semibold">홈 요약</p>
              <p className="mt-1 text-sm text-slate-300">
                현재 상태와 최근 변화 흐름을 한눈에 확인
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm font-semibold">리포트</p>
              <p className="mt-1 text-sm text-slate-300">
                주간·월간 분석으로 건강 패턴을 더 쉽게 해석
              </p>
            </div>
          </div>
        </section>

        {/* ── 오른쪽 패널 ── */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-8">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="mb-8">
              <Link
                href="/"
                className="text-lg font-bold tracking-tight text-slate-900 lg:hidden"
              >
                Health Dashboard
              </Link>

              <p className="mt-4 text-sm font-semibold text-slate-500">
                Sign Up
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                회원가입
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                계정을 만들고 건강 기록을 쌓아 나만의 대시보드를 시작해 보세요.
              </p>
            </div>

            <form action={formAction} className="space-y-5">
              {/* 이름 */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  이름
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900"
                />
              </div>

              {/* 이메일 */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  이메일
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900"
                />
              </div>

              {/* 비밀번호 */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900"
                />
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  비밀번호 확인
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 ${
                    isPasswordMismatch
                      ? "border-red-400 focus:border-red-500"
                      : "border-slate-300 focus:border-slate-900"
                  }`}
                />
                {/* 실시간 비밀번호 불일치 메시지 */}
                {isPasswordMismatch && (
                  <p className="mt-2 text-xs text-red-500">
                    비밀번호가 일치하지 않습니다.
                  </p>
                )}
              </div>

              {/* 서버 에러 메시지 */}
              {state?.error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {state.error}
                </p>
              )}

              {/* 성공 메시지 */}
              {state?.success && (
                <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-600">
                  회원가입이 완료되었습니다!
                </p>
              )}

              <button
                type="submit"
                disabled={isDisabled || isPending}
                className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {isPending ? "처리 중..." : "회원가입"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              이미 계정이 있나요?{" "}
              <Link
                href="/login"
                className="font-semibold text-slate-900 underline underline-offset-4"
              >
                로그인
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
