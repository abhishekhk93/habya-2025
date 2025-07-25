"use client";

import { useEffect, useState } from "react";
import type { Coupon, Sponsorship, Registration, Shirt } from "@/types/Orders";
import Navbar from "@/components/navbar/Navbar";
import { CouponAccordion } from "@/components/menu/orders/CouponAccordion";
import { shirtTypeLabels } from "@/app/api/payment/complete/utils/typechecks";

export default function MyOrdersPage() {
  const [data, setData] = useState<{
    registrations: Registration[] | null;
    activeCoupons: Coupon[] | null;
    redeemedCoupons: Coupon[] | null;
    sponsorships: Sponsorship[] | null;
    shirts: Shirt[] | null;
    userName: string | null;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/my-orders");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <p
          className="text-center text-3xl text-gray-300 animate-pulse"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Loading your orders..
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <p className="text-lg italic">No order details found.</p>
      </div>
    );
  }

  const {
    registrations = [],
    activeCoupons = [],
    redeemedCoupons = [],
    sponsorships,
    shirts = [],
    userName,
  } = data;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white transition-all duration-1000 ease-in-out">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1
          className="text-4xl sm:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-10"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Your Order Summary
        </h1>

        {/* Events Section */}
        <div
          className="p-6 rounded-2xl border mb-8"
          style={{
            borderWidth: "2px",
            borderImage: "linear-gradient(to right, #14b8a6, #3b82f6) 1",
          }}
        >
          <h2
            className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-6"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            Registered Events
          </h2>

          {registrations && registrations.length > 0 ? (
            <div className="space-y-4">
              {registrations.map((reg, idx) => {
                return (
                  <div
                    key={idx}
                    className="p-2 transition bg-white/5 rounded-md flex items-start gap-4"
                  >
                    {/* Event Details */}
                    <div>
                      <p
                        className="text-2xl text-white font-semibold leading-tight"
                        style={{
                          fontFamily: "'Alumni Sans Pinstripe', cursive",
                        }}
                      >
                        {idx + 1}. {reg.events.name}
                      </p>

                      {reg.users_registrations_player2_idTousers && (
                        <p
                          className="text-lg text-gray-300 mt-1"
                          style={{
                            fontFamily: "'Alumni Sans Pinstripe', cursive",
                          }}
                        >
                          Partner:{" "}
                          {userName ===
                          reg.users_registrations_player2_idTousers?.name
                            ? reg.users_registrations_player1_idTousers?.name
                            : reg.users_registrations_player2_idTousers?.name}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className="text-white text-2xl px-2"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              No registrations found for you yet. Please register for the
              interested events from the menu options.
            </div>
          )}
        </div>

        {/* Coupons Section */}
        <div
          className="p-6 rounded-md mb-10"
          style={{
            border: "2px solid transparent",
            borderImage: "linear-gradient(to right, #2dd4bf, #3b82f6) 1",
            borderImageSlice: 1,
          }}
        >
          <h2
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-6"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            Food Coupons
          </h2>

          {/* Active Coupons */}
          <div className="mb-6">
            <h3
              className="text-3xl font-semibold mb-4 text-white"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              Active
            </h3>
            <CouponAccordion
              title="Lunch Coupons"
              coupons={activeCoupons?.filter((c) => c.meal === "lunch") ?? []}
            />
            <CouponAccordion
              title="Snack Coupons"
              coupons={activeCoupons?.filter((c) => c.meal === "snack") ?? []}
            />
          </div>

          {/* Redeemed Coupons */}
          <div>
            <h3
              className="text-3xl font-semibold mb-4 text-white"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              Redeemed
            </h3>
            <CouponAccordion
              title="Lunch Coupons"
              coupons={redeemedCoupons?.filter((c) => c.meal === "lunch") ?? []}
            />
            <CouponAccordion
              title="Snack Coupons"
              coupons={redeemedCoupons?.filter((c) => c.meal === "snack") ?? []}
            />
          </div>
        </div>

        {/* Sponsorship Section */}
        {Array.isArray(sponsorships) && (
          <div
            className="p-6 rounded-2xl border mt-10 mb-10"
            style={{
              borderWidth: "2px",
              borderImage: "linear-gradient(to right, #2dd4bf, #3b82f6) 1",
            }}
          >
            <h2
              className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-6"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              Sponsorship
            </h2>

            {sponsorships.length > 0 ? (
              <>
                <p
                  className="text-2xl text-white mb-4"
                  style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                >
                  Thank you for your generous contributions!
                </p>

                <div className="space-y-4">
                  {sponsorships.map((s, i) => (
                    <div
                      key={i}
                      className="p-2 transition bg-white/5 rounded-md flex items-start gap-3"
                    >
                      <p
                        className="text-xl text-white font-semibold"
                        style={{
                          fontFamily: "'Alumni Sans Pinstripe', cursive",
                        }}
                      >
                        {`${i + 1}. ₹ ${s.amount}`}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p
                className="text-2xl text-white font-medium"
                style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
              >
                No sponsorships displayed at the moment.
              </p>
            )}
          </div>
        )}

        {/* T-Shirts section styled similarly */}

        <div
          className="p-6 rounded-md mb-10"
          style={{
            border: "2px solid transparent",
            borderImage: "linear-gradient(to right, #06b6d4, #3b82f6) 1",
            borderImageSlice: 1,
          }}
        >
          <h2
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-6"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            Shirts
          </h2>
          {shirts && shirts.length > 0 ? (
            <div className="space-y-4">
              {shirts.map((shirt, idx) => (
                <div
                  key={idx}
                  className="p-2 transition bg-white/5 rounded-md flex items-start gap-4"
                  style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                >
                  <span className="text-white text-xl font-semibold">
                    {idx + 1}. {"Name: "}
                    {shirt.name ? `${shirt.name} ` : ""}
                    <br /> {"Size: "} {shirt.size}
                    <br /> {"Type: "}
                    {shirtTypeLabels[shirt?.type]}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="text-white text-2xl px-2"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              No shirts found for you yet. Please check the merchandise section.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
