import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-gray-200 bg-white px-8 py-12 text-center shadow-sm">
        <p className="text-sm font-semibold text-gray-500">404 ERROR</p>

        <h1 className="mt-3 text-3xl font-bold text-gray-900">
          페이지를 찾을 수 없어요
        </h1>

        <p className="mt-4 text-sm leading-6 text-gray-600">
          주소가 잘못되었거나 삭제된 페이지일 수 있습니다.
          <br />
          홈으로 돌아가 다시 시작해보세요.
        </p>

        <div className="mt-8">
          <Link href="/">
            <Button type="button">홈으로 이동</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
