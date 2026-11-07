import Link from "next/link";
import { WeddingArt } from "@/components/art/wedding-art";
import { WeddingCard } from "@/components/cards/wedding-card";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/button";
import { EmptyState } from "@/components/ui/empty-state";
import { celebrations, wedding } from "@/lib/data";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

const description =
  "See how every Indian wedding function looks on Live Shadi: haldi, mehndi, sangeet, pheras and reception, each with live streaming, replays, photos and blessings.";

export const metadata = pageMetadata({ title: "Explore Weddings", description, path: "/explore" });

export default function ExplorePage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: "Explore Weddings", description, path: "/explore" })} />
      <PageHero
        crumbs={[{ name: "Explore Weddings", path: "/explore" }]}
        title="Explore Weddings"
        intro="See how each celebration looks on Live Shadi, and open our demo wedding to try the live page yourself."
      />

      <section aria-labelledby="featured-heading" className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <h2 id="featured-heading" className="font-display text-3xl font-semibold text-maroon">
            Featured wedding
          </h2>
          <p className="mt-2 max-w-xl text-muted">A demo wedding, built to show you everything a guest sees.</p>
        </Reveal>
        <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StaggerItem>
            <WeddingCard
              wedding={{
                slug: wedding.slug,
                title: `${wedding.groom} & ${wedding.bride}`,
                city: wedding.city,
                date: wedding.weddingDate,
                style: "Traditional Rajasthani wedding",
                art: "pheras",
                demo: true,
              }}
            />
          </StaggerItem>
          <StaggerItem className="sm:col-span-1 lg:col-span-2">
            <EmptyState
              icon="🪔"
              title="Your wedding could be here"
              text="Wedding pages are private by default. Couples will be able to opt in to appear in this gallery, and nothing is shown without their permission."
              action={<ButtonLink href="/register">Create your wedding page</ButtonLink>}
              className="h-full"
            />
          </StaggerItem>
        </Stagger>
      </section>

      <section aria-labelledby="celebrations-heading" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 id="celebrations-heading" className="font-display text-3xl font-semibold text-maroon">
              Browse by celebration
            </h2>
          </Reveal>
          <div className="mt-10 space-y-16">
            {celebrations.map((c, i) => (
              <Reveal key={c.id}>
                <article id={c.id} className="grid scroll-mt-24 items-center gap-8 md:grid-cols-2">
                  <div className={cn("overflow-hidden rounded-3xl", i % 2 && "md:order-2")}>
                    <WeddingArt variant={c.id} className="aspect-[4/3] w-full" />
                  </div>
                  <div>
                    <p className="text-sm text-muted" lang="hi">{c.nameHi}</p>
                    <h3 className="font-display mt-1 text-3xl font-semibold text-maroon">{c.name}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-muted">{c.detail}</p>
                    <Link
                      href={`/w/${wedding.slug}#live`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-maroon underline-offset-4 hover:underline"
                    >
                      See it on the demo page <span aria-hidden>→</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
