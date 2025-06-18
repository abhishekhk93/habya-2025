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
        onClick={onRedeem}
        className="relative inline-flex items-center justify-center px-6 py-2 border-1 border-transparent rounded-full transition-all duration-100 transform active:scale-95 active:shadow-lg"
        style={{
          fontFamily: "'Alumni Sans Pinstripe', cursive",
          borderImageSlice: 1,
          borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
        }}
      >
        <span
          className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Redeem
        </span>
      </button>
    </div>
  );
}
