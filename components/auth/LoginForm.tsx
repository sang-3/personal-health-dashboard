"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { loginAction } from "@/actions/auth";
import type { AuthActionState } from "@/types/auth";
import { validateEmail } from "@/lib/validations/auth";

const initialState: AuthActionState = {
  error: "",
  fieldErrors: {},
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [clientErrors, setClientErrors] = useState({
    email: "",
    password: "",
  });

  function handleEmailChange(value: string) {
    setValues((prev) => ({ ...prev, email: value }));

    setClientErrors((prev) => ({
      ...prev,
      email: value ? validateEmail(value) : "",
    }));
  }

  function handlePasswordChange(value: string) {
    setValues((prev) => ({ ...prev, password: value }));

    setClientErrors((prev) => ({
      ...prev,
      password: "",
    }));
  }

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      {state.error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}

      <Input
        id="email"
        name="email"
        label="이메일"
        type="email"
        placeholder="example@email.com"
        value={values.email}
        onChange={(e) => handleEmailChange(e.target.value)}
        error={clientErrors.email || state.fieldErrors.email}
      />

      <Input
        id="password"
        name="password"
        label="비밀번호"
        type="password"
        placeholder="비밀번호 입력"
        value={values.password}
        onChange={(e) => handlePasswordChange(e.target.value)}
        error={clientErrors.password || state.fieldErrors.password}
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? "로그인 중..." : "로그인"}
      </Button>

      <p className="text-center text-sm text-gray-600">
        계정이 없나요?{" "}
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
