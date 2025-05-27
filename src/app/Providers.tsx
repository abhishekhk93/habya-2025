"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPhone, setAuthenticated } from "@/store/slices/authSlice";

// A wrapper component that restores auth state and provides Redux store
function AuthRestorer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const phone = localStorage.getItem("habyaphone");
    if (phone) {
      dispatch(setPhone(phone));
      dispatch(setAuthenticated(true));
    }
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthRestorer>{children}</AuthRestorer>
    </Provider>
  );
}
