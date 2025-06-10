// src/components/profile-setup/NameInput.tsx
"use client";

type NameInputProps = {
  value: string;
  onChange: (v: string) => void;
  error?: string;
};

export default function NameInput({ value, onChange, error }: NameInputProps) {
  return (
    <div
      className="mb-4"
      style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
    >
      <div className="flex justify-between items-center mb-1">
        <label className="text-white font-medium text-2xl">Name</label>
        {error && <span className="text-red-400 text-xl">{error}</span>}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Your full name"
        className={`w-full px-4 py-2 bg-transparent text-white text-2xl border rounded focus:outline-none focus:ring-2 focus:ring-teal-300 ${
          error ? "border-red-400" : "border-transparent"
        }`}
        style={{
          fontFamily: "'Alumni Sans Pinstripe', cursive",
          borderImageSlice: 1,
          borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
        }}
      />
    </div>
  );
}
