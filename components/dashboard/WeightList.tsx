const mockWeights = [
  { id: 1, date: "2026-04-01", weight: "68.4kg", memo: "저녁 늦게 식사" },
  { id: 2, date: "2026-03-29", weight: "67.9kg", memo: "운동 후 측정" },
  { id: 3, date: "2026-03-25", weight: "67.2kg", memo: "아침 공복" },
];

export default function WeightList() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">체중 기록 목록</h2>
        <span className="text-sm text-gray-500">{mockWeights.length}건</span>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {mockWeights.map((item) => (
          <div key={item.id} className="rounded-xl border border-gray-200 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">{item.date}</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {item.weight}
                </p>
                <p className="mt-2 text-sm text-gray-600">{item.memo}</p>
              </div>

              <div className="flex gap-2">
                <button className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  수정
                </button>
                <button className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
