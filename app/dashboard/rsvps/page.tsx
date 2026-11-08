import type { Metadata } from "next";
import { RsvpManager } from "@/components/dashboard/rsvp-manager";
import { wedding, sampleRsvps } from "@/lib/data";

export const metadata: Metadata = {
  title: "RSVP & Guest Count",
  description: "Track wedding guests attendance, food preferences and personalized invitations.",
};

export default function RsvpsDashboardPage() {
  return <RsvpManager wedding={wedding} initialRsvps={sampleRsvps} />;
}

