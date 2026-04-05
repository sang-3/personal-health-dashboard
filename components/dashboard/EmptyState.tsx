type EmptyStateProps = {
  message: string;
  minHeight?: string;
};

export default function EmptyState({
  message,
  minHeight = "min-h-[200px]",
}: EmptyStateProps) {
  return (
    <div
      className={`flex ${minHeight} items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50`}
    >
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}
