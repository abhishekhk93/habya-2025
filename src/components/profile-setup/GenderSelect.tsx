// src/components/profile-setup/GenderSelect.tsx
"use client";

type GenderSelectProps = {
  value: string;
  onChange: (v: string) => void;
  error?: string;
};

export default function GenderSelect({
  value,
  onChange,
  error,
}: GenderSelectProps) {
  return (
    <div
      className="mb-4"
      style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
    >
      <div className="flex justify-between items-center mb-1">
        <label className="text-white font-medium text-2xl">Gender</label>
        {error && <span className="text-red-400 text-xl">{error}</span>}
      </div>
      <div className="flex space-x-6 text-white text-2xl">
        {["Male", "Female"].map((g) => (
          <label key={g} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value={g}
              checked={value === g}
              onChange={() => onChange(g)}
              className="appearance-none w-5 h-5 rounded-full border-2 border-teal-800 checked:border-black checked:bg-teal-800 focus:outline-none"
              style={{
                backgroundColor: value === g ? "#0d9488" : "#aaa",
              }}
            />
            <span style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}>
              {g}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
