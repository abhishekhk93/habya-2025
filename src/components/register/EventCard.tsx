import { Switch } from "@/components/ui/switch";

type Props = {
  name: string;
  isRegistered: boolean;
  selected: boolean;
  onToggle: (checked: boolean) => void;
};

export default function EventToggleCard({
  name,
  isRegistered,
  selected,
  onToggle,
}: Props) {
  return (
    <div
      className="py-4 px-2 flex flex-col"
      style={{
        borderBottomWidth: "2px",
        borderBottomStyle: "solid",
        borderImageSlice: 1,
        borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)", // teal-500 to blue-600
      }}
    >
      <div className="flex justify-between items-center">
        <span
          className="text-2xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          {name}
        </span>
        <Switch
          checked={selected}
          onCheckedChange={onToggle}
          disabled={isRegistered}
        />
      </div>
      {isRegistered && (
        <p
          className="text-xl text-muted-foreground mt-1"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          ✅ You have already registered for this event.
        </p>
      )}
    </div>
  );
}
