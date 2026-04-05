export default function FeatureSection() {
  const features = [
    {
      title: "체중 기록 관리",
      description:
        "날짜별 체중을 추가, 수정, 삭제하며 손쉽게 기록을 관리할 수 있습니다.",
    },
    {
      title: "요약 카드 제공",
      description:
        "최근 체중, 평균 체중, 최고 체중, 최저 체중을 한눈에 확인할 수 있습니다.",
    },
    {
      title: "변화 추이 시각화",
      description:
        "라인 차트를 통해 체중 변화 흐름을 직관적으로 확인할 수 있습니다.",
    },
  ];

  return (
    <section className="border-t border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-gray-500">핵심 기능</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            기록부터 분석까지 한 번에
          </h2>
          <p className="mt-4 text-gray-600">
            단순 입력에서 끝나지 않고, 기록된 데이터를 요약과 차트로 연결해 더
            쉽게 이해할 수 있도록 구성했습니다.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
