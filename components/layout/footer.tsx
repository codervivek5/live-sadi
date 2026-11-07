import Link from "next/link";
import { Mail } from "lucide-react";
import { footerNav, site } from "@/lib/site";
import { Logo } from "./logo";

const COPYRIGHT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="bg-maroon-dark text-white/80">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Har shaadi ke liye ek link: live streaming, replay, photos aur aashirwad. Door baithe apne bhi
              shaadi mein shamil.
            </p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-gold hover:underline"
            >
              <Mail className="size-4" aria-hidden /> {site.contactEmail}
            </a>
            {site.social.length > 0 && (
              <ul className="mt-5 flex gap-4 text-sm">
                {site.social.map((s) => (
                  <li key={s.name}>
                    <a href={s.url} target="_blank" rel="noreferrer noopener" className="hover:text-white">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {Object.entries(footerNav).map(([heading, links]) => (
            <nav key={heading} aria-label={heading}>
              <h2 className="text-sm font-semibold text-white">{heading}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>© {COPYRIGHT_YEAR} Live Shadi. All rights reserved.</p>
          <p>Made in India, for every shaadi.</p>
        </div>
      </div>
    </footer>
  );
}
