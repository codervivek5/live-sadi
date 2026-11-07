"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import type { MediaItem, WeddingEvent } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Gallery({ items, events }: { items: MediaItem[]; events: WeddingEvent[] }) {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<number | null>(null);
  const [dir, setDir] = useState(1);

  const shown = items.filter((m) => m.status === "approved" && (filter === "all" || m.eventId === filter));
  const tabs = [{ id: "all", name: "Sab" }, ...events.filter((e) => items.some((m) => m.eventId === e.id)).map((e) => ({ id: e.id, name: e.name }))];

  const step = useCallback(
    (d: number) => {
      if (shown.length === 0) return;
      setDir(d);
      setOpen((i) => (i === null ? i : (i + d + shown.length) % shown.length));
    },
    [shown.length],
  );

  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  const current = open !== null && open >= 0 && open < shown.length ? shown[open] : null;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setFilter(t.id);
              setOpen(null);
            }}
            className={cn(
              "relative rounded-full border px-4 py-1.5 text-sm transition-colors",
              filter === t.id ? "border-transparent text-white" : "border-line bg-white text-muted hover:border-maroon/40",
            )}
          >
            {filter === t.id && (
              <motion.span layoutId="gallery-pill" className="absolute inset-0 rounded-full bg-maroon" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
            )}
            <span className="relative">{t.name}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="mt-5 columns-2 gap-3 sm:columns-3 lg:columns-4">
        <AnimatePresence mode="popLayout">
          {shown.map((m, i) => (
            <motion.button
              key={m.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
              type="button"
              onClick={() => {
                setDir(1);
                setOpen(i);
              }}
              className="group relative mb-3 block w-full overflow-hidden rounded-xl bg-gold-soft"
              aria-label={`${m.caption} kholein`}
            >
              <Image
                src={m.src}
                alt={m.caption}
                width={m.width}
                height={m.height}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
              />
              {m.type === "video" && (
                <span className="absolute inset-0 grid place-items-center bg-black/25">
                  <span className="grid size-11 place-items-center rounded-full bg-white/90 text-maroon"><Play className="ml-0.5 size-5" fill="currentColor" /></span>
                </span>
              )}
              <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/60 to-transparent p-2 text-left text-xs text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                {m.caption}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      {shown.length === 0 && <p className="py-10 text-center text-muted">Abhi koi photo nahi hai.</p>}

      <AnimatePresence>
        {current && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-black/90 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            onClick={() => setOpen(null)}
          >
            <button type="button" className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" onClick={() => setOpen(null)} aria-label="Band karein">
              <X className="size-5" />
            </button>
            <button type="button" className="absolute left-3 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Pichhli">
              <ChevronLeft className="size-6" />
            </button>
            <button type="button" className="absolute right-3 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Agli">
              <ChevronRight className="size-6" />
            </button>

            <AnimatePresence mode="popLayout" custom={dir} initial={false}>
              <motion.figure
                key={current.id}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 80, scale: 0.96 }),
                  center: { opacity: 1, x: 0, scale: 1 },
                  exit: (d: number) => ({ opacity: 0, x: d * -80, scale: 0.96 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) step(1);
                  else if (info.offset.x > 80) step(-1);
                }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-3xl text-center text-white"
              >
                <Image
                  src={current.src}
                  alt={current.caption}
                  width={current.width}
                  height={current.height}
                  sizes="(min-width: 768px) 48rem, 100vw"
                  draggable={false}
                  className="mx-auto max-h-[78vh] w-auto rounded-lg object-contain"
                />
                <figcaption className="mt-3 text-sm">
                  {current.caption} <span className="text-white/60">· {current.by}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
