"use client";

import Button from "@/components/ui/Button";
import { useWeightStore } from "@/store/weightStore";

export default function DashboardHeader() {
  const resetWeights = useWeightStore((state) => state.resetWeights);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <p className="text-lg font-bold text-gray-900">
          Personal Health Dashboard
        </p>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">홍상님</span>
          <Button variant="secondary" type="button" onClick={resetWeights}>
            샘플 복원
          </Button>
          <Button variant="secondary" type="button">
            로그아웃
          </Button>
        </div>
      </div>
    </header>
  );
}
