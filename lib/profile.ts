import { createClient } from "@/lib/supabase/server";
import type { Profile, ProfileRow } from "@/types/profile";
import { mapProfile } from "@/types/profile";

function getSafeUserName(user: {
  email?: string;
  user_metadata?: { name?: unknown };
}) {
  if (
    typeof user.user_metadata?.name === "string" &&
    user.user_metadata.name.trim()
  ) {
    return user.user_metadata.name.trim();
  }

  if (typeof user.email === "string" && user.email.trim()) {
    return user.email.split("@")[0];
  }

  return "사용자";
}

export async function getProfileByUserId(
  userId: string,
): Promise<Profile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, name, created_at")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapProfile(data as ProfileRow);
}

export async function upsertProfile(input: {
  id: string;
  email: string;
  name: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.from("profiles").upsert(
    {
      id: input.id,
      email: input.email,
      name: input.name,
    },
    {
      onConflict: "id",
    },
  );

  if (error) {
    throw new Error("프로필 저장에 실패했습니다.");
  }
}

export async function ensureProfile(user: {
  id: string;
  email?: string;
  user_metadata?: { name?: unknown };
}) {
  const existingProfile = await getProfileByUserId(user.id);

  if (existingProfile) {
    return existingProfile;
  }

  const fallbackName = getSafeUserName(user);

  await upsertProfile({
    id: user.id,
    email: user.email ?? "",
    name: fallbackName,
  });

  return {
    id: user.id,
    email: user.email ?? "",
    name: fallbackName,
    createdAt: null,
  };
}
