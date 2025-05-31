import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // ✅ Edge-compatible

const JWT_SECRET = process.env.JWT_SECRET!;
const encoder = new TextEncoder();

export async function middleware(req: NextRequest) {
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
    "/api/user/events-eligible",
    "/redirect",
  ];

  const isPublic =
    pathname === "/" ||
    publicPaths
      .filter((p) => p !== "/")
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
    const { payload } = await jwtVerify(token, encoder.encode(JWT_SECRET));
    console.log("✅ Token verified in middleware:", payload);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", String(payload.id));
    requestHeaders.set("x-user-phone", String(payload.phone));
    requestHeaders.set("x-user-name", String(payload.name));
    requestHeaders.set("x-user-gender", String(payload.gender));
    requestHeaders.set("x-user-dob", String(payload.dob));

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  } catch (error) {
    console.log("❌ Invalid token: caught in middleware", error);
    const response = NextResponse.redirect(new URL("/redirect?to=sign-in", req.url));

    console.log("🧹 Clearing token cookie");
    response.cookies.set("token", "", {
      maxAge: 0,
      path: "/",
    });

    return response;
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|.well-known|_next/image|profile-setup|favicon.ico).*)",
  ],
};
