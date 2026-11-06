import type { Metadata } from "next";
import { MediaManager } from "@/components/media-manager";
import { media } from "@/lib/data";

export const metadata: Metadata = { title: "Photos — Live Shadi" };

export default function MediaPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl font-semibold text-maroon">Photos aur videos</h1>
        <p className="text-muted">Mehmaanon ki bheji hui photos approve karein, tabhi wo page par dikhengi.</p>
      </div>
      <MediaManager initial={media} />
    </div>
  );
}
