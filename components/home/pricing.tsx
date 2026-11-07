import { Check } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { packages } from "@/lib/data";
import { cn, inr } from "@/lib/utils";

export function Pricing({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const H = `h${headingLevel}` as "h1" | "h2";
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <H id="pricing-heading" className="font-display text-3xl font-semibold text-maroon sm:text-4xl">
            One payment, the whole wedding
          </H>
          <p className="mt-3 max-w-xl text-muted">Prices include GST. No hidden charges.</p>
        </Reveal>
        <Stagger gap={0.12} className="mt-10 grid gap-5 md:grid-cols-3">
          {packages.map((p) => (
            <StaggerItem
              key={p.id}
              className={cn(
                "relative flex flex-col rounded-3xl border p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-xl",
                p.popular ? "border-maroon bg-maroon-dark text-white" : "border-line bg-white",
              )}
            >
              {p.popular && (
                <span className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-0.5 text-xs font-semibold text-maroon-dark">
                  Recommended
                </span>
              )}
              <h3 className="font-display text-2xl">{p.name}</h3>
              <p className={cn("text-sm", p.popular ? "text-white/75" : "text-muted")}>{p.tagline}</p>
              <p className="mt-4 text-3xl font-semibold">{inr(p.price)}</p>
              <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden /> {f}
                  </li>
                ))}
              </ul>
              <ButtonLink href={`/register?package=${p.id}`} variant={p.popular ? "gold" : "outline"} className="mt-6">
                Choose {p.name}
              </ButtonLink>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
