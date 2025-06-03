"use client";

import { useEffect, useState } from "react";
import EventToggleCard from "@/components/menu/register/EventCard";
import Navbar from "@/components/navbar/Navbar";
import {
  canAddRegistrationItem,
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

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        console.log("Calling events-eligible API");
        const res = await fetch("/api/user/events-eligible");

        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();

        if (data?.eligibleEvents?.length === 0) {
          setEvents([]);
        } else {
          setEvents(data.eligibleEvents);
        }

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
    <div className="min-h-screen bg-gradient-to-r from-teal-100 to-blue-200 text-gray-800">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1
          className="text-3xl sm:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Events you are eligible for:
        </h1>

        {loading && (
          <p className="text-center text-lg italic animate-pulse">
            Loading events...
          </p>
        )}

        {error && (
          <p className="text-center text-red-600 text-lg">
            Something went wrong while fetching events. Please try again later.
          </p>
        )}

        {!loading && events && events.length === 0 && (
          <p className="text-center text-gray-600 text-lg italic">
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
                  onToggle={(checked) => {
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
                      if (alreadyInCart) {
                        console.log("Item already in cart.");
                        return;
                      }

                      if (!canAddRegistrationItem(cartItems)) {
                        console.log("You can register for up to 3 events only.");
                        return;
                      }

                      dispatch(addItem(cartItem));
                      console.log(`Added to cart: ${cartItem.name}`);
                    } else {
                      if (!alreadyInCart) {
                        console.log("Item not in cart to remove.");
                        return;
                      }

                      dispatch(removeItem(cartItem.id));
                      console.log(`Removed from cart: ${cartItem.name}`);
                    }
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
