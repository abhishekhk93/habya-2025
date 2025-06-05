"use client";

import { useEffect, useState } from "react";
import EventToggleCard from "@/components/menu/register/EventCard";
import Navbar from "@/components/navbar/Navbar";
import {
  hasLessThanThreeTotalEventsRegistered,
  isItemExistsInCart,
} from "@/lib/cart-utils/cartHelpers";
import {
  addItem,
  removeItem,
  setCart,
  saveCartToLocalStorage,
  loadCartFromLocalStorage,
} from "@/store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { eventRules } from "@/lib/events-utils/eventRules";
import { validateTeamEligibility } from "@/lib/cart-utils/cartEligibility";
import { fetchPartnerDetails } from "./utils/fetchPartner";

type Event = {
  id: string;
  name: string;
  isRegistered: boolean;
};

export default function EventsPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.user.user);

  const [events, setEvents] = useState<Event[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [modalEvent, setModalEvent] = useState<Event | null>(null);
  const [partnerId, setPartnerId] = useState("");
  const [partnerIdError, setPartnerIdError] = useState("");
  const [validating, setValidating] = useState(false);

  // Load cart from storage after user is available
  useEffect(() => {
    if (user?.id) {
      const restoredCart = loadCartFromLocalStorage(user.id);
      dispatch(setCart(restoredCart));
    }
  }, [user?.id, dispatch]);

  // Fetch eligible events
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

  const handleAddToCart = (item: any) => {
    dispatch(addItem(item));
    if (user?.id)
      saveCartToLocalStorage(user.id, { items: [...cartItems, item] });
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeItem(id));
    if (user?.id) {
      const updatedItems = cartItems.filter((i) => i.id !== id);
      saveCartToLocalStorage(user.id, { items: updatedItems });
    }
  };

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
              const cartItem = cartItems.find(
                (item) => item.id === String(event.id)
              );
              const isSelectedInCart = !!cartItem;
              const partnerName = cartItem?.partner?.name;

              return (
                <div
                  key={event.id}
                  className="px-2 py-4"
                  style={{
                    borderBottomWidth: "2px",
                    borderBottomStyle: "solid",
                    borderImageSlice: 1,
                    borderImageSource:
                      "linear-gradient(to right, #14b8a6, #3b82f6)", // teal-500 to blue-600
                  }}
                >
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
                      };

                      const alreadyInCart = isItemExistsInCart(
                        cartItems,
                        cartItem.id
                      );

                      if (checked) {
                        if (alreadyInCart) return;
                        if (
                          !hasLessThanThreeTotalEventsRegistered(
                            cartItems,
                            events
                          )
                        )
                          return;

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

                        handleAddToCart(cartItem);
                      } else {
                        if (!alreadyInCart) return;
                        handleRemoveFromCart(cartItem.id);
                      }
                    }}
                  />
                  <p
                    className={`text-xl text-muted-foreground mt-1 transition-all duration-700 ease-in-out`}
                    style={{
                      fontFamily: "'Alumni Sans Pinstripe', cursive",
                      opacity: isSelectedInCart ? 1 : 0,
                      maxHeight: isSelectedInCart ? "100px" : "0px",
                      overflow: "hidden",
                      pointerEvents: isSelectedInCart ? "auto" : "none",
                    }}
                  >
                    {partnerName
                      ? `Event added to cart with partner: ${partnerName}`
                      : "Event added to cart"}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal remains unchanged */}
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
              className="text-xl font-semibold mb-4 text-transparent bg-clip-text text-center"
              style={{
                fontFamily: "'Alumni Sans Pinstripe', cursive",
                backgroundImage: "linear-gradient(to right, #14b8a6, #3b82f6)",
              }}
            >
              Profile ID of your partner for {modalEvent.name}
            </h2>
            <div className="flex justify-center gap-2 mb-2">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  id={`partner-digit-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-12 h-12 text-center rounded border text-white bg-transparent text-lg focus:outline-none"
                  style={{
                    borderImageSlice: 1,
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderImageSource:
                      "linear-gradient(to right, #14b8a6, #3b82f6)",
                    transition: "all 0.3s ease",
                  }}
                  value={partnerId[index] || ""}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (!val) return;

                    const updated = partnerId.split("");
                    updated[index] = val;
                    const newId = updated.join("").padEnd(4, ""); // pad to maintain 4-length
                    setPartnerId(newId);
                    setPartnerIdError("");

                    // Move to next box if exists
                    const nextInput = document.getElementById(
                      `partner-digit-${index + 1}`
                    );
                    if (nextInput && index < 3) nextInput.focus();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace") {
                      e.preventDefault(); // prevent default behavior to control fully

                      const updated = partnerId.split("");
                      if (partnerId[index]) {
                        // If current box has a digit, clear it
                        updated[index] = "";
                        setPartnerId(updated.join("").padEnd(4, ""));
                      } else if (index > 0) {
                        // If current box is already empty, move to previous
                        const prevInput = document.getElementById(
                          `partner-digit-${index - 1}`
                        );
                        if (prevInput) prevInput.focus();

                        // Also clear previous box
                        updated[index - 1] = "";
                        setPartnerId(updated.join("").padEnd(4, ""));
                      }
                    }
                  }}
                />
              ))}
            </div>

            {/* Fixed-height feedback message */}
            <div className="transition-all duration-300 ease-in-out min-h-[3.5rem] mb-2 flex items-center justify-center text-xl text-center px-2">
              {validating ? (
                <div
                  className="flex items-center space-x-2 text-transparent bg-clip-text"
                  style={{
                    fontFamily: "'Alumni Sans Pinstripe', cursive",
                    backgroundImage:
                      "linear-gradient(to right, #14b8a6, #3b82f6)",
                  }}
                >
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  <span>Validating...</span>
                </div>
              ) : partnerIdError ? (
                <p
                  className="text-red-500 text-xl text-center"
                  style={{
                    fontFamily: "'Alumni Sans Pinstripe', cursive",
                  }}
                >
                  {partnerIdError}
                </p>
              ) : (
                <span className="invisible">placeholder</span>
              )}
            </div>

            <div className="flex justify-center space-x-3 mt-4">
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
                  setPartnerIdError("");

                  const isValid = await validatePartnerId(partnerId);
                  if (!isValid) {
                    setValidating(false);
                    setPartnerIdError("Please enter 4 digits profile ID");
                    return;
                  }

                  const partner = await fetchPartnerDetails(partnerId);
                  if (!partner) {
                    setValidating(false);
                    setPartnerIdError("Partner details could not be fetched.");
                    return;
                  }

                  const eventDetails = eventRules.find(
                    (e) => e.id === Number(modalEvent?.id)
                  );
                  if (!modalEvent || !eventDetails) {
                    setValidating(false);
                    return;
                  }
                  // You need to fetch or inject logged-in user details
                  const partnerPlayer = {
                    id: partner.id,
                    dob: partner.dob,
                    gender: partner.gender,
                    phone: partner.phone,
                    name: partner.name,
                  };

                  const errorMsg = validateTeamEligibility(
                    user!,
                    partnerPlayer,
                    partner.registrations,
                    eventDetails,
                    cartItems
                  );
                  if (errorMsg) {
                    setValidating(false);
                    setPartnerIdError(errorMsg);
                    return;
                  }

                  const price = eventDetails.price ?? 0;

                  const cartItem = {
                    id: String(modalEvent.id),
                    name: modalEvent.name,
                    type: "registration" as const,
                    price,
                    quantity: 1,
                    partner: {
                      id: partner.id,
                      name: partner.name,
                    },
                  };

                  handleAddToCart(cartItem);
                  setShowPartnerModal(false);
                  setPartnerId("");
                  setPartnerIdError("");
                  setModalEvent(null);
                  setValidating(false);
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
  return /^\d{4}$/.test(id.trim());
}
