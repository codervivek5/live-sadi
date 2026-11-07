import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

// Pheras at 8:00 PM IST on 8 Nov 2026 = 14:30 UTC. A fixed instant, so this renders identically every time.
const PHERAS = new Date("2026-11-08T14:30:00Z");

const cities = [
  { name: "Sydney", zone: "Australia/Sydney", note: "raat ke dedh baje, alarm laga kar" },
  { name: "Toronto", zone: "America/Toronto", note: "subah, chai ke saath" },
  { name: "London", zone: "Europe/London", note: "dopahar, lunch ke baad" },
  { name: "Dubai", zone: "Asia/Dubai", note: "shaam, office se nikalte hue" },
  { name: "Jaipur", zone: "Asia/Kolkata", note: "mandap mein, pheron ke liye" },
] as const;

function localTime(zone: string) {
  return new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: zone }).format(PHERAS);
}

export function Timezones() {
  return (
    <section aria-labelledby="tz-heading" className="mx-auto max-w-6xl px-4 py-20">
      <Reveal>
        <h2 id="tz-heading" className="font-display max-w-2xl text-3xl font-semibold leading-snug text-maroon sm:text-4xl">
          Jaipur mein raat ke 8 baje pheras. Toronto mein subah ke saadhe 9.
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          Aapke rishtedaar duniya bhar mein hain. Sabke liye ek hi link, apne apne samay par live ya replay. Neeche
          ek example wedding ka samay hai.
        </p>
      </Reveal>

      <Stagger as="ul" gap={0.1} className="mt-10 divide-y divide-line border-y border-line">
        {cities.map((c) => (
          <StaggerItem
            as="li"
            key={c.name}
            className={cn(
              "grid grid-cols-[6rem_1fr] items-baseline gap-x-6 gap-y-1 px-2 py-4 sm:grid-cols-[8rem_9rem_1fr]",
              c.name === "Jaipur" && "bg-gold-soft/70",
            )}
          >
            <span className="font-medium">{c.name}</span>
            <span className="font-display text-2xl tabular-nums text-maroon">{localTime(c.zone)}</span>
            <span className="col-span-2 text-sm text-muted sm:col-span-1">{c.note}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
