"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useWeightStore } from "@/store/weightStore";
import useUserStore from "@/store/userStore";

export default function DashboardHeader() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const resetUser = useUserStore((state) => state.resetUser);
  const clearEditing = useWeightStore((state) => state.clearEditing);

  const handleLogout = () => {
    clearEditing();
    resetUser();
    router.push("/login");
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-auto min-h-16 w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-0 lg:px-8">
        <p className="text-lg font-bold text-gray-900">
          Personal Health Dashboard
        </p>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="text-sm text-gray-600">
            {user?.name ?? "사용자"}님
          </span>
          <Button variant="secondary" type="button" onClick={handleLogout}>
            로그아웃
          </Button>
        </div>
      </div>
    </header>
  );
}
