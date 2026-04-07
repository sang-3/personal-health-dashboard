"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { logoutUser } from "@/lib/auth";
import { useWeightStore } from "@/store/weightStore";

export default function DashboardHeader() {
  const router = useRouter();
  const clearEditing = useWeightStore((state) => state.clearEditing);

  const [userName, setUserName] = useState("사용자");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const getCurrentUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        setUserName("사용자");
        return;
      }

      const name =
        typeof data.user.user_metadata?.name === "string"
          ? data.user.user_metadata.name
          : "사용자";

      setUserName(name);
    };

    void getCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      clearEditing();
      await logoutUser();

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("로그아웃 실패:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-auto min-h-16 w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-0 lg:px-8">
        <p className="text-lg font-bold text-gray-900">
          Personal Health Dashboard
        </p>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="text-sm text-gray-600">{userName}님</span>

          <Button
            variant="secondary"
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
          </Button>
        </div>
      </div>
    </header>
  );
}
