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
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <span
          className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600"
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
          className="text-xl text-white mt-1"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          You have already registered for this event.
        </p>
      )}
    </div>
  );
}
