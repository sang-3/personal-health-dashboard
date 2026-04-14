"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { signupAction } from "@/actions/auth";
import type { AuthActionState } from "@/types/auth";
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from "@/lib/validations/auth";

const initialState: AuthActionState = {
  error: "",
  fieldErrors: {},
};

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(
    signupAction,
    initialState,
  );

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [clientErrors, setClientErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(field: keyof typeof values, value: string) {
    const nextValues = {
      ...values,
      [field]: value,
    };

    setValues(nextValues);

    setClientErrors({
      name: nextValues.name ? validateName(nextValues.name) : "",
      email: nextValues.email ? validateEmail(nextValues.email) : "",
      password: nextValues.password
        ? validatePassword(nextValues.password)
        : "",
      confirmPassword: nextValues.confirmPassword
        ? validateConfirmPassword(
            nextValues.password,
            nextValues.confirmPassword,
          )
        : "",
    });
  }

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      {state.error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}

      <Input
        id="name"
        name="name"
        label="이름"
        type="text"
        placeholder="이름 입력"
        value={values.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={clientErrors.name || state.fieldErrors.name}
      />

      <Input
        id="email"
        name="email"
        label="이메일"
        type="email"
        placeholder="example@email.com"
        value={values.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={clientErrors.email || state.fieldErrors.email}
      />

      <Input
        id="password"
        name="password"
        label="비밀번호"
        type="password"
        placeholder="영문, 숫자, 특수문자 포함 8~20자"
        value={values.password}
        onChange={(e) => handleChange("password", e.target.value)}
        error={clientErrors.password || state.fieldErrors.password}
      />

      <Input
        id="confirmPassword"
        name="confirmPassword"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호 다시 입력"
        value={values.confirmPassword}
        onChange={(e) => handleChange("confirmPassword", e.target.value)}
        error={
          clientErrors.confirmPassword || state.fieldErrors.confirmPassword
        }
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? "회원가입 중..." : "회원가입"}
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
