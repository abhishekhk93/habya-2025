// components/redeem/CouponRedeemInput.tsx
type Props = {
  code: string;
  onChange: (val: string) => void;
  onRedeem?: () => void;
};

export default function CouponRedeemInput({ code, onChange, onRedeem }: Props) {
  return (
    <div className="flex items-center justify-center space-x-3">
      <input
        type="text"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="text-xl px-3 py-1 bg-gray-800 text-white border border-gray-700 w-32 text-center"
        placeholder="Enter code"
        style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
      />
      <button
        className="text-xl px-4 py-1 border border-transparent"
        style={{
          fontFamily: "'Alumni Sans Pinstripe', cursive",
          borderImageSlice: 1,
          borderImageSource: "linear-gradient(to right, #2dd4bf, #2563eb)",
        }}
        onClick={onRedeem}
      >
        <span
          className="bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
          }}
        >
          Redeem
        </span>
      </button>
    </div>
  );
}
