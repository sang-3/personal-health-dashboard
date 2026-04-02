// 표시용 포맷 함수
export function formatWeight(weight: number | null) {
  if (weight === null) return "-";
  return `${weight.toFixed(1)}kg`;
}
