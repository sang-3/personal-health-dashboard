import AuthCard from "@/components/auth/AuthCard";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthCard
      title="회원가입"
      description="계정을 만들고 건강 기록을 관리해보세요."
    >
      <SignupForm />
    </AuthCard>
  );
}
