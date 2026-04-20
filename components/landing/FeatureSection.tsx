export default function FeatureSection() {
  const features = [
    {
      title: "체중 기록 관리",
      description:
        "날짜별 체중을 추가, 수정, 삭제하며 내 기록을 직접 관리할 수 있습니다.",
    },
    {
      title: "요약 카드 제공",
      description:
        "최근 체중, 평균 체중, 최고 체중, 최저 체중을 한눈에 확인할 수 있습니다.",
    },
    {
      title: "변화 추이 확인",
      description:
        "라인 차트를 통해 날짜별 체중 변화 흐름을 직관적으로 볼 수 있습니다.",
    },
    {
      title: "검색과 필터",
      description:
        "날짜 또는 메모로 검색하고, 최근 7일·30일·90일 기준으로 기록을 필터링할 수 있습니다.",
    },
  ];

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-gray-500">핵심 기능</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            기록에서 끝나지 않고 흐름까지 보여줍니다
          </h2>
          <p className="mt-4 text-gray-600">
            단순히 값을 저장하는 것이 아니라, 기록된 데이터를 요약과 시각화로
            연결해 사용자 스스로 변화를 파악할 수 있도록 구성했습니다.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
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
