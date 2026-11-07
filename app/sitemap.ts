import type { MetadataRoute } from "next";
import { wedding } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

// Fixed dates on purpose: `new Date()` would change on every render. Bump when a page's content really changes.
const UPDATED = new Date("2026-11-07");

const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/explore", priority: 0.8, changeFrequency: "weekly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/register", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  // only the public demo wedding is listed; private couples' pages are never added here
  { path: `/w/${wedding.slug}`, priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({
    url: absoluteUrl(p.path),
    lastModified: UPDATED,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
