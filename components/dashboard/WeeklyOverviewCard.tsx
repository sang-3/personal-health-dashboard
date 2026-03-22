type WeeklyOverviewCardProps = {
  description: string;
};

export default function WeeklyOverviewCard({
  description,
}: WeeklyOverviewCardProps) {
  const chartHeights = [48, 64, 40, 72, 56, 76, 60];

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">Weekly Report</p>
      <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-950">
        주간 리포트 미리보기
      </h2>

      <div className="mt-6 flex h-28 items-end gap-2">
        {chartHeights.map((height, index) => (
          <div key={index} className="flex flex-1 items-end">
            <div
              className="w-full rounded-t-xl bg-slate-900"
              style={{ height: `${height}%` }}
            />
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>

      <button className="mt-6 rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
        주간 리포트 보기
      </button>
    </article>
  );
}
