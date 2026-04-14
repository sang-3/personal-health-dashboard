"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type WeightActionResult = {
  success: boolean;
  message: string;
};

function validateWeightInput(date: string, weightKg: number) {
  if (!date) {
    throw new Error("날짜를 입력해주세요.");
  }

  if (!Number.isFinite(weightKg)) {
    throw new Error("체중을 올바르게 입력해주세요.");
  }

  if (weightKg < 20 || weightKg > 300) {
    throw new Error("체중 범위를 다시 확인해주세요.");
  }
}

export async function createWeightRecordAction(input: {
  date: string;
  weightKg: number;
  memo: string;
}): Promise<WeightActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("로그인이 필요합니다.");
  }

  validateWeightInput(input.date, input.weightKg);

  const { error } = await supabase.from("weight_records").insert({
    user_id: user.id,
    date: input.date,
    weight_kg: input.weightKg,
    memo: input.memo.trim() || null,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    message: "체중 기록이 추가되었습니다.",
  };
}

export async function updateWeightRecordAction(input: {
  id: string;
  date: string;
  weightKg: number;
  memo: string;
}): Promise<WeightActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("로그인이 필요합니다.");
  }

  if (!input.id) {
    throw new Error("수정할 기록 정보가 올바르지 않습니다.");
  }

  validateWeightInput(input.date, input.weightKg);

  const { error } = await supabase
    .from("weight_records")
    .update({
      date: input.date,
      weight_kg: input.weightKg,
      memo: input.memo.trim() || null,
    })
    .eq("id", input.id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    message: "체중 기록이 수정되었습니다.",
  };
}

export async function deleteWeightRecordAction(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("로그인이 필요합니다.");
  }

  if (!id) {
    throw new Error("삭제할 기록 정보가 올바르지 않습니다.");
  }

  const { error } = await supabase
    .from("weight_records")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    message: "기록이 삭제되었습니다.",
  };
}
