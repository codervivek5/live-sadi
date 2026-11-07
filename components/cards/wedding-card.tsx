import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { WeddingArt, type ArtVariant } from "@/components/art/wedding-art";
import { formatDate } from "@/lib/utils";

export type WeddingCardData = {
  slug: string;
  title: string;
  city: string;
  date: string;
  style: string;
  art: ArtVariant;
  demo?: boolean;
};

export function WeddingCard({ wedding }: { wedding: WeddingCardData }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-line bg-white transition-shadow duration-300 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <WeddingArt variant={wedding.art} className="size-full transition-transform duration-700 ease-out group-hover:scale-105" />
        {wedding.demo && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-maroon">
            Demo wedding
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs text-muted">{wedding.style}</p>
        <h3 className="font-display mt-1 text-2xl font-semibold text-maroon">{wedding.title}</h3>
        <ul className="mt-3 space-y-1.5 text-sm text-muted">
          <li className="flex items-center gap-2">
            <MapPin className="size-4 text-gold" aria-hidden /> {wedding.city}
          </li>
          <li className="flex items-center gap-2">
            <CalendarDays className="size-4 text-gold" aria-hidden />
            <time dateTime={wedding.date}>{formatDate(wedding.date, { day: "numeric", month: "long", year: "numeric" })}</time>
          </li>
        </ul>
        <Link
          href={`/w/${wedding.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-maroon underline-offset-4 hover:underline"
        >
          Explore story <span aria-hidden>→</span>
          <span className="sr-only">: {wedding.title}</span>
        </Link>
      </div>
    </article>
  );
}
