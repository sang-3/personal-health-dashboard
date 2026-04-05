import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  error?: string;
};

export default function Input({
  label,
  id,
  error,
  className = "",
  ...props
}: InputProps) {
  const inputStyle = error
    ? "rounded-lg border border-red-500 px-3 py-2 outline-none focus:border-red-500"
    : "rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input id={id} className={`${inputStyle} ${className}`} {...props} />

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
}
