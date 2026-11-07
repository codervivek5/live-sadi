import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WeddingArt } from "@/components/art/wedding-art";
import type { Celebration } from "@/lib/data";
import { cn } from "@/lib/utils";

export function CelebrationCard({ item, featured, href }: { item: Celebration; featured?: boolean; href?: string }) {
  return (
    <Link
      href={href ?? `/explore#${item.id}`}
      className={cn(
        "group relative block overflow-hidden rounded-3xl bg-maroon-dark",
        featured ? "aspect-[4/3] md:aspect-auto md:h-full md:min-h-[22rem]" : "aspect-[4/3]",
      )}
    >
      <WeddingArt
        variant={item.id}
        className="absolute inset-0 size-full transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
        <div>
          <h3 className={cn("font-display font-semibold leading-tight", featured ? "text-3xl" : "text-xl")}>{item.name}</h3>
          <p className="mt-1 text-sm text-white/85">{item.blurb}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/90 text-maroon transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <ArrowUpRight className="size-4" aria-hidden />
          <span className="sr-only">Explore {item.name}</span>
        </span>
      </div>
    </Link>
  );
}
