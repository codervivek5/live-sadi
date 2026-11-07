import { LegalPage, type LegalSection } from "@/components/layout/legal-page";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const intro = "The terms that apply when you create a wedding page on Live Shadi or visit one.";

export const metadata = pageMetadata({ title: "Terms & Conditions", description: intro, path: "/terms" });

const sections: LegalSection[] = [
  {
    heading: "Using Live Shadi",
    body: [
      "By creating a wedding page or using the website you agree to these terms. If you do not agree, please do not use the service. You must be at least 18 years old to register a wedding.",
    ],
  },
  {
    heading: "What the service provides",
    body: [
      "Live Shadi provides a wedding page with a shareable link and QR, live streaming delivery, replays, a guest photo album, a blessings wall and privacy controls, as described for the package you buy.",
      "Live streaming depends on the video your videographer sends and on internet connections at the venue and on the viewer's side. We cannot guarantee uninterrupted streaming, but we will work to deliver the recording as a replay afterwards.",
    ],
  },
  {
    heading: "Your account and packages",
    body: [
      "You are responsible for the information you give us and for keeping your login and any PIN private. Each package has limits (for example live hours, number of viewers and how long the page stays online) that are shown when you buy. Packages apply to one wedding and cannot be transferred.",
    ],
  },
  {
    heading: "Your content",
    body: [
      "You keep ownership of the photos, videos and text you and your guests add. You give Live Shadi permission to store, process and display that content on your wedding page, and to deliver it to the people you share the link with, for as long as the service is provided.",
      "You are responsible for having the right to share the content, including the consent of people shown in it, and for making sure it does not break any law.",
    ],
  },
  {
    heading: "Guest uploads",
    body: [
      "Guests can add photos, videos and blessings to your page. You decide what is approved and shown. We may remove content that is unlawful, abusive or harmful.",
    ],
  },
  {
    heading: "Acceptable use",
    body: [
      "Please do not use Live Shadi to:",
      [
        "share unlawful, hateful, obscene or harassing content;",
        "record or publish people without their consent where consent is required;",
        "attempt to disrupt, copy or gain unauthorised access to the service;",
        "stream copyrighted material that you do not have the right to share.",
      ],
    ],
  },
  {
    heading: "Payments and refunds",
    body: [
      "Prices are shown in Indian rupees and include GST. Payments are processed by our payment provider. Refund eligibility depends on the package and how close the wedding is, and is stated at the time of purchase. If you have an issue with a payment, write to us and we will look into it promptly.",
    ],
  },
  {
    heading: "When the page ends",
    body: [
      "When your package period ends, the page and its media may be removed. We will remind you before this happens so you can download your content.",
    ],
  },
  {
    heading: "Limits of our responsibility",
    body: [
      "We provide Live Shadi with reasonable care, but to the extent the law allows we are not liable for indirect or consequential loss, or for problems caused by things outside our control such as venue internet, power cuts or third-party services. Nothing in these terms limits any right you have under Indian consumer law.",
    ],
  },
  {
    heading: "Changes and governing law",
    body: [
      "We may update these terms and will change the date above when we do. These terms are governed by the laws of India, and courts in India will have jurisdiction.",
    ],
  },
  {
    heading: "Contact",
    body: [`Questions about these terms? Email ${site.contactEmail}.`],
  },
];

export default function TermsPage() {
  return <LegalPage title="Terms & Conditions" intro={intro} path="/terms" updated="7 November 2026" sections={sections} />;
}
