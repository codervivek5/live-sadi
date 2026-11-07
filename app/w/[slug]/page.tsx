import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MapPin } from "lucide-react";
import { Blessings } from "@/components/blessings";
import { Countdown } from "@/components/countdown";
import { Gallery } from "@/components/gallery";
import { GuestUpload } from "@/components/guest-upload";
import { LiveSection } from "@/components/live-section";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/seo/json-ld";
import { Skeleton } from "@/components/ui/skeleton";
import { blessings, media, wedding } from "@/lib/data";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export async function generateMetadata(props: PageProps<"/w/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  // Couples' pages are private: only the public demo wedding may be indexed.
  if (slug !== wedding.slug) return { robots: { index: false, follow: false } };
  return pageMetadata({
    title: `${wedding.groom} weds ${wedding.bride}`,
    description: `${wedding.tagline}. Demo wedding page on Live Shadi: ${wedding.city}, ${formatDate(wedding.weddingDate, { day: "numeric", month: "long", year: "numeric" })}.`,
    path: `/w/${slug}`,
  });
}

function WeddingSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading wedding page">
      <div className="h-14 border-b border-line" />
      <div className="grid place-items-center bg-maroon-dark px-4 py-24">
        <Skeleton className="h-14 w-72 bg-white/15" />
        <Skeleton className="mt-6 h-5 w-64 bg-white/10" />
        <div className="mt-10 flex gap-3">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-16 w-16 bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-16 px-4 py-12">
      <Reveal>
        <h2 className="font-display text-3xl font-semibold text-maroon">{title}</h2>
        {subtitle && <p className="mt-1 text-muted">{subtitle}</p>}
      </Reveal>
      <Reveal className="mt-6" delay={0.08}>{children}</Reveal>
    </section>
  );
}

export function generateStaticParams() {
  return [{ slug: wedding.slug }];
}

export default async function WeddingPage(props: PageProps<"/w/[slug]">) {
  const { slug } = await props.params;
  // Phase 1 UI: only the demo wedding exists. Real lookup arrives with the API.
  if (slug !== wedding.slug) notFound();
  return (
    <Suspense fallback={<WeddingSkeleton />}>
      <WeddingContent />
    </Suspense>
  );
}

function WeddingContent() {
  const liveEvent = wedding.events.find((e) => e.status === "live");

  return (
    <>
      {/* Mini nav */}
      <nav className="sticky top-0 z-30 border-b border-line bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
          <span className="font-display shrink-0 whitespace-nowrap text-lg text-maroon">
            {wedding.groom} <span className="text-gold">&amp;</span> {wedding.bride}
          </span>
          <div className="flex gap-4 overflow-x-auto text-sm text-muted [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <a href="#live" className="whitespace-nowrap hover:text-maroon">Live</a>
            <a href="#photos" className="whitespace-nowrap hover:text-maroon">Photos</a>
            <a href="#upload" className="whitespace-nowrap hover:text-maroon">Upload</a>
            <a href="#blessings" className="whitespace-nowrap hover:text-maroon">Aashirwad</a>
          </div>
        </div>
      </nav>

      <JsonLd data={webPageJsonLd({ name: `${wedding.groom} weds ${wedding.bride}`, description: wedding.tagline, path: `/w/${wedding.slug}` })} />
      <main id="main">
        {/* Hero */}
        <header className="relative isolate overflow-hidden bg-maroon-dark text-center text-white">
          <Image src={wedding.heroImage} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-30" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-maroon-dark/60 via-maroon-dark/70 to-maroon-dark" />
          <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
            <p className="text-sm tracking-[0.3em] text-gold">SHUBH VIVAH</p>
            <h1 className="font-display mt-4 text-5xl font-semibold sm:text-7xl">
              {wedding.groom} <span className="text-gold">&amp;</span> {wedding.bride}
            </h1>
            <p className="mt-4 text-white/80">{wedding.tagline}</p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm text-white/90">
              <MapPin className="size-4 text-gold" /> {formatDate(wedding.weddingDate, { weekday: "long" })} · {wedding.city}
            </p>
            {liveEvent && (
              <a
                href="#live"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold hover:bg-red-700"
              >
                <span className="live-dot size-2 rounded-full bg-white" /> {liveEvent.name} abhi LIVE hai — dekhein
              </a>
            )}
            <div className="mt-10">
              <p className="mb-3 text-xs uppercase tracking-widest text-white/60">Pheron mein baaki</p>
              <Countdown target={wedding.weddingDate} />
            </div>
          </div>
        </header>

        <Section id="story" title="Hamari kahani">
          <p className="max-w-2xl leading-relaxed text-muted">{wedding.story}</p>
        </Section>

        <div className="bg-white">
          <Section id="live" title="Live aur functions" subtitle="Kisi bhi function par tap karein — live ho to dekhein, khatam ho gaya to replay.">
            <LiveSection events={wedding.events} poster={wedding.heroImage} />
          </Section>
        </div>

        <Section id="photos" title="Photos aur videos" subtitle="Sabhi functions ki yaadein, ek jagah.">
          <Gallery items={media} events={wedding.events} />
        </Section>

        <div className="bg-white">
          <Section id="upload" title="Aapke paas bhi photos hain?" subtitle="Apne phone se bhejein — dulha-dulhan approve karenge to yahin dikhengi.">
            <div className="max-w-2xl">
              <GuestUpload />
            </div>
          </Section>
        </div>

        <Section id="blessings" title="Aashirwad" subtitle="Door baithe apno ki shubhkamnayein.">
          <Blessings initial={blessings} />
        </Section>
      </main>

      <footer className="border-t border-line bg-white py-8 text-center text-sm text-muted">
        <p>
          Contact: {wedding.hostPhone} · Banaya gaya <Link href="/" className="text-maroon underline">Live Shadi</Link> se 💛
        </p>
      </footer>
    </>
  );
}
