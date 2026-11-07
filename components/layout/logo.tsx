import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label="Live Shadi, home"
      className={cn(
        "font-display inline-flex items-center gap-2 whitespace-nowrap text-xl font-semibold",
        tone === "dark" ? "text-maroon" : "text-white",
        className,
      )}
    >
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden>
        <rect width="32" height="32" rx="8" fill={tone === "dark" ? "#701f3a" : "#d4af75"} />
        <path d="M7 23V14a9 9 0 0 1 18 0v9" fill="none" stroke={tone === "dark" ? "#d4af75" : "#4a1226"} strokeWidth="1.6" />
        <path d="M12.5 22v-7a3.5 3.5 0 0 1 7 0v7z" fill={tone === "dark" ? "#d4af75" : "#4a1226"} />
      </svg>
      <span>
        Live <span className="text-gold">Shadi</span>
      </span>
    </Link>
  );
}
