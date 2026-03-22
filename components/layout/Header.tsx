export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex items-center justify-between px-6 py-4 lg:px-8">
        <div>
          <p className="text-sm text-slate-500">Welcome back</p>
          <p className="mt-1 text-sm font-medium text-slate-900">
            오늘도 건강 흐름을 확인해 보세요.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">
            홍상유님
          </div>
        </div>
      </div>
    </header>
  );
}
