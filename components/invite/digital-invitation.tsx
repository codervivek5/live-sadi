"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  MapPin,
  Share2,
  QrCode,
  Radio,
  Sparkles,
  Shirt,
  CalendarPlus,
  Send,
  Users,
  Check,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { Countdown } from "@/components/countdown";
import { RsvpForm } from "@/components/invite/rsvp-form";
import { InviteShareModal } from "@/components/invite/invite-share-modal";
import { Button, ButtonLink } from "@/components/button";
import type { Wedding } from "@/lib/data";
import { formatDate, formatTime } from "@/lib/utils";

export function DigitalInvitation({
  wedding,
  initialGuestName = "",
}: {
  wedding: Wedding;
  initialGuestName?: string;
}) {
  const [guestName, setGuestName] = useState(initialGuestName);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const mainLiveEvent = wedding.events.find((e) => e.status === "live");

  function scrollToRsvp() {
    const el = document.getElementById("rsvp-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="min-h-screen bg-[#faf5ee] text-[#2b1810] selection:bg-gold selection:text-maroon-dark">
      {/* Top Floating Helper Ribbon */}
      <header className="sticky top-0 z-30 border-b border-gold/40 bg-white/95 backdrop-blur px-4 py-2.5 shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="flex size-2 rounded-full bg-gold animate-pulse" />
            <span className="truncate">
              Digital Vivah Nimantran:{" "}
              <strong className="text-maroon">
                {guestName ? `${guestName} ke liye` : `${wedding.groom} & ${wedding.bride}`}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsShareOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-maroon/30 bg-rose/60 px-3 py-1 font-medium text-maroon hover:bg-rose transition-colors"
            >
              <Share2 className="size-3" /> Share / QR
            </button>
            <Link
              href={`/w/${wedding.slug}`}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-maroon px-3 py-1 font-medium text-white hover:bg-maroon-dark transition-colors"
            >
              <Radio className="size-3" /> Live Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Invitation Card Container */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-14">
        {/* Decorative Royal Border Card */}
        <article className="relative overflow-hidden rounded-[2.5rem] border-4 border-gold/60 bg-white shadow-2xl p-6 sm:p-12 md:p-16 text-center">
          {/* Corner traditional floral flourishes */}
          <div className="pointer-events-none absolute -left-8 -top-8 size-28 rounded-full border-4 border-dashed border-gold/30 bg-gold-soft/50" />
          <div className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full border-4 border-dashed border-gold/30 bg-gold-soft/50" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 size-28 rounded-full border-4 border-dashed border-gold/30 bg-gold-soft/50" />
          <div className="pointer-events-none absolute -bottom-8 -right-8 size-28 rounded-full border-4 border-dashed border-gold/30 bg-gold-soft/50" />

          {/* Shloka & Invocations */}
          <div className="space-y-1 text-center">
            <p className="font-serif text-sm sm:text-base font-semibold tracking-wider text-maroon">
              ॥ श्री गणेशाय नमः ॥
            </p>
            <p className="text-[11px] sm:text-xs text-muted max-w-md mx-auto italic font-serif">
              वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
            </p>
          </div>

          {/* Decorative Divider */}
          <div className="my-6 flex items-center justify-center gap-3">
            <span className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-xl text-gold">🪔</span>
            <span className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent to-gold" />
          </div>

          {/* Personalized Invitation Header */}
          {guestName && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mb-6 inline-block rounded-2xl bg-gradient-to-r from-gold-soft via-rose/60 to-gold-soft px-6 py-2.5 border border-gold/40 shadow-sm"
            >
              <p className="text-xs uppercase tracking-widest text-gold font-semibold">Sadar Aamantran</p>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-maroon mt-0.5">
                {guestName}
              </h2>
            </motion.div>
          )}

          <p className="font-serif text-sm sm:text-base text-muted max-w-xl mx-auto leading-relaxed">
            Parmatma ki aseem kripa se hum aapko aur aapke samast parivar ko hamare bacchon ke shubh vivah samaroh mein hardik aamantrit karte hain:
          </p>

          {/* The Couple Names & Parents Details */}
          <div className="my-8 sm:my-10 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-gold font-semibold">Dulha</p>
              <h1 className="font-display text-4xl sm:text-6xl font-bold text-maroon mt-1">
                Chi. {wedding.groom}
              </h1>
              <p className="text-xs sm:text-sm text-muted mt-1 font-serif">
                Suputra: {wedding.parents.groom}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-gold/50" />
              <span className="font-display text-2xl sm:text-3xl font-semibold text-gold">weds</span>
              <span className="h-px w-12 bg-gold/50" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-gold font-semibold">Dulhan</p>
              <h2 className="font-display text-4xl sm:text-6xl font-bold text-maroon mt-1">
                Chi. Sau. {wedding.bride}
              </h2>
              <p className="text-xs sm:text-sm text-muted mt-1 font-serif">
                Suputri: {wedding.parents.bride}
              </p>
            </div>
          </div>

          {/* Main Date & City */}
          <div className="rounded-2xl border border-gold/50 bg-gold-soft/50 p-5 max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm font-medium text-maroon-dark">
              <span className="inline-flex items-center gap-2">
                <Calendar className="size-4 text-gold" />
                {formatDate(wedding.weddingDate, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </span>
              <span className="hidden sm:inline text-gold">·</span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-gold" />
                {wedding.city}
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-gold/30">
              <p className="text-[11px] uppercase tracking-wider text-muted mb-2 font-medium">
                Pheron mein shesh samay (Countdown)
              </p>
              <Countdown target={wedding.weddingDate} tone="light" />
            </div>
          </div>

          {/* Call to actions */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button onClick={scrollToRsvp} className="px-6 py-3 text-base shadow-lg">
              <Check className="size-4" /> RSVP Darj Karein
            </Button>
            <Button variant="outline" onClick={() => setIsShareOpen(true)} className="px-5 py-3 text-base">
              <Share2 className="size-4" /> WhatsApp / QR Share
            </Button>
          </div>

          {mainLiveEvent && (
            <div className="mt-8 rounded-2xl bg-red-600/10 border border-red-500/30 p-3.5 max-w-lg mx-auto flex items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2.5">
                <span className="relative flex size-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full size-3 bg-red-600" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-red-700">
                    {mainLiveEvent.name} Samaroh abhi LIVE hai!
                  </p>
                  <p className="text-[11px] text-muted">Door baithe rishtedaar seedhe live dekh sakte hain.</p>
                </div>
              </div>
              <ButtonLink href={`/w/${wedding.slug}#live`} variant="primary" className="bg-red-600 hover:bg-red-700 text-xs py-1.5 shrink-0">
                Live Dekhein
              </ButtonLink>
            </div>
          )}
        </article>

        {/* Function Schedule Itinerary */}
        <section className="mt-14" aria-labelledby="functions-heading">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">Karyakram Vivaran</span>
            <h2 id="functions-heading" className="font-display text-3xl sm:text-4xl font-semibold text-maroon mt-1">
              Shubh Samaroh Karyakram
            </h2>
            <p className="mt-1 text-sm text-muted">
              Sabhi rasmon aur functions ka samay, sthal aur dress code
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {wedding.events.map((ev) => (
              <div
                key={ev.id}
                className="relative flex flex-col rounded-3xl border border-line bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-gold-soft text-2xl shadow-inner">
                    {ev.emoji}
                  </span>
                  <span
                    className={
                      ev.status === "live"
                        ? "rounded-full bg-red-600 px-2.5 py-0.5 text-[11px] font-semibold text-white animate-pulse"
                        : ev.status === "ended"
                          ? "rounded-full bg-line px-2.5 py-0.5 text-[11px] text-muted"
                          : "rounded-full bg-gold-soft px-2.5 py-0.5 text-[11px] font-medium text-maroon-dark"
                    }
                  >
                    {ev.status === "live" ? "Abhi LIVE" : ev.status === "ended" ? "Khatam" : "Aane wala"}
                  </span>
                </div>

                <div className="mt-4 flex-1">
                  <h3 className="font-display text-xl font-semibold text-maroon">
                    {ev.name} <span className="text-xs text-muted font-normal font-sans">({ev.nameHi})</span>
                  </h3>
                  <p className="mt-1 text-xs text-muted leading-relaxed">{ev.description}</p>
                </div>

                <ul className="mt-4 pt-3 border-t border-line space-y-2 text-xs text-muted">
                  <li className="flex items-center gap-2">
                    <Clock className="size-3.5 text-gold shrink-0" />
                    <span>{formatDate(ev.start, { weekday: "short" })}, {formatTime(ev.start)}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="size-3.5 text-gold shrink-0 mt-0.5" />
                    <span>{ev.venue}</span>
                  </li>
                  {ev.dressCode && (
                    <li className="flex items-center gap-2">
                      <Shirt className="size-3.5 text-gold shrink-0" />
                      <span>Dress code: <strong>{ev.dressCode}</strong></span>
                    </li>
                  )}
                </ul>

                <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.venue + " " + ev.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-maroon font-medium hover:underline"
                  >
                    <MapPin className="size-3.5" /> Google Map
                  </a>

                  <button
                    type="button"
                    onClick={() => toast.success(`${ev.name} calendar mein jod diya gaya!`)}
                    className="inline-flex items-center gap-1 text-muted hover:text-maroon transition-colors"
                  >
                    <CalendarPlus className="size-3.5" /> Calendar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Streaming Info Banner */}
        <section className="mt-14 rounded-3xl bg-maroon-dark text-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="pattern-dots absolute inset-0 opacity-15" aria-hidden />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-maroon-dark mb-3">
                <Radio className="size-3.5" /> Live Streaming Feature
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Door baithe parivar ke liye Live Prasaran
              </h2>
              <p className="mt-2 text-sm text-white/80 max-w-xl">
                Agar aap ya aapka koi rishtedaar kisi wajah se Jaipur na aa payein, to niraash na hon! Har rasam aur phere hamare portal par live prasaran honge.
              </p>
            </div>
            <ButtonLink
              href={`/w/${wedding.slug}`}
              variant="gold"
              className="px-6 py-3 shrink-0 text-sm font-semibold"
            >
              Live Wedding Page Dekhein
            </ButtonLink>
          </div>
        </section>

        {/* RSVP Form Section */}
        <section id="rsvp-section" className="mt-14 scroll-mt-20">
          <div className="max-w-xl mx-auto">
            <RsvpForm
              events={wedding.events}
              initialGuestName={guestName}
              weddingSlug={wedding.slug}
            />
          </div>
        </section>

        {/* Family Greeting & Contact */}
        <footer className="mt-16 text-center text-xs text-muted border-t border-gold/30 pt-8 pb-16 space-y-2">
          <p className="font-serif text-sm font-medium text-maroon">
            दर्शनभिलाषी: समस्त शर्मा एवं जोशी परिवार
          </p>
          <p>
            Sampark ke liye: <a href={`tel:${wedding.hostPhone}`} className="text-maroon font-semibold underline">{wedding.hostPhone}</a>
          </p>
          <p className="pt-2 text-[11px] text-muted/80">
            Powered by <Link href="/" className="text-maroon font-medium hover:underline">Live Shadi</Link> · Digital Vivah &amp; Live Streaming Portal
          </p>
        </footer>
      </main>

      {/* Floating Bottom Action Bar for Easy Mobile Navigation */}
      <nav aria-label="Quick Actions" className="fixed bottom-0 inset-x-0 z-40 border-t border-gold/40 bg-white/95 backdrop-blur px-4 py-3 shadow-lg">
        <div className="mx-auto flex max-w-md items-center justify-around gap-2">
          <button
            type="button"
            onClick={scrollToRsvp}
            className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl bg-maroon py-2 text-xs font-medium text-white hover:bg-maroon-dark transition-colors shadow"
          >
            <Check className="size-4" />
            <span>RSVP Karein</span>
          </button>

          <button
            type="button"
            onClick={() => setIsShareOpen(true)}
            className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl border border-line bg-gold-soft/50 py-2 text-xs font-medium text-maroon hover:bg-rose transition-colors"
          >
            <Share2 className="size-4" />
            <span>WhatsApp Share</span>
          </button>

          <Link
            href={`/w/${wedding.slug}`}
            className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl border border-line bg-white py-2 text-xs font-medium text-muted hover:text-maroon transition-colors"
          >
            <Radio className="size-4 text-red-600" />
            <span>Live Portal</span>
          </Link>
        </div>
      </nav>

      {/* WhatsApp & Personalized QR Share Modal */}
      <InviteShareModal
        wedding={wedding}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        defaultGuest={guestName}
      />
    </div>
  );
}

