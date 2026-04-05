import Link from "next/link";
import { ReactNode } from "react";

type UserLayoutProps = {
  children: ReactNode;
};

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 overflow-hidden lg:grid-cols-2">
        <section className="hidden bg-[#08152f] px-10 py-12 text-white lg:flex lg:flex-col">
          <div className="max-w-xl">
            <Link
              href="/"
              className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 transition hover:bg-white/15"
            >
              Personal Health Dashboard
            </Link>

            <h1 className="mt-6 text-4xl font-bold leading-tight">
              건강 기록을
              <br />더 직관적으로 관리하세요
            </h1>

            <p className="mt-5 text-sm leading-7 text-white/70">
              체중 기록을 저장하고, 평균·최고·최저 수치를 한눈에 확인하며, 변화
              추이를 차트로 확인할 수 있는 개인 건강 대시보드입니다.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 xl:grid-cols-3">
            <FeatureCard
              title="기록 관리"
              description="날짜별 체중을 추가하고 수정하며 꾸준히 관리할 수 있습니다."
            />
            <FeatureCard
              title="요약 확인"
              description="최근, 평균, 최고, 최저 체중을 빠르게 확인할 수 있습니다."
            />
            <FeatureCard
              title="추이 분석"
              description="변화 흐름을 차트로 확인해 몸 상태를 더 쉽게 파악합니다."
            />
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-white/60">이번 주 요약</p>
                <h2 className="mt-2 text-2xl font-semibold">
                  기록이 쌓일수록
                  <br />
                  변화가 더 잘 보여요
                </h2>
              </div>

              <div className="rounded-2xl bg-white/10 px-3 py-2 text-right">
                <p className="text-xs text-white/60">최근 기록</p>
                <p className="mt-1 text-lg font-semibold">72.4kg</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs text-white/60">평균 체중</p>
                <p className="mt-2 text-xl font-bold">71.8kg</p>
                <p className="mt-1 text-xs text-emerald-300">최근 7일 기준</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs text-white/60">최저 체중</p>
                <p className="mt-2 text-xl font-bold">71.2kg</p>
                <p className="mt-1 text-xs text-sky-300">기록 기준 자동 계산</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-white/10 p-4">
              <div className="flex items-end gap-3">
                <Bar height="35%" />
                <Bar height="48%" />
                <Bar height="44%" />
                <Bar height="60%" />
                <Bar height="55%" />
                <Bar height="68%" />
                <Bar height="62%" />
              </div>

              <div className="mt-3 flex justify-between text-xs text-white/50">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8">
            <p className="text-sm text-white/50">
              꾸준한 기록은 작은 변화부터 시작됩니다.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-6 lg:hidden">
              <Link
                href="/"
                className="inline-flex rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
              >
                Personal Health Dashboard
              </Link>
            </div>

            {children}
          </div>
        </section>
      </div>
    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-white/60">{description}</p>
    </article>
  );
}

function Bar({ height }: { height: string }) {
  return (
    <div className="flex h-36 flex-1 items-end">
      <div className="w-full rounded-t-xl bg-white/80" style={{ height }} />
    </div>
  );
}
