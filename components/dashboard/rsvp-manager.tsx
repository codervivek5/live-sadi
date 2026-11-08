"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  UserCheck,
  UserX,
  Utensils,
  Search,
  Download,
  Plus,
  Trash2,
  MessageCircle,
  Share2,
  CalendarDays,
  Sparkles,
  Phone,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/button";
import { InviteShareModal } from "@/components/invite/invite-share-modal";
import type { GuestRsvp, Wedding } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export function RsvpManager({
  initialRsvps,
  wedding,
}: {
  initialRsvps: GuestRsvp[];
  wedding: Wedding;
}) {
  const [rsvps, setRsvps] = useState<GuestRsvp[]>(initialRsvps);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "attending" | "declined">("all");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New guest manual form state
  const [newGuest, setNewGuest] = useState({
    name: "",
    phone: "",
    attending: true,
    adultsCount: 2,
    kidsCount: 0,
    diet: "veg" as "veg" | "jain" | "all",
    note: "",
    attendingEvents: wedding.events.map((e) => e.id),
  });

  // Sync with any newly submitted RSVPs from localStorage
  useEffect(() => {
    try {
      const allKey = `liveshadi_all_rsvps_${wedding.slug}`;
      const stored = localStorage.getItem(allKey);
      if (stored) {
        const localList = JSON.parse(stored) as GuestRsvp[];
        // Merge without duplicates by ID
        setRsvps((prev) => {
          const ids = new Set(prev.map((r) => r.id));
          const uniqueNew = localList.filter((r) => !ids.has(r.id));
          return [...uniqueNew, ...prev];
        });
      }
    } catch {
      /* ignore */
    }
  }, [wedding.slug]);

  // Derived statistics
  const attendingRsvps = rsvps.filter((r) => r.attending);
  const declinedRsvps = rsvps.filter((r) => !r.attending);

  const totalAdults = attendingRsvps.reduce((acc, r) => acc + r.adultsCount, 0);
  const totalKids = attendingRsvps.reduce((acc, r) => acc + r.kidsCount, 0);
  const totalConfirmedGuests = totalAdults + totalKids;

  const dietCounts = attendingRsvps.reduce(
    (acc, r) => {
      acc[r.diet] = (acc[r.diet] || 0) + (r.adultsCount + r.kidsCount);
      return acc;
    },
    { veg: 0, jain: 0, all: 0 } as Record<string, number>,
  );

  // Function-wise guest count
  const eventCounts = wedding.events.map((ev) => {
    const count = attendingRsvps
      .filter((r) => r.attendingEvents.includes(ev.id))
      .reduce((sum, r) => sum + r.adultsCount + r.kidsCount, 0);
    return { ...ev, guestCount: count };
  });

  // Filtered RSVPs
  const displayedRsvps = rsvps.filter((r) => {
    const matchesFilter =
      filter === "all" ? true : filter === "attending" ? r.attending : !r.attending;
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search) ||
      (r.note && r.note.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  function handleDelete(id: string) {
    setRsvps((prev) => prev.filter((r) => r.id !== id));
    try {
      const allKey = `liveshadi_all_rsvps_${wedding.slug}`;
      const stored = JSON.parse(localStorage.getItem(allKey) || "[]") as GuestRsvp[];
      localStorage.setItem(allKey, JSON.stringify(stored.filter((r) => r.id !== id)));
    } catch {
      /* ignore */
    }
    toast.success("RSVP record hata diya gaya.");
  }

  function handleAddManualRsvp(e: React.FormEvent) {
    e.preventDefault();
    if (!newGuest.name.trim()) {
      toast.error("Kripya mehmaan ka naam likhein.");
      return;
    }

    const created: GuestRsvp = {
      id: `manual-${Date.now()}`,
      name: newGuest.name.trim(),
      phone: newGuest.phone.trim(),
      attending: newGuest.attending,
      adultsCount: newGuest.attending ? newGuest.adultsCount : 0,
      kidsCount: newGuest.attending ? newGuest.kidsCount : 0,
      attendingEvents: newGuest.attending ? newGuest.attendingEvents : [],
      diet: newGuest.attending ? newGuest.diet : "all",
      note: newGuest.note.trim() || undefined,
      submittedAt: new Date().toISOString(),
    };

    setRsvps((prev) => [created, ...prev]);
    try {
      const allKey = `liveshadi_all_rsvps_${wedding.slug}`;
      const stored = JSON.parse(localStorage.getItem(allKey) || "[]");
      localStorage.setItem(allKey, JSON.stringify([created, ...stored]));
    } catch {
      /* ignore */
    }

    setIsAddModalOpen(false);
    setNewGuest({
      name: "",
      phone: "",
      attending: true,
      adultsCount: 2,
      kidsCount: 0,
      diet: "veg",
      note: "",
      attendingEvents: wedding.events.map((e) => e.id),
    });
    toast.success("Mehmaan ka record jud gaya!");
  }

  function exportCsv() {
    const headers = [
      "ID",
      "Guest Name",
      "Phone",
      "Status",
      "Total Guests",
      "Adults",
      "Kids",
      "Diet",
      "Functions Attending",
      "Wishes/Note",
      "Submitted At",
    ];

    const rows = rsvps.map((r) => [
      `"${r.id}"`,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.phone}"`,
      r.attending ? "Attending" : "Declined",
      r.adultsCount + r.kidsCount,
      r.adultsCount,
      r.kidsCount,
      r.diet,
      `"${r.attendingEvents.join(", ")}"`,
      `"${(r.note ?? "").replace(/"/g, '""')}"`,
      `"${r.submittedAt}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `live-shadi-rsvps-${wedding.slug}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV file download ho gayi!");
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-maroon">
            RSVP &amp; Guest Count
          </h1>
          <p className="text-sm text-muted">
            Mehmaanon ke nimantran, upasthiti aur bhojan ki jaankari ek jagah.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button variant="outline" onClick={exportCsv} className="text-xs py-2">
            <Download className="size-3.5" /> CSV Export
          </Button>
          <Button variant="outline" onClick={() => setIsShareOpen(true)} className="text-xs py-2">
            <Share2 className="size-3.5" /> Send Invite on WhatsApp
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)} className="text-xs py-2">
            <Plus className="size-3.5" /> Guest Jodein
          </Button>
        </div>
      </div>

      {/* Primary KPI Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-2xl border border-line bg-white p-4 transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted">Total Confirmed Mehmaan</span>
            <Users className="size-4 text-gold" />
          </div>
          <p className="mt-2 text-3xl font-bold text-maroon tabular-nums">
            {totalConfirmedGuests}
          </p>
          <p className="mt-1 text-xs text-muted">
            {totalAdults} Bade · {totalKids} Bachche
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-white p-4 transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted">Aamantran Javab (Families)</span>
            <UserCheck className="size-4 text-green-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-foreground tabular-nums">
            {rsvps.length}
          </p>
          <p className="mt-1 text-xs text-muted">
            <strong className="text-green-700">{attendingRsvps.length} Haan</strong> ·{" "}
            <span className="text-red-600">{declinedRsvps.length} Nahi</span>
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-white p-4 transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted">Shakahari Bhojan (Veg)</span>
            <Utensils className="size-4 text-gold" />
          </div>
          <p className="mt-2 text-3xl font-bold text-maroon tabular-nums">
            {dietCounts.veg + dietCounts.jain}
          </p>
          <p className="mt-1 text-xs text-muted">
            {dietCounts.jain} Jain Plate · {dietCounts.veg} Pure Veg
          </p>
        </div>

        <div className="rounded-2xl border border-gold/50 bg-gradient-to-br from-gold-soft to-rose/30 p-4 transition-shadow hover:shadow-md flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-gold uppercase tracking-wider">Quick Action</span>
            <h4 className="font-semibold text-maroon text-sm mt-0.5">Nimantran Card</h4>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <ButtonLink
              href={`/w/${wedding.slug}/invite`}
              target="_blank"
              variant="primary"
              className="py-1 px-3 text-xs flex-1"
            >
              Card Kholein
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Function-wise Attendance Bar Graph / Cards */}
      <div className="rounded-2xl border border-line bg-white p-5">
        <h2 className="font-semibold text-sm text-foreground flex items-center gap-2">
          <CalendarDays className="size-4 text-gold" /> Function-wise Expected Attendance
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {eventCounts.map((ev) => (
            <div
              key={ev.id}
              className="rounded-xl border border-line bg-background/50 p-3 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{ev.emoji}</span>
                <span className="text-xs font-bold text-maroon bg-white px-2 py-0.5 rounded-full border border-line">
                  {ev.guestCount} Mehmaan
                </span>
              </div>
              <div className="mt-3">
                <p className="font-semibold text-xs text-foreground truncate">{ev.name}</p>
                <div className="mt-1.5 h-1.5 w-full bg-line rounded-full overflow-hidden">
                  <div
                    className="h-full bg-maroon rounded-full transition-all duration-500"
                    style={{
                      width: `${totalConfirmedGuests > 0 ? (ev.guestCount / totalConfirmedGuests) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search, Filter & Guest List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Filter Pills */}
          <div className="flex gap-1.5 self-start" role="tablist">
            {(
              [
                ["all", `Sabhi (${rsvps.length})`],
                ["attending", `Aayenge (${attendingRsvps.length})`],
                ["declined", `Nahi Aayenge (${declinedRsvps.length})`],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                role="tab"
                aria-selected={filter === id}
                type="button"
                onClick={() => setFilter(id)}
                className={`rounded-full border px-3.5 py-1 text-xs font-medium transition-colors ${
                  filter === id
                    ? "border-maroon bg-maroon text-white"
                    : "border-line bg-white text-muted hover:border-maroon/30"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 size-4 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Naam ya phone se khojein..."
              className="w-full rounded-full border border-line bg-white py-1.5 pl-9 pr-4 text-xs outline-none focus:border-maroon"
            />
          </div>
        </div>

        {/* Guest Cards / Table */}
        {displayedRsvps.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-white p-12 text-center text-muted">
            <Users className="mx-auto size-8 text-gold" />
            <p className="mt-2 text-sm font-medium">Koi RSVP nahi mila.</p>
            <p className="text-xs text-muted mt-0.5">
              WhatsApp par nimantran share karein taaki mehmaan RSVP bhej sakein.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-line rounded-2xl border border-line bg-white overflow-hidden shadow-sm">
            {displayedRsvps.map((guest) => {
              const waFollowUp = guest.phone
                ? `https://wa.me/91${guest.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                    `Namaste ${guest.name}! Rahul aur Priya ki shaadi ka digital card aur function schedule yahan dekhein: https://live-shadi.com/w/${wedding.slug}/invite?guest=${encodeURIComponent(
                      guest.name,
                    )}`,
                  )}`
                : "";

              return (
                <div
                  key={guest.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gold-soft/10 transition-colors"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-semibold text-sm text-foreground">
                        {guest.name}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          guest.attending
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {guest.attending ? (
                          <>
                            <UserCheck className="size-3" /> Aayenge
                          </>
                        ) : (
                          <>
                            <UserX className="size-3" /> Nahi Aa Paenge
                          </>
                        )}
                      </span>

                      {guest.attending && (
                        <span className="rounded-full bg-gold-soft px-2.5 py-0.5 text-[11px] font-medium text-maroon-dark">
                          {guest.adultsCount + guest.kidsCount} Mehmaan ({guest.adultsCount} Bade, {guest.kidsCount} Bachche)
                        </span>
                      )}

                      {guest.diet && guest.attending && (
                        <span className="rounded-full bg-line px-2 py-0.5 text-[10px] text-muted capitalize">
                          {guest.diet === "jain" ? "Jain Bhojan" : guest.diet === "veg" ? "Pure Veg" : "Normal"}
                        </span>
                      )}
                    </div>

                    {guest.phone && (
                      <p className="text-xs text-muted flex items-center gap-1.5 font-mono">
                        <Phone className="size-3" /> {guest.phone}
                      </p>
                    )}

                    {guest.note && (
                      <p className="text-xs text-muted italic bg-background/80 p-2 rounded-lg border border-line mt-1 max-w-xl">
                        &ldquo;{guest.note}&rdquo;
                      </p>
                    )}

                    {guest.attending && guest.attendingEvents.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        <span className="text-[10px] text-muted">Functions:</span>
                        {guest.attendingEvents.map((id) => {
                          const ev = wedding.events.find((e) => e.id === id);
                          return (
                            <span key={id} className="text-[11px] font-medium text-maroon">
                              {ev?.emoji} {ev?.name ?? id}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {guest.phone && (
                      <a
                        href={waFollowUp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-green-600/30 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 hover:bg-green-100"
                        title="WhatsApp Sandesh Bhejein"
                      >
                        <MessageCircle className="size-3.5" /> WhatsApp
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(guest.id)}
                      className="rounded-lg p-1.5 text-muted hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="RSVP record hatayein"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Manual Guest Add Modal */}
      {isAddModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-line bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-xl font-semibold text-maroon">
              Naya Guest Record Jodein
            </h3>
            <p className="text-xs text-muted mt-0.5">
              Phone ya personally aane wale mehmaano ki upasthiti yahan darj karein.
            </p>

            <form onSubmit={handleAddManualRsvp} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-medium">Mehmaan / Parivar ka Naam *</label>
                <input
                  required
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                  placeholder="Jaise: Verma Ji & Parivar"
                  className="mt-1 w-full rounded-xl border border-line px-3 py-2 text-xs outline-none focus:border-maroon"
                />
              </div>

              <div>
                <label className="block text-xs font-medium">Mobile Number</label>
                <input
                  type="tel"
                  value={newGuest.phone}
                  onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                  placeholder="10 digit number"
                  className="mt-1 w-full rounded-xl border border-line px-3 py-2 text-xs outline-none focus:border-maroon"
                />
              </div>

              <div className="flex gap-4 text-xs font-medium">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    checked={newGuest.attending}
                    onChange={() => setNewGuest({ ...newGuest, attending: true })}
                    className="accent-maroon"
                  />
                  <span>Haan, aayenge</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    checked={!newGuest.attending}
                    onChange={() => setNewGuest({ ...newGuest, attending: false })}
                    className="accent-maroon"
                  />
                  <span>Nahi aa payenge</span>
                </label>
              </div>

              {newGuest.attending && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium">Bade (Adults)</label>
                      <input
                        type="number"
                        min={1}
                        max={50}
                        value={newGuest.adultsCount}
                        onChange={(e) =>
                          setNewGuest({ ...newGuest, adultsCount: parseInt(e.target.value, 10) || 1 })
                        }
                        className="mt-1 w-full rounded-xl border border-line px-3 py-1.5 text-xs outline-none focus:border-maroon"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium">Bachche (Kids)</label>
                      <input
                        type="number"
                        min={0}
                        max={30}
                        value={newGuest.kidsCount}
                        onChange={(e) =>
                          setNewGuest({ ...newGuest, kidsCount: parseInt(e.target.value, 10) || 0 })
                        }
                        className="mt-1 w-full rounded-xl border border-line px-3 py-1.5 text-xs outline-none focus:border-maroon"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium">Bhojan Pasand</label>
                    <select
                      value={newGuest.diet}
                      onChange={(e) =>
                        setNewGuest({ ...newGuest, diet: e.target.value as "veg" | "jain" | "all" })
                      }
                      className="mt-1 w-full rounded-xl border border-line px-3 py-1.5 text-xs outline-none focus:border-maroon bg-white"
                    >
                      <option value="veg">Pure Vegetarian</option>
                      <option value="jain">Jain Bhojan (No onion/garlic)</option>
                      <option value="all">Normal / No restriction</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-medium">Sandesh / Note</label>
                <textarea
                  rows={2}
                  value={newGuest.note}
                  onChange={(e) => setNewGuest({ ...newGuest, note: e.target.value })}
                  placeholder="Koi vishesh note..."
                  className="mt-1 w-full rounded-xl border border-line px-3 py-1.5 text-xs outline-none focus:border-maroon"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="py-1.5 text-xs"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="py-1.5 text-xs">
                  Save Karein
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share / WhatsApp Invite Modal */}
      <InviteShareModal
        wedding={wedding}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
}

