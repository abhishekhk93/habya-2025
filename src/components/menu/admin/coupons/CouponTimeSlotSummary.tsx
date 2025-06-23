"use client";

import React from "react";
import { RedeemedTimeSlotSummarySimple } from "./types";

export default function CouponTimeSlotSummary({
  data,
}: {
  data: RedeemedTimeSlotSummarySimple[];
}) {
  return (
    <div
      className="mb-10 overflow-x-auto rounded-xl border-1 p-4"
      style={{
        borderImage: "linear-gradient(to right, #2dd4bf, #2563eb) 1",
        fontFamily: "'Alumni Sans Pinstripe', cursive",
      }}
    >
      <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600">
        Redemption by Time Slot
      </h2>

      <table className="min-w-full text-white text-center text-lg border border-white/10">
        <thead>
          <tr className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 text-2xl bg-white/8 border border-white/8">
            <th className="px-4 py-2">Time Slot</th>
            <th className="px-4 py-2">Total Redeemed</th>
          </tr>
        </thead>
        <tbody>
          {data.map((slot, idx) => (
            <tr
              key={idx}
              className={
                idx % 2 === 0
                  ? "bg-white/8 border-b border-white/10"
                  : "bg-white/10 border-b border-white/10"
              }
            >
              <td className="px-4 py-2">{slot.label}</td>
              <td className="px-4 py-2">{slot.redeemed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
