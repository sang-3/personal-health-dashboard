export default function DashboardHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-lg font-bold text-gray-900">
            Personal Health Dashboard
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">홍상유님</span>
          <button className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}
