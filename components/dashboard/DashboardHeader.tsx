"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import useUserStore from "@/store/userStore";

export default function DashboardHeader() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const resetUser = useUserStore((state) => state.resetUser);

  const handleLogout = () => {
    resetUser();
    router.push("/login");
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <p className="text-lg font-bold text-gray-900">
          Personal Health Dashboard
        </p>

        <div className="flex items-center gap-3">
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
