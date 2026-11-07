import { LegalPage, type LegalSection } from "@/components/layout/legal-page";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const intro =
  "How Live Shadi collects, uses and protects personal information when you create a wedding page or watch one.";

export const metadata = pageMetadata({ title: "Privacy Policy", description: intro, path: "/privacy-policy" });

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      `Live Shadi (${site.url}) lets families share a wedding through live streaming, replays, photos and blessings on one link. This policy explains what personal data we handle and why. It is written with India's Digital Personal Data Protection Act, 2023 in mind.`,
    ],
  },
  {
    heading: "Information we collect",
    body: [
      "Depending on how you use Live Shadi, we may collect:",
      [
        "Registration details: the names of the couple, a mobile number, city, and the dates, venues and types of the functions.",
        "Content you or your guests add: photos, videos, recordings of live streams and written blessings, with the name a guest types in.",
        "Payment confirmation from our payment provider. We do not receive or store your full card or UPI credentials.",
        "Basic technical data such as device type, browser and pages visited, used to keep the service working and to understand how it is used.",
      ],
      "People who only watch a wedding page are not asked to create an account.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      [
        "To create and run your wedding page, live stream and QR link.",
        "To process payments and send service messages such as confirmations and reminders about your page.",
        "To moderate guest uploads and keep the service safe.",
        "To improve reliability and performance.",
      ],
      "We do not sell personal data, and we do not use wedding photos or videos for advertising.",
    ],
  },
  {
    heading: "Who can see your wedding page",
    body: [
      "Anyone who has your link or QR can open your page unless you turn on a PIN. You choose which functions are visible, and you approve guest uploads before they appear. You can replace your link at any time, after which the old link stops working.",
      "Because a wedding often includes children and other family members, please make sure the people shown are comfortable with the footage being shared with your guests.",
    ],
  },
  {
    heading: "Sharing with service providers",
    body: [
      "We use trusted providers to run Live Shadi, such as hosting, video delivery and storage, and payments. They process data only to provide those services to us. We may also disclose information when the law requires it.",
    ],
  },
  {
    heading: "How long we keep data",
    body: [
      "Your wedding page and its media stay online for the period of the package you chose (for example one year, three years or lifetime). After that, we delete or anonymise it unless you ask us to keep it longer. You can request earlier deletion at any time.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can ask us to give you a copy of your data, correct it, or delete it, and you can withdraw consent for optional processing. You can also nominate someone to exercise these rights for you.",
      `To make a request or raise a concern, write to ${site.contactEmail}. If you are not satisfied with our response, you may approach the Data Protection Board of India.`,
    ],
  },
  {
    heading: "Security",
    body: [
      "We protect data in transit with encryption and limit who can access it. No online service is perfectly secure, so please keep your PIN and dashboard login private.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "We use only the cookies and local storage needed to run the service and remember simple preferences. We do not use advertising cookies.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: ["If we change this policy in a meaningful way we will update the date above and, where appropriate, tell you directly."],
  },
  {
    heading: "Contact",
    body: [`Questions about privacy? Email ${site.contactEmail}.`],
  },
];

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" intro={intro} path="/privacy-policy" updated="7 November 2026" sections={sections} />;
}
