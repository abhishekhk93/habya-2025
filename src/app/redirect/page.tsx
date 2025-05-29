"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RedirectingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const to = searchParams.get("to") || "sign-in";

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(`/${to}`);
    }, 3000);

    return () => clearTimeout(timer);
  }, [to, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-teal-50 text-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-teal-100 max-w-sm w-full">
        <h2 className="pb-8 text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
          Authentication required
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          You are not logged in to access this page.
        </p>

        <p className="text-sm text-gray-500 mb-4">
          Redirecting to{" "}
          <span className="font-medium text-teal-700">
            {to === "sign-in" ? "Sign In / Sign Up" : to}
          </span>
          ...
        </p>

        <div className="p-8 flex space-x-1 justify-center">
          <span
            className="block w-2 h-2 bg-teal-700 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="block w-2 h-2 bg-teal-700 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <span
            className="block w-2 h-2 bg-teal-700 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    </div>
  );
}
