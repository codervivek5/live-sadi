import { ButtonLink } from "@/components/button";
import { HeroHeadline } from "@/components/hero-headline";
import { LiveHero } from "@/components/live-hero";
import { Reveal } from "@/components/motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-maroon-dark text-white">
      <div className="pattern-dots absolute inset-0 opacity-20" aria-hidden />
      <div className="glow-drift absolute -left-24 top-10 size-96 rounded-full bg-gold/20 blur-3xl" aria-hidden />
      <div className="glow-drift absolute -right-20 bottom-0 size-80 rounded-full bg-blush/20 blur-3xl [animation-delay:-6s]" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-14 md:grid-cols-[1.1fr_1fr] md:py-24">
        <div>
          <HeroHeadline
            className="font-display text-[2.1rem] font-semibold leading-[1.15] sm:text-5xl lg:text-[3.25rem]"
            text="Every Love Story Deserves a Beautiful Beginning."
          />
          <Reveal immediate delay={0.5} className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">
            <p>
              Live Shadi gives every wedding one link: live streaming, replays, photos and blessings. Door baithe
              rishtedaar bhi us pal mein shamil hote hain, aur yaadein shaadi ke baad bhi wahin rehti hain.
            </p>
          </Reveal>
          <Reveal immediate delay={0.65} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/explore" variant="gold" className="px-6 py-3 text-base">
              Explore Weddings
            </ButtonLink>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-white/10"
            >
              Join Live Shadi
            </Link>
          </Reveal>
          <Reveal immediate delay={0.8} className="mt-5 text-sm text-white/65">
            <p>Guests need no app and no login. They just open the link.</p>
          </Reveal>
        </div>

        <div className="relative pb-6">
          {/* layered arches behind the live window */}
          <div aria-hidden className="absolute left-1/2 top-3 h-[calc(100%-1rem)] w-[23.5rem] max-w-[96%] -translate-x-1/2 rounded-t-[12rem] border border-gold/30" />
          <div aria-hidden className="absolute left-1/2 top-8 h-[calc(100%-2rem)] w-[26.5rem] max-w-full -translate-x-1/2 rounded-t-[13.5rem] border border-blush/20" />
          <LiveHero />
        </div>
      </div>
    </section>
  );
}
