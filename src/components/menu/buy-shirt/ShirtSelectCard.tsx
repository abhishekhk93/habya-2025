import { Switch } from "@/components/ui/switch";

type Props = {
  selected: boolean;
  onToggle: (checked: boolean) => void;
};

export default function ShirtSelectCard({ selected, onToggle }: Props) {
  const offerPrice = process.env.NEXT_PUBLIC_SHIRT_OFFER_PRICE || "250";
  const actualPrice = process.env.NEXT_PUBLIC_SHIRT_PRICE || "500";
  return (
    <div className="px-2 transition-transform duration-200">
      <div className="flex justify-between items-center">
        <span
          className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Buy Shirt
        </span>

        <div className="flex items-center space-x-4">
          <span
            className="text-white text-lg line-through opacity-60"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            ₹{actualPrice}
          </span>
          <span
            className="text-white text-2xl font-semibold"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            ₹{offerPrice}
          </span>
          <Switch checked={selected} onCheckedChange={onToggle} />
        </div>
      </div>
    </div>
  );
}
