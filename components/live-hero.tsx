"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Eye } from "lucide-react";
import { blessings } from "@/lib/data";
import { ease } from "./motion";

const reactions = ["💛", "🌸", "✨", "🎉", "🙏", "🌼"];

// strands of marigolds hanging from the mandap roof
const garlands = [96, 122, 178, 204].map((x, i) => ({
  x,
  beads: Array.from({ length: 5 + (i % 2) * 2 }, (_, j) => 156 + j * 9),
}));

function Scene() {
  return (
    <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
      <defs>
        <linearGradient id="lh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c060e" />
          <stop offset="0.55" stopColor="#6d1a28" />
          <stop offset="1" stopColor="#d9822b" />
        </linearGradient>
        <radialGradient id="lh-glow" cx="0.5" cy="0.74" r="0.55">
          <stop offset="0" stopColor="#ffd37a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffd37a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lh-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6c26a" />
          <stop offset="1" stopColor="#a8772a" />
        </linearGradient>
      </defs>
      <rect width="300" height="400" fill="url(#lh-sky)" />
      <rect width="300" height="400" fill="url(#lh-glow)" />

      {/* twinkling lights */}
      {[
        [40, 80],
        [255, 60],
        [70, 30],
        [230, 120],
        [150, 40],
        [20, 150],
        [280, 170],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="1.6"
          fill="#ffe7a8"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      {/* mandap */}
      <path d="M62 150 L150 100 L238 150 Z" fill="url(#lh-gold)" />
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={74 + i * 19} cy={150} r="9.5" fill="#d9b04e" />
      ))}
      <circle cx="150" cy="95" r="4.5" fill="#ffe08a" />
      {[84, 120, 174, 210].map((x, i) => (
        <rect key={x} x={x} y="156" width={i === 0 || i === 3 ? 8 : 6} height="146" fill="#cf9f42" opacity={i === 0 || i === 3 ? 1 : 0.7} />
      ))}
      <rect x="58" y="300" width="184" height="14" rx="3" fill="#7d4f1a" />

      {/* marigold garlands */}
      {garlands.map((g) => (
        <g key={g.x}>
          <line x1={g.x} y1="156" x2={g.x} y2={g.beads[g.beads.length - 1]} stroke="#7a4a10" strokeWidth="0.8" />
          {g.beads.map((y) => (
            <circle key={y} cx={g.x} cy={y} r="3.6" fill={y % 2 ? "#f5a623" : "#ff8a00"} />
          ))}
        </g>
      ))}

      {/* the couple */}
      <g fill="#14050b">
        <circle cx="128" cy="244" r="9" />
        <rect x="115" y="254" width="26" height="48" rx="11" />
        <circle cx="172" cy="248" r="8.5" />
        <rect x="160" y="257" width="25" height="45" rx="11" />
      </g>
      <path d="M163 242 q9 -12 18 0 l5 40 h-28 z" fill="#b0132f" opacity="0.9" />

      {/* sacred fire */}
      <rect x="132" y="290" width="36" height="12" rx="2" fill="#4a1018" stroke="#d9b04e" strokeWidth="1" />
      <motion.path
        d="M150 262 C139 276 141 290 150 290 C159 290 161 276 150 262 Z"
        fill="#ff9d2e"
        style={{ transformOrigin: "50% 100%", transformBox: "fill-box" }}
        animate={{ scaleY: [1, 1.18, 0.94, 1.1, 1], scaleX: [1, 0.92, 1.05, 0.96, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M150 274 C145 282 146 290 150 290 C154 290 155 282 150 274 Z"
        fill="#ffe39b"
        style={{ transformOrigin: "50% 100%", transformBox: "fill-box" }}
        animate={{ scaleY: [1, 1.25, 0.9, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

type Floater = { id: number; x: number; emoji: string };

export function LiveHero() {
  const reduce = useReducedMotion();
  const [viewers, setViewers] = useState(1248);
  const [floaters, setFloaters] = useState<Floater[]>([]);
  const [msgIndex, setMsgIndex] = useState(0);
  const nextId = useRef(0);

  // viewer count creeps up like a real stream
  useEffect(() => {
    const id = setInterval(() => setViewers((v) => v + 1 + Math.floor(Math.random() * 4)), 2200);
    return () => clearInterval(id);
  }, []);

  // reactions float up from the bottom right
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      const f: Floater = {
        id: nextId.current++,
        x: 8 + Math.random() * 38,
        emoji: reactions[Math.floor(Math.random() * reactions.length)],
      };
      setFloaters((prev) => [...prev.slice(-7), f]);
      setTimeout(() => setFloaters((prev) => prev.filter((p) => p.id !== f.id)), 3200);
    }, 650);
    return () => clearInterval(id);
  }, [reduce]);

  // blessings arrive one by one
  useEffect(() => {
    if (blessings.length <= 1) return;
    const id = setInterval(() => setMsgIndex((i) => (i + 1) % blessings.length), 3200);
    return () => clearInterval(id);
  }, []);

  const msg = blessings[msgIndex];

  return (
    <div className="relative mx-auto w-full max-w-[20rem]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease }}
      >
        {/* arch window with gold frame */}
        <div className="rounded-t-[10rem] rounded-b-2xl border-2 border-gold bg-maroon-dark p-1.5 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)]">
          <div className="relative aspect-[3/4.1] overflow-hidden rounded-t-[9.5rem] rounded-b-xl">
            <Scene />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/75 to-transparent" />

            <div className="absolute inset-x-0 top-5 flex items-center justify-center gap-2 text-white">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-0.5 text-[11px] font-semibold">
                <span className="live-dot size-1.5 rounded-full bg-white" /> LIVE
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-0.5 text-[11px] tabular-nums backdrop-blur">
                <Eye className="size-3" /> {viewers.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 px-5 pb-4 text-center text-white">
              <p className="font-display text-2xl font-semibold leading-none">
                Rahul <span className="text-gold">&amp;</span> Priya
              </p>
              <p className="mt-1.5 text-[11px] text-white/80">Saat phere, Royal Lawns, Jaipur</p>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/25">
                <motion.div
                  className="h-full rounded-full bg-red-500"
                  initial={{ width: "8%" }}
                  animate={{ width: "72%" }}
                  transition={{ duration: 6, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* floating reactions */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2" aria-hidden>
              <AnimatePresence>
                {floaters.map((f) => (
                  <motion.span
                    key={f.id}
                    initial={{ y: 0, opacity: 0, scale: 0.6 }}
                    animate={{ y: -230, opacity: [0, 1, 1, 0], scale: 1.1, x: [0, 10, -8, 6] }}
                    transition={{ duration: 3.1, ease: "easeOut" }}
                    style={{ right: `${f.x}%` }}
                    className="absolute bottom-24 text-xl"
                  >
                    {f.emoji}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      <p className="mt-5 text-center text-xs text-white/60">Demo preview of a Live Shadi wedding page</p>

      {/* live blessings feed */}
      {msg && (
        <div className="absolute -left-4 top-32 w-56 sm:-left-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -16, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease }}
              className="flex items-start gap-2.5 rounded-2xl bg-white p-3 shadow-xl"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold-soft text-sm font-semibold text-maroon">
                {msg.name[0] ?? "💛"}
              </span>
              <span className="min-w-0 text-xs leading-snug text-maroon-dark">
                <span className="block font-semibold">{msg.name}, {msg.city}</span>
                <span className="line-clamp-2 text-muted">{msg.message}</span>
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* where people are watching from */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
        transition={{ opacity: { delay: 1.2 }, scale: { type: "spring", delay: 1.2 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 } }}
        className="absolute -right-3 top-24 rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-maroon-dark shadow-lg sm:-right-10"
      >
        Toronto, Dubai, London se bhi
      </motion.div>
    </div>
  );
}
