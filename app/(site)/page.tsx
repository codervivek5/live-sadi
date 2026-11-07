import type { Metadata } from "next";
import { Experiences } from "@/components/home/experiences";
import { ExploreTeaser } from "@/components/home/explore-teaser";
import { FaqSection } from "@/components/home/faq-section";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { Pricing } from "@/components/home/pricing";
import { Testimonials } from "@/components/home/testimonials";
import { Timezones } from "@/components/home/timezones";
import { Trust } from "@/components/home/trust";
import { JsonLd } from "@/components/seo/json-ld";
import { webPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: "Live Shadi | Watch Weddings Live, Relive Love Stories", description: site.description, path: "/" })} />
      <Hero />
      <Trust />
      <ExploreTeaser />
      <Timezones />
      <HowItWorks />
      <Experiences />
      <Pricing />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </>
  );
}
