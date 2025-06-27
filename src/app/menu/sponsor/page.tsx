"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
  setCart,
} from "@/store/slices/cartSlice";
import { RootState } from "@/store/store";
import SponsorSelectCard from "@/components/menu/sponsor/SponsorSelectCard";
import Link from "next/link";

type SponsorOption = {
  label: string;
  price: number;
};

export default function SponsorPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [sponsorOptions, setSponsorOptions] = useState<SponsorOption[]>([]);
  const [selectedTier, setSelectedTier] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [showCustomError, setShowCustomError] = useState(false);

  // ✅ Load env vars safely on client only
  useEffect(() => {
    const getPrice = (key: string, fallback: number): number => {
      const raw = {
        DIAMOND: process.env.NEXT_PUBLIC_SPONSOR_DIAMOND,
        PLATINUM: process.env.NEXT_PUBLIC_SPONSOR_PLATINUM,
        GOLD: process.env.NEXT_PUBLIC_SPONSOR_GOLD,
        SILVER: process.env.NEXT_PUBLIC_SPONSOR_SILVER,
        BRONZE: process.env.NEXT_PUBLIC_SPONSOR_BRONZE,
      }[key];

      console.log(`${key} price from env:`, raw);
      const parsed = Number(raw);
      return isNaN(parsed) || parsed <= 0 ? fallback : parsed;
    };

    setSponsorOptions([
      { label: "Diamond", price: getPrice("DIAMOND", 15000) },
      { label: "Platinum", price: getPrice("PLATINUM", 10000) },
      { label: "Gold", price: getPrice("GOLD", 7500) },
      { label: "Silver", price: getPrice("SILVER", 5000) },
      { label: "Bronze", price: getPrice("BRONZE", 2500) },
      { label: "Custom", price: 0 },
    ]);
  }, []);

  useEffect(() => {
    if (user?.id) {
      const restoredCart = loadCartFromLocalStorage(user.id);
      dispatch(setCart(restoredCart));
    }
  }, [user?.id, dispatch]);

  useEffect(() => {
    const sponsorItem = cartItems.find((item) => item.id === "22");
    if (sponsorItem) {
      const matchedTier = sponsorOptions.find(
        (opt) => opt.price === sponsorItem.price
      )?.label;

      if (matchedTier) {
        setSelectedTier(matchedTier);
      } else {
        setSelectedTier("Custom");
        setCustomAmount(sponsorItem.price.toString());
      }
    } else {
      setSelectedTier("");
      setCustomAmount("");
    }
  }, [cartItems, sponsorOptions]);

  const getSelectedPrice = (tier: string): number => {
    if (tier === "Custom") {
      const num = Number(customAmount);
      return isNaN(num) || num <= 0 ? 0 : num;
    }
    return sponsorOptions.find((opt) => opt.label === tier)?.price || 0;
  };

  const addSponsorToCart = (tier: string) => {
    const price = getSelectedPrice(tier);
    if (price <= 0) return;

    const item = {
      id: "22",
      name: "Sponsorship",
      type: "sponsor" as const,
      price,
      quantity: 1,
    };

    const updatedCart = [...cartItems.filter((i) => i.id !== "22"), item];
    dispatch(setCart({ items: updatedCart }));
    if (user?.id) saveCartToLocalStorage(user.id, { items: updatedCart });
  };

  const removeSponsorFromCart = () => {
    const updatedCart = cartItems.filter((i) => i.id !== "22");
    dispatch(setCart({ items: updatedCart }));
    if (user?.id) saveCartToLocalStorage(user.id, { items: updatedCart });
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
          Habya is now in its 9th edition — a tournament built on passion,
          tradition, and community spirit. Your sponsorship helps us bring
          together talent, opportunity, and celebration. Choose a sponsorship
          tier to contribute. Every bit of support makes a difference!
        </p>

        <div className="space-y-4">
          {sponsorOptions.map((option) => (
            <SponsorSelectCard
              key={option.label}
              label={option.label}
              price={option.price}
              selected={selectedTier === option.label}
              isCustom={option.label === "Custom"}
              customAmount={customAmount}
              onAmountChange={(val: string) => setCustomAmount(val)}
              showError={option.label === "Custom" && showCustomError}
              onToggle={(checked: boolean) => {
                if (checked) {
                  if (option.label === "Custom") {
                    const amt = Number(customAmount);
                    if (!isNaN(amt) && amt > 0) {
                      setSelectedTier("Custom");
                      addSponsorToCart("Custom");
                      setShowCustomError(false);
                    } else {
                      setShowCustomError(true);
                    }
                  } else {
                    setSelectedTier(option.label);
                    setCustomAmount("");
                    setShowCustomError(false);
                    addSponsorToCart(option.label);
                  }
                } else {
                  setSelectedTier("");
                  removeSponsorFromCart();
                  setShowCustomError(false);
                  if (option.label === "Custom") setCustomAmount("");
                }
              }}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/cart/summary"
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
              Proceed to Cart
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
