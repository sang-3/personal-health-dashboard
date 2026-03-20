import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "건강 기록 통합 관리",
      desc: "러닝, 체중, 수면 기록을 한 곳에서 입력하고 흐름을 쉽게 확인할 수 있습니다.",
      icon: "🏃",
    },
    {
      title: "상태 맞춤 홈 요약",
      desc: "최근 기록을 바탕으로 오늘의 컨디션과 주의 포인트를 한눈에 보여줍니다.",
      icon: "📌",
    },
    {
      title: "주간·월간 리포트",
      desc: "기록 변화와 패턴을 시각적으로 정리해 꾸준한 관리에 도움을 줍니다.",
      icon: "📊",
    },
  ];

  const highlights = [
    "최근 7일 러닝 거리 변화",
    "체중 추세와 평균 변화량",
    "수면 시간 및 규칙성 확인",
    "기록 기반 맞춤 인사이트 제공",
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div>
            <p className="text-xl font-bold tracking-tight">Health Dashboard</p>
            <p className="text-sm text-slate-500">Personal Health Analytics</p>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
            <a href="#features" className="transition hover:text-slate-900">
              기능
            </a>
            <a href="#preview" className="transition hover:text-slate-900">
              미리보기
            </a>
            <a href="#report" className="transition hover:text-slate-900">
              리포트
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              시작하기
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
              건강 데이터를 더 쉽게 기록하고 해석하는 대시보드
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-6xl">
              기록만 해도,
              <br />
              내 건강 흐름이
              <br />
              한눈에 보이도록
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              러닝, 체중, 수면 데이터를 입력하면 현재 상태를 요약해 보여주고,
              주간·월간 리포트로 변화 패턴까지 확인할 수 있는 개인 건강 분석
              서비스입니다.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5">
                무료로 시작하기
              </button>
              <button className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                데모 보기
              </button>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold">3종</p>
                <p className="mt-1 text-sm text-slate-500">핵심 기록 관리</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold">7일</p>
                <p className="mt-1 text-sm text-slate-500">주간 변화 분석</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold">1개월</p>
                <p className="mt-1 text-sm text-slate-500">월간 리포트 제공</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-2xl rounded-[32px] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200">
              <div className="rounded-[28px] bg-slate-50 p-5">
                <div className="grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
                  <div className="rounded-3xl bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">
                          오늘의 건강 요약
                        </p>
                        <h2 className="mt-1 text-xl font-bold">
                          컨디션 안정적
                        </h2>
                      </div>
                      <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                        + 꾸준한 흐름
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs text-slate-500">러닝</p>
                        <p className="mt-2 text-lg font-bold">12.4 km</p>
                        <p className="text-xs text-slate-400">이번 주 누적</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs text-slate-500">체중</p>
                        <p className="mt-2 text-lg font-bold">68.2 kg</p>
                        <p className="text-xs text-slate-400">전주 대비 -0.4</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs text-slate-500">수면</p>
                        <p className="mt-2 text-lg font-bold">7.1 h</p>
                        <p className="text-xs text-slate-400">평균 수면 시간</p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-3xl bg-slate-900 p-5 text-white">
                      <p className="text-sm text-slate-300">맞춤 인사이트</p>
                      <p className="mt-2 text-base leading-7 text-slate-100">
                        최근 1주일간 수면 시간이 안정적으로 유지되어 러닝 기록도
                        함께 상승하고 있어요. 이번 주는 휴식일 1회를 유지하면
                        흐름을 더 안정적으로 가져갈 수 있습니다.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-500">주간 리포트</p>
                      <div className="mt-4 flex items-end gap-2">
                        {[65, 80, 50, 90, 70, 95, 75].map((h, i) => (
                          <div key={i} className="flex h-28 flex-1 items-end">
                            <div
                              className="w-full rounded-t-xl bg-slate-900"
                              style={{ height: `${h}%` }}
                            />
                          </div>
                        ))}
                      </div>
                      <p className="mt-3 text-xs text-slate-400">
                        최근 7일 활동 추이
                      </p>
                    </div>

                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-500">핵심 변화</p>
                      <ul className="mt-4 space-y-3">
                        <li className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                          러닝 거리 증가
                        </li>
                        <li className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                          수면 규칙성 개선
                        </li>
                        <li className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                          체중 추세 안정화
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-slate-500">Core Features</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            복잡하지 않지만,
            <br />
            건강 관리를 계속하게 만드는 핵심 기능
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600">
            취업용 개인 프로젝트로서 과하지 않으면서도 사용자 흐름, 데이터
            시각화, 상태 기반 UI를 보여줄 수 있는 기능에 집중했습니다.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-3xl">{item.icon}</div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="preview" className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Dashboard Preview
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              사용자가 가장 먼저 보는 홈 화면에는
              <br />
              무엇이 보여야 할까?
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              기록 서비스의 핵심은 입력보다 바로 이해되는 요약입니다. 홈에서는
              오늘 상태, 최근 변화, 다음 액션이 먼저 보여야 사용자가 다시 방문할
              이유가 생깁니다.
            </p>

            <ul className="mt-8 space-y-4">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm"
                >
                  <span className="mt-1 text-sm">✔️</span>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl">
            <div className="grid gap-4">
              <div className="rounded-3xl bg-slate-900 p-6 text-white">
                <p className="text-sm text-slate-300">오늘의 한 줄 요약</p>
                <h3 className="mt-3 text-2xl font-bold">
                  수면이 안정되며 러닝 흐름도 좋아지고 있어요.
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  최근 7일 기준 수면 평균이 유지되고 있으며 활동량도 함께
                  상승했습니다.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">최근 입력 기록</p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
                      러닝 4.2km 입력 완료
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
                      체중 68.2kg 기록
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
                      수면 7시간 10분 기록
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">다음 추천 액션</p>
                  <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-sm leading-6 text-slate-700">
                      이번 주는 수면 시간을 유지하면서 러닝 빈도를 현재 수준으로
                      유지해 보세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="report" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr,1.1fr]">
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Weekly & Monthly Report
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              숫자를 나열하는 것이 아니라,
              <br />
              변화를 읽을 수 있는 리포트
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              주간 리포트에서는 단기 변화와 최근 흐름을, 월간 리포트에서는 누적
              패턴과 습관의 방향성을 보여줍니다. 사용자는 단순 기록 앱이 아니라
              자신의 상태를 해석해 주는 서비스라고 느끼게 됩니다.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">주간 리포트</p>
              <h3 className="mt-2 text-xl font-bold">이번 주 컨디션 점검</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                최근 7일 동안의 기록 변화와 평균 수치를 요약합니다.
              </p>
              <div className="mt-6 space-y-3">
                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                  러닝 거리 평균 증가
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                  수면 편차 감소
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                  체중 변화 추세 확인
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
              <p className="text-sm text-slate-300">월간 리포트</p>
              <h3 className="mt-2 text-xl font-bold">한 달 패턴 분석</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                누적 기록을 바탕으로 건강 습관의 방향성과 유지 정도를
                확인합니다.
              </p>
              <div className="mt-6 space-y-3">
                <div className="rounded-2xl bg-white/10 p-4 text-sm text-slate-100">
                  꾸준히 유지된 주차 확인
                </div>
                <div className="rounded-2xl bg-white/10 p-4 text-sm text-slate-100">
                  기록 공백 구간 파악
                </div>
                <div className="rounded-2xl bg-white/10 p-4 text-sm text-slate-100">
                  다음 달 목표 설정 기반 제공
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold text-slate-400">
            Start Your Health Flow
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
            건강 기록을 남기는 것에서 끝나지 않고,
            <br />
            변화까지 확인해 보세요.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300">
            러닝, 체중, 수면 데이터를 기반으로 한 개인 건강 대시보드로 매일의
            흐름과 월간 패턴을 더 쉽게 관리할 수 있습니다.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90">
              지금 시작하기
            </button>
            <button className="rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              기능 더 보기
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
