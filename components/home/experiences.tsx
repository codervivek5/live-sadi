import { FeatureTabs } from "@/components/feature-tabs";
import { Reveal } from "@/components/motion";

export function Experiences() {
  return (
    <section id="features" aria-labelledby="exp-heading" className="scroll-mt-20 bg-gold-soft/50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 id="exp-heading" className="font-display max-w-xl text-3xl font-semibold text-maroon sm:text-4xl">
            One link, the whole wedding
          </h2>
          <p className="mt-3 max-w-xl text-muted">Live, schedule, photos and blessings. Tap through what your guests will see.</p>
        </Reveal>
        <Reveal className="mt-10" delay={0.1}>
          <FeatureTabs />
        </Reveal>
      </div>
    </section>
  );
}
