// 로그인/회원가입 페이지 전체 공통 배경, 정렬 담당
import { ReactNode } from "react";

type UserLayoutProps = {
  children: ReactNode;
};

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      {children}
    </main>
  );
}
