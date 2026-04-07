"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { signupUser } from "@/lib/auth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetErrors = () => {
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    resetErrors();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    let hasError = false;

    if (!trimmedName) {
      setNameError("이름을 입력해주세요.");
      hasError = true;
    }

    if (!trimmedEmail) {
      setEmailError("이메일을 입력해주세요.");
      hasError = true;
    } else if (!emailRegex.test(trimmedEmail)) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("비밀번호 확인을 입력해주세요.");
      hasError = true;
    }

    if (hasError) return;

    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      setIsLoading(true);

      await signupUser({
        name: trimmedName,
        email: trimmedEmail,
        password,
      });

      toast.success("회원가입이 완료되었습니다.");
      router.push("/login");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "회원가입 중 문제가 발생했습니다.";

      setFormError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <Input
        id="name"
        label="이름"
        type="text"
        placeholder="이름 입력"
        value={name}
        error={nameError}
        onChange={(e) => {
          setName(e.target.value);
          if (nameError) setNameError("");
        }}
      />

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

      <Input
        id="confirmPassword"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호 다시 입력"
        value={confirmPassword}
        error={confirmPasswordError}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          if (confirmPasswordError) setConfirmPasswordError("");
        }}
      />

      {formError && (
        <p className="text-sm font-medium text-red-600">{formError}</p>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "회원가입 중..." : "회원가입"}
      </Button>

      <p className="text-center text-sm text-gray-600">
        이미 계정이 있나요?{" "}
        <Link
          href="/login"
          className="font-medium text-gray-900 underline underline-offset-4"
        >
          로그인
        </Link>
      </p>
    </form>
  );
}
