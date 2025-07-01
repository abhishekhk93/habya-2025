"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisteredUserForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regError, setRegError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (regPhone.length !== 10) {
      setRegError("Phone number must be exactly 10 digits.");
      return;
    }

    if (!/^\d{12}$/.test(regPassword)) {
      setRegError("Password must be exactly 12 digits.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/login/v2/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: regPhone, password: regPassword }),
      });
      setIsSubmitting(false);

      const data = await res.json();

      if (res.ok && data.status === "logged-in") {
        setRegError("");
        router.push("/");
      } else {
        setRegError(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setRegError("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-xl"
      style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
    >
      {/* Info Placeholder */}
      <div className="text-lg text-gray-200 text-center mb-4 space-y-1 leading-snug">
        <p>Password is a combination of Date of Birth and Profile ID.</p>
        <p>Ex: 16-11-1965 with Profile ID 1097 = 161119651097.</p>
        <p>Keep your Profile ID confidential.</p>
      </div>

      <input
        type="text"
        placeholder="Phone Number"
        value={regPhone}
        maxLength={10}
        onChange={(e) => {
          const val = e.target.value;
          if (/^\d{0,10}$/.test(val)) setRegPhone(val);
        }}
        className="w-full p-2 bg-black text-white border border-gray-700"
        inputMode="numeric"
      />

      <input
        type="password"
        placeholder="Pass:(DOB in DDMMYYYY followed by UserID)"
        value={regPassword}
        maxLength={12}
        onChange={(e) => {
          const val = e.target.value;
          if (/^\d{0,12}$/.test(val)) setRegPassword(val);
        }}
        className="w-full p-2 bg-black text-white border border-gray-700"
        inputMode="numeric"
      />

      <div className="h-5">
        {regError && (
          <p className="text-red-400 text-xl text-center">{regError}</p>
        )}
      </div>
      <div className="text-center mt-6">
        <button
          type="submit"
          disabled={isSubmitting} // Optional: use isProcessing state if you add one
          className={`relative inline-flex items-center justify-center px-6 py-2 border-1 border-transparent rounded-full transition-all duration-300 transform hover:scale-105 ${
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
            Login
          </span>
        </button>
      </div>
    </form>
  );
}
