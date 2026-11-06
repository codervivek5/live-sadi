"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import type { MediaItem, WeddingEvent } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Gallery({ items, events }: { items: MediaItem[]; events: WeddingEvent[] }) {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<number | null>(null);

  const shown = items.filter((m) => m.status === "approved" && (filter === "all" || m.eventId === filter));
  const tabs = [{ id: "all", name: "Sab" }, ...events.filter((e) => items.some((m) => m.eventId === e.id)).map((e) => ({ id: e.id, name: e.name }))];

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + shown.length) % shown.length)),
    [shown.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const current = open !== null ? shown[open] : null;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setFilter(t.id)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm",
              filter === t.id ? "border-maroon bg-maroon text-white" : "border-line bg-white text-muted hover:border-maroon/40",
            )}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="mt-5 columns-2 gap-3 sm:columns-3 lg:columns-4">
        {shown.map((m, i) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative mb-3 block w-full overflow-hidden rounded-xl bg-gold-soft"
            aria-label={`${m.caption} kholein`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.src} alt={m.caption} loading="lazy" className="w-full transition-transform duration-300 group-hover:scale-105" />
            {m.type === "video" && (
              <span className="absolute inset-0 grid place-items-center bg-black/25">
                <span className="grid size-11 place-items-center rounded-full bg-white/90 text-maroon"><Play className="ml-0.5 size-5" fill="currentColor" /></span>
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {m.caption}
            </span>
          </button>
        ))}
      </div>
      {shown.length === 0 && <p className="py-10 text-center text-muted">Abhi koi photo nahi hai.</p>}

      {current && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={current.caption}>
          <button type="button" className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" onClick={() => setOpen(null)} aria-label="Band karein">
            <X className="size-5" />
          </button>
          <button type="button" className="absolute left-3 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" onClick={() => step(-1)} aria-label="Pichhli">
            <ChevronLeft className="size-6" />
          </button>
          <button type="button" className="absolute right-3 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" onClick={() => step(1)} aria-label="Agli">
            <ChevronRight className="size-6" />
          </button>
          <figure className="max-h-full max-w-3xl text-center text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.src} alt={current.caption} className="mx-auto max-h-[78vh] rounded-lg object-contain" />
            <figcaption className="mt-3 text-sm">
              {current.caption} <span className="text-white/60">· {current.by}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
