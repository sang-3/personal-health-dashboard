import Link from "next/link";
import Button from "@/components/ui/Button";

export default function StartSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-gray-500">
          지금 바로 시작하기
        </p>

        <h2 className="mt-3 text-3xl font-bold text-gray-900">
          기록을 남기면 변화가 보입니다
        </h2>

        <p className="mt-4 max-w-2xl text-gray-600">
          체중 데이터를 저장하고, 대시보드에서 내 변화 흐름을 직접 확인해보세요.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/signup">
            <Button type="button">회원가입</Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" type="button">
              로그인
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
