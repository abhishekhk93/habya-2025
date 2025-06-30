"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "@/store/store";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <nav
      className="w-full border-b-2 border-gray-300 pb-2 px-2 py-4"
      style={{ borderImage: "linear-gradient(to right, #00bfae, #1c7ed6) 1" }}
    >
      <div className="flex items-center justify-between px-6 py-1">
        <Link
          href="/"
          className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600"
        >
          <h2
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 text-center leading-tight"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            Habya 2025
          </h2>
        </Link>

        {!isAuthenticated ? (
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 text-2xl sm:text-4xl font-extrabold"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          ></span>
        ) : (
          <HamburgerMenu />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
