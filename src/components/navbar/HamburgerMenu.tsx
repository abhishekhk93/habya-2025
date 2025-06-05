"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { setAuthenticated, setStep } from "@/store/slices/authSlice";
import { setUser } from "@/store/slices/userSlice";

const BORDER_GRADIENT_STYLE = {
  borderBottomWidth: "2px",
  borderBottomStyle: "solid",
  borderImageSlice: 1,
  borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
};

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Register", href: "/menu/register" },
  { label: "Sponsor", href: "/menu/sponsor" },
  { label: "My Registrations", href: "/menu/my-registrations" },
  { label: "Buy Food Coupons", href: "/menu/buy-food" },
  { label: "Buy Shirt", href: "/menu/buy-shirt" },
  { label: "My Cart", href: "/cart/summary" },
];

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
              animate={{ opacity: 0.8 }}
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
              className="fixed top-0 right-0 h-full w-72 bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-xl z-50 p-6 flex flex-col text-white"
            >
              {/* Close icon */}
              <div className="flex justify-end mb-4">
                <button onClick={() => setOpen(false)} className="text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Menu items */}
              <ul className="flex flex-col text-base font-medium">
                {menuItems.map(({ label, href }, idx) => {
                  // Add gradient border to all but last item
                  const style = BORDER_GRADIENT_STYLE;

                  return (
                    <li
                      key={label}
                      className="py-3"
                      style={
                        {
                          borderBottomWidth: "2px",
                          borderBottomStyle: "solid",
                          borderImageSlice: 1,
                          borderImageSource:
                            "linear-gradient(to right, #14b8a6, #3b82f6)",
                        } as React.CSSProperties
                      }
                    >
                      <Link href={href} onClick={() => setOpen(false)}>
                        <span
                          style={{
                            fontFamily: "'Alumni Sans Pinstripe', cursive",
                          }}
                          className="text-2xl"
                        >
                          {label}
                        </span>
                      </Link>
                    </li>
                  );
                })}

                {/* Logout button */}
                <li
                  className="py-3"
                  style={
                    {
                      borderBottomWidth: "2px",
                      borderBottomStyle: "solid",
                      borderImageSlice: 1,
                      borderImageSource:
                        "linear-gradient(to right, #14b8a6, #3b82f6)",
                    } as React.CSSProperties
                  }
                >
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="text-left text-red-400 hover:underline w-full"
                  >
                    <span
                      style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                      className="text-2xl"
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
