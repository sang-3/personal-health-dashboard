// 요약 카드에서 사용할 계산 로직

// 최신 체중은 날짜 기준 정렬해서 구함
// 평균은 소수점 1자리
// 최고/최저는 배열에서 계산

import { WeightRecord } from "@/types/weight";

type WeightStats = {
  latestWeightKg: number | null;
  averageWeightKg: number | null;
  maxWeightKg: number | null;
  minWeightKg: number | null;
};

export function useWeightStats(weights: WeightRecord[]): WeightStats {
  if (!weights.length) {
    return {
      latestWeightKg: null,
      averageWeightKg: null,
      maxWeightKg: null,
      minWeightKg: null,
    };
  }

  const sortedWeights = [...weights].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const latestWeightKg = sortedWeights[0].weightKg;

  const total = weights.reduce((sum, item) => sum + item.weightKg, 0);
  const averageWeightKg = Number((total / weights.length).toFixed(1));

  const values = weights.map((item) => item.weightKg);
  const maxWeightKg = Math.max(...values);
  const minWeightKg = Math.min(...values);

  return {
    latestWeightKg,
    averageWeightKg,
    maxWeightKg,
    minWeightKg,
  };
}
