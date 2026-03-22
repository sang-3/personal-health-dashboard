type RecordItem = {
  id: string;
  type: string;
  value: string;
  date: string;
};

type RecentRecordCardProps = {
  records: RecordItem[];
};

export default function RecentRecordCard({ records }: RecentRecordCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Recent Records</p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-950">
            최근 기록
          </h2>
        </div>
      </div>

      <ul className="mt-6 space-y-3">
        {records.map((record) => (
          <li
            key={record.id}
            className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"
          >
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {record.type}
              </p>
              <p className="mt-1 text-sm text-slate-600">{record.value}</p>
            </div>
            <p className="text-sm text-slate-500">{record.date}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
