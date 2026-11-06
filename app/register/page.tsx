import type { Metadata } from "next";
import { Suspense } from "react";
import { RegisterFlow } from "@/components/register-flow";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Shaadi register karein — Live Shadi" };

async function RegisterContent({ searchParams }: { searchParams: PageProps<"/register">["searchParams"] }) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.package) ? sp.package[0] : sp.package;
  const initial = raw === "basic" || raw === "standard" || raw === "premium" ? raw : undefined;
  return <RegisterFlow initialPackage={initial} />;
}

export default function RegisterPage(props: PageProps<"/register">) {
  return (
    <>
      <SiteHeader />
      <main className="px-4 py-10">
        <Suspense fallback={<p className="text-center text-muted">Load ho raha hai…</p>}>
          <RegisterContent searchParams={props.searchParams} />
        </Suspense>
      </main>
    </>
  );
}
