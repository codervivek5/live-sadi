"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Heart, Calendar, Users, X, Utensils, MessageCircle, Share2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/button";
import type { WeddingEvent, GuestRsvp } from "@/lib/data";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/15 transition-all";

async function celebrate() {
  try {
    const { default: confetti } = await import("canvas-confetti");
    const colors = ["#d4af75", "#701f3a", "#f6eedf", "#e8a6a6", "#ffd166"];
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 }, colors });
    setTimeout(() => {
      confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 }, colors });
    }, 200);
    setTimeout(() => {
      confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 }, colors });
    }, 400);
  } catch {
    /* fallback if blocked */
  }
}

export function RsvpForm({
  events,
  initialGuestName = "",
  weddingSlug,
  onRsvpSuccess,
}: {
  events: WeddingEvent[];
  initialGuestName?: string;
  weddingSlug: string;
  onRsvpSuccess?: (rsvp: GuestRsvp) => void;
}) {
  const [attending, setAttending] = useState<boolean>(true);
  const [name, setName] = useState(initialGuestName);
  const [phone, setPhone] = useState("");
  const [adults, setAdults] = useState<number>(2);
  const [kids, setKids] = useState<number>(0);
  const [selectedEvents, setSelectedEvents] = useState<string[]>(events.map((e) => e.id));
  const [diet, setDiet] = useState<"veg" | "jain" | "all">("veg");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState<GuestRsvp | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Check if this visitor already RSVP'd in localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`liveshadi_rsvp_${weddingSlug}`);
      if (stored) {
        const parsed = JSON.parse(stored) as GuestRsvp;
        setSubmitted(parsed);
      }
    } catch {
      /* ignore */
    }
  }, [weddingSlug]);

  function toggleEvent(id: string) {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function toggleAllEvents() {
    if (selectedEvents.length === events.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(events.map((e) => e.id));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Kripya apna naam darj karein.");
      return;
    }
    if (attending && selectedEvents.length === 0) {
      toast.error("Kripya kam se kam ek function chunein jisme aap shamil honge.");
      return;
    }

    setSubmitting(true);

    const newRsvp: GuestRsvp = {
      id: `rsvp-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      attending,
      adultsCount: attending ? adults : 0,
      kidsCount: attending ? kids : 0,
      attendingEvents: attending ? selectedEvents : [],
      diet: attending ? diet : "all",
      note: message.trim() || undefined,
      submittedAt: new Date().toISOString(),
    };

    setTimeout(() => {
      try {
        localStorage.setItem(`liveshadi_rsvp_${weddingSlug}`, JSON.stringify(newRsvp));
        // Also save to all RSVPs list for dashboard sync
        const allKey = `liveshadi_all_rsvps_${weddingSlug}`;
        const existingAll = JSON.parse(localStorage.getItem(allKey) || "[]");
        localStorage.setItem(allKey, JSON.stringify([newRsvp, ...existingAll]));
      } catch {
        /* storage blocked */
      }

      setSubmitting(false);
      setSubmitted(newRsvp);
      if (attending) celebrate();
      toast.success(attending ? "RSVP safaltapoorvak darj ho gaya! Shukriya 🎉" : "Shukriya! Aapka sandesh pahunch gaya.");
      onRsvpSuccess?.(newRsvp);
    }, 600);
  }

  const totalGuests = adults + kids;

  if (submitted) {
    const waText = encodeURIComponent(
      `Namaste Rahul & Priya! ${submitted.name} ki taraf se RSVP:\nStatus: ${
        submitted.attending ? `Aayenge (${submitted.adultsCount + submitted.kidsCount} mehmaan)` : "Shamil nahi ho paenge"
      }\n${submitted.note ? `Shubhkamnayein: "${submitted.note}"` : ""}`,
    );

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl border border-gold/60 bg-gradient-to-b from-white to-gold-soft/30 p-6 sm:p-8 text-center shadow-lg"
      >
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-gold-soft text-maroon shadow-inner">
          {submitted.attending ? <Sparkles className="size-8 text-gold" /> : <Heart className="size-8 text-maroon" />}
        </div>
        <h3 className="font-display mt-4 text-2xl sm:text-3xl font-semibold text-maroon">
          {submitted.attending ? "Aapka aana hamare liye anmol hai!" : "Shukriya aapki shubhkamnaon ke liye"}
        </h3>
        <p className="mt-2 text-sm text-muted">
          {submitted.attending
            ? `Namaste ${submitted.name}, aapka RSVP darj kar liya gaya hai.`
            : `Aapki upasthiti yaad aayegi, ${submitted.name}.`}
        </p>

        {submitted.attending && (
          <div className="mt-6 rounded-2xl border border-line bg-white p-5 text-left text-sm space-y-3">
            <div className="flex items-center justify-between border-b border-line pb-2.5">
              <span className="text-muted flex items-center gap-1.5">
                <Users className="size-4 text-gold" /> Mehmaan
              </span>
              <span className="font-semibold text-maroon">
                {submitted.adultsCount} Bado + {submitted.kidsCount} Bachche ({submitted.adultsCount + submitted.kidsCount} Total)
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-line pb-2.5">
              <span className="text-muted flex items-center gap-1.5">
                <Utensils className="size-4 text-gold" /> Bhojan
              </span>
              <span className="font-medium text-foreground capitalize">
                {submitted.diet === "jain" ? "Jain (Bina pyaaz/lahsun)" : submitted.diet === "veg" ? "Pure Vegetarian" : "No restriction"}
              </span>
            </div>
            <div>
              <span className="text-muted block text-xs mb-1">Shamil hone wale functions:</span>
              <div className="flex flex-wrap gap-1.5">
                {submitted.attendingEvents.map((evId) => {
                  const ev = events.find((e) => e.id === evId);
                  return (
                    <span key={evId} className="rounded-full bg-gold-soft px-2.5 py-1 text-xs text-maroon-dark font-medium">
                      {ev?.emoji} {ev?.name ?? evId}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={`https://wa.me/?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors shadow"
          >
            <MessageCircle className="size-4" /> Parivar ko WhatsApp par batayein
          </a>
          <Button
            variant="outline"
            onClick={() => {
              try {
                localStorage.removeItem(`liveshadi_rsvp_${weddingSlug}`);
              } catch {
                /* ignore */
              }
              setSubmitted(null);
            }}
          >
            RSVP Badlein
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="border-b border-line pb-4 text-center">
        <span className="text-xs font-semibold tracking-widest text-gold uppercase">R.S.V.P.</span>
        <h3 className="font-display mt-1 text-2xl sm:text-3xl font-semibold text-maroon">
          Upasthiti Darj Karein
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-muted">
          Aapke aane ki jaankari se hum arrangements behtar kar sakenge.
        </p>
      </div>

      {/* Attendance Choice */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setAttending(true)}
          className={cn(
            "flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-4 text-sm font-medium transition-all",
            attending
              ? "border-maroon bg-rose/50 text-maroon ring-2 ring-maroon/20"
              : "border-line text-muted hover:border-maroon/30",
          )}
        >
          <span className="text-2xl">🎉</span>
          <span>Haan, aayenge!</span>
          <span className="text-[11px] opacity-75">Shamil honge</span>
        </button>

        <button
          type="button"
          onClick={() => setAttending(false)}
          className={cn(
            "flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-4 text-sm font-medium transition-all",
            !attending
              ? "border-maroon bg-rose/50 text-maroon ring-2 ring-maroon/20"
              : "border-line text-muted hover:border-maroon/30",
          )}
        >
          <span className="text-2xl">🙏</span>
          <span>Nahi aa payenge</span>
          <span className="text-[11px] opacity-75">Shubh kamnayein</span>
        </button>
      </div>

      {/* Guest Name & Phone */}
      <div className="mt-5 space-y-4">
        <div>
          <label className="block text-xs font-medium text-foreground" htmlFor="rsvp-name">
            Aapka ya Parivar ka Naam *
          </label>
          <input
            id="rsvp-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="jaise: Sharma Parivar / Ramesh Sharma"
            className={cn(field, "mt-1")}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground" htmlFor="rsvp-phone">
            Mobile / WhatsApp number
          </label>
          <input
            id="rsvp-phone"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="10 digit number"
            className={cn(field, "mt-1")}
          />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {attending && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Guest Count Stepper */}
            <div className="mt-6 rounded-2xl border border-line bg-gold-soft/40 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-maroon">Kitne log shamil honge?</h4>
                  <p className="text-xs text-muted">Bade aur bachchon ki sankhya chunein</p>
                </div>
                <span className="rounded-full bg-maroon px-3 py-1 text-xs font-semibold text-white">
                  {totalGuests} Total {totalGuests === 1 ? "Mehmaan" : "Mehmaan"}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                {/* Adults */}
                <div className="rounded-xl bg-white p-3 border border-line flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">Bade (Adults)</p>
                    <p className="text-[10px] text-muted">12+ varsh</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults((a) => Math.max(1, a - 1))}
                      className="grid size-7 place-items-center rounded-lg border border-line text-sm font-semibold hover:bg-rose disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="w-5 text-center font-semibold text-sm">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults((a) => a + 1)}
                      className="grid size-7 place-items-center rounded-lg border border-line text-sm font-semibold hover:bg-rose"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Kids */}
                <div className="rounded-xl bg-white p-3 border border-line flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">Bachche (Kids)</p>
                    <p className="text-[10px] text-muted">Under 12</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={kids <= 0}
                      onClick={() => setKids((k) => Math.max(0, k - 1))}
                      className="grid size-7 place-items-center rounded-lg border border-line text-sm font-semibold hover:bg-rose disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="w-5 text-center font-semibold text-sm">{kids}</span>
                    <button
                      type="button"
                      onClick={() => setKids((k) => k + 1)}
                      className="grid size-7 place-items-center rounded-lg border border-line text-sm font-semibold hover:bg-rose"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Function Selection */}
            <div className="mt-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-foreground">
                  Kaunse functions mein aayenge?
                </label>
                <button
                  type="button"
                  onClick={toggleAllEvents}
                  className="text-xs text-maroon font-medium hover:underline"
                >
                  {selectedEvents.length === events.length ? "Sabhi unselect karein" : "Sabhi select karein"}
                </button>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {events.map((ev) => {
                  const isChecked = selectedEvents.includes(ev.id);
                  return (
                    <label
                      key={ev.id}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border p-2.5 text-xs font-medium cursor-pointer transition-colors",
                        isChecked ? "border-maroon/40 bg-rose/40 text-maroon-dark" : "border-line bg-white hover:border-line"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleEvent(ev.id)}
                        className="size-4 accent-maroon rounded"
                      />
                      <span>{ev.emoji}</span>
                      <span className="truncate">{ev.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Dietary Preference */}
            <div className="mt-5">
              <label className="block text-xs font-medium text-foreground mb-1.5">
                Bhojan pasand (Dietary preference)
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(
                  [
                    ["veg", "Shakahari 🥦", "Pure Veg"],
                    ["jain", "Jain Bhojan 🌿", "No Onion/Garlic"],
                    ["all", "Normal 🍽️", "No restriction"],
                  ] as const
                ).map(([id, label, sub]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setDiet(id)}
                    className={cn(
                      "rounded-xl border p-2.5 text-center transition-all",
                      diet === id
                        ? "border-maroon bg-rose/40 font-semibold text-maroon"
                        : "border-line text-muted hover:border-maroon/30",
                    )}
                  >
                    <span className="block">{label}</span>
                    <span className="text-[10px] opacity-75">{sub}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message / Blessing */}
      <div className="mt-5">
        <label className="block text-xs font-medium text-foreground" htmlFor="rsvp-msg">
          Jodi ke liye sandesh / shubhkamnayein (Optional)
        </label>
        <textarea
          id="rsvp-msg"
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={attending ? "Aapke shubh vivah ke liye hamari dheron shubhkamnayein…" : "Door hone ki wajah se nahi aa paenge, kripya aashirwad swikar karein…"}
          className={cn(field, "mt-1")}
        />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full py-3 text-base shadow-md"
      >
        {submitting ? "Darj ho raha hai…" : attending ? `RSVP Confirm Karein (${totalGuests} Mehmaan)` : "Sandesh Bhejein"}
      </Button>
    </form>
  );
}

