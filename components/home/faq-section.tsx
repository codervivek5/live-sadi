import { Faq } from "@/components/faq";
import { Reveal } from "@/components/motion";

const faqs = [
  {
    q: "Do guests need to download an app?",
    a: "No. Opening the link or scanning the QR shows the page in the browser, on a phone or a laptop.",
  },
  {
    q: "Who streams the wedding?",
    a: "Your videographer. We give them a stream key and a one-page guide for OBS or Larix. A five-minute test before the function is always a good idea.",
  },
  {
    q: "What if the venue's internet is poor?",
    a: "Stream quality depends on the connection, so ask your videographer to use good 4G/5G or a dedicated line. The full recording is available as a replay afterwards.",
  },
  {
    q: "How many people can watch at once?",
    a: "Up to 500 on Standard and 2,000 on Premium. Viewing the schedule and photos has no limit.",
  },
  {
    q: "How long does the page stay online after the wedding?",
    a: "1 year, 3 years or lifetime, depending on the package. You can download everything before it ends.",
  },
  {
    q: "Can someone else open my link?",
    a: "Anyone who has the link can. On Premium you can add a PIN, hide specific functions and replace the link whenever you like.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-20">
      <Reveal>
        <h2 id="faq-heading" className="font-display text-3xl font-semibold text-maroon sm:text-4xl">
          Frequently asked questions
        </h2>
      </Reveal>
      <Reveal className="mt-8" delay={0.1}>
        <Faq items={faqs} />
      </Reveal>
    </section>
  );
}
