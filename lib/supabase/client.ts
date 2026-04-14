// 브라우저에서 Supabase를 사용할 수 있게 도구를 하나 만들기
// 브라우저(클라이언트 컴포넌트)에서 쓸 Supabase 클라이언트
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase 환경변수가 설정되지 않았습니다.");
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
