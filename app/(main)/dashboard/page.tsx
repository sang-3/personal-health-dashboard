"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SummaryCard from "@/components/dashboard/SummaryCard";
import WeightForm from "@/components/dashboard/WeightForm";
import WeightList from "@/components/dashboard/WeightList";
import WeightChart from "@/components/dashboard/WeightChart";
import { useWeightStats } from "@/hooks/useWeightStats";
import { createClient } from "@/lib/supabase/client";
import { formatDate, formatWeightKg } from "@/lib/utils";
import { useWeightStore } from "@/store/weightStore";
import { WeightRecord } from "@/types";

type PeriodFilter = "all" | "7d" | "30d" | "90d";
type SortOrder = "latest" | "oldest";

type DashboardUser = {
  id: string;
  name: string;
  email: string;
};

const EMPTY_WEIGHTS: WeightRecord[] = [];

export default function DashboardPage() {
  const editingId = useWeightStore((state) => state.editingId);
  const deleteWeight = useWeightStore((state) => state.deleteWeight);
  const startEditing = useWeightStore((state) => state.startEditing);
  const hasWeightHydrated = useWeightStore((state) => state.hasHydrated);

  const [user, setUser] = useState<DashboardUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [keyword, setKeyword] = useState("");
  const [period, setPeriod] = useState<PeriodFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");

  const weights = useWeightStore((state) =>
    user ? (state.weightMap[user.id] ?? EMPTY_WEIGHTS) : EMPTY_WEIGHTS,
  );

  useEffect(() => {
    const supabase = createClient();

    const getCurrentUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        window.location.href = "/login";
        return;
      }

      setUser({
        id: data.user.id,
        name:
          typeof data.user.user_metadata?.name === "string" &&
          data.user.user_metadata.name.trim()
            ? data.user.user_metadata.name
            : "사용자",
        email: data.user.email ?? "",
      });

      setAuthLoading(false);
    };

    void getCurrentUser();
  }, []);

  const filteredWeights = useMemo(() => {
    const now = new Date();

    return [...weights]
      .filter((item) => {
        const normalizedKeyword = keyword.trim().toLowerCase();

        const matchesKeyword =
          !normalizedKeyword ||
          item.memo?.toLowerCase().includes(normalizedKeyword) ||
          item.date.includes(normalizedKeyword);

        if (!matchesKeyword) return false;

        if (period === "all") return true;

        const itemDate = new Date(item.date);
        const diffDays =
          (now.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24);

        if (period === "7d") return diffDays <= 7;
        if (period === "30d") return diffDays <= 30;
        if (period === "90d") return diffDays <= 90;

        return true;
      })
      .sort((a, b) => {
        const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
        return sortOrder === "latest" ? diff : -diff;
      });
  }, [weights, keyword, period, sortOrder]);

  const { latestWeightKg, averageWeightKg, maxWeightKg, minWeightKg } =
    useWeightStats(filteredWeights);

  const latestRecord = filteredWeights[0] ?? null;
  const prevRecord = filteredWeights[1] ?? null;

  const diffKg =
    latestRecord && prevRecord
      ? Number((latestRecord.weightKg - prevRecord.weightKg).toFixed(1))
      : null;

  if (authLoading || !hasWeightHydrated) {
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

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                안녕하세요, {user.name}님 👋
              </h1>

              <p className="mt-2 text-sm text-gray-600">
                현재 조건 기준으로 총{" "}
                <span className="font-semibold text-gray-900">
                  {filteredWeights.length}
                </span>
                개의 체중 기록이 있습니다.
              </p>
            </div>
          </div>

          {latestRecord ? (
            <div className="mt-4 space-y-1">
              <p className="text-sm text-gray-500">
                최근 기록:{" "}
                <span className="font-medium text-gray-900">
                  {latestRecord.weightKg.toFixed(1)}kg
                </span>{" "}
                · {formatDate(latestRecord.date)}
              </p>

              {diffKg !== null && (
                <p
                  className={`text-sm font-medium ${
                    diffKg > 0
                      ? "text-red-500"
                      : diffKg < 0
                        ? "text-blue-500"
                        : "text-gray-500"
                  }`}
                >
                  이전 기록 대비 {diffKg > 0 ? "+" : ""}
                  {diffKg.toFixed(1)}kg
                </p>
              )}
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500">
              아직 체중 기록이 없습니다. 첫 기록을 추가해보세요.
            </p>
          )}
        </div>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_160px_160px]">
            <input
              type="text"
              placeholder="날짜 또는 메모로 검색"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="h-11 rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-gray-900"
            />

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as PeriodFilter)}
              className="h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-gray-900"
            >
              <option value="all">전체 기간</option>
              <option value="7d">최근 7일</option>
              <option value="30d">최근 30일</option>
              <option value="90d">최근 90일</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-gray-900"
            >
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
            </select>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="최근 체중"
            value={formatWeightKg(latestWeightKg)}
          />
          <SummaryCard
            title="평균 체중"
            value={formatWeightKg(averageWeightKg)}
          />
          <SummaryCard title="최고 체중" value={formatWeightKg(maxWeightKg)} />
          <SummaryCard title="최저 체중" value={formatWeightKg(minWeightKg)} />
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
          <div className="flex flex-col gap-6">
            <WeightForm />
            <WeightList
              items={filteredWeights}
              editingId={editingId}
              onEdit={startEditing}
              onDelete={(id) => {
                deleteWeight(user.id, id);
                toast.success("기록이 삭제되었습니다.");
              }}
            />
          </div>

          <div>
            <WeightChart items={filteredWeights} />
          </div>
        </section>
      </section>
    </main>
  );
}
