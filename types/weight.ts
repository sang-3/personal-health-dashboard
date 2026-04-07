// 체중 기록 타입
export type WeightRecord = {
  id: string; // 각 기록 구분용
  userId: string;
  date: string; // 사용자가 입력한 축정 날찌
  weightKg: number; // 체중 숫자
  memo?: string; // 선택 메모
  createdAt: string; // 기록 생성 시간
};

export type WeightFormValues = Pick<WeightRecord, "date" | "weightKg" | "memo">;

export type WeightStorageMap = Record<string, WeightRecord[]>;
