type SummaryCardProps = {
  title: string;
  value: string;
  description: string;
  change: string;
};

export default function SummaryCard({
  title,
  value,
  description,
  change,
}: SummaryCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
        {value}
      </p>
      <p className="mt-2 text-sm text-slate-600">{description}</p>

      <div className="mt-5 inline-flex rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
        {change}
      </div>
    </article>
  );
}
