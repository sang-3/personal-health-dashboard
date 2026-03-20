"use client";

import Link from "next/link";
import { useState, useActionState } from "react";

// ── 타입 ──────────────────────────────────────────────
type State = {
  error?: string;
  success?: boolean;
} | null;

// ── 서버(or 클라이언트) 액션 ───────────────────────────
async function loginAction(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 서버 측 유효성 검사
  if (!email || !password) {
    return { error: "이메일과 비밀번호를 입력해주세요." };
  }

  // TODO: 실제 로그인 API 호출
  console.log("login", { email, password });

  // 예시: 실패 케이스
  // return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };

  return { success: true };
}

// ── 컴포넌트 ──────────────────────────────────────────
export default function LoginPage() {
  // 실시간 유효성 검사용 state (isDisabled 버튼 제어)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isDisabled = !email || !password;

  // useActionState: 폼 제출 처리 + 로딩/에러 상태 관리
  const [state, formAction, isPending] = useActionState(loginAction, null);

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
              Welcome Back
            </p>
            <h1 className="text-4xl font-bold leading-tight">
              기록을 다시 확인하고
              <br />
              오늘의 건강 흐름을 이어가세요.
            </h1>
            <p className="mt-6 text-base leading-7 text-slate-300">
              러닝, 체중, 수면 데이터를 한 곳에서 관리하고 주간·월간 변화까지
              한눈에 확인할 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-2xl font-bold">7일</p>
              <p className="mt-1 text-sm text-slate-300">주간 요약</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-2xl font-bold">3종</p>
              <p className="mt-1 text-sm text-slate-300">기록 관리</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-2xl font-bold">1개월</p>
              <p className="mt-1 text-sm text-slate-300">월간 리포트</p>
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

              <p className="mt-4 text-sm font-semibold text-slate-500">Login</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                로그인
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                계정에 로그인하고 건강 기록과 리포트를 이어서 확인해 보세요.
              </p>
            </div>

            {/* action={formAction} 으로 useActionState 연결 */}
            <form action={formAction} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  이메일
                </label>
                <input
                  id="email"
                  name="email" // FormData 키
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // 실시간 유효성 검사용
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    비밀번호
                  </label>
                  <button
                    type="button"
                    className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                  >
                    비밀번호 찾기
                  </button>
                </div>
                <input
                  id="password"
                  name="password" // FormData 키
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // 실시간 유효성 검사용
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900"
                />
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
                  로그인 성공!
                </p>
              )}

              <button
                type="submit"
                disabled={isDisabled || isPending} // 실시간 검사 + 로딩 상태 모두 적용
                className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {isPending ? "로그인 중..." : "로그인"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">OR</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <button
              type="button"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              게스트 데모로 둘러보기
            </button>

            <p className="mt-6 text-center text-sm text-slate-600">
              아직 계정이 없나요?{" "}
              <Link
                href="/signup"
                className="font-semibold text-slate-900 underline underline-offset-4"
              >
                회원가입
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
