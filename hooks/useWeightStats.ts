// 요약 카드에서 사용할 계산 로직

// 최신 체중은 날짜 기준 정렬해서 구함
// 평균은 소수점 1자리
// 최고/최저는 배열에서 계산

import { WeightRecord } from "@/types/weight";

type WeightStats = {
  latestWeight: number | null;
  averageWeight: number | null;
  maxWeight: number | null;
  minWeight: number | null;
};

export function useWeightStats(weights: WeightRecord[]): WeightStats {
  if (!weights.length) {
    return {
      latestWeight: null,
      averageWeight: null,
      maxWeight: null,
      minWeight: null,
    };
  }

  const sortedWeights = [...weights].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const latestWeight = sortedWeights[0].weight;

  const total = weights.reduce((sum, item) => sum + item.weight, 0);
  const averageWeight = Number((total / weights.length).toFixed(1));

  const values = weights.map((item) => item.weight);
  const maxWeight = Math.max(...values);
  const minWeight = Math.min(...values);

  return {
    latestWeight,
    averageWeight,
    maxWeight,
    minWeight,
  };
}
