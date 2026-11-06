import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { DashboardNav } from "@/components/dashboard-nav";
import { Logo } from "@/components/site-header";
import { wedding } from "@/lib/data";

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
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-[13rem_1fr]">
        <aside>
          <DashboardNav />
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
