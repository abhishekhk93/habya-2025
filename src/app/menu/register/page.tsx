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
  CartItem,
} from "@/store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { eventRules } from "@/lib/events-utils/eventRules";
import { validateTeamEligibility } from "@/lib/cart-utils/cartEligibility";
import { fetchPartnerDetails } from "./utils/fetchPartner";
import { useRouter } from "next/navigation";

import CartEmptyModal from "@/components/menu/register/CartEmptyModal";
import PartnerModal from "@/components/menu/register/PartnerModal";

type Event = {
  id: string;
  name: string;
  isRegistered: boolean;
};

type EventsResponse = {
  eligibleEvents: Event[];
  registrationsOpen: boolean;
};

export default function EventsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.user.user);

  const [events, setEvents] = useState<Event[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showCartEmptyModal, setShowCartEmptyModal] = useState(false);
  const [registrationsOpen, setRegistrationsOpen] = useState(true);

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

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const res = await fetch("/api/user/events-eligible");
        if (!res.ok) throw new Error("Failed to fetch events");

        const data: EventsResponse = await res.json();
        setEvents(data?.eligibleEvents || []);
        setRegistrationsOpen(data.registrationsOpen);
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

  const handleAddToCart = (item: CartItem) => {
    dispatch(addItem(item));
    if (user?.id) {
      saveCartToLocalStorage(user.id, { items: [...cartItems, item] });
    }
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeItem(id));
    if (user?.id) {
      const updatedItems = cartItems.filter((i) => i.id !== id);
      saveCartToLocalStorage(user.id, { items: updatedItems });
    }
  };

  /**
   * Invoked when “Proceed to Cart” is clicked.
   * If cart is empty, show the “empty cart” modal.
   * Otherwise, navigate to /cart/summary.
   */
  const onProceedToCart = () => {
    if (cartItems.length === 0) {
      setShowCartEmptyModal(true);
      return;
    }
    router.push("/cart/summary");
  };

  /**
   * Called when toggling an event’s checkbox.
   * If it’s a doubles/mixed-doubles event, open partner modal.
   * Otherwise, add/remove from cart directly.
   */
  const onToggleEvent = async (event: Event, checked: boolean) => {
    const eventDetails = eventRules.find((e) => e.id === Number(event.id));
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

    const alreadyInCart = isItemExistsInCart(cartItems, cartItem.id);

    if (checked && events) {
      if (alreadyInCart) return;
      if (!hasLessThanThreeTotalEventsRegistered(cartItems, events)) return;

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
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white transition-all duration-1000 ease-in-out">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        {registrationsOpen && (
          <h1
            className="text-3xl sm:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 mb-10 leading-tight"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            Events you are eligible for:
          </h1>
        )}
        {loading && (
          <p
            className="text-center text-3xl text-gray-300 animate-pulse"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            Loading events..
          </p>
        )}
        {error && (
          <p className="text-center text-red-400 text-lg">
            Something went wrong while fetching events. Please try again later.
          </p>
        )}
        {!loading && !registrationsOpen && (
          <div className="flex items-center justify-center min-h-[80vh]">
            <p
              className="text-2xl sm:text-6xl font-bold text-center text-gray-300 leading-tight"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              Sorry, registrations are not being taken as of now.
            </p>
          </div>
        )}

        {!loading && registrationsOpen && events && events.length === 0 && (
          <p
            className="text-3xl sm:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 mb-10 leading-tight"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            🎉 You are not eligible for any events at the moment. Stay tuned!
          </p>
        )}
        {!loading && registrationsOpen && events && events.length > 0 && (
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
                      "linear-gradient(to right, #14b8a6, #3b82f6)",
                  }}
                >
                  <EventToggleCard
                    name={event.name}
                    selected={event.isRegistered || isSelectedInCart}
                    isRegistered={event.isRegistered}
                    onToggle={(checked: boolean) =>
                      onToggleEvent(event, checked)
                    }
                  />
                  <p
                    className="text-xl text-white mt-1 transition-all duration-700 ease-in-out"
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

            <div className="mt-12 text-center">
              <button
                onClick={onProceedToCart}
                className="relative inline-flex items-center justify-center px-6 py-2 border-1 border-transparent rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: "'Alumni Sans Pinstripe', cursive",
                  borderImageSlice: 1,
                  borderImageSource:
                    "linear-gradient(to right, #14b8a6, #3b82f6)",
                }}
              >
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 text-2xl sm:text-3xl font-extrabold"
                  style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                >
                  Proceed to Cart
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cart Empty Modal */}
      {showCartEmptyModal && (
        <CartEmptyModal onClose={() => setShowCartEmptyModal(false)} />
      )}

      {/* Partner ID Modal */}
      {showPartnerModal && modalEvent && (
        <PartnerModal
          event={modalEvent}
          partnerId={partnerId}
          partnerIdError={partnerIdError}
          validating={validating}
          onChange={(newId: string) => {
            setPartnerId(newId);
            setPartnerIdError("");
          }}
          onCancel={() => {
            setShowPartnerModal(false);
            setPartnerId("");
            setPartnerIdError("");
            setModalEvent(null);
          }}
          onSubmit={async () => {
            setValidating(true);
            setPartnerIdError("");

            if (!/^\d{4}$/.test(partnerId.trim())) {
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
              (e) => e.id === Number(modalEvent.id)
            );
            if (!modalEvent || !eventDetails) {
              setValidating(false);
              return;
            }

            const partnerPlayer = {
              id: partner.id,
              dob: partner.dob,
              gender: partner.gender,
              phone: partner.phone,
              name: partner.name,
              role: partner.role,
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
        />
      )}
    </div>
  );
}
