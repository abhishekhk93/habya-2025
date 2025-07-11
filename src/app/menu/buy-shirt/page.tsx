"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
  setCart,
  addItem,
  removeItem,
  CartItem,
} from "@/store/slices/cartSlice";
import { RootState } from "@/store/store";
import Navbar from "@/components/navbar/Navbar";
import ImageCarousel from "@/components/menu/buy-shirt/ImageCarousel";
import ShirtSelectCard from "@/components/menu/buy-shirt/ShirtSelectCard";
import ShirtModal from "@/components/menu/buy-shirt/ShirtModal";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { shirtTypeLabels } from "@/app/api/payment/complete/utils/typechecks";

const shirtImages = [
  "/shirts/one-front.png",
  "/shirts/one-back.png",
  "/shirts/two-front.png",
  "/shirts/two-back.png",
  "/shirts/three-front.png",
  "/shirts/three-back.png",
];

export default function BuyShirtPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const bookingsOpen = process.env.NEXT_PUBLIC_SHIRT_BOOKINGS_OPEN === "true";

  // Modal control: index of toggle that triggered modal (null means closed)
  const [, setModalIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Load cart from localStorage on user.id load
  useEffect(() => {
    if (user?.id) {
      const restoredCart = loadCartFromLocalStorage(user.id);
      dispatch(setCart(restoredCart));
    }
  }, [user?.id, dispatch]);

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    if (user?.id) {
      saveCartToLocalStorage(user.id, { items: cartItems });
    }
  }, [cartItems, user?.id]);

  // Filter all shirt items from cart
  const shirtCartItems = cartItems.filter((item) => item.type === "shirt");

  // Called when toggling any switch on page
  // If toggling ON => open modal to add info for that toggle index
  // If toggling OFF => remove that shirt from cart by UUID
  const handleToggle = (index: number, checked: boolean) => {
    if (checked) {
      setModalIndex(index); // for modal context (existing or new)
      setShowModal(true);
    } else {
      // Remove corresponding shirt item by UUID
      const shirtToRemove = shirtCartItems[index];
      if (shirtToRemove) {
        dispatch(removeItem(shirtToRemove.id));
      }
    }
  };

  // Modal submit: add a new shirt item with UUID to cart
  const handleModalSubmit = (data: {
    name?: string;
    number?: string;
    size: string;
    type: string;
  }) => {
    const offerPrice = process.env.NEXT_PUBLIC_SHIRT_OFFER_PRICE || "250";
    const newShirtItem: CartItem = {
      id: uuidv4(),
      type: "shirt",
      name: "Shirt",
      price: Number(offerPrice),
      quantity: 1,
      shirtData: [{ name: data.name, size: data.size, type: data.type }],
    };

    dispatch(addItem(newShirtItem));
    setShowModal(false);
    setModalIndex(null);
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setModalIndex(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1
          className="text-3xl sm:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 mb-6 leading-tight"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Buy Our Official Shirt
        </h1>

        <p
          className="text-center text-xl sm:text-2xl text-white mb-10 leading-relaxed"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          <span className="text-transparent text-2xl text-bold bg-clip-text bg-gradient-to-r from-teal-100 to-teal-400">
            Style it. Sport it. Celebrate the game your way.
          </span>
          <br />
          We&rsquo;re excited to have several co-sponsors supporting our
          official shirt this year. Thanks to their generosity, we&rsquo;re
          offering it at a discounted price.
        </p>

        <div className="mb-16">
          <ImageCarousel images={shirtImages} />
        </div>
        {bookingsOpen ? (
          <>
            {/* Render one ShirtSelectCard per existing shirt (toggled ON) */}
            <AnimatePresence>
              {shirtCartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, height: 0 }}
                  animate={{ opacity: 1, scale: 1, height: "auto" }}
                  exit={{ opacity: 0, scale: 0.9, height: 0 }}
                  transition={{
                    opacity: { duration: 0.05 },
                    height: { duration: 0.05 },
                    scale: { duration: 0.05 },
                    ease: "easeInOut",
                  }}
                  className="mb-4 py-4 overflow-hidden"
                  style={{
                    borderBottomWidth: "2px",
                    borderBottomStyle: "solid",
                    borderImageSlice: 1,
                    borderImageSource:
                      "linear-gradient(to right, #14b8a6, #3b82f6)",
                  }}
                >
                  <ShirtSelectCard
                    selected={true}
                    onToggle={(checked) => handleToggle(index, checked)}
                  />
                  <p
                    className="text-xl text-white mx-2"
                    style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                  >
                    Shirt is added to cart.
                  </p>
                  <p
                    className="text-xl text-white mx-2"
                    style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                  >
                    {item.shirtData?.[0]?.name
                      ? `Name: ${item.shirtData[0].name}, `
                      : ""}
                    Size: {item.shirtData?.[0]?.size},
                    {item.shirtData?.[0]?.type
                      ? `Type: ${shirtTypeLabels[item.shirtData?.[0]?.type]}`
                      : ""}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Always show one more ShirtSelectCard toggled OFF for adding new shirt */}
            <div className="mb-2">
              <ShirtSelectCard
                selected={false}
                onToggle={(checked) =>
                  handleToggle(shirtCartItems.length, checked)
                }
              />
              <p
                className="text-xl text-white mx-2"
                style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
              >
                Add a new shirt
              </p>
            </div>

            {/* Modal for adding/editing shirt */}
            {showModal && (
              <ShirtModal
                onCancel={handleModalCancel}
                onSubmit={handleModalSubmit}
              />
            )}
            <div className="text-center mt-12">
              <Link
                href="/cart/summary"
                className="relative inline-flex items-center justify-center px-6 py-2 border-1 border-transparent rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: "'Alumni Sans Pinstripe', cursive",
                  borderImageSlice: 1,
                  borderImageSource:
                    "linear-gradient(to right, #14b8a6, #3b82f6)",
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
          </>
        ) : (
          <p
            className="text-center text-2xl sm:text-4xl mt-8 text-gray-100"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            Sorry, we are not taking orders for shirts at this moment.
          </p>
        )}
      </div>
    </div>
  );
}
