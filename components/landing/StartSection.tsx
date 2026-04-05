import Link from "next/link";
import Button from "@/components/ui/Button";

export default function StartSection() {
  return (
    <section className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900">
          지금 바로 건강 기록을 시작해보세요
        </h2>
        <p className="mt-4 max-w-2xl text-gray-600">
          꾸준한 기록은 변화의 시작입니다. 체중 데이터를 쌓고, 나만의 건강
          흐름을 확인해보세요.
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
