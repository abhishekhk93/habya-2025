"use client";

import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  saveCartToLocalStorage,
  setCart,
} from "@/store/slices/cartSlice";
import { RootState } from "@/store/store";
import SponsorSelectCard from "@/components/menu/sponsor/SponsorSelectCard";

const SPONSOR_OPTIONS = [
  { label: "Diamond", price: 15000 },
  { label: "Platinum", price: 10000 },
  { label: "Gold", price: 7500 },
  { label: "Silver", price: 5000 },
  { label: "Bronze", price: 2500 },
];

export default function SponsorPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [selectedTier, setSelectedTier] = useState("Diamond");
  const [customAmount, setCustomAmount] = useState("");

  const getSelectedPrice = () => {
    if (selectedTier === "Custom") {
      const num = Number(customAmount);
      return isNaN(num) || num <= 0 ? 0 : num;
    }
    return (
      SPONSOR_OPTIONS.find((opt) => opt.label === selectedTier)?.price || 0
    );
  };

  const handleAddToCart = () => {
    const price = getSelectedPrice();
    if (price <= 0) return alert("Enter a valid amount");

    const item = {
      id: "22",
      name: "Sponsorship",
      type: "sponsor" as const,
      price,
      quantity: 1,
    };
    // Remove any existing sponsor item (id = "22")
    const updatedCart = cartItems.filter((item) => item.id !== "22");

    // Add the new sponsor item
    const newCart = [...updatedCart, item];

    dispatch(setCart({ items: newCart }));
    if (user?.id) {
      saveCartToLocalStorage(user.id, { items: newCart });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white transition-all duration-1000 ease-in-out">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1
          className="text-4xl sm:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 mb-6 leading-tight"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Support Our Event
        </h1>

        <p
          className="text-center text-2xl text-gray-300 mb-10"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          We’ve been building this tournament for 9 years with passion and
          community love. Your sponsorship helps us bring together talent,
          opportunity, and celebration. Choose a sponsorship tier or contribute
          a custom amount. Every bit of support makes a difference!
        </p>

        <div className="overflow-x-auto">
          <div className="space-y-4">
            {SPONSOR_OPTIONS.map((option) => (
              <SponsorSelectCard
                key={option.label}
                label={option.label}
                price={option.price}
                selected={selectedTier === option.label}
                isCustom={option.label === "Custom"}
                customAmount={customAmount}
                onAmountChange={(val: string) => setCustomAmount(val)}
                onToggle={(checked: boolean) => {
                  if (checked) {
                    setSelectedTier(option.label);
                  } else {
                    setSelectedTier(""); // unselect if toggled off
                  }
                }}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={handleAddToCart}
            className="relative inline-flex items-center justify-center px-6 py-2 border-1 border-transparent rounded-full transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'Alumni Sans Pinstripe', cursive",
              borderImageSlice: 1,
              borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
            }}
          >
            <span
              className="text-white text-2xl sm:text-3xl font-extrabold"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              Add to Cart
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
