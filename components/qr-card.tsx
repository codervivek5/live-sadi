"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Check, Copy, Download, MessageCircle } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export function QrCard({ slug, names }: { slug: string; names: string }) {
  const [url, setUrl] = useState("");
  const [qr, setQr] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const full = `${window.location.origin}/w/${slug}`;
    QRCode.toDataURL(full, {
      width: 640,
      margin: 2,
      color: { dark: "#4a1226", light: "#ffffff" },
    })
      .then((data) => {
        setUrl(full);
        setQr(data);
      })
      .catch(() => setUrl(full));
  }, [slug]);

  async function copy() {
    try {
      const target = url || (typeof window !== "undefined" ? `${window.location.origin}/w/${slug}` : `/w/${slug}`);
      await navigator.clipboard.writeText(target);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be blocked */
    }
  }

  const shareUrl = url || (typeof window !== "undefined" ? `${window.location.origin}/w/${slug}` : `/w/${slug}`);
  const wa = `https://wa.me/?text=${encodeURIComponent(`${names} ki shaadi live dekhein 💛 ${shareUrl}`)}`;

  return (
    <div className="rounded-2xl border border-line bg-white p-5 text-center">
      <div className="mx-auto grid size-52 place-items-center rounded-xl border border-line bg-white p-2">
        {qr ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={qr} alt={`${names} ke wedding page ka QR code`} className="size-full" />
        ) : (
          <span className="text-sm text-muted">QR ban raha hai…</span>
        )}
      </div>
      <p className="mt-3 break-all text-xs text-muted">{url || `/w/${slug}`}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <a
          href={qr || undefined}
          download={qr ? `${slug}-qr.png` : undefined}
          aria-disabled={!qr}
          onClick={(e) => {
            if (!qr) e.preventDefault();
          }}
          className={cn(
            "inline-flex items-center gap-2 rounded-full bg-maroon px-4 py-2 text-sm font-medium text-white hover:bg-maroon-dark",
            !qr && "pointer-events-none opacity-50",
          )}
        >
          <Download className="size-4" /> QR download
        </a>
        <Button variant="outline" onClick={copy}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? "Copy ho gaya" : "Link copy"}
        </Button>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-maroon/30 px-4 py-2 text-sm font-medium text-maroon hover:bg-rose"
        >
          <MessageCircle className="size-4" /> WhatsApp
        </a>
      </div>
    </div>
  );
}
