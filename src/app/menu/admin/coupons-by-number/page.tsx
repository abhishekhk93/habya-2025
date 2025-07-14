"use client";

import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { CouponAccordion } from "@/components/menu/orders/CouponAccordion";

type Coupon = {
  coupon_code: number;
  meal: string;
  type: "default" | "bought";
  status: "active" | "redeemed";
  redeemed_at: Date | null;
  assigned_at: Date | null;
  user_id: number;
};

export default function CouponLookupPage() {
  const [phone, setPhone] = useState("");
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setCoupons([]);

    if (!/^\d{10}$/.test(phone)) {
      setError("❗ Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/coupons/coupons-by-number", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setCoupons(data.coupons || []);
    } catch (err: unknown) {
      const e = err as Error;
      setError(`❌ ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const activeCoupons = coupons.filter((c) => c.status === "active");
  const redeemedCoupons = coupons.filter((c) => c.status === "redeemed");

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1
          className="text-4xl sm:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-12"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Coupons Lookup
        </h1>

        {/* Phone Input */}
        <div className="flex items-center justify-center mb-12 space-x-3">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="text-2xl px-4 py-2 bg-gray-800 text-white border border-gray-700 w-48 text-center"
            placeholder="Phone number"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          />
          <button
            onClick={handleSearch}
            className="relative inline-flex items-center justify-center px-6 py-2 border-1 border-transparent rounded-full transition-all duration-100 transform active:scale-95 active:shadow-lg"
            style={{
              fontFamily: "'Alumni Sans Pinstripe', cursive",
              borderImageSlice: 1,
              borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
            }}
          >
            <span
              className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              Search
            </span>
          </button>
        </div>

        {/* Loader / Error */}
        {loading && (
          <div
            className="text-white text-xl text-center mb-6"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            Searching...
          </div>
        )}
        {error && (
          <div
            className="text-red-400 text-xl text-center mb-6"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            {error}
          </div>
        )}

        {/* Coupons Section or Placeholder */}
        <div
          className="p-6 rounded-md"
          style={{
            border: "2px solid transparent",
            borderImage: "linear-gradient(to right, #2dd4bf, #3b82f6) 1",
            borderImageSlice: 1,
          }}
        >
          <h2
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-6 text-center"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            Coupon Details
          </h2>

          {coupons.length > 0 ? (
            <>
              {/* Active Coupons */}
              <h3
                className="text-3xl font-semibold mb-4 text-white"
                style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
              >
                Active Coupons
              </h3>
              <CouponAccordion
                title="Lunch Coupons"
                coupons={activeCoupons.filter((c) => c.meal === "lunch")}
              />
              <CouponAccordion
                title="Snack Coupons"
                coupons={activeCoupons.filter((c) => c.meal === "snack")}
              />

              {/* Redeemed Coupons */}
              <h3
                className="text-3xl font-semibold mt-10 mb-4 text-white"
                style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
              >
                Redeemed Coupons
              </h3>
              <CouponAccordion
                title="Lunch Coupons"
                coupons={redeemedCoupons.filter((c) => c.meal === "lunch")}
              />
              <CouponAccordion
                title="Snack Coupons"
                coupons={redeemedCoupons.filter((c) => c.meal === "snack")}
              />
            </>
          ) : (
            !loading &&
            !error && (
              <div
                className="text-white text-2xl text-center"
                style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
              >
                No coupon records found for this number.
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
