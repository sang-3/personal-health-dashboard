"use client";

import { useEffect, useMemo, useState } from "react";
import { useWeightStore } from "@/store/weightStore";

export default function WeightForm() {
  const weights = useWeightStore((state) => state.weights);
  const editingId = useWeightStore((state) => state.editingId);
  const addWeight = useWeightStore((state) => state.addWeight);
  const updateWeight = useWeightStore((state) => state.updateWeight);
  const cancelEditing = useWeightStore((state) => state.cancelEditing);

  const editingRecord = useMemo(
    () => weights.find((item) => item.id === editingId) ?? null,
    [weights, editingId],
  );

  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const [memo, setMemo] = useState("");

  const isEditMode = Boolean(editingRecord);

  useEffect(() => {
    if (editingRecord) {
      setDate(editingRecord.date);
      setWeight(String(editingRecord.weight));
      setMemo(editingRecord.memo ?? "");
      return;
    }

    setDate("");
    setWeight("");
    setMemo("");
  }, [editingRecord]);

  const resetForm = () => {
    setDate("");
    setWeight("");
    setMemo("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedWeight = Number(weight);

    if (!date) {
      alert("날짜를 입력해주세요.");
      return;
    }

    if (!weight || Number.isNaN(parsedWeight)) {
      alert("체중을 올바르게 입력해주세요.");
      return;
    }

    if (parsedWeight <= 0) {
      alert("체중은 0보다 커야 합니다.");
      return;
    }

    if (isEditMode && editingRecord) {
      updateWeight(editingRecord.id, {
        date,
        weight: parsedWeight,
        memo,
      });
    } else {
      addWeight({
        date,
        weight: parsedWeight,
        memo,
      });
    }

    cancelEditing();
    resetForm();
  };

  const handleCancelEdit = () => {
    cancelEditing();
    resetForm();
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900">
          {isEditMode ? "체중 기록 수정" : "체중 기록 추가"}
        </h2>

        {isEditMode && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
          >
            수정 취소
          </button>
        )}
      </div>

      <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="text-sm font-medium text-gray-700">
            날짜
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="weight" className="text-sm font-medium text-gray-700">
            체중(kg)
          </label>
          <input
            id="weight"
            type="number"
            step="0.1"
            placeholder="예: 68.4"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="memo" className="text-sm font-medium text-gray-700">
            메모
          </label>
          <textarea
            id="memo"
            rows={3}
            placeholder="간단한 메모를 입력하세요"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          {isEditMode ? "수정 완료" : "저장하기"}
        </button>
      </form>
    </section>
  );
}
