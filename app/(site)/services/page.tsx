import { Heart, Images, Lock, QrCode, Radio, Repeat } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { Pricing } from "@/components/home/pricing";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";

const description =
  "Live streaming, replays, a shareable wedding page, guest photo albums, blessings and privacy controls. See what Live Shadi includes and compare packages.";

export const metadata = pageMetadata({ title: "Services & Pricing", description, path: "/services" });

const services = [
  { icon: Radio, title: "Live streaming", text: "Your videographer streams each function. Guests watch from any phone or laptop, with no app to install." },
  { icon: Repeat, title: "Automatic replays", text: "When a function ends, the recording becomes a replay on the same page. Nothing to upload or edit." },
  { icon: QrCode, title: "One link and QR", text: "Print the QR on the invitation or send the link on WhatsApp. You can change the content any time without changing the QR." },
  { icon: Images, title: "Guest photo album", text: "Guests add the photos and videos they took. Each item waits for your approval before it appears." },
  { icon: Heart, title: "Blessings wall", text: "Relatives who could not attend leave written blessings that you can read again after the wedding." },
  { icon: Lock, title: "Privacy controls", text: "PIN-protect the page, hide specific functions and replace the link if it travels too far." },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: "Services & Pricing", description, path: "/services" })} />
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        title="Everything your wedding page includes"
        intro="One page for live streaming, memories and blessings. Pick the package that fits your celebration."
      />

      <section aria-labelledby="services-heading" className="mx-auto max-w-6xl px-4 py-16">
        <h2 id="services-heading" className="sr-only">
          What is included
        </h2>
        <Stagger as="ul" gap={0.08} className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <StaggerItem as="li" key={s.title} className="border-t border-gold/50 pt-5">
              <s.icon className="size-6 text-maroon" aria-hidden />
              <h3 className="font-display mt-3 text-xl font-semibold text-maroon">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section aria-labelledby="videographer-heading" className="bg-white py-16">
        <Reveal className="mx-auto max-w-3xl px-4">
          <h2 id="videographer-heading" className="font-display text-3xl font-semibold text-maroon">
            Works with your videographer
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            You do not need a new crew. We give your videographer a stream key and a one-page guide for OBS or
            Larix, the same apps most professionals already know. They stream, Live Shadi delivers it to every
            guest and keeps the recording.
          </p>
        </Reveal>
      </section>

      <Pricing />

      <section className="pb-20 text-center">
        <ButtonLink href="/register" className="px-7 py-3 text-base">
          Register your wedding
        </ButtonLink>
      </section>
    </>
  );
}
