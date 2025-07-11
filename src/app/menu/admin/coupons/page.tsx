"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Navbar from "@/components/navbar/Navbar";
import Unauthorized from "@/components/menu/admin/Unauthorized";
import CouponSummary from "@/components/menu/admin/coupons/CouponSummary";
import CouponTimeSlotSummary from "@/components/menu/admin/coupons/CouponTimeSlotSummary";
import {
  CouponSummaryResponse,
  RedeemedTimeSlotSummarySimple, // ✅ updated type
} from "@/components/menu/admin/coupons/types";

export default function AdminCouponsPage() {
  const user = useSelector((state: RootState) => state.user.user);
  const isAdmin = user?.role === "admin";

  const [summary, setSummary] = useState<CouponSummaryResponse | null>(null);
  const [timeSlotSummary, setTimeSlotSummary] = useState<
    RedeemedTimeSlotSummarySimple[] | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const [summaryRes, timeSlotRes] = await Promise.all([
          fetch("/api/admin/coupons/coupon-count", { credentials: "include" }),
          fetch("/api/admin/coupons/redemption-activity", {
            credentials: "include",
          }),
        ]);

        if (!summaryRes.ok || !timeSlotRes.ok) {
          console.error("API error:", summaryRes.status, timeSlotRes.status);
          throw new Error("One or both API calls failed.");
        }

        const summaryData = await summaryRes.json();
        const timeSlotData = await timeSlotRes.json();

        setSummary(summaryData);
        setTimeSlotSummary(timeSlotData.summary);
      } catch (error) {
        console.error("Failed to fetch coupon summaries", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) fetchSummaries();
  }, [isAdmin]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-black to-gray-800 text-white">
      <Navbar />
      <div className="px-4 py-12 max-w-4xl mx-auto">
        <h1
          className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600 mb-12"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Coupons Overview
        </h1>

        {!isAdmin ? (
          <Unauthorized />
        ) : loading ? (
          <div
            className="text-center text-3xl"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            Loading...
          </div>
        ) : summary && timeSlotSummary ? (
          <>
            <CouponTimeSlotSummary data={timeSlotSummary} />
            <CouponSummary summary={summary} />
          </>
        ) : (
          <div className="text-center text-xl text-red-400">
            Failed to load summary
          </div>
        )}
      </div>
    </div>
  );
}
