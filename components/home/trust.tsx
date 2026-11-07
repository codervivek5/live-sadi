import { EyeOff, Lock, RefreshCw, ShieldCheck } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const items = [
  {
    icon: Lock,
    title: "PIN-protected pages",
    text: "Add a PIN so only the people you share it with can watch (Premium).",
  },
  {
    icon: ShieldCheck,
    title: "You approve every upload",
    text: "Guest photos and videos appear on your page only after you say yes.",
  },
  {
    icon: RefreshCw,
    title: "Replace your link anytime",
    text: "If a link travels too far, create a new one. The old one stops working.",
  },
  {
    icon: EyeOff,
    title: "Choose who sees what",
    text: "Keep the haldi for family and share the reception with everyone.",
  },
];

export function Trust() {
  return (
    <section aria-labelledby="trust-heading" className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <h2 id="trust-heading" className="font-display text-3xl font-semibold leading-snug text-maroon sm:text-4xl">
            Your celebration, your control.
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted">
            A wedding is personal. Live Shadi is built so the family decides who watches, who contributes and for
            how long.
          </p>
          <p className="mt-4 max-w-md rounded-2xl bg-gold-soft px-4 py-3 text-sm leading-relaxed text-maroon-dark">
            Live Shadi is new, so you will not find made-up numbers or reviews here. Real stories will appear as
            families choose to share them.
          </p>
        </Reveal>

        <Stagger as="ul" gap={0.08} className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {items.map((it) => (
            <StaggerItem as="li" key={it.title} className="border-t border-gold/50 pt-5">
              <it.icon className="size-6 text-maroon" aria-hidden />
              <h3 className="mt-3 font-semibold">{it.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{it.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
