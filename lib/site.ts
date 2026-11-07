// Single source of truth for brand, URLs and navigation. Override through env vars.

export const site = {
  name: "Live Shadi",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://live-shadi.com").replace(/\/$/, ""),
  tagline: "Watch weddings live. Relive them forever.",
  description:
    "Share your wedding live with every relative, anywhere. Live Shadi gives each wedding one link with live streaming, replays, photos and blessings, long after the last pheras.",
  // Set NEXT_PUBLIC_CONTACT_EMAIL to your real support inbox before launch.
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@live-shadi.com",
  // Social links only render when a URL is configured, so nothing points at an account that does not exist.
  social: [
    { name: "Instagram", url: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
    { name: "YouTube", url: process.env.NEXT_PUBLIC_YOUTUBE_URL },
    { name: "Facebook", url: process.env.NEXT_PUBLIC_FACEBOOK_URL },
  ].filter((s): s is { name: string; url: string } => Boolean(s.url)),
} as const;

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore Weddings" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
] as const;

export const footerNav = {
  Product: [
    { href: "/explore", label: "Explore Weddings" },
    { href: "/services", label: "Services & Pricing" },
    { href: "/w/rahul-weds-priya", label: "Demo wedding page" },
    { href: "/register", label: "Register your wedding" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/sitemap.xml", label: "Sitemap" },
  ],
} as const;

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
