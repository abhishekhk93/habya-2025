"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import {
  loadCartFromLocalStorage,
  removeItem,
  saveCartToLocalStorage,
  setCart,
} from "@/store/slices/cartSlice";
import Navbar from "@/components/navbar/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import PaymentStatusModal from "@/components/cart/summary/PaymentStatusModal";

export default function CartPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState<
    null | "success" | "partial" | "fail"
  >(null);

  const handleModalClose = () => {
    setPaymentStatus(null);
    router.push("/");
  };

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

  const handlePayment = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      const res = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total * 100 }),
      });

      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.amount,
        currency: data.currency,
        name: "Habya Registration",
        description: "Event Registration",
        order_id: data.id,
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, order_id: data.id }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            const completeRes = await fetch("/api/payment/complete", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ items: cartItems }), // 👈 send cart items here
            });

            const completeData = await completeRes.json();

            if (completeData.success) {
              localStorage.removeItem(`cart-${user?.id}`);
              setPaymentStatus("success");
            } else {
              setPaymentStatus("partial");
            }
          } else {
            setPaymentStatus("fail");
            setIsProcessing(false);
          }
          setIsProcessing(false); // ✅ Reset after success/failure
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false); // ✅ Reset after cancel
          },
        },
        theme: { color: "#14b8a6" },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();

      razor.on("payment.failed", () => {
        setPaymentStatus("fail");
        setIsProcessing(false);
      });
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong with payment.");
      setIsProcessing(false);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white transition-all duration-1000 ease-in-out">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1
          className="text-3xl sm:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 mb-10 leading-tight"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Your Cart Summary
        </h1>

        {cartItems.length === 0 ? (
          <p
            className="text-center text-white text-3xl"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            🛒 Your cart is empty. Add items to proceed!
          </p>
        ) : (
          <>
            <div className="space-y-6">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, maxHeight: 0 }}
                    animate={{ opacity: 1, maxHeight: 200 }} // Adjust maxHeight based on your content
                    exit={{ opacity: 0, maxHeight: 0 }}
                    transition={{ duration: 0.5 }}
                    className="px-2 py-4 flex justify-between items-start overflow-hidden"
                    style={{
                      borderBottomWidth: "2px",
                      borderBottomStyle: "solid",
                      borderImageSlice: 1,
                      borderImageSource:
                        "linear-gradient(to right, #14b8a6, #3b82f6)",
                    }}
                  >
                    <div>
                      <h2
                        className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-400"
                        style={{
                          fontFamily: "'Alumni Sans Pinstripe', cursive",
                        }}
                      >
                        {item.name}
                      </h2>

                      {item.partner && (
                        <p
                          className="text-2xl text-white mt-2"
                          style={{
                            fontFamily: "'Alumni Sans Pinstripe', cursive",
                          }}
                        >
                          Partner: {item.partner.name}
                        </p>
                      )}

                      {/* New: Show shirt details if present */}
                      {item.shirtData && item.shirtData.length > 0 && (
                        <div
                          className="text-white mt-2"
                          style={{
                            fontFamily: "'Alumni Sans Pinstripe', cursive",
                          }}
                        >
                          {item.shirtData.map((shirt, idx) => (
                            <p key={idx} className="text-2xl">
                              {shirt.name ? `Name: ${shirt.name}, ` : ""}
                              Size: {shirt.size}
                            </p>
                          ))}
                        </div>
                      )}

                      {item.type === "food" ? (
                        <>
                          <p
                            className="text-xl text-white"
                            style={{
                              fontFamily: "'Alumni Sans Pinstripe', cursive",
                            }}
                          >
                            Quantity: {item.quantity}, Total: ₹
                            {item.quantity * item.price}
                          </p>
                        </>
                      ) : (
                        <p
                          className="text-xl text-white mt-1"
                          style={{
                            fontFamily: "'Alumni Sans Pinstripe', cursive",
                          }}
                        >
                          ₹{item.price}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-2xl text-red-400 hover:text-red-200 transition"
                      style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                    >
                      Remove
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Total */}
            <div className="mt-10 text-center">
              <p
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
              >
                Total: ₹{total}
              </p>
            </div>

            {/* Proceed to Payment */}
            <div className="mt-6 text-center">
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className={`relative inline-flex items-center justify-center px-6 py-2 border-1 border-transparent rounded-full transition-all duration-300 transform ${
                  isProcessing
                    ? "scale-95 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
                style={{
                  fontFamily: "'Alumni Sans Pinstripe', cursive",
                  borderImageSlice: 1,
                  borderImageSource: isProcessing
                    ? "linear-gradient(to right, #ea580c, #f97316, #fb923c)"
                    : "linear-gradient(to right, #14b8a6, #3b82f6)",
                }}
              >
                <span
                  className={`text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent ${
                    isProcessing
                      ? "bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400"
                      : "bg-gradient-to-r from-teal-500 to-blue-600"
                  }`}
                  style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                >
                  {isProcessing ? "Processing..." : "Proceed to Payment"}
                </span>
              </button>

              {paymentStatus && (
                <PaymentStatusModal
                  status={paymentStatus}
                  onClose={handleModalClose}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
