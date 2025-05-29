"use client";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "@/store/store";
import { setAuthenticated } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth); // Assuming isAuthenticated in auth state
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  console.log("Navbar: user and auth: ", user, isAuthenticated);
  return (
    <nav
      className="w-full border-b-2 border-gray-300 pb-2 px-2 py-4"
      style={{ borderImage: "linear-gradient(to right, #00bfae, #1c7ed6) 1" }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600"
        >
          <h2
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 text-center leading-tight animate__animated animate__fadeIn animate__delay-1s"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              Habya 2025
            </h2>
        </Link>

        {!isAuthenticated ? (
          <Link href="/sign-in">
            <button className="relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden font-medium text-teal-800 transition duration-300 ease-out border border-teal-300 rounded-full shadow-md group hover:shadow-lg hover:bg-teal-50">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-100 to-white opacity-50 group-hover:opacity-80 rounded-full blur-sm"></span>
              <span className="relative z-10">Login</span>
            </button>
          </Link>
        ) : (
          <HamburgerMenu />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
