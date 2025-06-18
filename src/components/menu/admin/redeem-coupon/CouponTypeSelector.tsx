// components/redeem/CouponTypeSelector.tsx
type Props = {
    selectedType: "lunch" | "snack";
    onChange: (type: "lunch" | "snack") => void;
  };
  
  export default function CouponTypeSelector({ selectedType, onChange }: Props) {
    return (
      <div className="flex justify-center space-x-6 mb-8">
        {["Lunch", "Snack"].map((g) => (
          <label key={g} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value={g.toLowerCase()}
              checked={selectedType === g.toLowerCase()}
              onChange={() => onChange(g.toLowerCase() as "lunch" | "snack")}
              className="appearance-none w-5 h-5 rounded-full border-2 border-teal-800 checked:bg-teal-800 focus:outline-none"
              style={{
                backgroundColor:
                  selectedType === g.toLowerCase() ? "#0d9488" : "#aaa",
              }}
            />
            <span
              className={`text-2xl ${
                selectedType === g.toLowerCase() ? "text-white" : "text-gray-400"
              }`}
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              {g}
            </span>
          </label>
        ))}
      </div>
    );
  }
  