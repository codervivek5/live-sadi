import Link from "next/link";
import { CelebrationCard } from "@/components/cards/celebration-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { celebrations } from "@/lib/data";

export function ExploreTeaser() {
  const [first, ...rest] = celebrations;
  return (
    <section aria-labelledby="explore-heading" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="explore-heading" className="font-display text-3xl font-semibold text-maroon sm:text-4xl">
              Explore Weddings
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Every function gets its own place on the page. See how each celebration looks on Live Shadi.
            </p>
          </div>
          <Link href="/explore" className="text-sm font-medium text-maroon underline-offset-4 hover:underline">
            View all celebrations →
          </Link>
        </Reveal>

        <Stagger gap={0.08} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2">
          <StaggerItem className="sm:col-span-2 md:row-span-2">
            <CelebrationCard item={first} featured />
          </StaggerItem>
          {rest.map((c) => (
            <StaggerItem key={c.id}>
              <CelebrationCard item={c} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
