import { Clock, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/layout/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

const description = "Questions about live streaming, packages or setting up your wedding page? Get in touch with the Live Shadi team.";

export const metadata = pageMetadata({ title: "Contact Us", description, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <JsonLd data={{ ...webPageJsonLd({ name: "Contact Us", description, path: "/contact" }), "@type": "ContactPage" }} />
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        title="Contact us"
        intro="Planning a wedding, or just curious how it works? Write to us and we will get back to you."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[1.3fr_1fr]">
        <ContactForm />
        <aside className="space-y-6">
          <div>
            <h2 className="font-display flex items-center gap-2 text-xl font-semibold text-maroon">
              <Mail className="size-5 text-gold" aria-hidden /> Email
            </h2>
            <a href={`mailto:${site.contactEmail}`} className="mt-2 inline-block text-maroon underline-offset-4 hover:underline">
              {site.contactEmail}
            </a>
          </div>
          <div>
            <h2 className="font-display flex items-center gap-2 text-xl font-semibold text-maroon">
              <Clock className="size-5 text-gold" aria-hidden /> Before your wedding
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              If your function is within a week, mention the date in your message so we can look at it first.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
