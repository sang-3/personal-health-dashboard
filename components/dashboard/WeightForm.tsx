"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { useWeightStore } from "@/store/weightStore";
import useUserStore from "@/store/userStore";
import { WeightRecord } from "@/types";

type FieldErrors = {
  date?: string;
  weightKg?: string;
};

const EMPTY_WEIGHTS: WeightRecord[] = [];

export default function WeightForm() {
  const user = useUserStore((state) => state.user);

  const weights = useWeightStore((state) =>
    user ? (state.weightMap[user._id] ?? EMPTY_WEIGHTS) : EMPTY_WEIGHTS,
  );

  const editingId = useWeightStore((state) => state.editingId);
  const addWeight = useWeightStore((state) => state.addWeight);
  const updateWeight = useWeightStore((state) => state.updateWeight);
  const cancelEditing = useWeightStore((state) => state.cancelEditing);

  const editingRecord = useMemo(
    () => weights.find((item) => item.id === editingId) ?? null,
    [weights, editingId],
  );

  const [date, setDate] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [memo, setMemo] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const isEditMode = Boolean(editingRecord);

  useEffect(() => {
    if (editingRecord) {
      setDate(editingRecord.date);
      setWeightKg(String(editingRecord.weightKg));
      setMemo(editingRecord.memo ?? "");
      setErrors({});
      return;
    }

    setDate("");
    setWeightKg("");
    setMemo("");
    setErrors({});
  }, [editingRecord]);

  const resetForm = () => {
    setDate("");
    setWeightKg("");
    setMemo("");
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error("로그인 정보를 확인할 수 없습니다.");
      return;
    }

    const parsedWeightKg = Number(weightKg);
    const nextErrors: FieldErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!date) {
      nextErrors.date = "날짜를 입력해주세요.";
    } else if (date > today) {
      nextErrors.date = "미래 날짜는 선택할 수 없습니다.";
    }

    if (!weightKg) {
      nextErrors.weightKg = "체중을 입력해주세요.";
    } else if (Number.isNaN(parsedWeightKg)) {
      nextErrors.weightKg = "체중을 올바르게 입력해주세요.";
    } else if (parsedWeightKg <= 0) {
      nextErrors.weightKg = "체중은 0보다 커야 합니다.";
    } else if (parsedWeightKg < 20 || parsedWeightKg > 300) {
      nextErrors.weightKg = "체중 범위를 다시 확인해주세요.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (isEditMode && editingRecord) {
      updateWeight(user._id, editingRecord.id, {
        date,
        weightKg: Number(parsedWeightKg.toFixed(1)),
        memo,
      });
      toast.success("기록이 수정되었습니다.");
    } else {
      addWeight(user._id, {
        date,
        weightKg: Number(parsedWeightKg.toFixed(1)),
        memo,
      });
      toast.success("기록이 저장되었습니다.");
    }

    cancelEditing();
    resetForm();
  };

  const handleCancelEdit = () => {
    cancelEditing();
    resetForm();
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {isEditMode ? "체중 기록 수정" : "체중 기록 추가"}
        </h2>

        {isEditMode && (
          <Button type="button" variant="secondary" onClick={handleCancelEdit}>
            수정 취소
          </Button>
        )}
      </div>

      <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          id="date"
          name="date"
          label="날짜"
          type="date"
          value={date}
          error={errors.date}
          onChange={(e) => {
            setDate(e.target.value);
            if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
          }}
        />

        <Input
          id="weightKg"
          name="weightKg"
          label="체중(kg)"
          type="number"
          step="0.1"
          placeholder="예: 68.4"
          value={weightKg}
          error={errors.weightKg}
          onChange={(e) => {
            setWeightKg(e.target.value);
            if (errors.weightKg) {
              setErrors((prev) => ({ ...prev, weightKg: "" }));
            }
          }}
        />

        <Textarea
          id="memo"
          label="메모"
          rows={3}
          placeholder="간단한 메모를 입력하세요"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />

        <Button type="submit">{isEditMode ? "수정 완료" : "저장하기"}</Button>
      </form>
    </section>
  );
}
