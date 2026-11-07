import type { Metadata } from "next";
import { MapPin, Plus } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion";
import { wedding } from "@/lib/data";
import { formatDate, formatTime } from "@/lib/utils";

export const metadata: Metadata = { title: "Functions" };

export default function EventsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-maroon">Functions</h1>
        <button type="button" disabled className="inline-flex items-center gap-2 rounded-full bg-maroon px-4 py-2 text-sm font-medium text-white opacity-60" title="Backend ke baad">
          <Plus className="size-4" /> Function jodein
        </button>
      </div>
      <Stagger as="ul" className="space-y-3" gap={0.07}>
        {wedding.events.map((e) => (
          <StaggerItem as="li" key={e.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-white p-4 transition-shadow hover:shadow-md">
            <span className="grid size-12 place-items-center rounded-xl bg-gold-soft text-2xl">{e.emoji}</span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{e.name} <span className="text-muted">· {e.nameHi}</span></p>
              <p className="text-sm text-muted">{formatDate(e.start, { weekday: "short" })} · {formatTime(e.start)}</p>
              <p className="mt-0.5 flex items-center gap-1 text-sm text-muted"><MapPin className="size-3.5" /> {e.venue}</p>
            </div>
            <span
              className={
                e.status === "live"
                  ? "rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white"
                  : e.status === "ended"
                    ? "rounded-full bg-line px-3 py-1 text-xs text-muted"
                    : "rounded-full bg-gold-soft px-3 py-1 text-xs text-maroon-dark"
              }
            >
              {e.status === "live" ? "LIVE" : e.status === "ended" ? "Khatam" : "Aane wala"}
            </span>
          </StaggerItem>
        ))}
      </Stagger>
      <p className="text-xs text-muted">Edit aur add ka option backend judne ke baad chalu hoga.</p>
    </div>
  );
}
