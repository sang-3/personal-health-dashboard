import Link from "next/link";
import Button from "@/components/ui/Button";

export default function LandingHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold text-gray-900">
          Personal Health Dashboard
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="secondary" type="button">
              로그인
            </Button>
          </Link>
          <Link href="/signup">
            <Button type="button">회원가입</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
