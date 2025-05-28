"use client";

import { useEffect, ReactNode } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";
import { setUser } from "@/store/slices/userSlice";
import { setAuthenticated } from "@/store/slices/authSlice";

// Internal component to handle loading user data
function InternalProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/verify-token", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          dispatch(setUser(data.user));
          dispatch(setAuthenticated(true));
        } else {
          dispatch(setUser(null));
          dispatch(setAuthenticated(false));
        }
      } catch (error) {
        console.error("Failed to load user", error);
        dispatch(setUser(null));
        dispatch(setAuthenticated(false));
      }
    }

    loadUser();
  }, [dispatch]);

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
