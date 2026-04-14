import { redirect } from "next/navigation";
import type { Metadata } from "next";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WeightSection from "@/components/dashboard/WeightSection";
import { createClient } from "@/lib/supabase/server";
import { ensureProfile } from "@/lib/profile";
import { getWeightsByUser } from "@/lib/weight";

export const metadata: Metadata = {
  title: "대시보드",
  description: "체중 기록과 변화 추이를 확인하는 개인 대시보드",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const profile = await ensureProfile({
    id: user.id,
    email: user.email ?? "",
    user_metadata: user.user_metadata,
  });

  const initialWeights = await getWeightsByUser(user.id);

  return (
    <main className="min-h-screen bg-gray-50">
      <DashboardHeader userName={profile.name} />

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <WeightSection
          userName={profile.name}
          initialWeights={initialWeights}
        />
      </section>
    </main>
  );
}
