import { createClient } from "@/lib/supabase/server";

export default async function SupabaseTestPage() {
  const supabase = await createClient(); // Supabase랑 대화할 준비

  const { data, error } = await supabase
    .from("test_items") // 테이블을 보겠다라는 의미
    .select("*") // 그 테이블의 모든 칸을 가져올게라는 의미
    .order("id", { ascending: true }); // id 순서대로 정렬

  if (error) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Supabase 테스트</h1>
        <p className="mt-4 text-red-600">에러: {error.message}</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Supabase 테스트</h1>
      <p className="mt-2 text-gray-600">
        아래 목록이 보이면 Supabase에서 데이터를 읽어온 거예요.
      </p>

      <ul className="mt-6 space-y-3">
        {data?.map(
          (
            item, // 읽어온 데이터 여러 줄 화면에 하나씩 보여주기
          ) => (
            <li key={item.id} className="rounded-lg border p-4">
              <p className="font-semibold">id: {item.id}</p>
              <p>name: {item.name}</p>
              <p className="text-sm text-gray-500">
                created_at: {item.created_at}
              </p>
            </li>
          ),
        )}
      </ul>
    </main>
  );
}
