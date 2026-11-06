"use client";

import { useState } from "react";
import { Button } from "./button";
import { QrCard } from "./qr-card";
import type { WeddingEvent } from "@/lib/data";
import { cn } from "@/lib/utils";

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", on ? "bg-maroon" : "bg-line")}
    >
      <span className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow transition-all", on ? "left-[1.375rem]" : "left-0.5")} />
    </button>
  );
}

export function PrivacySettings({ events, slug, names }: { events: WeddingEvent[]; slug: string; names: string }) {
  const [pinOn, setPinOn] = useState(false);
  const [pin, setPin] = useState("");
  const [approval, setApproval] = useState(true);
  const [vis, setVis] = useState<Record<string, boolean>>(
    Object.fromEntries(events.map((e) => [e.id, e.id !== "haldi"])),
  );
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-5">
      <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
        <h2 className="font-semibold">Page ki privacy</h2>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium">PIN se page lock karein</p>
            <p className="text-xs text-muted">Sirf wahi dekh payenge jinhe aap PIN dein (Premium).</p>
          </div>
          <Toggle on={pinOn} onChange={setPinOn} label="PIN lock" />
        </div>
        {pinOn && (
          <input
            inputMode="numeric"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            placeholder="4-6 digit PIN"
            className="w-48 rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-maroon"
          />
        )}
        <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
          <div>
            <p className="text-sm font-medium">Guest uploads par approval</p>
            <p className="text-xs text-muted">Mehmaan ki photo tabhi dikhe jab aap approve karein.</p>
          </div>
          <Toggle on={approval} onChange={setApproval} label="Guest upload approval" />
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-white p-5">
        <h2 className="font-semibold">Function-wise visibility</h2>
        <p className="text-xs text-muted">Band function sirf aapko dikhega, mehmaanon ko nahi.</p>
        <ul className="mt-3 divide-y divide-line">
          {events.map((e) => (
            <li key={e.id} className="flex items-center justify-between py-3 text-sm">
              <span>{e.emoji} {e.name}</span>
              <Toggle on={vis[e.id]} onChange={(v) => setVis({ ...vis, [e.id]: v })} label={`${e.name} sabko dikhe`} />
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-line bg-white p-5">
        <h2 className="font-semibold">QR code badlein</h2>
        <p className="mb-4 text-xs text-muted">Agar link galat logon tak pahunch gaya ho to naya link banayein. Purana QR kaam karna band kar dega.</p>
        <QrCard slug={slug} names={names} />
        <Button variant="outline" className="mt-4" onClick={() => alert("Demo: naya QR backend ke baad banega.")}>
          Naya QR banayein
        </Button>
      </section>

      <div className="flex items-center gap-3">
        <Button
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 1800);
          }}
        >
          Save karein
        </Button>
        {saved && <span className="text-sm text-green-700" role="status">Save ho gaya (demo)</span>}
      </div>
    </div>
  );
}
