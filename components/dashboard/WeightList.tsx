"use client";

import Button from "@/components/ui/Button";
import EmptyState from "@/components/dashboard/EmptyState";
import { formatDate } from "@/lib/utils";
import type { WeightRecord } from "@/types/weight";

type WeightListProps = {
  items: WeightRecord[];
  editingId: string | null;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function WeightList({
  items,
  editingId,
  onEdit,
  onDelete,
}: WeightListProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            체중 기록 목록
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            총 {items.length}개의 기록
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {items.length === 0 ? (
          <EmptyState
            title="아직 기록이 없습니다"
            description="첫 체중 기록을 추가해보세요."
            caption="기록이 쌓일수록 변화 추이를 확인할 수 있습니다."
          />
        ) : (
          items.map((item) => {
            const isEditing = editingId === item.id;

            return (
              <div
                key={item.id}
                className="rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">
                      {formatDate(item.date)}
                    </p>

                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {item.weightKg.toFixed(1)}kg
                    </p>

                    <p className="mt-2 break-words text-sm text-gray-600">
                      {item.memo.trim() ? item.memo : "메모 없음"}
                    </p>

                    {isEditing && (
                      <p className="mt-2 text-xs font-medium text-blue-600">
                        현재 수정 중인 기록입니다.
                      </p>
                    )}
                  </div>

                  <div className="flex w-full gap-2 sm:w-auto">
                    <Button
                      type="button"
                      variant="secondary"
                      className="flex-1 sm:flex-none"
                      onClick={() => onEdit(item.id)}
                    >
                      수정
                    </Button>

                    <Button
                      type="button"
                      variant="danger"
                      className="flex-1 sm:flex-none"
                      onClick={() => onDelete(item.id)}
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
