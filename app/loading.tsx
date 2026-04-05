export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-sm flex-col items-center rounded-2xl border border-gray-200 bg-white px-6 py-10 shadow-sm">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
        <p className="mt-4 text-sm font-medium text-gray-700">
          페이지를 불러오는 중입니다...
        </p>
      </div>
    </main>
  );
}
