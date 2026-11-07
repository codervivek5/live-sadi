import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ButtonLink } from "@/components/button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="grid flex-1 place-items-center px-4 py-24 text-center">
        <div>
          <p className="text-5xl" aria-hidden>💍</p>
          <h1 className="font-display mt-4 text-3xl font-semibold text-maroon">We could not find that page</h1>
          <p className="mx-auto mt-2 max-w-sm text-muted">
            The link may be wrong, or this wedding page has not been created yet.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/">Go to home</ButtonLink>
            <ButtonLink href="/explore" variant="outline">
              Explore weddings
            </ButtonLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
