"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import {
  loadCartFromLocalStorage,
  removeItem,
  saveCartToLocalStorage,
  setCart,
} from "@/store/slices/cartSlice";
import Navbar from "@/components/navbar/Navbar";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const user = useSelector((state: RootState) => state.user.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      const restoredCart = loadCartFromLocalStorage(user.id);
      dispatch(setCart(restoredCart));
    }
  }, [user?.id, dispatch]);

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
    if (user?.id) {
      const updatedItems = cartItems.filter((i) => i.id !== id);
      saveCartToLocalStorage(user.id, { items: updatedItems });
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white transition-all duration-1000 ease-in-out">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1
          className="text-3xl sm:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 mb-10 leading-tight"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Your Cart Summary
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-400 text-lg italic">
            🛒 Your cart is empty. Add some events to proceed!
          </p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="px-2 py-4 flex justify-between items-start"
                  style={{
                    borderBottomWidth: "2px",
                    borderBottomStyle: "solid",
                    borderImageSlice: 1,
                    borderImageSource:
                      "linear-gradient(to right, #14b8a6, #3b82f6)", // teal-500 to blue-600
                  }}
                >
                  <div>
                    <h2
                      className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600"
                      style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                    >
                      {item.name}
                    </h2>

                    {item.partner && (
                      <p
                        className="text-sm italic text-gray-300 mt-1"
                        style={{
                          fontFamily: "'Alumni Sans Pinstripe', cursive",
                        }}
                      >
                        Partner: {item.partner.name}
                      </p>
                    )}

                    <p
                      className="text-sm text-gray-400 mt-1"
                      style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                    >
                      ₹{item.price}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-sm text-red-400 hover:text-red-200 transition"
                    style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-10 text-right">
              <p className="text-xl text-gray-200">
                Total:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-bold">
                  ₹{total}
                </span>
              </p>
            </div>

            {/* Proceed to Payment */}
            <div className="mt-6 text-center">
              <button
                onClick={() => router.push("/payment")}
                className="relative inline-block px-6 py-2 rounded-md text-lg font-semibold transition-all duration-300 hover:scale-105"
                style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
              >
                <span className="absolute inset-0 rounded-md p-[2px] bg-gradient-to-r from-teal-500 to-blue-600"></span>
                <span className="relative block bg-gray-900 rounded-md text-white">
                  Proceed to Payment
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
