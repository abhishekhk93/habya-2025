// src/components/profile-setup/GenderSelect.tsx
"use client";

type GenderSelectProps = {
  value: string;
  onChange: (v: string) => void;
  error?: string;
};

export default function GenderSelect({ value, onChange, error }: GenderSelectProps) {
  return (
    <div className="mb-4">
      {/* label + error inline */}
      <div className="flex justify-between items-center mb-1">
        <label className="text-gray-700 font-medium">Gender</label>
        {error && (
          <span className="text-red-600 text-sm">
            {error}
          </span>
        )}
      </div>

      {/* Radio buttons for Male and Female */}
      <div className="flex space-x-6">
        <label className="flex items-center">
          <input
            type="radio"
            value="male"
            checked={value === "male"}
            onChange={() => onChange("male")}
            className={`mr-2 ${error ? "border-red-600" : "border-gray-300"}`}
          />
          Male
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="female"
            checked={value === "female"}
            onChange={() => onChange("female")}
            className={`mr-2 ${error ? "border-red-600" : "border-gray-300"}`}
          />
          Female
        </label>
      </div>
    </div>
  );
}
