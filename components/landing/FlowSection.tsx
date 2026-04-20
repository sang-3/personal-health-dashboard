export default function FlowSection() {
  const steps = [
    {
      step: "01",
      title: "회원가입 또는 로그인",
      description:
        "개인 계정으로 접속해 나만의 건강 기록을 관리할 수 있는 환경을 시작합니다.",
    },
    {
      step: "02",
      title: "체중 기록 추가",
      description:
        "날짜와 체중, 메모를 입력해 기록을 저장하고 필요하면 수정 또는 삭제할 수 있습니다.",
    },
    {
      step: "03",
      title: "대시보드에서 변화 확인",
      description:
        "요약 카드, 차트, 기록 목록을 통해 내 체중 변화 흐름을 한 화면에서 확인합니다.",
    },
  ];

  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-gray-500">사용 흐름</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            사용 방법은 단순하고 명확합니다
          </h2>
          <p className="mt-4 text-gray-600">
            로그인 후 기록을 저장하면 대시보드에서 체중 흐름을 바로 확인할 수
            있습니다.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <span className="text-sm font-semibold text-gray-500">
                STEP {item.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
