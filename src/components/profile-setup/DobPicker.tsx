"use client";

type DobPickerProps = {
  value: Date | null;
  onChange: (d: Date | null) => void;
  error?: string;
};

export default function DobPicker({ value, onChange, error }: DobPickerProps) {
  const formatted = value ? value.toISOString().substring(0, 10) : "";

  return (
    <div
      className="mb-4"
      style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
    >
      <div className="flex justify-between items-center mb-1">
        <label className="text-white font-medium text-2xl">Date of Birth</label>
        {error && <span className="text-red-400 text-xl">{error}</span>}
      </div>
      <input
        type="date"
        value={formatted}
        onChange={(e) =>
          onChange(e.target.value ? new Date(e.target.value) : null)
        }
        max={new Date().toISOString().substring(0, 10)}
        className={`w-full px-4 py-2 bg-transparent text-white text-2xl border rounded focus:outline-none focus:ring-2 focus:ring-teal-300 ${
          error ? "border-red-400" : "border-transparent"
        }`}
        style={{
          fontFamily: "'Alumni Sans Pinstripe', cursive",
          borderImageSlice: 1,
          borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
          WebkitAppearance: "textfield", // Prevent hiding the icon
          colorScheme: "dark", // Help browser show correct calendar colors
        }}
      />
    </div>
  );
}
