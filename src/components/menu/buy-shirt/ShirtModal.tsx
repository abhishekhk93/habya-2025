import React, { useState } from "react";

type Props = {
  onCancel: () => void;
  onSubmit: (data: { name: string; number: string; size: string }) => void;
};

export default function ShirtModal({ onCancel, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState("");

  const handleSubmit = () => {
    if (size.trim() === "") {
      setSizeError("Size is required");
      return;
    }
    setSizeError("");
    onSubmit({ name, number, size });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
      <div
        className="rounded-lg p-6 max-w-sm w-full mx-4 shadow-lg border-2 border-transparent bg-gradient-to-r from-gray-900 via-black to-gray-900"
        style={{
          borderImageSlice: 1,
          borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
        }}
      >
        <h2
          className="text-2xl font-semibold mb-4 text-center text-white"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Add Shirt Details
        </h2>

        {/* Name */}
        <div className="mb-2">
          <label className="text-white text-sm mb-1 block">Name </label>
          <input
            className="w-full px-4 py-2 rounded bg-transparent border text-white"
            placeholder="Name on your shirt - optional"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Size */}
        <div className="mb-1">
          <label className="text-white text-sm mb-1 block">
            Size <span className="text-red-400">*</span>
          </label>
          <select
            className="w-full px-4 py-2 rounded bg-transparent border text-white"
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
              if (e.target.value.trim() !== "") setSizeError("");
            }}
          >
            <option value="">Select Size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>

        {/* Error Message */}
        {sizeError && (
          <p className="text-red-400 text-sm mt-1 mb-2">{sizeError}</p>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onCancel}
            className="text-white px-6 py-2 text-2xl rounded-full border transition-transform duration-150 active:scale-95 hover:scale-102"
            style={{
              fontFamily: "'Alumni Sans Pinstripe', cursive",
              borderImageSlice: 1,
              borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="text-white px-6 py-2 text-2xl rounded-full border transition-transform duration-150 active:scale-95 hover:scale-102"
            style={{
              fontFamily: "'Alumni Sans Pinstripe', cursive",
              borderImageSlice: 1,
              borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
