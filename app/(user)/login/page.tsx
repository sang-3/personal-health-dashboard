import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";

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
