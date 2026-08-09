import { NextResponse, type NextRequest } from "next/server";

// OpenNext 1.20 supports the Edge Middleware output but not Next 16's
// Node-runtime proxy output. Keep this convention until the adapter supports it.
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (host.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.host = host.slice(4);
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|.*\\..*).*)",
};
