"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-gray-400 py-6 text-center text-sm px-4">
      <div
        className="max-w-screen-xl mx-auto"
        style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
      >
        © {new Date().getFullYear()} Habya. All rights reserved.
        <span className="mx-2">|</span>
        <Link
          href="/footer/privacy-policy"
          className="hover:text-white transition duration-200"
        >
          Privacy Policy
        </Link>
        <span className="mx-2">|</span>
        <Link
          href="/footer/terms-and-conditions"
          className="hover:text-white transition duration-200"
        >
          Terms & Conditions
        </Link>
      </div>
    </footer>
  );
}
