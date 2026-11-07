import { NextResponse, type NextRequest } from "next/server";
import { wedding } from "@/lib/data";

// Phase 1: only the demo wedding exists. Answering unknown wedding links here, before the page streams,
// gives search engines a real 404 status instead of a 200 "soft 404".
// When couples' pages come from the API, replace this check with a lookup.
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug !== wedding.slug) {
    return NextResponse.rewrite(new URL("/_missing", request.url), { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/w/:slug*",
};
