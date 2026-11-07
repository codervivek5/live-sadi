import { Eye, Heart, Smartphone, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";

const description =
  "Live Shadi helps Indian families share their wedding with relatives who cannot travel, through live streaming, replays, photos and blessings on one private link.";

export const metadata = pageMetadata({ title: "About Us", description, path: "/about" });

const principles = [
  { icon: Eye, title: "Private by default", text: "Families decide who watches, who uploads and how long the page stays up." },
  { icon: Smartphone, title: "Simple for everyone", text: "A grandparent should be able to open the link and watch. No app, no account, no instructions." },
  { icon: Sparkles, title: "Honest with numbers", text: "We do not show statistics or reviews we cannot stand behind. Real stories appear when families choose to share them." },
  { icon: Heart, title: "Made for Indian weddings", text: "Multi-day functions, many cities, many generations. The product is shaped around how our weddings actually work." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: "About Us", description, path: "/about" })} />
      <PageHero
        crumbs={[{ name: "About Us", path: "/about" }]}
        title="Weddings are better when everyone is there"
        intro="But in a family spread across cities and countries, someone is always missing. Live Shadi exists so they are not."
      />

      <section className="mx-auto max-w-3xl px-4 py-16">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-maroon">Why we are building this</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-muted">
            <p>
              An Indian wedding can run for days across several functions. Grandparents who cannot travel, cousins
              abroad and friends with exams all want to be part of it, and today they depend on a forwarded video
              clip or a shaky phone stream.
            </p>
            <p>
              Live Shadi gives each wedding a single page. The family shares one link or QR, and from the first
              haldi to the vidaai, anyone with the link can watch live, rewatch later, see photos and leave a
              blessing.
            </p>
            <p>
              Live Shadi is an early-stage product. We are building it carefully, with families and videographers,
              and we would rather be small and trustworthy than loud.
            </p>
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="principles-heading" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 id="principles-heading" className="font-display text-3xl font-semibold text-maroon">
              What we hold ourselves to
            </h2>
          </Reveal>
          <Stagger as="ul" gap={0.08} className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {principles.map((p) => (
              <StaggerItem as="li" key={p.title} className="border-t border-gold/50 pt-5">
                <p.icon className="size-6 text-maroon" aria-hidden />
                <h3 className="mt-3 font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-4 py-16 text-center">
        <h2 className="font-display text-3xl font-semibold text-maroon">Planning a wedding?</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">Tell us about it and we will help you set up your page.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/register">Register your wedding</ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
