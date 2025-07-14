"use client";

import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";

type Shirt = {
  user_id: number | null;
  name: string | null;
  size: string | null;
  type: string | null;
};

export default function ShirtLookupPage() {
  const [phone, setPhone] = useState("");
  const [shirts, setShirts] = useState<Shirt[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setShirts([]);

    if (!/^\d{10}$/.test(phone)) {
      setError("❗ Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/shirts-by-number", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setShirts(data.shirts || []);
    } catch (err: unknown) {
      const e = err as Error;
      setError(`❌ ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1
          className="text-4xl sm:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-12"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Shirt Lookup
        </h1>

        {/* Phone Input */}
        <div className="flex items-center justify-center mb-12 space-x-3">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="text-2xl px-4 py-2 bg-gray-800 text-white border border-gray-700 w-48 text-center"
            placeholder="Phone number"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          />
          <button
            onClick={handleSearch}
            className="relative inline-flex items-center justify-center px-6 py-2 border-1 border-transparent rounded-full transition-all duration-100 transform active:scale-95 active:shadow-lg"
            style={{
              fontFamily: "'Alumni Sans Pinstripe', cursive",
              borderImageSlice: 1,
              borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
            }}
          >
            <span
              className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              Search
            </span>
          </button>
        </div>

        {/* Loader / Error */}
        {loading && (
          <div
            className="text-white text-xl text-center mb-6"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            Searching...
          </div>
        )}
        {error && (
          <div
            className="text-red-400 text-xl text-center mb-6"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            {error}
          </div>
        )}

        {/* Shirts Section */}
        <div
          className="p-6 rounded-md"
          style={{
            border: "2px solid transparent",
            borderImage: "linear-gradient(to right, #06b6d4, #3b82f6) 1",
            borderImageSlice: 1,
          }}
        >
          <h2
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-6 text-center"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            Shirt Details{" "}
          </h2>
          <h3
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-6 text-center"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            {shirts.length > 0 ? `(Profile ID: ${shirts[0].user_id})` : ""}
          </h3>

          {shirts.length > 0 ? (
            <div className="space-y-4">
              {shirts.map((shirt, idx) => (
                <div
                  key={idx}
                  className="p-2 transition bg-white/5 rounded-md flex items-start gap-4"
                  style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
                >
                  <span className="text-white text-xl font-semibold">
                    {idx + 1}. {"Name: "}
                    {shirt.name || "-"}
                    <br /> {"Size: "} {shirt.size || "-"}
                    <br /> {"Type: "} {shirt.type || "-"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            !loading &&
            !error && (
              <div
                className="text-white text-2xl text-center"
                style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
              >
                No shirt records found for this number.
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
