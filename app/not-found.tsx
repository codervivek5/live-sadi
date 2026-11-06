import { ButtonLink } from "@/components/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <p className="text-5xl">💍</p>
        <h1 className="font-display mt-4 text-3xl font-semibold text-maroon">Ye page nahi mila</h1>
        <p className="mt-2 text-muted">Link galat ho sakta hai, ya ye shaadi ka page abhi tak bana nahi hai.</p>
        <ButtonLink href="/" className="mt-6">Home par jayein</ButtonLink>
      </div>
    </main>
  );
}
