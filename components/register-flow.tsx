"use client";

import { useMemo, useState } from "react";
import { Check, ChevronLeft, CreditCard, Smartphone } from "lucide-react";
import Link from "next/link";
import { Button, ButtonLink } from "./button";
import { QrCard } from "./qr-card";
import { eventPresets, packages, type Package } from "@/lib/data";
import { cn, inr } from "@/lib/utils";

type FnRow = { name: string; emoji: string; on: boolean; date: string; time: string; venue: string };

const steps = ["Jodi", "Functions", "Package", "Payment"];

const field =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/15";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function RegisterFlow({ initialPackage }: { initialPackage?: Package["id"] }) {
  const [step, setStep] = useState(0);
  const [paid, setPaid] = useState(false);
  const [paying, setPaying] = useState(false);
  const [method, setMethod] = useState<"upi" | "card">("upi");
  const [couple, setCouple] = useState({ groom: "", bride: "", city: "", phone: "" });
  const [fns, setFns] = useState<FnRow[]>(
    eventPresets.map((p, i) => ({ ...p, on: i < 5, date: "", time: "", venue: "" })),
  );
  const [pkgId, setPkgId] = useState<Package["id"]>(initialPackage ?? "standard");
  const pkg = packages.find((p) => p.id === pkgId)!;

  const slug = useMemo(() => {
    const base = slugify(`${couple.groom}-weds-${couple.bride}`);
    return couple.groom && couple.bride ? base : "your-wedding";
  }, [couple.groom, couple.bride]);

  const canNext =
    step === 0
      ? couple.groom.trim() && couple.bride.trim() && couple.city.trim() && /^\d{10}$/.test(couple.phone)
      : step === 1
        ? fns.some((f) => f.on)
        : true;

  function updateFn(i: number, patch: Partial<FnRow>) {
    setFns((prev) => prev.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  }

  function pay() {
    setPaying(true);
    // Demo only — Razorpay arrives with the backend phase.
    setTimeout(() => {
      setPaying(false);
      setPaid(true);
    }, 1400);
  }

  if (paid) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-green-100 text-green-700">
          <Check className="size-7" />
        </div>
        <h1 className="font-display mt-4 text-3xl font-semibold text-maroon">Mubarak ho! 🎉</h1>
        <p className="mt-2 text-muted">
          {couple.groom} &amp; {couple.bride} ka wedding page ready hai. Ye raha aapka QR — jise chahein share karein.
        </p>
        <div className="mt-6">
          <QrCard slug={slug} names={`${couple.groom} & ${couple.bride}`} />
        </div>
        <p className="mt-3 text-xs text-muted">
          Demo mode: asli payment aur asli page backend ke baad judega. Abhi demo page dikhaya jayega.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/w/rahul-weds-priya">Wedding page dekhein</ButtonLink>
          <ButtonLink href="/dashboard" variant="outline">
            Dashboard kholein
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted hover:text-maroon">
        <ChevronLeft className="size-4" /> Home
      </Link>
      <h1 className="font-display mt-3 text-3xl font-semibold text-maroon">Shaadi register karein</h1>

      {/* Stepper */}
      <ol className="mt-6 grid grid-cols-4 gap-2" aria-label="Steps">
        {steps.map((s, i) => (
          <li key={s} className="text-center">
            <div className={cn("h-1.5 rounded-full", i <= step ? "bg-maroon" : "bg-line")} />
            <span className={cn("mt-1.5 block text-xs", i === step ? "font-semibold text-maroon" : "text-muted")}>
              {i + 1}. {s}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-2xl border border-line bg-white p-5 sm:p-7">
        {step === 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              Dulha ka naam
              <input className={cn(field, "mt-1.5")} value={couple.groom} onChange={(e) => setCouple({ ...couple, groom: e.target.value })} placeholder="Rahul" />
            </label>
            <label className="text-sm">
              Dulhan ka naam
              <input className={cn(field, "mt-1.5")} value={couple.bride} onChange={(e) => setCouple({ ...couple, bride: e.target.value })} placeholder="Priya" />
            </label>
            <label className="text-sm">
              Shehar
              <input className={cn(field, "mt-1.5")} value={couple.city} onChange={(e) => setCouple({ ...couple, city: e.target.value })} placeholder="Jaipur" />
            </label>
            <label className="text-sm">
              Mobile number
              <input
                className={cn(field, "mt-1.5")}
                inputMode="numeric"
                maxLength={10}
                value={couple.phone}
                onChange={(e) => setCouple({ ...couple, phone: e.target.value.replace(/\D/g, "") })}
                placeholder="10 digit number"
              />
            </label>
            <p className="text-xs text-muted sm:col-span-2">
              Aapka link hoga: <span className="font-medium text-maroon">liveshadi.in/{slug}</span>
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-3">
            <p className="text-sm text-muted">Jo functions dikhane hain unhe chunein. Date aur venue baad mein bhi badal sakte hain.</p>
            {fns.map((f, i) => (
              <div key={f.name} className={cn("rounded-xl border p-3.5", f.on ? "border-maroon/40 bg-rose/40" : "border-line")}>
                <label className="flex cursor-pointer items-center gap-3 text-sm font-medium">
                  <input type="checkbox" className="size-4 accent-[#7a1f2b]" checked={f.on} onChange={(e) => updateFn(i, { on: e.target.checked })} />
                  <span>{f.emoji} {f.name}</span>
                </label>
                {f.on && (
                  <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                    <input type="date" aria-label={`${f.name} date`} className={field} value={f.date} onChange={(e) => updateFn(i, { date: e.target.value })} />
                    <input type="time" aria-label={`${f.name} time`} className={field} value={f.time} onChange={(e) => updateFn(i, { time: e.target.value })} />
                    <input aria-label={`${f.name} venue`} className={field} value={f.venue} onChange={(e) => updateFn(i, { venue: e.target.value })} placeholder="Venue" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            {packages.map((p) => (
              <label
                key={p.id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-xl border p-4",
                  pkgId === p.id ? "border-maroon bg-rose/40" : "border-line",
                )}
              >
                <input type="radio" name="pkg" className="mt-1 accent-[#7a1f2b]" checked={pkgId === p.id} onChange={() => setPkgId(p.id)} />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{p.name}</span>
                    <span className="font-semibold text-maroon">{inr(p.price)}</span>
                  </div>
                  <p className="text-sm text-muted">{p.tagline}</p>
                  <ul className="mt-2 space-y-1 text-xs text-muted">
                    {p.features.slice(0, 3).map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>
                </div>
              </label>
            ))}
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="rounded-xl bg-gold-soft p-4 text-sm">
              <div className="flex justify-between"><span>{couple.groom} &amp; {couple.bride}</span><span>{pkg.name}</span></div>
              <div className="mt-1 flex justify-between text-muted">
                <span>{fns.filter((f) => f.on).length} functions</span>
                <span>{inr(pkg.price)}</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-gold/40 pt-2 font-semibold">
                <span>Total (GST sahit)</span>
                <span>{inr(pkg.price)}</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {([
                ["upi", "UPI", Smartphone],
                ["card", "Card", CreditCard],
              ] as const).map(([id, label, Icon]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMethod(id)}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-medium",
                    method === id ? "border-maroon bg-rose/40 text-maroon" : "border-line text-muted",
                  )}
                >
                  <Icon className="size-4" /> {label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">Ye demo payment hai — koi paisa nahi katega.</p>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Button variant="ghost" onClick={() => setStep((s) => s - 1)} disabled={step === 0}>
          Peeche
        </Button>
        {step < 3 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext}>
            Aage
          </Button>
        ) : (
          <Button onClick={pay} disabled={paying}>
            {paying ? "Payment ho rahi hai…" : `${inr(pkg.price)} pay karein`}
          </Button>
        )}
      </div>
    </div>
  );
}
