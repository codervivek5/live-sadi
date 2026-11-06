"use client";

import { useState } from "react";
import { Check, Copy, Eye, EyeOff, Radio } from "lucide-react";
import { Button } from "./button";
import type { WeddingEvent } from "@/lib/data";

const RTMP = "rtmps://global-live.example.com:443/app";
const KEY = "sk_live_demo_8f3a1c9d27b4";

function CopyRow({ label, value, secret }: { label: string; value: string; secret?: boolean }) {
  const [show, setShow] = useState(!secret);
  const [done, setDone] = useState(false);
  return (
    <div>
      <p className="text-xs font-medium text-muted">{label}</p>
      <div className="mt-1 flex items-center gap-2 rounded-xl border border-line bg-background px-3 py-2 font-mono text-xs">
        <span className="min-w-0 flex-1 truncate">{show ? value : "•".repeat(24)}</span>
        {secret && (
          <button type="button" aria-label={show ? "Chhupayein" : "Dikhayein"} onClick={() => setShow((s) => !s)} className="text-muted hover:text-maroon">
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
        <button
          type="button"
          aria-label={`${label} copy`}
          className="text-muted hover:text-maroon"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(value);
              setDone(true);
              setTimeout(() => setDone(false), 1500);
            } catch {
              /* ignore */
            }
          }}
        >
          {done ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
    </div>
  );
}

export function LiveControl({ events }: { events: WeddingEvent[] }) {
  const [liveId, setLiveId] = useState<string | null>(events.find((e) => e.status === "live")?.id ?? null);
  const [selected, setSelected] = useState(liveId ?? events.find((e) => e.status === "upcoming")?.id ?? events[0].id);
  const isLive = liveId === selected;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-line bg-white p-5">
        <label className="text-sm font-medium" htmlFor="ev">Kaunsa function?</label>
        <select
          id="ev"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-maroon"
        >
          {events.map((e) => (
            <option key={e.id} value={e.id}>{e.emoji} {e.name}</option>
          ))}
        </select>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gold-soft p-4">
          <div className="flex items-center gap-2 text-sm">
            <Radio className={isLive ? "size-5 text-red-600" : "size-5 text-muted"} />
            {isLive ? <span className="font-semibold text-red-600">LIVE chal raha hai · 184 viewers</span> : <span className="text-muted">Stream band hai</span>}
          </div>
          <Button variant={isLive ? "outline" : "primary"} onClick={() => setLiveId(isLive ? null : selected)}>
            {isLive ? "Live band karein" : "Go live"}
          </Button>
        </div>
      </div>

      <div className="space-y-3 rounded-2xl border border-line bg-white p-5">
        <h2 className="font-semibold">Videographer ke liye stream settings</h2>
        <p className="text-sm text-muted">Ye details OBS ya Larix Broadcaster app mein daalni hain. Ye sirf demo values hain.</p>
        <CopyRow label="Server URL" value={RTMP} />
        <CopyRow label="Stream key" value={KEY} secret />
        <ol className="list-decimal space-y-1 pl-5 pt-1 text-sm text-muted">
          <li>Phone/camera par Larix ya OBS kholein.</li>
          <li>Server URL aur Stream key daalein.</li>
          <li>Pehle 5 minute test karein, phir “Go live” dabayein.</li>
        </ol>
      </div>
    </div>
  );
}
