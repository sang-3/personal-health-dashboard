import { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Personal Health Dashboard",
    template: "%s | Personal Health Dashboard",
  },
  description: "체중 기록을 저장하고 변화 추이를 확인하는 개인 건강 대시보드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
