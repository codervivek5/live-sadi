import { cn } from "@/lib/utils";

/** Placeholder block shown while content loads. Pulses gently; the pulse stops for reduced-motion users. */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("animate-pulse rounded-lg bg-line motion-reduce:animate-none", className)} />;
}
