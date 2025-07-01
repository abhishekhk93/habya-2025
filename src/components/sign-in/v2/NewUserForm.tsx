"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setPhone } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";

export default function NewUserForm() {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [confirmPhone, setConfirmPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPhone.length !== 10 || confirmPhone.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (newPhone !== confirmPhone) {
      setError("Phone numbers do not match.");
      return;
    }
    dispatch(setPhone(newPhone));
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/login/v2/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: newPhone }),
      });
      setIsSubmitting(false);

      const data = await res.json();

      if (data?.status === "logged-in") {
        setError("Already registered. Login from the next tab.");
        dispatch(setPhone(""));
      } else if (data?.status === "new-user") {
        setError("");
        router.push("/profile-setup");
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      console.error("Error checking phone number:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div
        className="text-lg text-gray-200 text-center mb-4 space-y-1 leading-snug"
        style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
      >
        <p>This phone number will be used for any communication.</p>
        <p>Please double-check before proceeding.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 text-xl"
        style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
      >
        <input
          type="text"
          placeholder="Enter Phone Number"
          value={newPhone}
          maxLength={10}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d{0,10}$/.test(val)) setNewPhone(val);
          }}
          className="w-full p-2 bg-black text-white border border-gray-700"
          inputMode="numeric"
        />

        <input
          type="password"
          placeholder="Re-enter Phone Number"
          value={confirmPhone}
          maxLength={10}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d{0,10}$/.test(val)) setConfirmPhone(val);
          }}
          className="w-full p-2 bg-black text-white border border-gray-700"
          inputMode="numeric"
        />

        <div className="h-5">
          {error && <p className="text-red-400 text-xl text-center">{error}</p>}
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            disabled={isSubmitting} // You can set to true during loading if needed
            className={`relative inline-flex items-center justify-center px-6 py-2 border-1 border-transparent rounded-full transition-all duration-300 transform ${
              isSubmitting ? "scale-95 cursor-not-allowed" : "hover:scale-105"
            }`}
            style={{
              fontFamily: "'Alumni Sans Pinstripe', cursive",
              borderImageSlice: 1,
              borderImageSource: "linear-gradient(to right, #2dd4bf, #3b82f6)",
            }}
          >
            <span
              className={`text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600`}
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              Continue to Profile Creation
            </span>
          </button>
        </div>
      </form>
    </>
  );
}
