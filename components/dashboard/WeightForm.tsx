export default function WeightForm() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">체중 기록 추가</h2>

      <form className="mt-5 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="text-sm font-medium text-gray-700">
            날짜
          </label>
          <input
            id="date"
            type="date"
            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="weight" className="text-sm font-medium text-gray-700">
            체중(kg)
          </label>
          <input
            id="weight"
            type="number"
            placeholder="예: 68.4"
            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="memo" className="text-sm font-medium text-gray-700">
            메모
          </label>
          <textarea
            id="memo"
            rows={3}
            placeholder="간단한 메모를 입력하세요"
            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          저장하기
        </button>
      </form>
    </section>
  );
}
