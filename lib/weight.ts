import { createClient } from "@/lib/supabase/server";
import type { WeightRecordRow } from "@/types/weight";
import { mapWeightRecord } from "@/types/weight";

export async function getWeightsByUser(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("weight_records")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) {
    return [];
  }

  return ((data ?? []) as WeightRecordRow[]).map(mapWeightRecord);
}
