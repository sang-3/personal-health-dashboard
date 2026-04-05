import { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function AuthCard({
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>
      </div>

      {children}
    </div>
  );
}
