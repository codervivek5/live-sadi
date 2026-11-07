"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { blessings, wedding } from "@/lib/data";
import { cn, formatTime } from "@/lib/utils";

const tabs = [
  {
    id: "live",
    title: "Live aur replay",
    text: "Function shuru hote hi live. Khatam hone par wahi recording replay ban jaati hai, kuch upload nahi karna.",
  },
  {
    id: "schedule",
    title: "Schedule aur map",
    text: "Haldi se reception tak har function ka samay, venue, dress code aur Google Map. Samay badla to sabko apne aap dikhega.",
  },
  {
    id: "photos",
    title: "Photos aur videos",
    text: "Aap ki aur mehmaanon ki photos ek album mein. Mehmaan ki photo tabhi dikhti hai jab aap approve karein.",
  },
  {
    id: "blessings",
    title: "Aashirwad",
    text: "Door baithe rishtedaar likh kar shubhkamnayein bhejein. Shaadi ke baad bhi padhne ko rahengi.",
  },
] as const;

type TabId = (typeof tabs)[number]["id"];

const tiles = ["from-rose to-gold-soft", "from-gold-soft to-rose", "from-blush/40 to-rose", "from-rose to-blush/40", "from-gold-soft to-blush/40", "from-blush/40 to-gold-soft"];

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function Screen({ id }: { id: TabId }) {
  if (id === "live")
    return (
      <div>
        <div className="relative aspect-video bg-maroon-dark">
          <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-semibold text-white">
            <span className="live-dot size-1.5 rounded-full bg-white" /> LIVE
          </span>
          <span className="absolute inset-0 grid place-items-center">
            <motion.span
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="grid size-10 place-items-center rounded-full bg-white/90 text-maroon"
            >
              ▶
            </motion.span>
          </span>
        </div>
        <div className="p-4">
          <p className="font-display text-lg text-maroon">Mehndi</p>
          <p className="text-xs text-muted">Rang Mahal Banquet, 184 log dekh rahe hain</p>
        </div>
      </div>
    );

  if (id === "schedule")
    return (
      <motion.ul variants={list} initial="hidden" animate="show" className="space-y-2 p-4">
        {wedding.events.map((e) => (
          <motion.li key={e.id} variants={item} className="flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2 text-xs">
            <span className="text-base">{e.emoji}</span>
            <span className="flex-1 font-medium">{e.name}</span>
            <span className="text-muted">{formatTime(e.start)}</span>
          </motion.li>
        ))}
      </motion.ul>
    );

  if (id === "photos")
    return (
      <motion.div variants={list} initial="hidden" animate="show" className="grid grid-cols-3 gap-1.5 p-4">
        {tiles.map((t, i) => (
          <motion.div key={i} variants={{ hidden: { opacity: 0, scale: 0.7 }, show: { opacity: 1, scale: 1 } }} className={cn("aspect-square rounded-lg bg-gradient-to-br", t)} />
        ))}
        <p className="col-span-3 mt-1 text-center text-[11px] text-muted">3 nayi photos approval ka intezaar kar rahi hain</p>
      </motion.div>
    );

  return (
    <motion.ul variants={list} initial="hidden" animate="show" className="space-y-2 p-4">
      {blessings.slice(0, 3).map((b) => (
        <motion.li key={b.id} variants={item} className="rounded-xl border border-line bg-white p-3 text-xs">
          <p className="leading-snug">“{b.message}”</p>
          <p className="mt-1.5 font-semibold text-maroon">{b.name}, {b.city}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export function FeatureTabs() {
  const [active, setActive] = useState<TabId>("live");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      <div role="tablist" aria-label="Page mein kya kya hai" className="space-y-1">
        {tabs.map((t) => {
          const on = active === t.id;
          return (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls="tab-panel"
              onClick={() => setActive(t.id)}
              className="relative block w-full px-5 py-4 text-left"
            >
              {on && (
                <motion.span
                  layoutId="feature-tab-bg"
                  className="absolute inset-0 rounded-r-xl border-l-4 border-maroon bg-white shadow-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className={cn("font-display relative text-xl transition-colors", on ? "text-maroon" : "text-foreground/70 hover:text-foreground")}>
                {t.title}
              </span>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.span
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="relative block overflow-hidden"
                  >
                    <span className="mt-1 block max-w-md text-sm leading-relaxed text-muted">{t.text}</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      <div className="mx-auto w-full max-w-[16rem]">
        <div id="tab-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`} className="rounded-[2rem] border-[6px] border-maroon-dark bg-background shadow-xl">
          <div className="min-h-[22rem] overflow-hidden rounded-[1.5rem]">
            <p className="border-b border-line bg-white px-4 py-2.5 font-display text-sm text-maroon">Rahul &amp; Priya</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.18 }}
              >
                <Screen id={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
