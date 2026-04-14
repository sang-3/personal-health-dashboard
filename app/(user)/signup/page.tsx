import AuthCard from "@/components/auth/AuthCard";
import SignupForm from "@/components/auth/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입",
  description: "Personal Health Dashboard 회원가입 페이지",
};

export default function SignupPage() {
  return (
    <AuthCard
      title="회원가입"
      description="계정을 만들고 나만의 건강 기록을 시작해보세요."
    >
      <SignupForm />
    </AuthCard>
  );
}
