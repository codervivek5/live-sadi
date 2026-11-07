"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button, buttonClass } from "@/components/button";

export default function GlobalRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="grid min-h-screen place-items-center px-4 text-center">
      <div className="max-w-md">
        <p className="text-5xl" aria-hidden>🪔</p>
        <h1 className="font-display mt-4 text-3xl font-semibold text-maroon">Something went wrong</h1>
        <p className="mt-2 text-muted">
          Ye page load nahi ho paya. Ek baar dobara try karein. Agar phir bhi na khule to thodi der baad aayein.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <Link href="/" className={buttonClass("outline")}>
            Go to home
          </Link>
        </div>
      </div>
    </main>
  );
}
