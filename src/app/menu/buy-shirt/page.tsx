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
import Link from "next/link";

const shirtImages = ["/shirts/shirt1-bg.png", "/shirts/shirt2-bg.png"];

type ShirtInfo = {
  name?: string;
  size: string;
};

export default function BuyShirtPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Local state to track shirts for toggles
  // Initialized from cart on load
  const [shirts, setShirts] = useState<ShirtInfo[]>([]);

  // Modal control: index of toggle that triggered modal (null means closed)
  // If index === shirts.length, means "new shirt" toggle
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Load cart and populate shirts array on user load or cartItems change
  useEffect(() => {
    if (user?.id) {
      const restoredCart = loadCartFromLocalStorage(user.id);
      dispatch(setCart(restoredCart));

      const shirtItem = restoredCart.items.find((item) => item.id === "23");
      if (shirtItem?.shirtData && shirtItem.shirtData.length > 0) {
        setShirts(shirtItem.shirtData);
      } else {
        // If no shirts, start with empty array
        setShirts([]);
      }
    }
  }, [user?.id, dispatch]);

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    if (user?.id) {
      saveCartToLocalStorage(user.id, { items: cartItems });
    }
  }, [cartItems, user?.id]);

  // When shirts array changes, update the cart slice accordingly
  useEffect(() => {
    if (shirts.length === 0) {
      dispatch(removeItem("23"));
    } else {
      // Always remove before add to avoid duplicates
      dispatch(removeItem("23"));
      dispatch(
        addItem({
          id: "23",
          type: "shirt",
          name: "Shirt",
          price: 500,
          quantity: shirts.length,
          shirtData: shirts,
        })
      );
    }
  }, [shirts, dispatch]);

  // Called when toggling any switch on page
  // If toggling ON => open modal to add info for that toggle index
  // If toggling OFF => remove that shirt from shirts array
  const handleToggle = (index: number, checked: boolean) => {
    if (checked) {
      // Open modal for this toggle index (could be new shirt toggle)
      setModalIndex(index);
      setShowModal(true);
    } else {
      // Remove shirt at index from array (only if index < shirts.length)
      if (index < shirts.length) {
        const newShirts = [...shirts];
        newShirts.splice(index, 1); // remove one shirt
        setShirts(newShirts);
      }
    }
  };

  // Modal submit: update shirts array either replacing or adding item at modalIndex
  const handleModalSubmit = (data: {
    name?: string;
    number?: string;
    size: string;
  }) => {
    const newShirt: ShirtInfo = { name: data.name, size: data.size };

    if (modalIndex === null) {
      // Defensive: no modal open
      setShowModal(false);
      return;
    }

    if (modalIndex < shirts.length) {
      // Editing existing shirt toggle (replace shirt info)
      const newShirts = [...shirts];
      newShirts[modalIndex] = newShirt;
      setShirts(newShirts);
    } else if (modalIndex === shirts.length) {
      // Adding new shirt toggle (append)
      setShirts([...shirts, newShirt]);
    }

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
          className="text-4xl sm:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 mb-6 leading-tight"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Buy Our Official Shirt
        </h1>

        <p
          className="text-center text-2xl text-gray-300 mb-10"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Own a piece of the passion. Get your official{" "}
          <span className="text-teal-400">Habya 2025</span> shirt for ₹500.
          <br />
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600"
            style={{ display: "inline-block" }}
          >
            Style it. Sport it. Celebrate the game your way.
          </span>
        </p>

        <div className="mb-16">
          <ImageCarousel images={shirtImages} />
        </div>

        {/* Render one ShirtSelectCard per existing shirt (toggled ON) */}
        <AnimatePresence>
          {shirts.map((shirt, index) => (
            <motion.div
              key={`shirt-toggle-${index}`}
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
                className="text-lg text-white mx-2"
                style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
              >
                Shirt is added to cart.
              </p>
              <p
                className="text-lg text-white mx-2"
                style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
              >
                {shirt.name ? `Name: ${shirt.name}, ` : ""}
                Size: {shirt.size}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Always show one more ShirtSelectCard toggled OFF for adding new shirt */}
        <div className="mb-2">
          <ShirtSelectCard
            selected={false}
            onToggle={(checked) => handleToggle(shirts.length, checked)}
          />
          <p
            className="text-lg text-white mx-2"
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
