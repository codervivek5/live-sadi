import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DigitalInvitation } from "@/components/invite/digital-invitation";
import { JsonLd } from "@/components/seo/json-ld";
import { wedding } from "@/lib/data";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";

export async function generateMetadata(props: PageProps<"/w/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const sp = (await props.searchParams) ?? {};
  const guestRaw = Array.isArray(sp.guest) ? sp.guest[0] : (sp.guest ?? (Array.isArray(sp.to) ? sp.to[0] : sp.to));
  const guestName = guestRaw ? decodeURIComponent(String(guestRaw)) : "";

  if (slug !== wedding.slug) {
    return { robots: { index: false, follow: false } };
  }

  const title = guestName
    ? `${guestName} ke liye Vivah Nimantran | ${wedding.groom} & ${wedding.bride}`
    : `Shubh Vivah Nimantran | ${wedding.groom} weds ${wedding.bride}`;

  return pageMetadata({
    title,
    description: `Aapko aur aapke samast parivar ko ${wedding.groom} aur ${wedding.bride} ke shubh vivah samaroh mein aamantrit kiya jata hai. Functions schedule, live stream aur RSVP yahan dekhein.`,
    path: `/w/${slug}/invite`,
    noindex: true, // Invitations are private by default
  });
}

export function generateStaticParams() {
  return [{ slug: wedding.slug }];
}

export default async function InvitePage(props: PageProps<"/w/[slug]">) {
  const { slug } = await props.params;
  const sp = (await props.searchParams) ?? {};
  const guestRaw = Array.isArray(sp.guest) ? sp.guest[0] : (sp.guest ?? (Array.isArray(sp.to) ? sp.to[0] : sp.to));
  const guestName = guestRaw ? decodeURIComponent(String(guestRaw)) : "";

  if (slug !== wedding.slug) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          name: `${wedding.groom} weds ${wedding.bride} - Digital Invitation`,
          description: `Personalized digital wedding invitation and RSVP portal for ${wedding.groom} & ${wedding.bride}.`,
          path: `/w/${wedding.slug}/invite`,
        })}
      />
      <DigitalInvitation wedding={wedding} initialGuestName={guestName} />
    </>
  );
}

