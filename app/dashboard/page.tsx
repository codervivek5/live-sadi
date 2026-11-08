import type { Metadata } from "next";
import { Eye, Heart, ImagePlus, Radio, Users } from "lucide-react";
import { QrCard } from "@/components/qr-card";
import { ButtonLink } from "@/components/button";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { blessings, dashboardStats, media, packages, wedding } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardHome() {
  const pending = media.filter((m) => m.status === "pending").length;
  const pkg = packages.find((p) => p.id === "standard")!;
  const stats = [
    { label: "Page views", value: dashboardStats.pageViews, icon: Eye },
    { label: "Live viewers (peak)", value: dashboardStats.liveViewersPeak, icon: Radio },
    { label: "Guest uploads", value: dashboardStats.guestUploads, icon: ImagePlus },
    { label: "Blessings", value: blessings.length + 8, icon: Heart },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-maroon">Namaste 🙏</h1>
        <p className="text-muted">
          {wedding.groom} &amp; {wedding.bride} · Shaadi {formatDate(wedding.weddingDate)} · {wedding.city}
        </p>
      </div>

      <Stagger className="grid grid-cols-2 gap-3 lg:grid-cols-4" gap={0.07}>
        {stats.map((s) => (
          <StaggerItem key={s.label} className="rounded-2xl border border-line bg-white p-4 transition-shadow hover:shadow-md">
            <s.icon className="size-5 text-gold" />
            <p className="mt-2 text-2xl font-semibold tabular-nums"><CountUp to={s.value} /></p>
            <p className="text-xs text-muted">{s.label}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="grid gap-6 lg:grid-cols-5">
        <Reveal className="space-y-4 lg:col-span-3" delay={0.1}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-gold bg-gradient-to-r from-gold-soft/80 to-rose/30 p-4">
            <div>
              <span className="text-[11px] font-semibold text-gold uppercase tracking-wider">Digital Invitations &amp; RSVP</span>
              <h2 className="font-semibold text-maroon text-base">Guest Count &amp; Aamantran Status</h2>
              <p className="text-xs text-muted mt-0.5">Mehmaanon ki upasthiti, bhojan ki count aur personalized WhatsApp invite bhejein.</p>
            </div>
            <ButtonLink href="/dashboard/rsvps" variant="primary" className="shrink-0 text-xs py-2">
              RSVPs Dekhein
            </ButtonLink>
          </div>

          {pending > 0 && (
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-gold bg-gold-soft p-4 text-sm">
              <span className="flex items-center gap-2"><Users className="size-4" /> {pending} guest photos approval ka intezaar kar rahi hain</span>
              <ButtonLink href="/dashboard/media" variant="primary" className="shrink-0 py-1.5">Dekhein</ButtonLink>
            </div>
          )}

          <div className="rounded-2xl border border-line bg-white p-5">
            <h2 className="font-semibold">Aapka package</h2>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="font-display text-2xl text-maroon">{pkg.name}</p>
                <p className="text-sm text-muted">Page online: 3 saal tak · Live: 4 ghante bacha hai</p>
              </div>
              <ButtonLink href="/dashboard/settings" variant="outline">Upgrade</ButtonLink>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5">
            <h2 className="font-semibold">Aane wale functions</h2>
            <ul className="mt-3 divide-y divide-line">
              {wedding.events.filter((e) => e.status !== "ended").map((e) => (
                <li key={e.id} className="flex items-center justify-between py-2.5 text-sm">
                  <span>{e.emoji} {e.name}</span>
                  <span className={e.status === "live" ? "font-semibold text-red-600" : "text-muted"}>
                    {e.status === "live" ? "LIVE abhi" : formatDate(e.start, { day: "numeric", month: "short" })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-2" delay={0.2}>
          <h2 className="mb-3 font-semibold">Aapka QR code</h2>
          <QrCard slug={wedding.slug} names={`${wedding.groom} & ${wedding.bride}`} />
        </Reveal>
      </div>
    </div>
  );
}
