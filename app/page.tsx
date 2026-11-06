import Link from "next/link";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { FeatureTabs } from "@/components/feature-tabs";
import { InviteCard } from "@/components/invite-card";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { packages } from "@/lib/data";
import { cn, inr } from "@/lib/utils";

// Pheras at 8:00 PM IST on 8 Nov 2026 = 14:30 UTC. Fixed instant, so this renders the same every time.
const PHERAS = new Date("2026-11-08T14:30:00Z");

const cities = [
  { name: "Sydney", zone: "Australia/Sydney", note: "raat ke dedh baje, alarm laga kar" },
  { name: "Toronto", zone: "America/Toronto", note: "subah, chai ke saath" },
  { name: "London", zone: "Europe/London", note: "dopahar, lunch ke baad" },
  { name: "Dubai", zone: "Asia/Dubai", note: "shaam, office se nikalte hue" },
  { name: "Jaipur", zone: "Asia/Kolkata", note: "mandap mein, pheron ke liye" },
] as const;

function localTime(zone: string) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: zone,
  }).format(PHERAS);
}

const steps = [
  {
    title: "Register karein",
    text: "Jodi ke naam, functions ki date aur venue bharein. Paanch minute lagte hain.",
  },
  {
    title: "Payment karein, QR payein",
    text: "Turant aapka QR aur link ready. Card par chhapwayein ya WhatsApp par bhejein.",
  },
  {
    title: "Videographer ko stream key dein",
    text: "Wo OBS ya Larix se live karega. Hum ek page ki guide dete hain, kuch install karwana nahi padta.",
  },
  {
    title: "Mehmaan scan karein",
    text: "Koi app nahi, koi login nahi. Browser mein page khulta hai aur live shuru.",
  },
];

