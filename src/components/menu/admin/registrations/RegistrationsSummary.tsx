"use client";

import React from "react";
import { Registration } from "./types";

export default function RegistrationsSummary({
  registrations,
}: {
  registrations: Registration[];
}) {
  const total = registrations.length;
  const singles = registrations.filter((reg) => !reg.player2_name).length;
  const doubles = total - singles;

  return (
    <div
      className="mb-10 overflow-x-auto rounded-xl border-1 p-4"
      style={{
        borderImage: "linear-gradient(to right, #2dd4bf, #2563eb) 1",
        fontFamily: "'Alumni Sans Pinstripe', cursive",
      }}
    >
      <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600">
        Summary
      </h2>

      <table className="min-w-full text-white text-center text-xl">
        <thead>
          <tr className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 text-2xl bg-white/8 border border-white/8">
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Count</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white/5 ">
            <td className="px-4 py-2">Singles</td>
            <td className="px-4 py-2">{singles}</td>
          </tr>
          <tr className="bg-white/8 border-b border-white/8">
            <td className="px-4 py-2">Doubles</td>
            <td className="px-4 py-2">{doubles}</td>
          </tr>
          <tr className="bg-white/5 border-b border-white/10">
            <td className="px-4 py-2">Total</td>
            <td className="px-4 py-2">{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
