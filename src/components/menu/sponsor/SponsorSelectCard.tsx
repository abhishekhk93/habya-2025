import { Switch } from "@/components/ui/switch";

type Props = {
  label: string;
  price: number;
  selected: boolean;
  isCustom?: boolean;
  customAmount?: string;
  onAmountChange?: (val: string) => void;
  onToggle: (checked: boolean) => void;
};

export default function SponsorSelectCard({
  label,
  price,
  selected,
  isCustom = false,
  customAmount = "",
  onAmountChange,
  onToggle,
}: Props) {
  return (
    <div
      className="px-2 py-4 transition-transform duration-200 hover:scale-105"
      style={{
        borderBottomWidth: "2px",
        borderBottomStyle: "solid",
        borderImageSlice: 1,
        borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
      }}
    >
      <div className="flex justify-between items-center">
        <span
          className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          {label}
        </span>

        <div className="flex items-center space-x-4">
          {isCustom ? (
            <input
              type="number"
              value={customAmount}
              onChange={(e) => onAmountChange?.(e.target.value)}
              className="bg-gray-800 text-white px-2 py-1 w-24 border rounded"
              min={1}
              placeholder="INR"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span
              className="text-white text-2xl"
              style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
            >
              ₹{price.toLocaleString()}
            </span>
          )}

          <Switch checked={selected} onCheckedChange={onToggle} />
        </div>
      </div>

      <p
        className="text-xl text-white mt-2 transition-all duration-700 ease-in-out"
        style={{
          fontFamily: "'Alumni Sans Pinstripe', cursive",
          opacity: selected ? 1 : 0,
          maxHeight: selected ? "100px" : "0px",
          overflow: "hidden",
          pointerEvents: selected ? "auto" : "none",
        }}
      >
        Sponsorship added to cart
      </p>
    </div>
  );
}
