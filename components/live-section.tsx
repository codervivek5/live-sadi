"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { CalendarPlus, Clock, MapPin, Play, Shirt, Users } from "lucide-react";
import { toast } from "sonner";
import { Countdown } from "./countdown";
import { ease } from "./motion";
import type { WeddingEvent } from "@/lib/data";
import { cn, formatDate, formatTime } from "@/lib/utils";

function StatusBadge({ status }: { status: WeddingEvent["status"] }) {
  if (status === "live")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-0.5 text-[11px] font-semibold text-white">
        <span className="live-dot size-1.5 rounded-full bg-white" /> LIVE
      </span>
    );
  if (status === "ended")
    return <span className="rounded-full bg-line px-2.5 py-0.5 text-[11px] font-medium text-muted">Replay</span>;
  return <span className="rounded-full bg-gold-soft px-2.5 py-0.5 text-[11px] font-medium text-maroon-dark">Aane wala</span>;
}

function Player({ event, poster }: { event: WeddingEvent; poster: string }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-maroon-dark text-white">
      <Image
        src={poster}
        alt=""
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className={cn("object-cover", event.status === "upcoming" ? "opacity-25 blur-sm" : "opacity-60")}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
        <StatusBadge status={event.status} />
      </div>
      {event.status === "live" && (
        <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-0.5 text-[11px] sm:right-4 sm:top-4">
          <Users className="size-3" /> {event.viewers} dekh rahe hain
        </div>
      )}

      {event.status === "upcoming" ? (
        <div className="absolute inset-0 grid place-items-center px-4 text-center">
          <div>
            <p className="font-display text-xl sm:text-2xl">{event.emoji} {event.name} shuru hone mein</p>
            <div className="mt-4"><Countdown target={event.start} /></div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          aria-label={event.status === "live" ? `${event.name} live chalayein` : `${event.name} replay chalayein`}
          className="group absolute inset-0 grid place-items-center"
          onClick={() => toast("Demo: asli video player live streaming phase mein judega.")}
        >
          <span className="relative grid size-16 place-items-center rounded-full bg-white/90 text-maroon shadow-lg transition-transform group-hover:scale-110 group-active:scale-95">
            {event.status === "live" && (
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-white/70"
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <Play className="relative ml-1 size-7" fill="currentColor" />
          </span>
        </button>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-sm sm:p-4">
        <p className="font-display text-lg">{event.name}</p>
        <p className="text-xs text-white/75">{event.venue}</p>
      </div>
    </div>
  );
}

export function LiveSection({ events, poster }: { events: WeddingEvent[]; poster: string }) {
  const firstLive = events.find((e) => e.status === "live") ?? events.find((e) => e.status === "upcoming") ?? events[0];
  const [selectedId, setSelectedId] = useState(firstLive?.id ?? "");
  const selected = events.find((e) => e.id === selectedId) ?? firstLive;

  if (!selected) {
    return <p className="py-10 text-center text-muted">Abhi koi function nahi hai.</p>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease }}
          >
            <Player event={selected} poster={poster} />
            <div className="mt-4 rounded-2xl border border-line bg-white p-4 text-sm">
              <h3 className="font-display text-xl text-maroon">{selected.emoji} {selected.name} <span className="text-muted">· {selected.nameHi}</span></h3>
              <p className="mt-1 text-muted">{selected.description}</p>
              <ul className="mt-3 space-y-1.5 text-muted">
                <li className="flex items-center gap-2"><Clock className="size-4 text-gold" />{formatDate(selected.start, { weekday: "short" })}, {formatTime(selected.start)}</li>
                <li className="flex items-center gap-2">
                  <MapPin className="size-4 text-gold" />
                  {selected.venue} ·{" "}
                  <a className="text-maroon underline" target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected.venue + " " + selected.address)}`}>
                    Map
                  </a>
                </li>
                {selected.dressCode && <li className="flex items-center gap-2"><Shirt className="size-4 text-gold" />Dress code: {selected.dressCode}</li>}
              </ul>
              {selected.status === "upcoming" && (
                <button
                  type="button"
                  onClick={() => toast.success(`${selected.name} calendar mein jod diya (demo)`)}
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-maroon/30 px-4 py-2 text-sm font-medium text-maroon transition-transform hover:bg-rose active:scale-95"
                >
                  <CalendarPlus className="size-4" /> Calendar mein jodein
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <ol className="space-y-2.5 lg:col-span-2" aria-label="Sabhi functions">
        {events.map((e) => {
          const on = e.id === selectedId;
          return (
            <li key={e.id}>
              <button
                type="button"
                onClick={() => setSelectedId(e.id)}
                aria-pressed={on}
                className={cn(
                  "relative flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors",
                  on ? "border-transparent" : "border-line bg-white hover:border-maroon/40",
                )}
              >
                {on && (
                  <motion.span
                    layoutId="event-highlight"
                    className="absolute inset-0 rounded-2xl border border-maroon bg-rose/60"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-gold-soft text-xl">{e.emoji}</span>
                <span className="relative min-w-0 flex-1">
                  <span className="block truncate font-medium">{e.name}</span>
                  <span className="block text-xs text-muted">{formatDate(e.start, { day: "numeric", month: "short" })} · {formatTime(e.start)}</span>
                </span>
                <span className="relative"><StatusBadge status={e.status} /></span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
