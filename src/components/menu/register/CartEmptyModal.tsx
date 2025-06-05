// File: app/menu/register/CartEmptyModal.tsx
import React from "react";

type CartEmptyModalProps = {
  onClose: () => void;
};

export default function CartEmptyModal({ onClose }: CartEmptyModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-1000 ease-in-out bg-gradient-to-r from-gray-900 via-black to-gray-900">
      <div
        className="rounded-lg p-6 max-w-sm w-full mx-4 shadow-lg bg-gradient-to-r from-gray-900 via-black to-gray-900"
        style={{
          borderWidth: "2px",
          borderStyle: "solid",
          borderImageSlice: 1,
          borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
        }}
      >
        <h2
          className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 text-3xl font-extrabold text-center mb-4"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Please select at least one event
        </h2>

        <p
          className="text-2xl text-center text-gray-300 mb-4"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Your cart is currently empty. Add an event to continue.
        </p>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="relative inline-flex items-center justify-center px-4 border-1 border-transparent rounded-full transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'Alumni Sans Pinstripe', cursive",
              borderImageSlice: 1,
              borderImageSource:
                "linear-gradient(to right, #14b8a6, #3b82f6)",
            }}
          >
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 text-xl sm:text-2xl font-extrabold"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              OK
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
