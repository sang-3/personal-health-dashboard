import type { User } from "@supabase/supabase-js";

export type AuthUser = User;

export type AuthFieldErrors = Partial<{
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}>;

export type AuthActionState = {
  error: string; // 서버 에러용
  fieldErrors: AuthFieldErrors; // 각 필드 에러용
};
