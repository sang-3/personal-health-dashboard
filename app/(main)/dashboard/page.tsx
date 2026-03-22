import InsightCard from "@/components/dashboard/InsightCard";
import MonthlyOverviewCard from "@/components/dashboard/MonthlyOverviewCard";
import RecentRecordCard from "@/components/dashboard/RecentRecordCard";
import SummaryCard from "@/components/dashboard/SummaryCard";
import WeeklyOverviewCard from "@/components/dashboard/WeeklyOverviewCard";

const summaryItems = [
  {
    title: "러닝",
    value: "12.4 km",
    description: "최근 7일 누적 거리",
    change: "지난주보다 +2.1 km",
  },
  {
    title: "체중",
    value: "68.2 kg",
    description: "가장 최근 기록",
    change: "전주 대비 -0.4 kg",
  },
  {
    title: "수면",
    value: "7.1 h",
    description: "최근 7일 평균 수면",
    change: "지난주보다 +0.3 h",
  },
];

const recentRecords = [
  {
    id: "1",
    type: "러닝",
    value: "4.2 km",
    date: "2026.03.22",
  },
  {
    id: "2",
    type: "체중",
    value: "68.2 kg",
    date: "2026.03.21",
  },
  {
    id: "3",
    type: "수면",
    value: "7시간 10분",
    date: "2026.03.21",
  },
];

export default function DashboardPage() {
  return (
    <section className="flex-1 px-6 py-8 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            최근 7일 건강 흐름
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            러닝, 체중, 수면 기록을 바탕으로 현재 상태를 한눈에 확인해 보세요.
          </p>
        </div>

        <button className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
          + 기록 추가
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {summaryItems.map((item) => (
          <SummaryCard
            key={item.title}
            title={item.title}
            value={item.value}
            description={item.description}
            change={item.change}
          />
        ))}
      </div>

      <div className="mt-6">
        <InsightCard
          badge="꾸준한 흐름"
          title="오늘의 인사이트"
          description="최근 수면 시간이 안정적으로 유지되어 러닝 흐름도 좋아지고 있어요. 이번 주는 현재 패턴을 유지하는 것만으로도 좋은 컨디션을 이어갈 가능성이 높습니다."
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <RecentRecordCard records={recentRecords} />
        <WeeklyOverviewCard description="최근 7일 동안 러닝 거리 증가, 수면 규칙성 개선, 체중 변화 안정화가 확인되었어요." />
      </div>

      <div className="mt-6">
        <MonthlyOverviewCard description="한 달 동안 건강 기록이 꾸준히 유지되고 있으며, 수면 패턴 안정화와 러닝 활동 증가 흐름이 보입니다." />
      </div>
    </section>
  );
}
