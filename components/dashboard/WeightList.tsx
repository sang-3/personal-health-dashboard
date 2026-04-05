"use client";

import Button from "@/components/ui/Button";
import { useWeightStore } from "@/store/weightStore";
import EmptyState from "./EmptyState";

export default function WeightList() {
  const weights = useWeightStore((state) => state.weights);
  const deleteWeight = useWeightStore((state) => state.deleteWeight);
  const startEditing = useWeightStore((state) => state.startEditing);
  const editingId = useWeightStore((state) => state.editingId);

  const sortedWeights = [...weights].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">체중 기록 목록</h2>
        <span className="text-sm text-gray-500">{sortedWeights.length}건</span>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {sortedWeights.length === 0 ? (
          <EmptyState message="아직 등록된 체중 기록이 없어요." />
        ) : (
          sortedWeights.map((item) => {
            const isEditing = editingId === item.id;

            return (
              <div
                key={item.id}
                className="rounded-xl border border-gray-200 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">{item.date}</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {item.weight.toFixed(1)}kg
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      {item.memo?.trim() ? item.memo : "메모 없음"}
                    </p>

                    {isEditing && (
                      <p className="mt-2 text-xs font-medium text-blue-600">
                        현재 수정 중인 기록입니다.
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => startEditing(item.id)}
                    >
                      수정
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => deleteWeight(item.id)}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
