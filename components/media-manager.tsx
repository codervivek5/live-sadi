"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Play, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import type { MediaItem } from "@/lib/data";
import { cn } from "@/lib/utils";

export function MediaManager({ initial }: { initial: MediaItem[] }) {
  const [items, setItems] = useState(initial);
  const [tab, setTab] = useState<"pending" | "approved">("pending");

  const pending = items.filter((m) => m.status === "pending");
  const approved = items.filter((m) => m.status === "approved");
  const shown = tab === "pending" ? pending : approved;

  const approve = (id: string) => {
    setItems((p) => p.map((m) => (m.id === id ? { ...m, status: "approved" } : m)));
    toast.success("Photo approve ho gayi, ab page par dikhegi");
  };
  const remove = (id: string) => {
    setItems((p) => p.filter((m) => m.id !== id));
    toast("Photo hata di gayi");
  };

  return (
    <div>
      <div className="flex gap-2" role="tablist">
        {(
          [
            ["pending", `Approval baaki (${pending.length})`],
            ["approved", `Dikh rahi hain (${approved.length})`],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm",
              tab === id ? "border-maroon bg-maroon text-white" : "border-line bg-white text-muted",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="py-14 text-center text-muted">{tab === "pending" ? "Sab approve ho chuka hai 🎉" : "Abhi koi media nahi."}</p>
      ) : (
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((m) => (
            <motion.li
              key={m.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: -12 }}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
              className="overflow-hidden rounded-xl border border-line bg-white"
            >
              <div className="relative aspect-square bg-gold-soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.src} alt={m.caption} loading="lazy" className="size-full object-cover" />
                {m.type === "video" && (
                  <span className="absolute inset-0 grid place-items-center bg-black/25">
                    <Play className="size-8 text-white" fill="currentColor" />
                  </span>
                )}
              </div>
              <div className="p-2.5">
                <p className="truncate text-sm font-medium">{m.caption}</p>
                <p className="truncate text-xs text-muted">{m.by}</p>
                <div className="mt-2 flex gap-1.5">
                  {m.status === "pending" && (
                    <button type="button" onClick={() => approve(m.id)} className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-green-600 py-1.5 text-xs font-medium text-white hover:bg-green-700">
                      <Check className="size-3.5" /> Approve
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(m.id)}
                    aria-label={m.status === "pending" ? "Reject" : "Hatayein"}
                    className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-line py-1.5 text-xs text-muted hover:border-red-300 hover:text-red-600"
                  >
                    {m.status === "pending" ? <X className="size-3.5" /> : <Trash2 className="size-3.5" />}
                    {m.status === "pending" ? "Reject" : "Hatayein"}
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
