import { NextResponse, type NextRequest } from "next/server";

// OpenNext 1.20 supports the Edge Middleware output but not Next 16's
// Node-runtime proxy output. Keep this convention until the adapter supports it.
export function middleware(request: NextRequest) {
  // Build the redirect target from a native URL: NextURL clones don't
  // reliably reflect host/protocol mutations in the OpenNext edge bundle.
  const url = new URL(request.url);
  const isLocal =
    url.hostname === "localhost" || url.hostname === "127.0.0.1";

  if (url.host.startsWith("www.")) {
    url.host = url.host.slice(4);
  }
  if (!isLocal && url.protocol === "http:") {
    url.protocol = "https:";
  }

  if (url.href !== request.url) {
    return NextResponse.redirect(url.href, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|.*\\..*).*)",
};
