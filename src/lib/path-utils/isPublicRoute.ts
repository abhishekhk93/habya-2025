const publicPaths = [
    "/",
    "/sign-in",
    "/sign-in/v2",
    "/api/auth/login",
    "/api/auth/create-user",
    "/api/auth/verify-token",
    "/api/user/events-eligible",
    "/redirect",
    "/profile-setup",
    "/footer/privacy-policy",
    "/footer/terms-and-conditions",
  ];
  
  export function isPublicRoute(pathname: string): boolean {
    return (
      pathname === "/" ||
      publicPaths
        .filter((p) => p !== "/")
        .some((path) => pathname.startsWith(path)) ||
      pathname.startsWith("/_next/")
    );
  }
  