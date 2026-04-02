// 체중 기록 타입
export type WeightRecord = {
  id: string; // 각 기록 구분용
  date: string; // 사용자가 입력한 축정 날찌
  weight: number; // 체중 숫자
  memo?: string; // 선택 메모
  createdAt: string; // 기록 생성 시간
};
