"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const field =
  "mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/15";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/**
 * No server needed: on submit it opens the visitor's email app with the message filled in,
 * addressed to the configured support inbox.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Please enter a valid email address.";
    if (message.length < 10) next.message = "Please write at least a couple of lines.";
    setErrors(next);
    if (Object.keys(next).length) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    const subject = encodeURIComponent(`Message from ${name} via Live Shadi`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;
    toast.success("Opening your email app. Press send there to reach us.");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-3xl border border-line bg-white p-6 sm:p-8">
      <div>
        <label htmlFor="c-name" className="text-sm font-medium">Your name</label>
        <input id="c-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-err" : undefined} className={cn(field, errors.name && "border-red-500")} />
        {errors.name && <p id="c-name-err" role="alert" className="mt-1 text-xs text-red-700">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="c-email" className="text-sm font-medium">Email</label>
        <input id="c-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-email-err" : undefined} className={cn(field, errors.email && "border-red-500")} />
        {errors.email && <p id="c-email-err" role="alert" className="mt-1 text-xs text-red-700">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="c-message" className="text-sm font-medium">How can we help?</label>
        <textarea id="c-message" name="message" rows={5} aria-invalid={!!errors.message} aria-describedby={errors.message ? "c-message-err" : undefined} className={cn(field, errors.message && "border-red-500")} />
        {errors.message && <p id="c-message-err" role="alert" className="mt-1 text-xs text-red-700">{errors.message}</p>}
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        <Send className="size-4" aria-hidden /> Send message
      </Button>
    </form>
  );
}
