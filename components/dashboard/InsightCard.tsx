type InsightCardProps = {
  badge: string;
  title: string;
  description: string;
};

export default function InsightCard({
  badge,
  title,
  description,
}: InsightCardProps) {
  return (
    <article className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm">
      <div className="inline-flex rounded-2xl bg-white/10 px-3 py-2 text-sm font-medium text-slate-200">
        {badge}
      </div>
      <h2 className="mt-4 text-2xl font-bold tracking-tight">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
        {description}
      </p>
    </article>
  );
}
