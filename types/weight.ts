export type WeightRecordRow = {
  id: string;
  user_id: string;
  date: string;
  weight_kg: number;
  memo: string | null;
  created_at: string;
};

// 체중 기록 타입
// 프론트에서 사용할 체중 기록 타입
export type WeightRecord = {
  id: string;
  userId: string;
  date: string;
  weightKg: number;
  memo: string;
  createdAt: string;
};

export type WeightFormValues = Pick<WeightRecord, "date" | "weightKg" | "memo">;

export function mapWeightRecord(row: WeightRecordRow): WeightRecord {
  return {
    id: row.id,
    userId: row.user_id,
    date: row.date,
    weightKg: row.weight_kg,
    memo: row.memo ?? "",
    createdAt: row.created_at,
  };
}
