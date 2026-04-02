export default function WeightChart() {
  return (
    <section className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">체중 변화 차트</h2>
        <span className="text-sm text-gray-500">최근 기록 기준</span>
      </div>

      <div className="mt-6 flex min-h-[420px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
        <p className="text-sm text-gray-500">차트가 들어갈 영역입니다.</p>
      </div>
    </section>
  );
}
