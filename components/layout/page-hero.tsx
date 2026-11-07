import { Breadcrumbs, type Crumb } from "./breadcrumbs";

/** Shared header for inner pages: breadcrumbs, one h1 and a short intro. */
export function PageHero({ crumbs, title, intro }: { crumbs: Crumb[]; title: string; intro: string }) {
  return (
    <section className="border-b border-line bg-gold-soft/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <Breadcrumbs items={crumbs} />
        <h1 className="font-display mt-6 max-w-3xl text-4xl font-semibold leading-tight text-maroon sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
      </div>
    </section>
  );
}
