"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SummaryCard from "@/components/dashboard/SummaryCard";
import WeightForm from "@/components/dashboard/WeightForm";
import WeightList from "@/components/dashboard/WeightList";
import WeightChart from "@/components/dashboard/WeightChart";
import { useWeightStats } from "@/hooks/useWeightStats";
import { formatWeight } from "@/lib/utils";
import { useWeightStore } from "@/store/weightStore";

export default function DashboardPage() {
  const weights = useWeightStore((state) => state.weights);
  const { latestWeight, averageWeight, maxWeight, minWeight } =
    useWeightStats(weights);

  return (
    <main className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            체중 기록을 관리하고 변화 추이를 확인해보세요.
          </p>
        </div>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard title="최근 체중" value={formatWeight(latestWeight)} />
          <SummaryCard title="평균 체중" value={formatWeight(averageWeight)} />
          <SummaryCard title="최고 체중" value={formatWeight(maxWeight)} />
          <SummaryCard title="최저 체중" value={formatWeight(minWeight)} />
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
          <div className="flex flex-col gap-6">
            <WeightForm />
            <WeightList />
          </div>

          <div>
            <WeightChart />
          </div>
        </section>
      </section>
    </main>
  );
}
