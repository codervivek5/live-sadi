"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./button";
import type { Blessing } from "@/lib/data";

const field =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/15";

export function Blessings({ initial }: { initial: Blessing[] }) {
  const [list, setList] = useState(initial);
  const [form, setForm] = useState({ name: "", city: "", message: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    setList((prev) => [
      { id: `new-${Date.now()}`, name: form.name.trim(), relation: "Mehmaan", city: form.city.trim() || "—", message: form.message.trim() },
      ...prev,
    ]);
    setForm({ name: "", city: "", message: "" });
    toast.success("Aapka aashirwad jod diya gaya");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <form onSubmit={submit} className="space-y-3 rounded-2xl border border-line bg-white p-5 lg:col-span-2">
        <h3 className="font-display text-xl text-maroon">Aashirwad dein</h3>
        <input className={field} placeholder="Aapka naam" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className={field} placeholder="Shehar (optional)" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        <textarea className={field} rows={4} placeholder="Jodi ke liye kuch shubhkamnayein…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        <Button type="submit" className="w-full" disabled={!form.name.trim() || !form.message.trim()}>
          <Heart className="size-4" /> Bhejein
        </Button>
        <p className="text-xs text-muted">Video blessing option backend ke baad aayega.</p>
      </form>

      <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-3 lg:content-start">
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((b) => (
            <motion.li
              key={b.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-line bg-white p-4"
            >
              <p className="text-sm leading-relaxed">“{b.message}”</p>
              <p className="mt-3 text-sm font-semibold text-maroon">{b.name}</p>
              <p className="text-xs text-muted">{b.relation} · {b.city}</p>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
