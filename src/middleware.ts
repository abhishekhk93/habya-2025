import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = "habya2025";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  console.log("🛡️ Middleware triggered");
  console.log("📍 Pathname:", pathname);
  console.log("🔐 Token present:", !!token);

  const publicPaths = [
    "/",
    "/sign-in",
    "/api/auth/login",
    "/api/auth/create-user",
    "/api/auth/verify-token",
    "/redirect",
    "",
  ];

  const isPublic =
    pathname === "/" ||
    publicPaths
      .filter((p) => p !== "/") // Skip exact `/` from startsWith
      .some((path) => pathname.startsWith(path)) ||
    pathname.startsWith("/_next/");

  console.log("🌐 Is public route:", isPublic);

  if (isPublic) {
    console.log("✅ Allowing public route:", pathname);
    return NextResponse.next();
  }

  if (!token) {
    console.warn("🚫 No token found, redirecting to /sign-in");
    return NextResponse.redirect(new URL("/redirect?to=sign-in", req.url));
  }

  try {
    jwt.verify(token, JWT_SECRET);
    console.log("✅ Token verified successfully");
    return NextResponse.next();
  } catch (err) {
    console.error("❌ JWT verification failed in middleware:", err);
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}

export const config = {
  matcher: [
    // Match everything except /api routes, Next.js internals, and static files
    "/((?!api|_next/static|.well-known|_next/image|profile-setup|favicon.ico).*)",
  ],
};
