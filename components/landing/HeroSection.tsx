import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
      <div>
        <p className="text-sm font-semibold text-gray-500">
          건강 기록을 더 간단하게
        </p>

        <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
          체중 변화를 기록하고,
          <br />
          한눈에 확인하세요
        </h1>

        <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg">
          Personal Health Dashboard는 체중 기록을 저장하고, 평균·최고·최저
          체중과 변화 추이를 직관적으로 보여주는 개인 건강 대시보드입니다.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/signup">
            <Button type="button">시작하기</Button>
          </Link>

          <Link href="/login">
            <Button variant="secondary" type="button">
              로그인
            </Button>
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm text-gray-500">최근 체중</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">68.4kg</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm text-gray-500">평균 체중</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">67.9kg</p>
          </div>

          <div className="col-span-2 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6">
            <p className="text-sm text-gray-500">체중 변화 차트 미리보기</p>
            <div className="mt-4 flex h-40 items-end gap-3">
              <div
                className="w-full rounded-t-xl bg-gray-300"
                style={{ height: "45%" }}
              />
              <div
                className="w-full rounded-t-xl bg-gray-400"
                style={{ height: "65%" }}
              />
              <div
                className="w-full rounded-t-xl bg-gray-500"
                style={{ height: "55%" }}
              />
              <div
                className="w-full rounded-t-xl bg-gray-700"
                style={{ height: "80%" }}
              />
              <div
                className="w-full rounded-t-xl bg-gray-900"
                style={{ height: "70%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
