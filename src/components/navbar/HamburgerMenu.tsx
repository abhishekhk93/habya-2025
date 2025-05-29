"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { setAuthenticated, setStep } from "@/store/slices/authSlice";
import { setUser } from "@/store/slices/userSlice";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/clear-token", { method: "POST" });
      dispatch(setAuthenticated(false));
      dispatch(setUser(null));
      dispatch(setStep("phone"));
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="relative z-50">
      {/* Hamburger Icon */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <Menu className="w-6 h-6 text-teal-600" />
      </button>

      {/* Drawer & Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dark background overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setOpen(false)}
            />

            {/* Right drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-72 bg-gradient-to-r from-teal-100 to-blue-200 shadow-xl z-50 p-6 flex flex-col text-gray-800"
            >
              {/* Close icon */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-700 hover:text-teal-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Menu items */}
              <ul className="flex flex-col divide-y divide-teal-300 text-base font-medium">
              <li className="py-3">
                  <Link href="/" onClick={() => setOpen(false)}>
                    <span
                      style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                      className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-teal-800 to-blue-900"
                    >
                      Home
                    </span>
                  </Link>
                </li>
                <li className="py-3">
                  <Link href="/menu/register" onClick={() => setOpen(false)}>
                    <span
                      style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                      className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-teal-800 to-blue-900"
                    >
                      Register
                    </span>
                  </Link>
                </li>
                <li className="py-3">
                  <Link href="/menu/sponsor" onClick={() => setOpen(false)}>
                    <span
                      style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                      className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-teal-800 to-blue-900"
                    >
                      Sponsor
                    </span>
                  </Link>
                </li>
                <li className="py-3">
                  <Link href="/menu/my-registrations" onClick={() => setOpen(false)}>
                    <span
                      style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                      className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-teal-800 to-blue-900"
                    >
                      My Registrations
                    </span>
                  </Link>
                </li>
                <li className="py-3">
                  <Link href="/menu/buy-food" onClick={() => setOpen(false)}>
                    <span
                      style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                      className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-teal-800 to-blue-900"
                    >
                      Buy Food Coupons
                    </span>
                  </Link>
                </li>
                <li className="py-3">
                  <Link href="/menu/buy-shirt" onClick={() => setOpen(false)}>
                    <span
                      style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                      className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-teal-800 to-blue-900"
                    >
                      Buy Shirt
                    </span>
                  </Link>
                </li>
                <li className="py-3">
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="text-left text-red-600 hover:underline w-full"
                  >
                    <span
                      style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                      className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-teal-800 to-blue-900"
                    >
                      Logout
                    </span>
                  </button>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;
