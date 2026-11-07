import { Suspense } from "react";
import { RegisterFlow } from "@/components/register-flow";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";

const description =
  "Register your wedding on Live Shadi in about five minutes. Pick your functions and package, then get a shareable link and QR for live streaming, photos and blessings.";

export const metadata = pageMetadata({ title: "Register Your Wedding", description, path: "/register" });

async function RegisterContent({ searchParams }: { searchParams: PageProps<"/register">["searchParams"] }) {
  const sp = (await searchParams) ?? {};
  const raw = Array.isArray(sp.package) ? sp.package[0] : sp.package;
  const initial = raw === "basic" || raw === "standard" || raw === "premium" ? raw : undefined;
  return <RegisterFlow initialPackage={initial} />;
}

function RegisterSkeleton() {
  return (
    <div className="mx-auto max-w-2xl" aria-busy="true" aria-label="Loading registration">
      <Skeleton className="h-9 w-64" />
      <div className="mt-6 grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-1.5" />
        ))}
      </div>
      <Skeleton className="mt-6 h-64 rounded-2xl" />
    </div>
  );
}

export default function RegisterPage(props: PageProps<"/register">) {
  return (
    <div className="px-4 py-10">
      <JsonLd data={webPageJsonLd({ name: "Register Your Wedding", description, path: "/register" })} />
      <div className="mx-auto mb-6 max-w-2xl">
        <Breadcrumbs items={[{ name: "Register", path: "/register" }]} />
      </div>
      <Suspense fallback={<RegisterSkeleton />}>
        <RegisterContent searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
