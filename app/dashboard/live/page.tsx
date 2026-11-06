import type { Metadata } from "next";
import { LiveControl } from "@/components/live-control";
import { wedding } from "@/lib/data";

export const metadata: Metadata = { title: "Live — Live Shadi" };

export default function LivePage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl font-semibold text-maroon">Live streaming</h1>
        <p className="text-muted">Videographer ko stream key dein, aur function shuru hote hi Go live dabayein.</p>
      </div>
      <LiveControl events={wedding.events} />
    </div>
  );
}
