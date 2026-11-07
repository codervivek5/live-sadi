import type { Metadata } from "next";
import { PrivacySettings } from "@/components/privacy-settings";
import { wedding } from "@/lib/data";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl font-semibold text-maroon">Settings</h1>
        <p className="text-muted">Privacy, visibility aur QR code.</p>
      </div>
      <PrivacySettings events={wedding.events} slug={wedding.slug} names={`${wedding.groom} & ${wedding.bride}`} />
    </div>
  );
}
