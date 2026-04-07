import { createClient } from "@/lib/supabase/client";
import { LoginForm, User, UserCreateForm } from "@/types/auth";

type SignupUserParams = {
  name: string;
  email: string;
  password: string;
};

type LoginUserParams = {
  email: string;
  password: string;
};

/**
 * 회원가입 API
 */
export async function signupUser({ name, email, password }: SignupUserParams) {
  const supabase = createClient();

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
    throw new Error(error.message);
  }

  return data;
}

/**
 * 로그인 API
 */
export async function loginUser({ email, password }: LoginUserParams) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function logoutUser() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

/**
 * FormData 생성 함수 (파일 업로드 대응)
 */
// function createSignupFormData(payload: UserCreateForm) {
//   const formData = new FormData();

//   formData.append("name", payload.name);
//   formData.append("email", payload.email);
//   formData.append("password", payload.password);

//   if (payload.attach && payload.attach.length > 0) {
//     formData.append("attach", payload.attach[0]);
//   }

//   return formData;
// }
