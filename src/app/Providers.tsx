"use client";

import { useEffect, ReactNode } from "react";
import { Provider, useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { store } from "@/store/store";
import { setUser } from "@/store/slices/userSlice";
import { setAuthenticated } from "@/store/slices/authSlice";
import { setStep } from "@/store/slices/authSlice"; // assuming you have this
import { isPublicRoute } from "@/lib/path-utils/isPublicRoute";

// Internal component to handle loading user data
function InternalProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/verify-token", { credentials: "include" });

        if (res.ok) {
          const data = await res.json();
          dispatch(setUser(data.user));
          dispatch(setAuthenticated(true));
        } else {
          // Token invalid: reset and redirect
          dispatch(setUser(null));
          dispatch(setAuthenticated(false));
          dispatch(setStep("phone"));
          // Only redirect if not already on a public path
          if (!isPublicRoute(pathname)) {
            router.replace("/redirect?to=sign-in");
          }
        }
      } catch (error) {
        console.error("❌ Failed to load user", error);
        dispatch(setUser(null));
        dispatch(setAuthenticated(false));
        dispatch(setStep("phone"));
        // Only redirect if not already on a public path
        if (!isPublicRoute(pathname)) {
          router.replace("/redirect?to=sign-in");
        }
      }
    }

    loadUser();
  }, [dispatch, router, pathname]);

  return <>{children}</>;
}

// Main Providers wrapper that exposes Redux store and triggers auth check
export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <InternalProvider>{children}</InternalProvider>
    </Provider>
  );
}
