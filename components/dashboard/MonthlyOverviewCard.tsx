type MonthlyOverviewCardProps = {
  description: string;
};

export default function MonthlyOverviewCard({
  description,
}: MonthlyOverviewCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">Monthly Report</p>
      <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-950">
        월간 리포트 미리보기
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">누적 러닝</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">42.8 km</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">평균 수면</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">7.0 h</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">체중 변화</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">-1.2 kg</p>
        </div>
      </div>

      <p className="mt-6 text-sm leading-7 text-slate-600">{description}</p>

      <button className="mt-6 rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
        월간 리포트 보기
      </button>
    </article>
  );
}
