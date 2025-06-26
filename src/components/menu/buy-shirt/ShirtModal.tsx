import React, { useState } from "react";
import { SizeChartModal } from "./SizeChartModal";

type Props = {
  onCancel: () => void;
  onSubmit: (data: { name?: string; size: string; type: string }) => void;
};

export default function ShirtModal({ onCancel, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [shirtType, setShirtType] = useState("");
  const [showSizeChart, setShowSizeChart] = useState(false);

  const [sizeError, setSizeError] = useState("");
  const [typeError, setTypeError] = useState("");

  const handleSubmit = () => {
    let hasError = false;

    if (size.trim() === "") {
      setSizeError("Size is required");
      hasError = true;
    } else {
      setSizeError("");
    }

    if (shirtType.trim() === "") {
      setTypeError("Type is required");
      hasError = true;
    } else {
      setTypeError("");
    }

    if (hasError) return;

    onSubmit({ name, size, type: shirtType });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80"
      style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
    >
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
          <label className="text-white text-2xl mb-4 block">Name </label>
          <input
            className="w-full px-4 py-2 rounded bg-transparent border text-white text-lg"
            placeholder="Name on your shirt - optional"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* Size */}
        <div className="mb-1">
          <label className="text-white text-2xl mt-4 mb-1 block">
            Size <span className="text-red-400">*</span>
          </label>
          <button
            type="button"
            onClick={() => setShowSizeChart(true)}
            className="text-xl text-white hover:text-cyan-300 border px-2 py-1"
          >
            View Size Chart
          </button>
          <select
            className="w-full mt-4 px-1 py-2 rounded bg-transparent border text-white text-xl"
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
              if (e.target.value.trim() !== "") setSizeError("");
            }}
          >
            <option value="">Select Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
        {/* Error Message */}
        {sizeError && (
          <p className="text-red-400 text-lg mt-1 mb-2">{sizeError}</p>
        )}

        {/* Shirt Type */}
        <div className="mb-1">
          <label className="text-white text-2xl mb-1 mt-4 block">
            Type <span className="text-red-400">*</span>
          </label>
          <select
            className="w-full px-1 py-2 rounded bg-transparent border text-white text-xl"
            value={shirtType}
            onChange={(e) => {
              setShirtType(e.target.value);
              if (e.target.value.trim() !== "") setTypeError("");
            }}
          >
            <option value="">Select Type</option>
            <option value="ROUND_HALF">Round Neck, Half Sleeves</option>
            <option value="ROUND_SLEEVELESS">Round Neck, Sleeveless</option>
            <option value="COLLAR_HALF">Collared, Half Sleeves</option>
          </select>
        </div>
        {typeError && (
          <p className="text-red-400 text-lg mt-1 mb-2">{typeError}</p>
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
      {showSizeChart && (
        <SizeChartModal onClose={() => setShowSizeChart(false)} />
      )}
    </div>
  );
}
