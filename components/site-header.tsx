import Link from "next/link";
import { ButtonLink } from "./button";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`font-display text-xl font-semibold text-maroon ${className}`}>
      Live <span className="text-gold">Shadi</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          <Link href="/#kaise-kaam-karta-hai" className="hover:text-maroon">Kaise kaam karta hai</Link>
          <Link href="/#features" className="hover:text-maroon">Features</Link>
          <Link href="/#pricing" className="hover:text-maroon">Pricing</Link>
          <Link href="/#faq" className="hover:text-maroon">Sawal</Link>
          <Link href="/w/rahul-weds-priya" className="hover:text-maroon">Demo page</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href="/dashboard" variant="ghost" className="hidden sm:inline-flex">
            Login
          </ButtonLink>
          <ButtonLink href="/register">Shaadi register karein</ButtonLink>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted sm:flex-row">
        <Logo />
        <p>© Live Shadi. Pyaar se banaya gaya 💛</p>
      </div>
    </footer>
  );
}
