"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { upsertProfile } from "@/lib/profile";
import type { AuthActionState } from "@/types/auth";
import {
  hasAuthErrors,
  validateLoginForm,
  validateSignupForm,
} from "@/lib/validations/auth";

function createInitialAuthState(
  overrides?: Partial<AuthActionState>,
): AuthActionState {
  return {
    error: "",
    fieldErrors: {},
    ...overrides,
  };
}

function mapAuthErrorMessage(message: string) {
  if (
    message.includes("Invalid login credentials") ||
    message.includes("invalid_credentials")
  ) {
    return "이메일 또는 비밀번호를 다시 확인해주세요.";
  }

  if (
    message.includes("User already registered") ||
    message.includes("already registered")
  ) {
    return "이미 가입된 이메일입니다.";
  }

  if (message.includes("email rate limit exceeded")) {
    return "이메일 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
  }

  if (message.includes("Database error saving new user")) {
    return "회원가입 중 사용자 정보 저장에 실패했습니다. Supabase 설정을 확인해주세요.";
  }

  return "요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.";
}

// 로그인
export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const fieldErrors = validateLoginForm({
    email,
    password,
  });

  if (hasAuthErrors(fieldErrors)) {
    return createInitialAuthState({
      fieldErrors,
    });
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return createInitialAuthState({
      error: mapAuthErrorMessage(error.message),
    });
  }

  redirect("/dashboard");
}

// 회원가입
export async function signupAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  const fieldErrors = validateSignupForm({
    name,
    email,
    password,
    confirmPassword,
  });

  if (hasAuthErrors(fieldErrors)) {
    return createInitialAuthState({
      fieldErrors,
    });
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    console.error("signup error:", error.message);

    return createInitialAuthState({
      error: mapAuthErrorMessage(error.message),
    });
  }

  if (data.user) {
    await upsertProfile({
      id: data.user.id,
      email,
      name,
    });
  }

  redirect("/login");
}

// 로그아웃
export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
