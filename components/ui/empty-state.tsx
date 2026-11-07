import { cn } from "@/lib/utils";

export function EmptyState({
  icon = "💍",
  title,
  text,
  action,
  className,
}: {
  icon?: string;
  title: string;
  text?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-3xl border border-dashed border-gold/60 bg-white px-6 py-14 text-center", className)}>
      <p className="text-4xl" aria-hidden>{icon}</p>
      <h3 className="font-display mt-3 text-xl font-semibold text-maroon">{title}</h3>
      {text && <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted">{text}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}
