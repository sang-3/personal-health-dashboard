"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SummaryCard from "@/components/dashboard/SummaryCard";
import WeightChart from "@/components/dashboard/WeightChart";
import WeightForm from "@/components/dashboard/WeightForm";
import WeightList from "@/components/dashboard/WeightList";
import { useWeightStats } from "@/hooks/useWeightStats";
import { formatDate, formatWeightKg } from "@/lib/utils";
import type { WeightFormValues, WeightRecord } from "@/types/weight";
import {
  createWeightRecordAction,
  deleteWeightRecordAction,
  updateWeightRecordAction,
} from "@/actions/weight";

type PeriodFilter = "all" | "7d" | "30d" | "90d";
type SortOrder = "latest" | "oldest";

type WeightSectionProps = {
  userName: string;
  initialWeights: WeightRecord[];
};

export default function WeightSection({
  userName,
  initialWeights,
}: WeightSectionProps) {
  const router = useRouter();

  const [weights, setWeights] = useState<WeightRecord[]>(initialWeights);
  const [editingRecord, setEditingRecord] = useState<WeightRecord | null>(null);

  const [keyword, setKeyword] = useState("");
  const [period, setPeriod] = useState<PeriodFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setWeights(initialWeights);
  }, [initialWeights]);

  const filteredWeights = useMemo(() => {
    const now = new Date();

    return [...weights]
      .filter((item) => {
        const normalizedKeyword = keyword.trim().toLowerCase();
        const normalizedDate = item.date.replaceAll("-", ".");

        const matchesKeyword =
          !normalizedKeyword ||
          item.memo.toLowerCase().includes(normalizedKeyword) ||
          item.date.includes(normalizedKeyword) ||
          normalizedDate.includes(normalizedKeyword);

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

  const handleCreate = async (values: WeightFormValues) => {
    startTransition(async () => {
      try {
        const result = await createWeightRecordAction(values);
        toast.success(result.message);
        router.refresh();
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "체중 기록 추가에 실패했어요.";

        toast.error(message);
      }
    });
  };

  const handleUpdate = async (values: WeightFormValues) => {
    if (!editingRecord) return;

    startTransition(async () => {
      try {
        const result = await updateWeightRecordAction({
          id: editingRecord.id,
          ...values,
        });

        setEditingRecord(null);
        toast.success(result.message);
        router.refresh();
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "체중 기록 수정에 실패했어요.";

        toast.error(message);
      }
    });
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm("이 기록을 삭제할까요?");
    if (!ok) return;

    startTransition(async () => {
      try {
        const result = await deleteWeightRecordAction(id);

        if (editingRecord?.id === id) {
          setEditingRecord(null);
        }

        toast.success(result.message);
        router.refresh();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "기록 삭제에 실패했어요.";

        toast.error(message);
      }
    });
  };

  const handleEdit = (id: string) => {
    const target = weights.find((item) => item.id === id) ?? null;
    setEditingRecord(target);
  };

  return (
    <section className="space-y-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          안녕하세요, {userName}님 👋
        </h1>

        <p className="mt-6 text-sm text-gray-600 sm:text-base">
          현재 조건 기준으로 총{" "}
          <span className="font-semibold text-gray-900">
            {filteredWeights.length}
          </span>
          개의 체중 기록이 있습니다.
        </p>

        {latestRecord ? (
          <div className="mt-6 space-y-2">
            <p className="text-base text-gray-600">
              최근 기록:{" "}
              <span className="font-semibold text-gray-900">
                {latestRecord.weightKg.toFixed(1)}kg
              </span>{" "}
              · {formatDate(latestRecord.date)}
            </p>

            {diffKg !== null && (
              <p
                className={`text-base font-medium ${
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
          <p className="mt-6 text-base text-gray-500">
            아직 체중 기록이 없습니다. 첫 기록을 추가해보세요.
          </p>
        )}
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_160px_160px]">
          <input
            type="text"
            placeholder="날짜(예: 2026-04-10) 또는 메모로 검색"
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
        <SummaryCard title="최근 체중" value={formatWeightKg(latestWeightKg)} />
        <SummaryCard
          title="평균 체중"
          value={formatWeightKg(averageWeightKg)}
        />
        <SummaryCard title="최고 체중" value={formatWeightKg(maxWeightKg)} />
        <SummaryCard title="최저 체중" value={formatWeightKg(minWeightKg)} />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
        <div className="flex flex-col gap-6">
          <WeightForm
            mode={editingRecord ? "edit" : "create"}
            initialValues={editingRecord}
            onSubmit={editingRecord ? handleUpdate : handleCreate}
            onCancel={() => setEditingRecord(null)}
            isSubmitting={isPending}
          />

          <WeightList
            items={filteredWeights}
            editingId={editingRecord?.id ?? null}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <div>
          <WeightChart items={filteredWeights} />
        </div>
      </section>
    </section>
  );
}
