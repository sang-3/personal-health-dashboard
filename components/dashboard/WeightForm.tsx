"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import type { WeightFormValues, WeightRecord } from "@/types/weight";

type FieldErrors = {
  date?: string;
  weightKg?: string;
};

type WeightFormProps = {
  mode: "create" | "edit";
  initialValues?: WeightRecord | null;
  onSubmit: (values: WeightFormValues) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
};

function getToday() {
  return new Date().toISOString().split("T")[0];
}

export default function WeightForm({
  mode,
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: WeightFormProps) {
  const [date, setDate] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [memo, setMemo] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const isEditMode = mode === "edit" && !!initialValues;

  useEffect(() => {
    if (isEditMode && initialValues) {
      setDate(initialValues.date);
      setWeightKg(String(initialValues.weightKg));
      setMemo(initialValues.memo);
      setErrors({});
      return;
    }

    setDate("");
    setWeightKg("");
    setMemo("");
    setErrors({});
  }, [isEditMode, initialValues]);

  const resetForm = () => {
    setDate("");
    setWeightKg("");
    setMemo("");
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedWeightKg = Number(weightKg);
    const nextErrors: FieldErrors = {};
    const today = getToday();

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

    await onSubmit({
      date,
      weightKg: Number(parsedWeightKg.toFixed(1)),
      memo: memo.trim(),
    });

    if (!isEditMode) {
      resetForm();
    }
  };

  const handleCancelEdit = () => {
    resetForm();
    onCancel?.();
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {isEditMode ? "체중 기록 수정" : "체중 기록 추가"}
        </h2>

        {isEditMode && (
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancelEdit}
            disabled={isSubmitting}
          >
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
            if (errors.date) {
              setErrors((prev) => ({ ...prev, date: "" }));
            }
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

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? isEditMode
              ? "수정 중..."
              : "저장 중..."
            : isEditMode
              ? "수정 완료"
              : "저장하기"}
        </Button>
      </form>
    </section>
  );
}
