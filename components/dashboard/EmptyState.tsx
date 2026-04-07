type EmptyStateProps = {
  title: string;
  description: string;
  caption?: string;
  minHeight?: string;
};

export default function EmptyState({
  title,
  description,
  caption,
  minHeight = "min-h-[200px]",
}: EmptyStateProps) {
  return (
    <div
      className={`flex ${minHeight} flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 text-center`}
    >
      <p className="text-lg font-semibold text-gray-900">{title}</p>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
      {caption && <p className="mt-1 text-xs text-gray-400">{caption}</p>}
    </div>
  );
}
