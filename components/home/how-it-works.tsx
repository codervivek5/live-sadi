import { CalendarHeart, Images, Radio, Share2 } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const steps = [
  { icon: CalendarHeart, title: "Create", text: "Register your wedding, pick the functions and add dates and venues. It takes about five minutes." },
  { icon: Share2, title: "Share", text: "Send your link or QR on the invitation card or WhatsApp. Guests need no app and no login." },
  { icon: Radio, title: "Celebrate", text: "Your videographer streams each function. Family everywhere watches together." },
  { icon: Images, title: "Relive", text: "Replays, photos and blessings stay on the same page for as long as your package runs." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 id="how-heading" className="font-display text-3xl font-semibold text-maroon sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 max-w-xl text-muted">Four simple steps from registration to memories that last.</p>
        </Reveal>

        <div className="relative mt-12">
          <div aria-hidden className="absolute left-0 right-0 top-7 hidden border-t border-dashed border-gold md:block" />
          <Stagger as="ol" gap={0.12} className="relative grid gap-10 md:grid-cols-4">
            {steps.map((s, i) => (
              <StaggerItem as="li" key={s.title} className="relative">
                <span className="relative grid size-14 place-items-center rounded-full border border-gold bg-gold-soft text-maroon">
                  <s.icon className="size-6" aria-hidden />
                  <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-maroon text-[11px] font-semibold text-white">
                    {i + 1}
                  </span>
                </span>
                <h3 className="font-display mt-5 text-2xl text-maroon">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
