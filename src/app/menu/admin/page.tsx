"use client";

import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function AdminDashboard() {
  const user = useSelector((state: RootState) => state.user.user);
  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="w-full max-w-xl mx-auto p-6 rounded-lg shadow-lg border-2 border-transparent transition-all duration-300">
          <h1
            className="text-4xl sm:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 mb-10 leading-tight"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            Admin Dashboard
          </h1>

          {isAdmin ? (
            <div className="flex flex-col space-y-6 items-center justify-center">
              <Link
                href="/menu/admin/redeem-coupon"
                className="text-2xl px-6 py-2 border border-transparent bg-transparent transition-transform duration-300 ease-in-out active:scale-95"
                style={{
                  fontFamily: "'Alumni Sans Pinstripe', cursive",
                  borderImageSlice: 1,
                  borderImageSource:
                    "linear-gradient(to right, #2dd4bf, #2563eb)",
                }}
              >
                <span
                  className="bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent"
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                  }}
                >
                  Go to Redeem Coupons
                </span>
              </Link>
            </div>
          ) : (
            <div className="text-center mt-10">
              <div
                className="text-2xl font-semibold text-red-400"
                style={{
                  fontFamily: "'Alumni Sans Pinstripe', cursive",
                  borderImageSlice: 1,
                  borderImageSource:
                    "linear-gradient(to right, #2dd4bf, #2563eb)",
                }}
              >
                🚫 You do not have access to this page.
              </div>
              <p
                className="text-gray-500 text-2xl mt-2"
                style={{
                  fontFamily: "'Alumni Sans Pinstripe', cursive",
                  borderImageSlice: 1,
                  borderImageSource:
                    "linear-gradient(to right, #2dd4bf, #2563eb)",
                }}
              >
                Please contact an administrator.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
