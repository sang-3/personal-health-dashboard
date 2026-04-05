import { LoginForm, User, UserCreateForm } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 로그인 API
 */
export async function loginUser(payload: LoginForm): Promise<User> {
  if (!API_URL) {
    throw new Error("API 주소가 설정되지 않았습니다.");
  }

  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Client-Id": "openmarket",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "로그인에 실패했습니다.");
  }

  // 👉 여기 중요 (API 응답 구조에 맞게 수정 필요)
  return data.item ?? data.user ?? data;
}

/**
 * 회원가입 API
 */
export async function signupUser(payload: UserCreateForm) {
  if (!API_URL) {
    throw new Error("API 주소가 설정되지 않았습니다.");
  }

  // const hasAttach = payload.attach && payload.attach.length > 0;

  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Client-Id": "openmarket",
    },
    body: JSON.stringify({
      type: "user",
      name: payload.name,
      email: payload.email,
      password: payload.password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "회원가입에 실패했습니다.");
  }

  return data;
}

/**
 * FormData 생성 함수 (파일 업로드 대응)
 */
function createSignupFormData(payload: UserCreateForm) {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("password", payload.password);

  if (payload.attach && payload.attach.length > 0) {
    formData.append("attach", payload.attach[0]);
  }

  return formData;
}
