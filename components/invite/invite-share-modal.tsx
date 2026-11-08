"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Copy, Check, Download, MessageCircle, X, Sparkles, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/button";
import type { Wedding } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export function InviteShareModal({
  wedding,
  isOpen,
  onClose,
  defaultGuest = "",
}: {
  wedding: Wedding;
  isOpen: boolean;
  onClose: () => void;
  defaultGuest?: string;
}) {
  const [guestName, setGuestName] = useState(defaultGuest);
  const [guestPhone, setGuestPhone] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");

  const origin = typeof window !== "undefined" ? window.location.origin : "https://live-shadi.com";

  // Build the personalized URL
  const queryParam = guestName.trim() ? `?guest=${encodeURIComponent(guestName.trim())}` : "";
  const inviteUrl = `${origin}/w/${wedding.slug}/invite${queryParam}`;

  const greetingLine = guestName.trim()
    ? `Namaste ${guestName.trim()} ji! 🙏`
    : `Namaste! 🙏`;

  const waMessage =
`🌸 *॥ ॐ श्री गणेशाय नमः ॥* 🌸
${greetingLine}

Aapko aur aapke poore parivar ko hamare bacchon ke shubh vivah samaroh mein shamil hone ka sadar aamantran hai:

✨ *${wedding.groom} Weds ${wedding.bride}* ✨

📅 *Tarikh:* ${formatDate(wedding.weddingDate, { day: "numeric", month: "long", year: "numeric" })}
📍 *Sthal:* ${wedding.city}

Hamare sabhi functions ka schedule, venue map, digital nimantran patra aur live stream dekhne ke liye is link par tap karein:
👉 ${inviteUrl}

Kripya apna RSVP bhi upar diye link par darj karein taaki hum aapke aane ki taiyari kar sakein.

Hum aapke sneh aur aashirwad ke aakankshi hain! 💛`;

  // Generate QR on change of inviteUrl
  useEffect(() => {
    QRCode.toDataURL(inviteUrl, {
      width: 480,
      margin: 2,
      color: { dark: "#4a1226", light: "#ffffff" },
    })
      .then((data) => setQrDataUrl(data))
      .catch(() => {});
  }, [inviteUrl]);

  if (!isOpen) return null;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 1600);
      toast.success("Personalized invite link copy ho gaya!");
    } catch {
      toast.error("Clipboard copy failed");
    }
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(waMessage);
      setCopiedMsg(true);
      setTimeout(() => setCopiedMsg(false), 1600);
      toast.success("Poora invitation message copy ho gaya!");
    } catch {
      toast.error("Clipboard copy failed");
    }
  }

  function handleSendWhatsApp() {
    const cleanPhone = guestPhone.replace(/\D/g, "");
    let target = cleanPhone ? (cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone) : "";
    const waUrl = target
      ? `https://wa.me/${target}?text=${encodeURIComponent(waMessage)}`
      : `https://wa.me/?text=${encodeURIComponent(waMessage)}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Share Wedding Invitation"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative my-8 w-full max-w-lg rounded-3xl border border-gold/40 bg-white p-6 sm:p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full bg-gold-soft p-1.5 text-maroon hover:bg-rose transition-colors"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
          <Sparkles className="size-4" /> Digital Invitation Sharing
        </div>
        <h2 className="font-display mt-1 text-2xl font-semibold text-maroon">
          Nimantran Patra Bhejein
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-muted">
          Mehmaan ka naam likhein — unke naam ka personalized link, QR code aur WhatsApp sandesh taiyar ho jayega.
        </p>

        {/* Input for guest customization */}
        <div className="mt-5 space-y-3 rounded-2xl bg-gold-soft/40 p-4 border border-gold/30">
          <div>
            <label className="block text-xs font-semibold text-maroon-dark">
              Mehmaan / Parivar ka Naam
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Jaise: Sharma Parivar / Verma Uncle"
              className="mt-1 w-full rounded-xl border border-line bg-white px-3.5 py-2 text-sm outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/15"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-maroon-dark">
              WhatsApp Number (Optional, direct bhejne ke liye)
            </label>
            <input
              type="tel"
              inputMode="numeric"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="10 digit mobile number"
              className="mt-1 w-full rounded-xl border border-line bg-white px-3.5 py-2 text-sm outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/15"
            />
          </div>
        </div>

        {/* Generated QR and Link Preview */}
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-line p-3.5 bg-white">
          <div className="relative size-24 shrink-0 rounded-xl border border-line bg-white p-1 overflow-hidden grid place-items-center">
            {qrDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qrDataUrl} alt="Invitation QR" className="size-full" />
            ) : (
              <span className="text-[10px] text-muted">QR loading...</span>
            )}
          </div>
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <p className="text-xs font-semibold text-maroon">Personalized Link:</p>
            <p className="truncate text-xs font-mono text-muted bg-background px-2 py-1 rounded-lg border border-line mt-1">
              {inviteUrl}
            </p>
            <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
              <Button variant="outline" className="px-3 py-1 text-xs" onClick={copyLink}>
                {copiedLink ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                {copiedLink ? "Link copied" : "Copy link"}
              </Button>
              {qrDataUrl && (
                <a
                  href={qrDataUrl}
                  download={`invite-${guestName ? guestName.replace(/\s+/g, "-") : "wedding"}-qr.png`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-maroon/30 px-3 py-1 text-xs font-medium text-maroon hover:bg-rose transition-colors"
                >
                  <Download className="size-3.5" /> Download QR
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Message Preview */}
        <div className="mt-4">
          <label className="block text-xs font-medium text-muted mb-1">
            WhatsApp sandesh preview:
          </label>
          <div className="max-h-28 overflow-y-auto rounded-xl border border-line bg-gold-soft/20 p-3 text-xs leading-relaxed text-foreground whitespace-pre-wrap font-sans select-all">
            {waMessage}
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="flex items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition-colors shadow"
          >
            <MessageCircle className="size-4" /> WhatsApp par bhejein
          </button>
          <Button variant="outline" onClick={copyMessage}>
            {copiedMsg ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copiedMsg ? "Message copied!" : "Copy message text"}
          </Button>
        </div>
      </div>
    </div>
  );
}

