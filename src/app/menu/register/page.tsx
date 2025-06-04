"use client";

import { useEffect, useState } from "react";
import EventToggleCard from "@/components/menu/register/EventCard";
import Navbar from "@/components/navbar/Navbar";
import {
  hasLessThanThreeTotalEventsRegistered,
  isItemExistsInCart,
} from "@/lib/cart-utils/cartHelpers";
import { addItem, removeItem } from "@/store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { eventRules } from "@/lib/events-utils/eventRules";

type Event = {
  id: string;
  name: string;
  isRegistered: boolean;
};

export default function EventsPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [events, setEvents] = useState<Event[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [modalEvent, setModalEvent] = useState<Event | null>(null);
  const [partnerId, setPartnerId] = useState("");
  const [partnerIdError, setPartnerIdError] = useState("");
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const res = await fetch("/api/user/events-eligible");
        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        setEvents(data?.eligibleEvents || []);
        setError(false);
      } catch (e) {
        console.error("Error fetching events:", e);
        setError(true);
        setEvents(null);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white transition-all duration-1000 ease-in-out">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1
          className="text-3xl sm:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 mb-10 leading-tight"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Events you are eligible for:
        </h1>

        {loading && (
          <p className="text-center text-lg italic text-gray-300 animate-pulse">
            Loading events...
          </p>
        )}

        {error && (
          <p className="text-center text-red-400 text-lg">
            Something went wrong while fetching events. Please try again later.
          </p>
        )}

        {!loading && events && events.length === 0 && (
          <p className="text-center text-gray-400 text-lg italic">
            🎉 You are not eligible for any events at the moment. Stay tuned!
          </p>
        )}

        {!loading && events && events.length > 0 && (
          <div className="space-y-4">
            {events.map((event) => {
              const isSelectedInCart = isItemExistsInCart(
                cartItems,
                String(event.id)
              );

              return (
                <EventToggleCard
                  key={event.id}
                  name={event.name}
                  selected={event.isRegistered || isSelectedInCart}
                  isRegistered={event.isRegistered}
                  onToggle={async (checked) => {
                    const eventDetails = eventRules.find(
                      (e) => e.id === Number(event.id)
                    );
                    const price = eventDetails?.price ?? 0;

                    if (!eventDetails) {
                      console.warn(`Unknown event type: ${event.name}`);
                      return;
                    }

                    const cartItem = {
                      id: String(event.id),
                      name: event.name,
                      type: "registration" as const,
                      price,
                      quantity: 1,
                      userId: "debug-user-id-123",
                    };

                    const alreadyInCart = isItemExistsInCart(
                      cartItems,
                      cartItem.id
                    );

                    if (checked) {
                      if (alreadyInCart) return;
                      if (!hasLessThanThreeTotalEventsRegistered(cartItems, events)) return;

                      // Check if doubles event needs partner ID
                      if (
                        eventDetails.type === "doubles" ||
                        eventDetails.type === "mixed_doubles"
                      ) {
                        setModalEvent(event);
                        setShowPartnerModal(true);
                        setPartnerId("");
                        setPartnerIdError("");
                        return;
                      }

                      // For singles events - add immediately
                      dispatch(addItem(cartItem));
                    } else {
                      if (!alreadyInCart) return;
                      dispatch(removeItem(cartItem.id));
                    }
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      {showPartnerModal && modalEvent && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-1000 ease-in-out"
          style={{
            background: "linear-gradient(to right, #1f2937, #000000, #1f2937)",
          }}
        >
          <div
            className="rounded-lg p-6 max-w-sm w-full shadow-lg border border-gray-700"
            style={{
              background:
                "linear-gradient(to right, #1f2937, #000000, #1f2937)",
            }}
          >
            <h2
              className="text-xl font-semibold mb-4 text-transparent bg-clip-text"
              style={{
                fontFamily: "'Alumni Sans Pinstripe', cursive",
                backgroundImage: "linear-gradient(to right, #14b8a6, #3b82f6)",
              }}
            >
              Enter the profile ID of your partner for {modalEvent.name}
            </h2>

            <input
              type="text"
              value={partnerId}
              onChange={(e) => {
                setPartnerId(e.target.value);
                setPartnerIdError("");
              }}
              placeholder="Partner ID"
              className="w-full p-2 mb-2 rounded border bg-transparent text-white placeholder-gray-400 focus:outline-none"
              style={{
                borderImageSlice: 1,
                borderWidth: "2px",
                borderStyle: "solid",
                borderImageSource: partnerId.trim()
                  ? "linear-gradient(to right, #14b8a6, #3b82f6)"
                  : "gray",
                transition: "border-image-source 0.3s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderImageSource =
                  "linear-gradient(to right, #14b8a6, #3b82f6)";
              }}
              onBlur={(e) => {
                if (!partnerId.trim()) {
                  e.currentTarget.style.borderImageSource = "gray";
                }
              }}
            />

            {/* Fixed-height feedback message */}
            <div className="h-5 mb-2 flex items-center space-x-2">
              {validating ? (
                <>
                  {/* Gradient spinner using stroke with gradient ID */}
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <defs>
                      <linearGradient
                        id="gradientSpinner"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="url(#gradientSpinner)"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="url(#gradientSpinner)"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>

                  {/* Gradient-styled text */}
                  <p className="text-sm bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
                    Validating...
                  </p>
                </>
              ) : partnerIdError ? (
                <p className="text-red-500 text-sm">{partnerIdError}</p>
              ) : (
                <span className="text-sm">&nbsp;</span>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded text-white transition"
                style={{ backgroundColor: "rgba(75, 85, 99, 0.8)" }}
                onClick={() => {
                  setShowPartnerModal(false);
                  setPartnerId("");
                  setPartnerIdError("");
                  setModalEvent(null);
                }}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded text-white transition disabled:opacity-50 active:scale-95"
                disabled={!partnerId.trim() || validating}
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #14b8a6, #3b82f6)",
                  border: "none",
                }}
                onClick={async () => {
                  setValidating(true);
                  const isValid = await validatePartnerId(partnerId);
                  setValidating(false);

                  if (!isValid) {
                    setPartnerIdError("Invalid partner ID. Please try again.");
                    return;
                  }

                  if (!modalEvent) return;

                  const eventDetails = eventRules.find(
                    (e) => e.id === Number(modalEvent.id)
                  );
                  const price = eventDetails?.price ?? 0;

                  const cartItem = {
                    id: String(modalEvent.id),
                    name: modalEvent.name,
                    type: "registration" as const,
                    price,
                    quantity: 1,
                    partnerId: Number(partnerId),
                  };

                  dispatch(addItem(cartItem));
                  setShowPartnerModal(false);
                  setPartnerId("");
                  setPartnerIdError("");
                  setModalEvent(null);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

async function validatePartnerId(id: string): Promise<boolean> {
  // Simulate API delay
  await new Promise((r) => setTimeout(r, 1500));

  // Simple validation: ID must be non-empty and start with 'user-' (example)
  return id.trim().length > 0 && id.startsWith("user-");
}
