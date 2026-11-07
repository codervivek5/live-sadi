import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { testimonials } from "@/lib/data";

/** Renders nothing until real, permissioned testimonials exist in lib/data.ts. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section aria-labelledby="stories-heading" className="mx-auto max-w-6xl px-4 py-20">
      <Reveal>
        <h2 id="stories-heading" className="font-display text-3xl font-semibold text-maroon sm:text-4xl">
          From our families
        </h2>
      </Reveal>
      <Stagger gap={0.1} className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <StaggerItem key={t.id} className="rounded-3xl border border-line bg-white p-6">
            <blockquote className="leading-relaxed">“{t.quote}”</blockquote>
            <p className="mt-4 font-semibold text-maroon">{t.name}</p>
            <p className="text-sm text-muted">{t.detail}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
