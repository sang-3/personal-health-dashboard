"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SummaryCard from "@/components/dashboard/SummaryCard";
import WeightForm from "@/components/dashboard/WeightForm";
import WeightList from "@/components/dashboard/WeightList";
import WeightChart from "@/components/dashboard/WeightChart";
import { useWeightStats } from "@/hooks/useWeightStats";
import { formatWeight } from "@/lib/utils";
import { useWeightStore } from "@/store/weightStore";
import useUserStore from "@/store/userStore";

export default function DashboardPage() {
  const router = useRouter();

  const weights = useWeightStore((state) => state.weights);
  const hasWeightHydrated = useWeightStore((state) => state.hasHydrated);

  const user = useUserStore((state) => state.user);
  const hasUserHydrated = useUserStore((state) => state.hasHydrated);

  const { latestWeight, averageWeight, maxWeight, minWeight } =
    useWeightStats(weights);

  useEffect(() => {
    if (hasUserHydrated && !user) {
      router.push("/login");
    }
  }, [hasUserHydrated, user, router]);

  if (!hasWeightHydrated || !hasUserHydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-4 text-sm text-gray-600 shadow-sm">
          정보를 불러오는 중입니다...
        </div>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            안녕하세요, {user.name}님
          </h1>
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
