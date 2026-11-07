"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./button";

type Preview = { id: string; url: string; name: string; isVideo: boolean };

export function GuestUpload() {
  const input = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<Preview[]>([]);
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const urls = useRef<string[]>([]);

  useEffect(() => {
    const list = urls.current;
    return () => list.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []).slice(0, 12);
    const next = picked.map((f) => {
      const url = URL.createObjectURL(f);
      urls.current.push(url);
      return { id: `${f.name}-${f.size}-${f.lastModified}`, url, name: f.name, isVideo: f.type.startsWith("video") };
    });
    setFiles((prev) => [...prev, ...next].slice(0, 12));
    e.target.value = "";
  }

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border border-line bg-white p-8 text-center">
        <motion.div initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}>
          <CheckCircle2 className="mx-auto size-10 text-green-600" />
        </motion.div>
        <h3 className="mt-3 font-display text-xl text-maroon">Shukriya{name ? `, ${name}` : ""}!</h3>
        <p className="mt-1 text-sm text-muted">Aapki {files.length} photos/videos mil gayi. Dulha-dulhan ki approval ke baad gallery mein dikhengi.</p>
        <Button className="mt-4" variant="outline" onClick={() => { setSent(false); setFiles([]); }}>
          Aur bhejein
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
      <input ref={input} type="file" accept="image/*,video/*" multiple className="sr-only" onChange={onPick} />
      <motion.button
        type="button"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => input.current?.click()}
        className="flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-maroon/30 bg-rose/30 px-4 py-8 text-maroon hover:bg-rose/60"
      >
        <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}>
          <ImagePlus className="size-8" />
        </motion.span>
        <span className="font-medium">Photos / videos chunein</span>
        <span className="text-xs text-muted">Ek baar mein 12 tak</span>
      </motion.button>

      {files.length > 0 && (
        <>
          <ul className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
            <AnimatePresence initial={false}>
            {files.map((f) => (
              <motion.li
                key={f.id}
                layout
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                className="relative aspect-square overflow-hidden rounded-lg bg-gold-soft"
              >
                {f.isVideo ? (
                  <video src={f.url} className="size-full object-cover" muted />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={f.url} alt={f.name} className="size-full object-cover" />
                )}
                <button
                  type="button"
                  aria-label={`${f.name} hatayein`}
                  onClick={() => setFiles((p) => p.filter((x) => x.id !== f.id))}
                  className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 text-white"
                >
                  <X className="size-3.5" />
                </button>
              </motion.li>
            ))}
            </AnimatePresence>
          </ul>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aapka naam"
              className="flex-1 rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/15"
            />
            <Button disabled={!name.trim()} onClick={() => { setSent(true); toast.success("Photos bhej di gayi"); }}>
              {files.length} file bhejein
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
