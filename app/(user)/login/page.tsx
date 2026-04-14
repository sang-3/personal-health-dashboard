import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
  description: "Personal Health Dashboard 로그인 페이지",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="로그인"
      description="저장된 건강 기록과 변화 추이를 확인하려면 로그인하세요."
    >
      <LoginForm />
    </AuthCard>
  );
}
