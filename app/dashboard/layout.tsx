import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { DashboardNav } from "@/components/dashboard-nav";
import type { Metadata } from "next";
import { Logo } from "@/components/layout/logo";
import { wedding } from "@/lib/data";

// private area: keep it out of search results
export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s | Live Shadi" },
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-muted sm:inline">
              {wedding.groom} &amp; {wedding.bride}
            </span>
            <Link
              href={`/w/${wedding.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-maroon/30 px-3.5 py-1.5 font-medium text-maroon hover:bg-rose"
            >
              Page dekhein <ExternalLink className="size-3.5" />
            </Link>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-6 px-4 py-6 md:grid-cols-[13rem_minmax(0,1fr)]">
        <aside className="min-w-0">
          <DashboardNav />
        </aside>
        <main id="main" className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
