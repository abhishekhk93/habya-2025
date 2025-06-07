// File: app/menu/register/PartnerModal.tsx
import React from "react";

type Event = {
  id: string;
  name: string;
  isRegistered: boolean;
};

type PartnerModalProps = {
  event: Event;
  partnerId: string;
  partnerIdError: string;
  validating: boolean;
  onChange: (newId: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
};

export default function PartnerModal({
  event,
  partnerId,
  partnerIdError,
  validating,
  onChange,
  onCancel,
  onSubmit,
}: PartnerModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white transition-all duration-1000 ease-in-out">
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
          Profile ID of your partner for {event.name}
        </h2>

        <div className="flex justify-center gap-2 mb-2">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              id={`partner-digit-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-12 h-12 text-center rounded border text-white bg-transparent text-lg focus:outline-none"
              style={{
                borderImageSlice: 1,
                borderWidth: "2px",
                borderStyle: "solid",
                borderImageSource:
                  "linear-gradient(to right, #14b8a6, #3b82f6)",
                transition: "all 0.3s ease",
              }}
              value={partnerId[index] || ""}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                // Always update the string (even if empty) so user can delete
                const updatedArr = partnerId.split("");
                updatedArr[index] = val || "";
                onChange(updatedArr.join(""));
                // Move focus to next box if digit entered
                if (val && index < 3) {
                  const next = document.getElementById(
                    `partner-digit-${index + 1}`
                  );
                  next?.focus();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  e.preventDefault();
                  const updatedArr = partnerId.split("");
                  if (partnerId[index]) {
                    // Clear current box
                    updatedArr[index] = "";
                    onChange(updatedArr.join(""));
                  } else if (index > 0) {
                    // Move focus backward
                    const prev = document.getElementById(
                      `partner-digit-${index - 1}`
                    );
                    prev?.focus();
                    updatedArr[index - 1] = "";
                    onChange(updatedArr.join(""));
                  }
                }
              }}
            />
          ))}
        </div>

        {/* Feedback / error / spinner */}
        <div className="transition-all duration-300 ease-in-out min-h-[3.5rem] mb-2 flex items-center justify-center text-xl text-center px-2">
          {validating ? (
            <div
              className="flex items-center space-x-2 text-transparent bg-clip-text"
              style={{
                fontFamily: "'Alumni Sans Pinstripe', cursive",
                backgroundImage: "linear-gradient(to right, #14b8a6, #3b82f6)",
              }}
            >
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              <span>Validating...</span>
            </div>
          ) : partnerIdError ? (
            <p
              className="text-red-400 text-xl text-center"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              {partnerIdError}
            </p>
          ) : (
            <span className="invisible">placeholder</span>
          )}
        </div>

        {/* Cancel + Submit buttons */}
        <div className="flex justify-center space-x-3 mt-4">
          <button
            onClick={onCancel}
            className="relative inline-flex items-center justify-center px-4 border-1 border-transparent rounded-full transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'Alumni Sans Pinstripe', cursive",
              borderImageSlice: 1,
              borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
            }}
          >
            <span
              className="text-white text-2xl sm:text-3xl font-extrabold"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              Cancel
            </span>
          </button>

          <button
            onClick={onSubmit}
            className="relative inline-flex items-center justify-center px-4 border-1 border-transparent rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 active:scale-95"
            style={{
              fontFamily: "'Alumni Sans Pinstripe', cursive",
              borderImageSlice: 1,
              borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
            }}
            disabled={partnerId.trim().length !== 4 || validating}
          >
            <span
              className="text-white text-2xl sm:text-3xl font-extrabold"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              Submit
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
