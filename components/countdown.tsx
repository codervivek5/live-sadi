"use client";

import { useEffect, useState } from "react";

function parts(target: number, now: number) {
  const diff = Math.max(0, target - now);
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor((diff / 3_600_000) % 24),
    m: Math.floor((diff / 60_000) % 60),
    s: Math.floor((diff / 1000) % 60),
    done: diff === 0,
  };
}

export function Countdown({ target, tone = "dark" }: { target: string; tone?: "dark" | "light" }) {
  // null until mounted so server and client markup match
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const p = now === null ? null : parts(new Date(target).getTime(), now);
  const box =
    tone === "dark"
      ? "bg-white/10 text-white border-white/20"
      : "bg-white text-maroon border-line";

  if (p?.done) {
    return <p className="font-display text-xl">Shubh ghadi aa gayi 🎉</p>;
  }

  return (
    <div className="flex justify-center gap-2.5 sm:gap-4" role="timer" aria-label="Countdown">
      {(
        [
          ["Din", p?.d],
          ["Ghante", p?.h],
          ["Minute", p?.m],
          ["Second", p?.s],
        ] as const
      ).map(([label, v]) => (
        <div key={label} className={`w-[4.25rem] rounded-xl border py-2.5 text-center backdrop-blur sm:w-20 ${box}`}>
          <div className="font-display text-2xl font-semibold tabular-nums sm:text-3xl">
            {v === undefined ? "--" : String(v).padStart(2, "0")}
          </div>
          <div className="text-[10px] uppercase tracking-wider opacity-80">{label}</div>
        </div>
      ))}
    </div>
  );
}
