import { Switch } from "@/components/ui/switch";

type Props = {
  selected: boolean;
  onToggle: (checked: boolean) => void;
};

export default function ShirtSelectCard({ selected, onToggle }: Props) {
  return (
    <div
      className="px-2 transition-transform duration-200"
    >
      <div className="flex justify-between items-center">
        <span
          className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Buy Shirt
        </span>

        <div className="flex items-center space-x-4">
          <span
            className="text-white text-2xl"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            ₹500
          </span>
          <Switch checked={selected} onCheckedChange={onToggle} />
        </div>
      </div>
    </div>
  );
}
