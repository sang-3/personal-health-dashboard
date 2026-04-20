export default function PreviewSection() {
  const points = [
    { left: "4%", top: "72%" },
    { left: "22%", top: "48%" },
    { left: "40%", top: "54%" },
    { left: "58%", top: "28%" },
    { left: "76%", top: "42%" },
    { left: "94%", top: "68%" },
  ];

  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-gray-500">
            대시보드 미리보기
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            실제 서비스와 연결되는 화면을 보여줍니다
          </h2>
          <p className="mt-4 text-gray-600">
            로그인 후에는 체중 기록, 요약 카드, 변화 추이 차트, 최근 기록 목록을
            한 화면에서 확인할 수 있습니다.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
            <div className="space-y-4">
              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900">
                    최근 기록
                  </h3>
                  <span className="text-sm text-gray-500">3개 미리보기</span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">2026년 4월 21일</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      66.0kg
                    </p>
                    <p className="mt-2 text-sm text-gray-600">메모 없음</p>
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">2026년 4월 15일</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      80.0kg
                    </p>
                    <p className="mt-2 text-sm text-gray-600">메모 없음</p>
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">2026년 4월 14일</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      72.0kg
                    </p>
                    <p className="mt-2 text-sm text-gray-600">메모 없음</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">최근 체중</p>
                  <p className="mt-3 text-2xl font-bold text-gray-900">
                    66.0kg
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">평균 체중</p>
                  <p className="mt-3 text-2xl font-bold text-gray-900">
                    72.0kg
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">최고 체중</p>
                  <p className="mt-3 text-2xl font-bold text-gray-900">
                    80.0kg
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">최저 체중</p>
                  <p className="mt-3 text-2xl font-bold text-gray-900">
                    66.0kg
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    체중 변화 차트
                  </h3>
                  <span className="text-sm font-medium text-gray-500">
                    날짜별 추이
                  </span>
                </div>

                <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="relative h-[320px] w-full overflow-hidden rounded-xl bg-white">
                    <div className="absolute inset-0 px-12 py-6">
                      <div className="flex h-full flex-col justify-between">
                        <div className="border-t border-dashed border-gray-200" />
                        <div className="border-t border-dashed border-gray-200" />
                        <div className="border-t border-dashed border-gray-200" />
                        <div className="border-t border-dashed border-gray-200" />
                      </div>
                    </div>

                    <div className="absolute bottom-12 left-12 right-6 top-6">
                      <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="h-full w-full"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.8"
                          points="4,72 22,48 40,54 58,28 76,42 94,68"
                          className="text-gray-900"
                        />
                      </svg>

                      {points.map((point, index) => (
                        <span
                          key={index}
                          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-gray-900 shadow-sm"
                          style={{ left: point.left, top: point.top }}
                        />
                      ))}

                      <div className="absolute left-[55%] top-[26%] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm">
                        <p className="font-medium text-gray-900">2026-04-15</p>
                        <p className="mt-1 text-gray-600">체중 : 80.0kg</p>
                      </div>
                    </div>

                    <div className="absolute bottom-12 left-3 flex h-[calc(100%-72px)] flex-col justify-between text-xs text-gray-400">
                      <span>81</span>
                      <span>77</span>
                      <span>73</span>
                      <span>69</span>
                      <span>65</span>
                    </div>

                    <div className="absolute bottom-3 left-12 right-6 flex justify-between text-xs text-gray-500">
                      <span>04-14</span>
                      <span>04-15</span>
                      <span>04-16</span>
                      <span>04-18</span>
                      <span>04-20</span>
                      <span>04-21</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
