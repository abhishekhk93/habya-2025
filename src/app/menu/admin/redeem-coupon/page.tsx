"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import CouponTypeSelector from "@/components/menu/admin/redeem-coupon/CouponTypeSelector";
import CouponRedeemInput from "@/components/menu/admin/redeem-coupon/CouponRedeemInput";

export default function RedeemCouponPage() {
  const user = useSelector((state: RootState) => state.user.user);
  const [selectedType, setSelectedType] = useState<"lunch" | "snack">("lunch");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isAdmin = user?.role === "admin";

  const handleRedeem = async () => {
    setMessage("");

    // ✅ Frontend validation
    if (!code) {
      setMessage("❗ Please enter a coupon code.");
      return;
    }
    if (!/^\d{4}$/.test(code)) {
      setMessage("❗ Code must be exactly 4 digits.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/redeem-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          meal: selectedType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      // ✅ Success
      setMessage(
        `✅ Coupon redeemed successfully at ${new Date(
          data.redeemed_at
        ).toLocaleString()} and data: ${data}`
      );
      setCode(""); // clear field
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="p-[2px] rounded-lg bg-gradient-to-r from-teal-400 to-blue-600 transition-all duration-300 shadow-lg w-full max-w-xl mx-auto">
          <div className="p-6 rounded-lg bg-gray-900">
            <h1
              className="text-4xl sm:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 mb-10 leading-tight"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              Redeem Coupons
            </h1>

            {isAdmin ? (
              <div className="flex flex-col items-center space-y-6">
                <CouponTypeSelector
                  selectedType={selectedType}
                  onChange={setSelectedType}
                />
                <CouponRedeemInput
                  code={code}
                  onChange={setCode}
                  onRedeem={handleRedeem}
                />

                {/* ✅ Status message */}
                {message && (
                  <div
                    className={`text-lg text-center ${
                      message.startsWith("✅")
                        ? "text-green-400"
                        : message.startsWith("❗")
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                    style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                  >
                    {loading ? "Processing..." : message}
                  </div>
                )}
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
    </div>
  );
}
