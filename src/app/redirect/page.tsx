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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4 py-10">
      <div
        className="max-w-sm w-full p-8 space-y-6"
        style={{
          borderWidth: "2px",
          borderStyle: "solid",
          borderRadius: "0.75rem",
          borderImageSlice: 1,
          borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)", // teal to blue
        }}
      >
        <h2
          className="text-3xl sm:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Authentication Required
        </h2>

        <p
          className="text-2xl text-white text-center"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          You are not logged in to access this page.
        </p>

        <p
          className="text-2xl text-white text-center"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Redirecting to{" "}
          <span className="font-medium text-teal-400">
            {to === "sign-in" ? "Sign In / Sign Up" : to}
          </span>
          ...
        </p>

        <div className="pt-6 flex space-x-1 justify-center">
          <span
            className="block w-2 h-2 bg-teal-400 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="block w-2 h-2 bg-teal-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <span
            className="block w-2 h-2 bg-teal-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    </div>
  );
}
