"use client";
import React, { useState } from "react";
import type { Coupon } from "@/types/Orders";
import { ChevronDown, ChevronUp } from "lucide-react";

export function CouponAccordion({
  title,
  coupons,
}: {
  title: string;
  coupons: Coupon[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left text-2xl font-semibold px-4 py-3 text-white border-b"
        style={{
          borderImage: "linear-gradient(to right, #2dd4bf, #3b82f6) 1",
          borderImageSlice: 1,
          fontFamily: "'Alumni Sans Pinstripe', cursive",
        }}
      >
        <div className="flex justify-between items-center">
          <span>{title}</span>
          <span className="transform transition-transform duration-300">
            {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </span>
        </div>
      </button>

      {/* Accordion Content */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 space-y-3">
          {coupons.length > 0 ? (
            coupons.map((c, idx) => (
              <div
                key={idx}
                className="p-2 bg-white/5 rounded-md flex flex-col"
                style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
              >
                <span className="text-white text-2xl font-semibold">
                  {idx + 1}. {c.meal.charAt(0).toUpperCase() + c.meal.slice(1)}{" "}
                  coupon - {c.coupon_code}
                </span>
                <p className="text-xl text-gray-300 mt-1">
                  {c.type === "default"
                    ? "Coupon assigned to you during registration"
                    : "Coupon you bought"}
                  {c.status === "redeemed" && c.redeemed_at && (
                    <>
                      <br />
                      <span className="text-xl">
                        Redeemed on:{" "}
                        {new Date(c.redeemed_at).toLocaleString("en-GB", {
                          timeZone: "Asia/Kolkata",
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </span>
                    </>
                  )}
                </p>
              </div>
            ))
          ) : (
            <div
              className="text-white text-xl"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              No coupons in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