const faqs = [
  {
    q: "Mehmaanon ko app download karni padegi?",
    a: "Nahi. QR scan karte hi ya link kholte hi page browser mein chalta hai, phone ho ya laptop.",
  },
  {
    q: "Live kaun karega?",
    a: "Aapka videographer. Hum stream key aur ek page ki guide dete hain. Pehle 5 minute test karna behtar rehta hai.",
  },
  {
    q: "Venue par net kharab ho to?",
    a: "Live ki quality net par nirbhar karti hai, isliye videographer ko achhe 4G/5G ya alag net se stream karne ko kahein. Live ke baad poori recording replay mein mil jaati hai.",
  },
  {
    q: "Ek saath kitne log dekh sakte hain?",
    a: "Standard mein 500 tak, Premium mein 2000 tak. Photos aur schedule dekhne walon ki koi limit nahi.",
  },
  {
    q: "Shaadi ke baad page kitne din rahega?",
    a: "Package ke hisaab se 1 saal, 3 saal ya hamesha. Khatam hone se pehle aapko reminder milega aur aap sab kuch download kar sakenge.",
  },
  {
    q: "Kya link ya QR kisi aur ke paas pahunch sakta hai?",
    a: "Jiske paas link hai wahi dekh sakta hai. Premium mein PIN laga sakte hain, kisi function ko chhupa sakte hain, aur QR kabhi bhi badal sakte hain.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-maroon-dark text-white">
          <div className="pattern-dots absolute inset-0 opacity-25" aria-hidden />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-16 md:grid-cols-[1.15fr_1fr] md:py-24">
            <div>
              <h1 className="font-display text-4xl font-semibold leading-[1.15] sm:text-5xl lg:text-6xl">
                Jo shaadi mein nahi aa paaye, unke phone par shaadi pahunch jaaye
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">
                Invitation card par ek QR chhapwayein. Scan karte hi haldi se vidaai tak ka live video, schedule aur
                photos dikhte hain. Shaadi ke baad bhi wahi link chalta hai.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/register" variant="gold" className="px-6 py-3 text-base">
                  Shaadi register karein
                </ButtonLink>
                <Link
                  href="/w/rahul-weds-priya"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-base font-medium text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  Demo page dekhein
                </Link>
              </div>
              <p className="mt-5 text-sm text-white/60">Mehmaan ke liye koi app nahi, koi login nahi.</p>
            </div>

            <div className="pb-6">
              <InviteCard path="/w/rahul-weds-priya" />
            </div>
          </div>
        </section>

        {/* Same pheras, different clocks */}
        <section className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="font-display max-w-2xl text-3xl font-semibold leading-snug text-maroon sm:text-4xl">
            Jaipur mein raat ke 8 baje pheras. Toronto mein subah ke saadhe 9.
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Aapke rishtedaar duniya bhar mein hain. Sabke liye ek hi link, apne apne samay par live ya replay.
          </p>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {cities.map((c) => (
              <li
                key={c.name}
                className={cn(
                  "grid grid-cols-[6rem_1fr] items-baseline gap-x-6 gap-y-1 py-4 sm:grid-cols-[8rem_9rem_1fr]",
                  c.name === "Jaipur" && "bg-gold-soft/60",
                )}
              >
                <span className="font-medium">{c.name}</span>
                <span className="font-display text-2xl text-maroon tabular-nums">{localTime(c.zone)}</span>
                <span className="col-span-2 text-sm text-muted sm:col-span-1">{c.note}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What's inside */}
        <section id="features" className="scroll-mt-20 bg-gold-soft/50 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-display max-w-xl text-3xl font-semibold text-maroon sm:text-4xl">
              Ek QR ke andar poori shaadi
            </h2>
            <div className="mt-10">
              <FeatureTabs />
            </div>
          </div>
        </section>

        {/* How it works: a real sequence */}
        <section id="kaise-kaam-karta-hai" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
          <h2 className="font-display text-3xl font-semibold text-maroon sm:text-4xl">Kaise kaam karta hai</h2>
          <ol className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span className="font-display text-5xl leading-none text-gold" aria-hidden>
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1.5 max-w-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-20 bg-white py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-display text-3xl font-semibold text-maroon sm:text-4xl">Ek baar payment, poori shaadi</h2>
            <p className="mt-3 max-w-xl text-muted">GST sahit daam. Koi chhupa kharcha nahi.</p>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {packages.map((p) => (
                <div
                  key={p.id}
                  className={cn(
                    "relative flex flex-col rounded-2xl border p-6",
                    p.popular ? "border-maroon bg-maroon-dark text-white" : "border-line bg-background",
                  )}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-0.5 text-xs font-semibold text-maroon-dark">
                      Zyada tar log yahi lete hain
                    </span>
                  )}
                  <h3 className="font-display text-2xl">{p.name}</h3>
                  <p className={cn("text-sm", p.popular ? "text-white/70" : "text-muted")}>{p.tagline}</p>
                  <p className="mt-4 text-3xl font-semibold">{inr(p.price)}</p>
                  <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-gold" /> {f}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink
                    href={`/register?package=${p.id}`}
                    variant={p.popular ? "gold" : "outline"}
                    className="mt-6"
                  >
                    {p.name} chunein
                  </ButtonLink>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-20">
          <h2 className="font-display text-3xl font-semibold text-maroon sm:text-4xl">Aksar pooche jaane wale sawal</h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="text-xl text-gold transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-xl leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Closing */}
        <section className="bg-maroon-dark py-16 text-center text-white">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Card chhapne se pehle QR bana lein</h2>
            <p className="mt-3 text-white/75">Register karne ke baad QR turant mil jaata hai, printer ko dene ke liye.</p>
            <ButtonLink href="/register" variant="gold" className="mt-7 px-6 py-3 text-base">
              Shaadi register karein
            </ButtonLink>
            <p className="mt-4 text-sm text-white/60">
              Pehle dekhna hai?{" "}
              <Link href="/w/rahul-weds-priya" className="underline underline-offset-4">
                Demo wedding page kholein
              </Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
