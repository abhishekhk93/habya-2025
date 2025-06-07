// src/components/profile-setup/NameInput.tsx
"use client";

type NameInputProps = {
  value: string;
  onChange: (v: string) => void;
  error?: string;
};

export default function NameInput({ value, onChange, error }: NameInputProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="text-gray-700 font-medium">Full Name</label>
        {error && <span className="text-red-400 text-sm">{error}</span>}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Your full name"
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300
          ${error ? "border-red-400" : "border-gray-300"}`}
      />
    </div>
  );
}
