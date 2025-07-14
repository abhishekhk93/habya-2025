"use client";

import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function AdminDashboard() {
  const user = useSelector((state: RootState) => state.user.user);
  const isAdmin = user?.role === "admin";

  const adminLinks = [
    { label: "Redeem Coupons", href: "/menu/admin/redeem-coupon" },
    { label: "Registrations", href: "/menu/admin/registrations" },
    { label: "Coupons", href: "/menu/admin/coupons" },
    { label: "Shirts by Phone Number", href: "/menu/admin/shirts-by-number" },
    { label: "Coupons by Phone Number", href: "/menu/admin/coupons-by-number" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-black to-gray-800 text-white">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-3xl mx-auto p-6 rounded-lg shadow-lg border-2 border-transparent transition-all duration-300">
          <h1
            className="text-4xl sm:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 mb-12"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            Admin Dashboard
          </h1>

          {isAdmin ? (
            <div className="flex flex-col items-center space-y-6">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-full max-w-3xs text-center py-2 border border-transparent rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                  style={{
                    fontFamily: "'Alumni Sans Pinstripe', cursive",
                    borderImageSlice: 1,
                    borderImageSource:
                      "linear-gradient(to right, #2dd4bf, #2563eb)",
                  }}
                >
                  <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent text-center px-4">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center mt-10">
              <div
                className="text-2xl font-semibold text-red-400"
                style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
              >
                🚫 You do not have access to this page.
              </div>
              <p
                className="text-gray-500 text-2xl mt-2"
                style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
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
