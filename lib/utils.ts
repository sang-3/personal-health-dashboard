// 표시용 포맷 함수
export function formatWeightKg(weightKg: number | null) {
  if (weightKg === null) return "-";
  return `${weightKg.toFixed(1)}kg`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
