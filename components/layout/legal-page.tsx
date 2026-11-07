import { JsonLd } from "@/components/seo/json-ld";
import { webPageJsonLd } from "@/lib/seo";
import { PageHero } from "./page-hero";

export type LegalSection = { heading: string; body: (string | string[])[] };

/** Renders a long-form legal document: text paragraphs, and string arrays as bullet lists. */
export function LegalPage({
  title,
  intro,
  path,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  path: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: title, description: intro, path })} />
      <PageHero crumbs={[{ name: title, path }]} title={title} intro={intro} />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-sm text-muted">Last updated: {updated}</p>
        <div className="mt-8 space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-2xl font-semibold text-maroon">{s.heading}</h2>
              <div className="mt-3 space-y-3 leading-relaxed">
                {s.body.map((b, i) =>
                  Array.isArray(b) ? (
                    <ul key={i} className="list-disc space-y-1.5 pl-5 marker:text-gold">
                      {b.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i}>{b}</p>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
