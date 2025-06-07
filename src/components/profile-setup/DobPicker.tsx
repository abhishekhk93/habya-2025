// src/components/profile-setup/DobPicker.tsx
"use client";

type DobPickerProps = {
  value: Date | null;
  onChange: (d: Date | null) => void;
  error?: string;
};

export default function DobPicker({ value, onChange, error }: DobPickerProps) {
  const formatted = value ? value.toISOString().substring(0, 10) : "";

  return (
    <div className="mb-4">
      {/* label + error inline */}
      <div className="flex justify-between items-center mb-1">
        <label className="text-gray-700 font-medium">Date of Birth</label>
        {error && <span className="text-red-400 text-sm">{error}</span>}
      </div>

      <input
        type="date"
        value={formatted}
        onChange={(e) =>
          onChange(e.target.value ? new Date(e.target.value) : null)
        }
        max={new Date().toISOString().substring(0, 10)}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300
          ${error ? "border-red-400" : "border-gray-300"}`}
      />
    </div>
  );
}
