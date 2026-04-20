import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
        <div>
          <p className="text-sm font-semibold text-gray-500">
            Personal Health Dashboard
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            체중 변화를 기록하고,
            <br />
            한눈에 확인하세요
          </h1>

          <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg">
            날짜별 체중을 기록하고, 최근/평균/최고/최저 체중과 변화 추이를
            대시보드에서 바로 확인할 수 있는 개인 건강 기록 서비스입니다.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700">
              체중 기록 추가 · 수정 · 삭제
            </span>
            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700">
              요약 카드
            </span>
            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700">
              라인 차트 시각화
            </span>
            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700">
              검색 / 기간 필터
            </span>
          </div>

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

        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              서비스에서 할 수 있는 일
            </p>

            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm text-gray-500">기록 관리</p>
                <p className="mt-2 text-base font-semibold text-gray-900">
                  날짜별 체중을 저장하고 수정할 수 있어요
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm text-gray-500">변화 확인</p>
                <p className="mt-2 text-base font-semibold text-gray-900">
                  요약 카드와 차트로 추이를 볼 수 있어요
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm text-gray-500">탐색 기능</p>
                <p className="mt-2 text-base font-semibold text-gray-900">
                  메모 검색과 기간 필터로 기록을 쉽게 찾을 수 있어요
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// import Link from "next/link";
// import Button from "@/components/ui/Button";

// export default function HeroSection() {
//   return (
//     <section className="border-b border-gray-200 bg-white">
//       <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
//         <div className="mx-auto max-w-3xl text-center">
//           <p className="text-sm font-semibold text-gray-500">
//             Personal Health Dashboard
//           </p>

//           <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
//             체중 기록을 저장하고
//             <br />
//             변화 흐름을 한눈에 확인하세요
//           </h1>

//           <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg">
//             날짜별 체중을 기록하고, 요약 카드와 차트로 내 변화를 쉽게 확인할 수
//             있는 개인 건강 대시보드 서비스입니다.
//           </p>

//           <div className="mt-8 flex flex-wrap justify-center gap-3">
//             <Link href="/signup">
//               <Button type="button">시작하기</Button>
//             </Link>

//             <Link href="/login">
//               <Button variant="secondary" type="button">
//                 로그인
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
