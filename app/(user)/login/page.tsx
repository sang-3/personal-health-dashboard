import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthCard title="로그인" description="서비스를 이용하려면 로그인하세요.">
      <LoginForm />
    </AuthCard>
  );
}
