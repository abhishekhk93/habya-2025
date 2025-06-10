const publicPaths = [
    "/",
    "/sign-in",
    "/api/auth/login",
    "/api/auth/create-user",
    "/api/auth/verify-token",
    "/api/user/events-eligible",
    "/redirect",
    "/profile-setup"
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
  