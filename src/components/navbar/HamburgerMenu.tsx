import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated, setStep } from "@/store/slices/authSlice";
import { setUser } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Register", href: "/menu/register" },
  { label: "Sponsor", href: "/menu/sponsor" },
  { label: "Buy Food Coupons", href: "/menu/buy-food-coupons" },
  { label: "Buy Shirt", href: "/menu/buy-shirt" },
  { label: "My orders", href: "/menu/orders" },
  { label: "My Cart", href: "/cart/summary" },
  //{ label: "Edit My Profile", href: "/menu/edit-profile" },
];

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);

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
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <Menu className="w-6 h-6 text-teal-600" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setOpen(false)}
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-72 bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-xl z-50 p-6 flex flex-col text-white"
            >
              <div className="flex justify-end mb-4">
                <button onClick={() => setOpen(false)} className="text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <ul className="flex flex-col text-base font-medium">
                {menuItems.map(({ label, href }) => (
                  <li
                    key={label}
                    onClick={() => {
                      router.push(href);
                      setOpen(false);
                    }}
                    className="py-3 px-2 cursor-pointer hover:bg-gray-800 rounded transition-all"
                    style={{
                      borderBottomWidth: "2px",
                      borderBottomStyle: "solid",
                      borderImageSlice: 1,
                      borderImageSource:
                        "linear-gradient(to right, #14b8a6, #3b82f6)",
                      fontFamily: "'Alumni Sans Pinstripe', cursive",
                    }}
                  >
                    <span className="text-2xl">{label}</span>
                  </li>
                ))}

                {/* ✅ Dashboard link only for admins */}
                {user?.role === "admin" && (
                  <li
                    onClick={() => {
                      router.push("/menu/admin");
                      setOpen(false);
                    }}
                    className="py-3 px-2 cursor-pointer hover:bg-gray-800 rounded transition-all"
                    style={{
                      borderBottomWidth: "2px",
                      borderBottomStyle: "solid",
                      borderImageSlice: 1,
                      borderImageSource:
                        "linear-gradient(to right, #14b8a6, #3b82f6)",
                      fontFamily: "'Alumni Sans Pinstripe', cursive",
                    }}
                  >
                    <span className="text-2xl text-cyan-400">
                      Admin Dashboard
                    </span>
                  </li>
                )}

                <li
                  className="py-3 px-2 cursor-pointer hover:bg-gray-800 rounded transition-all"
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  style={{
                    borderBottomWidth: "2px",
                    borderBottomStyle: "solid",
                    borderImageSlice: 1,
                    borderImageSource:
                      "linear-gradient(to right, #14b8a6, #3b82f6)",
                    fontFamily: "'Alumni Sans Pinstripe', cursive",
                  }}
                >
                  <span className="text-2xl text-red-400">Logout</span>
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
