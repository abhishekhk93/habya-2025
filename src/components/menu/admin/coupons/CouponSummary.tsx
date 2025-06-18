"use client";

import React from "react";
import { CouponSummaryResponse } from "./types";

export default function CouponSummary({
  summary,
}: {
  summary: CouponSummaryResponse;
}) {
  const rows = [
    {
      label: "Lunch - Default",
      active: summary.lunchDefaultActive,
      redeemed: summary.lunchDefaultRedeemed,
    },
    {
      label: "Lunch - Bought",
      active: summary.lunchBoughtActive,
      redeemed: summary.lunchBoughtRedeemed,
    },
    {
      label: "Snack - Default",
      active: summary.snackDefaultActive,
      redeemed: summary.snackDefaultRedeemed,
    },
    {
      label: "Snack - Bought",
      active: summary.snackBoughtActive,
      redeemed: summary.snackBoughtRedeemed,
    },
  ];

  return (
    <div
      className="mb-10 overflow-x-auto rounded-xl border-1 p-4"
      style={{
        borderImage: "linear-gradient(to right, #2dd4bf, #2563eb) 1",
        fontFamily: "'Alumni Sans Pinstripe', cursive",
      }}
    >
      <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600">
        Coupon Summary
      </h2>

      <table className="min-w-full text-white text-center text-xl">
        <thead>
          <tr className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 text-2xl bg-white/8 border border-white/8">
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Active</th>
            <th className="px-4 py-2">Redeemed</th>
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={idx}
              className={
                idx % 2 === 0
                  ? "bg-white/5 border-b border-white/10"
                  : "bg-white/10 border-b border-white/10"
              }
            >
              <td className="px-4 py-2">{row.label}</td>
              <td className="px-4 py-2">{row.active}</td>
              <td className="px-4 py-2">{row.redeemed}</td>
              <td className="px-4 py-2">{row.active + row.redeemed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
