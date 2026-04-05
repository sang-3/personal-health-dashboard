"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "@/lib/auth";
import useUserStore from "@/store/userStore";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginForm() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetErrors = () => {
    setEmailError("");
    setPasswordError("");
    setFormError("");
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetErrors();

    let hasError = false;

    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
      hasError = true;
    }

    if (hasError) return;

    try {
      setIsLoading(true);

      const user = await loginUser({
        email,
        password,
      });

      setUser(user);
      router.push("/dashboard");
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "로그인 중 문제가 발생했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <Input
        id="email"
        label="이메일"
        type="email"
        placeholder="example@email.com"
        value={email}
        error={emailError}
        onChange={(e) => {
          setEmail(e.target.value);
          if (emailError) setEmailError("");
        }}
      />

      <Input
        id="password"
        label="비밀번호"
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        error={passwordError}
        onChange={(e) => {
          setPassword(e.target.value);
          if (passwordError) setPasswordError("");
        }}
      />

      {formError && (
        <p className="text-sm font-medium text-red-600">{formError}</p>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "로그인 중..." : "로그인"}
      </Button>

      <p className="text-center text-sm text-gray-600">
        아직 계정이 없나요?{" "}
        <Link
          href="/signup"
          className="font-medium text-gray-900 underline underline-offset-4"
        >
          회원가입
        </Link>
      </p>
    </form>
  );
}
