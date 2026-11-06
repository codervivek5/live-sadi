"use client";

import { useState } from "react";
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

const tiles = ["from-rose to-gold-soft", "from-gold-soft to-rose", "from-[#f3d9c4] to-rose", "from-rose to-[#f3d9c4]", "from-gold-soft to-[#f3d9c4]", "from-[#f3d9c4] to-gold-soft"];

function Screen({ id }: { id: (typeof tabs)[number]["id"] }) {
  if (id === "live")
    return (
      <div>
        <div className="relative aspect-video bg-maroon-dark">
          <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-semibold text-white">
            <span className="live-dot size-1.5 rounded-full bg-white" /> LIVE
          </span>
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-10 place-items-center rounded-full bg-white/90 text-maroon">▶</span>
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
      <ul className="space-y-2 p-4">
        {wedding.events.map((e) => (
          <li key={e.id} className="flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2 text-xs">
            <span className="text-base">{e.emoji}</span>
            <span className="flex-1 font-medium">{e.name}</span>
            <span className="text-muted">{formatTime(e.start)}</span>
          </li>
        ))}
      </ul>
    );

  if (id === "photos")
    return (
      <div className="grid grid-cols-3 gap-1.5 p-4">
        {tiles.map((t, i) => (
          <div key={i} className={cn("aspect-square rounded-lg bg-gradient-to-br", t)} />
        ))}
        <p className="col-span-3 mt-1 text-center text-[11px] text-muted">3 nayi photos approval ka intezaar kar rahi hain</p>
      </div>
    );

  return (
    <ul className="space-y-2 p-4">
      {blessings.slice(0, 3).map((b) => (
        <li key={b.id} className="rounded-xl border border-line bg-white p-3 text-xs">
          <p className="leading-snug">“{b.message}”</p>
          <p className="mt-1.5 font-semibold text-maroon">{b.name}, {b.city}</p>
        </li>
      ))}
    </ul>
  );
}

export function FeatureTabs() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("live");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      <div role="tablist" aria-label="Page mein kya kya hai" className="space-y-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            role="tab"
            type="button"
            aria-selected={active === t.id}
            aria-controls="tab-panel"
            onClick={() => setActive(t.id)}
            className={cn(
              "block w-full border-l-4 px-5 py-4 text-left transition-colors",
              active === t.id ? "border-maroon bg-white" : "border-transparent hover:bg-white/60",
            )}
          >
            <span className={cn("font-display text-xl", active === t.id ? "text-maroon" : "text-foreground")}>{t.title}</span>
            {active === t.id && <span className="mt-1 block max-w-md text-sm leading-relaxed text-muted">{t.text}</span>}
          </button>
        ))}
      </div>

      <div className="mx-auto w-full max-w-[16rem]">
        <div id="tab-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`} className="rounded-[2rem] border-[6px] border-maroon-dark bg-background shadow-xl">
          <div className="min-h-[22rem] overflow-hidden rounded-[1.5rem]">
            <p className="border-b border-line bg-white px-4 py-2.5 font-display text-sm text-maroon">Rahul &amp; Priya</p>
            <Screen id={active} />
          </div>
        </div>
      </div>
    </div>
  );
}
