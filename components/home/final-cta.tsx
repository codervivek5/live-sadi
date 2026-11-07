import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/motion";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-heading" className="relative overflow-hidden bg-maroon-dark py-20 text-center text-white">
      <div className="pattern-dots absolute inset-0 opacity-15" aria-hidden />
      <div aria-hidden className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-t-full border border-gold/25" />
      <Reveal className="relative mx-auto max-w-2xl px-4">
        <h2 id="cta-heading" className="font-display text-3xl font-semibold sm:text-5xl">
          Your Beautiful Story Starts Here.
        </h2>
        <p className="mt-4 text-white/80">
          Create your wedding page in about five minutes and share it before the invitations go out.
        </p>
        <ButtonLink href="/register" variant="gold" className="mt-8 px-7 py-3 text-base">
          Get Started Today
        </ButtonLink>
        <p className="mt-5 text-sm text-white/65">
          Want to look around first?{" "}
          <Link href="/w/rahul-weds-priya" className="underline underline-offset-4">
            Open the demo wedding page
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
