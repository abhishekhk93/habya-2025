"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/components/navbar/Navbar";
import { RootState } from "@/store/store";
import {
  CartItem,
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
  setCart,
} from "@/store/slices/cartSlice";

export default function FoodCouponPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const COUPON_ID = "23";
  const COUPON_LABEL = "(Lunch + Snack) Coupon";

  const [quantity, setQuantity] = useState(0);
  const [couponPrice, setCouponPrice] = useState(50); // fallback default

  // ✅ Get price from env (client-side only)
  useEffect(() => {
    const envPrice = Number(process.env.NEXT_PUBLIC_FOOD_COUPON_PRICE);
    if (!isNaN(envPrice) && envPrice > 0) {
      setCouponPrice(envPrice);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      const restoredCart = loadCartFromLocalStorage(user.id);
      dispatch(setCart(restoredCart));
    }
  }, [user?.id, dispatch]);

  useEffect(() => {
    const couponItem = cartItems.find((item) => item.id === COUPON_ID);
    if (
      couponItem &&
      couponItem.type === "food" &&
      couponItem.name === "food"
    ) {
      setQuantity(couponItem.quantity);
    } else {
      setQuantity(0);
    }
  }, [cartItems]);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(q - 1, 0));

  const addToCart = () => {
    const filteredCart = cartItems.filter((item) => item.id !== COUPON_ID);

    if (quantity <= 0) {
      dispatch(setCart({ items: filteredCart }));
      if (user?.id) saveCartToLocalStorage(user.id, { items: filteredCart });
      return;
    }

    const foodCartItem: CartItem = {
      id: COUPON_ID,
      type: "food",
      name: "food",
      price: couponPrice,
      quantity,
    };

    const updatedCart = [...filteredCart, foodCartItem];
    dispatch(setCart({ items: updatedCart }));

    if (user?.id) {
      saveCartToLocalStorage(user.id, { items: updatedCart });
    }
  };

  const existingFoodCouponQty =
    cartItems.find((item) => item.id === COUPON_ID && item.type === "food")
      ?.quantity || 0;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white transition-all duration-1000 ease-in-out">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1
          className="text-4xl sm:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 mb-6 leading-tight"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Buy Food Coupons
        </h1>

        <p
          className="text-center text-2xl text-gray-300 mb-4"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Select the number of (Lunch + Snack) coupons you&rsquo;d like to
          purchase.
        </p>

        <div
          className="text-left text-2xl text-gray-300 space-y-2 mb-20 mt-20 px-2 sm:px-6"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          <p>
            <strong>Note:</strong> Each quantity includes <em>one Lunch</em> and{" "}
            <em>one Snack</em>, and will appear as separate entries in your
            &rsquo;My orders&rsquo; section post payment.
          </p>
          <p>
            Please purchase only if you&rsquo;re certain of attending the event
            — <em>no refunds</em> will be issued for unused coupons.
          </p>
        </div>

        <div
          className="flex justify-between items-center bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-md px-6 py-4"
          style={{
            borderImageSlice: 1,
            borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
            borderWidth: "2px",
            borderStyle: "solid",
          }}
        >
          <div>
            <span
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              {COUPON_LABEL}
            </span>
            <div
              className="text-xl text-white mt-1"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              ₹{couponPrice.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={decrement}
              className="text-white bg-transparent border-2 rounded px-2 text-2xl font-bold select-none hover:opacity-90 transition-all duration-300"
              style={{
                borderImageSlice: 1,
                borderImageSource:
                  "linear-gradient(to right, #14b8a6, #3b82f6)",
              }}
              aria-label={`Decrement ${COUPON_LABEL}`}
            >
              -
            </button>

            <span
              className="text-white text-3xl font-bold w-12 text-center"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              {quantity}
            </span>
            <button
              onClick={increment}
              className="text-white bg-transparent border-2 rounded px-2 text-2xl font-bold select-none hover:opacity-90 transition-all duration-300"
              style={{
                borderImageSlice: 1,
                borderImageSource:
                  "linear-gradient(to right, #14b8a6, #3b82f6)",
              }}
              aria-label={`Increment ${COUPON_LABEL}`}
            >
              +
            </button>
          </div>
        </div>

        <p
          className="text-2xl text-white mt-6"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          {existingFoodCouponQty > 0 ? (
            <>
              You currently have{" "}
              <span className="font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                {existingFoodCouponQty}
              </span>{" "}
              food coupon{existingFoodCouponQty > 1 ? "s" : ""} in your cart.
            </>
          ) : (
            <>You currently have no coupons in your cart.</>
          )}
        </p>

        <div className="mt-10 text-center">
          <button
            onClick={addToCart}
            className="relative inline-flex items-center justify-center px-6 py-2 border-1 border-transparent rounded-full transition-all duration-100 transform active:scale-90 active:shadow-lg"
            style={{
              fontFamily: "'Alumni Sans Pinstripe', cursive",
              borderImageSlice: 1,
              borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
            }}
          >
            <span
              className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600"
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
